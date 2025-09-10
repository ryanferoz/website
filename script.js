// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.98)';
    } else {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.video-card, .about-content, .contact-content').forEach(el => {
    observer.observe(el);
});

// Video card click handlers
document.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('click', () => {
        // In a real implementation, this would open the video
        console.log('Video clicked');
    });
});

// Form submission handler
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // In a real implementation, you would send this data to a server
        console.log('Form submitted:', { name, email, message });
        alert('Thank you for your message! I\'ll get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Video hero section effects
function initVideoHero() {
    const heroVideo = document.querySelector('.hero-video-wrapper iframe');
    const heroContent = document.querySelector('.hero-content');
    
    if (heroVideo && heroContent) {
        // Set random start time for hero video (between 30 seconds and 3 minutes)
        const randomStartTime = Math.floor(Math.random() * 150) + 30; // 30-180 seconds
        const currentSrc = heroVideo.src;
        const newSrc = currentSrc.replace('start=0', `start=${randomStartTime}`);
        heroVideo.src = newSrc;
        
        console.log(`🎬 Hero video starting at ${randomStartTime} seconds`);
        
        // Add subtle parallax effect to content
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroSection = document.querySelector('.hero');
            const heroHeight = heroSection.offsetHeight;
            
            if (scrolled < heroHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrolled / heroHeight) * 0.5;
            }
        });
        
        // Add click to play/pause functionality
        heroVideo.addEventListener('click', () => {
            // This would require YouTube API integration for full functionality
            console.log('Video clicked - would toggle play/pause');
        });
    }
}

// YouTube API Integration
const YOUTUBE_API_KEY = 'AIzaSyBddDXxvd6FvBC9tytve2LGzNf8tOVssvA'; // YouTube Data API v3 Key
const CHANNEL_ID = 'UChYOZiwbiLgQLtppmxh2Bag'; // Feroz Moto Channel ID

// Initialize YouTube API
function initYouTubeAPI() {
    console.log('🚀 Initializing YouTube API...');
    console.log('API Key:', YOUTUBE_API_KEY);
    console.log('Channel ID:', CHANNEL_ID);
    
    // Check if gapi is available
    if (typeof gapi === 'undefined') {
        console.error('❌ Google API not loaded yet, retrying...');
        setTimeout(initYouTubeAPI, 1000);
        return;
    }
    
    gapi.load('client', () => {
        console.log('📡 Google API loaded, initializing client...');
        gapi.client.init({
            'apiKey': YOUTUBE_API_KEY,
            'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
        }).then(() => {
            console.log('✅ YouTube API client initialized');
            console.log('🔧 Client object available:', !!gapi.client);
            loadChannelVideos();
            loadChannelStats();
        }).catch(error => {
            console.error('❌ Error initializing YouTube API:', error);
        });
    });
}

// Load latest videos from your channel
async function loadChannelVideos() {
    try {
        // First, try to find the channel by username
        let channelResponse;
        try {
            channelResponse = await gapi.client.youtube.channels.list({
                part: 'contentDetails',
                forUsername: 'ferozmoto'
            });
        } catch (usernameError) {
            console.log('Username search failed, trying channel ID...');
            // If username doesn't work, try with the channel ID from your video URL
            channelResponse = await gapi.client.youtube.channels.list({
                part: 'contentDetails',
                id: 'UChYOZiwbiLgQLtppmxh2Bag' // Feroz Moto Channel ID
            });
        }
        
        if (channelResponse.result.items && channelResponse.result.items.length > 0) {
            const channel = channelResponse.result.items[0];
            const uploadsPlaylistId = channel.contentDetails.relatedPlaylists.uploads;
            
            console.log('Found channel:', channel);
            console.log('Uploads playlist ID:', uploadsPlaylistId);
            
            // Get latest videos from uploads playlist
            const videosResponse = await gapi.client.youtube.playlistItems.list({
                part: 'snippet',
                playlistId: uploadsPlaylistId,
                maxResults: 4 // Only need 4 videos (1 for featured + 3 for grid)
            });
            
            console.log('Found videos:', videosResponse.result.items);
            updateVideoSections(videosResponse.result.items);
        } else {
            console.log('No channel found. Trying alternative method...');
            // Alternative: Search for videos by channel name
            await searchVideosByChannel();
        }
    } catch (error) {
        console.error('Error loading YouTube videos:', error);
        // Fallback to static content if API fails
        showFallbackContent();
    }
}

// Alternative method: Search for videos by channel name
async function searchVideosByChannel() {
    try {
        const searchResponse = await gapi.client.youtube.search.list({
            part: 'snippet',
            channelId: 'UChYOZiwbiLgQLtppmxh2Bag', // Feroz Moto Channel ID
            type: 'video',
            order: 'date',
            maxResults: 4 // Only need 4 videos (1 for featured + 3 for grid)
        });
        
        console.log('Found videos via search:', searchResponse.result.items);
        updateVideoSectionsFromSearch(searchResponse.result.items);
    } catch (error) {
        console.error('Error searching for videos:', error);
        showFallbackContent();
    }
}

// Update video sections from search results
function updateVideoSectionsFromSearch(videos) {
    if (!videos || videos.length === 0) return;
    
    // Update featured video (first video)
    const featuredVideo = videos[0];
    updateFeaturedVideoFromSearch(featuredVideo);
    
    // Update video grid (remaining videos - only 3)
    const videoGridVideos = videos.slice(1, 4);
    updateVideoGridFromSearch(videoGridVideos);
}

// Update featured video from search results
function updateFeaturedVideoFromSearch(video) {
    const videoId = video.id.videoId;
    const title = video.snippet.title;
    const description = video.snippet.description.substring(0, 150) + '...';
    const publishedAt = new Date(video.snippet.publishedAt);
    
    // DON'T update the hero video - keep the original one
    // const iframe = document.querySelector('.hero-video-wrapper iframe');
    // if (iframe) {
    //     iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&start=0`;
    // }
    
    // Update featured video section (the one below the hero)
    const featuredIframe = document.querySelector('.video-wrapper iframe');
    if (featuredIframe) {
        featuredIframe.src = `https://www.youtube.com/embed/${videoId}`;
    }
    
    // Update video info
    const videoTitle = document.querySelector('.video-title');
    const videoDescription = document.querySelector('.video-description');
    
    if (videoTitle) videoTitle.textContent = title;
    if (videoDescription) videoDescription.textContent = description;
    
    // Update video stats
    updateVideoStats(videoId);
}

// Update video grid from search results
function updateVideoGridFromSearch(videos) {
    const videoCards = document.querySelectorAll('.video-card');
    
    videos.forEach((video, index) => {
        if (videoCards[index]) {
            const videoId = video.id.videoId;
            const title = video.snippet.title;
            const publishedAt = new Date(video.snippet.publishedAt);
            const thumbnail = video.snippet.thumbnails.medium.url;
            
            // Update thumbnail
            const img = videoCards[index].querySelector('.video-thumbnail img');
            if (img) {
                img.src = thumbnail;
                img.alt = title;
            }
            
            // Update title
            const cardTitle = videoCards[index].querySelector('.video-card-title');
            if (cardTitle) cardTitle.textContent = title;
            
            // Update metrics
            updateVideoCardMetrics(videoCards[index], videoId, publishedAt);
            
            // Add click handler
            videoCards[index].addEventListener('click', () => {
                window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
            });
        }
    });
}

// Update the video sections with real data
function updateVideoSections(videos) {
    if (!videos || videos.length === 0) return;
    
    // Update featured video (first video)
    const featuredVideo = videos[0];
    updateFeaturedVideo(featuredVideo);
    
    // Update video grid (remaining videos - only 3)
    const videoGridVideos = videos.slice(1, 4);
    updateVideoGrid(videoGridVideos);
}

// Update featured video section
function updateFeaturedVideo(video) {
    const videoId = video.snippet.resourceId.videoId;
    const title = video.snippet.title;
    const description = video.snippet.description.substring(0, 150) + '...';
    const publishedAt = new Date(video.snippet.publishedAt);
    
    // DON'T update the hero video - keep the original one
    // const iframe = document.querySelector('.hero-video-wrapper iframe');
    // if (iframe) {
    //     iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&start=0`;
    // }
    
    // Update featured video section (the one below the hero)
    const featuredIframe = document.querySelector('.video-wrapper iframe');
    if (featuredIframe) {
        featuredIframe.src = `https://www.youtube.com/embed/${videoId}`;
    }
    
    // Update video info
    const videoTitle = document.querySelector('.video-title');
    const videoDescription = document.querySelector('.video-description');
    
    if (videoTitle) videoTitle.textContent = title;
    if (videoDescription) videoDescription.textContent = description;
    
    // Update video stats (you'll need to make additional API calls for view counts)
    updateVideoStats(videoId);
}

// Update video grid
function updateVideoGrid(videos) {
    const videoCards = document.querySelectorAll('.video-card');
    
    videos.forEach((video, index) => {
        if (videoCards[index]) {
            const videoId = video.snippet.resourceId.videoId;
            const title = video.snippet.title;
            const publishedAt = new Date(video.snippet.publishedAt);
            const thumbnail = video.snippet.thumbnails.medium.url;
            
            // Update thumbnail
            const img = videoCards[index].querySelector('.video-thumbnail img');
            if (img) {
                img.src = thumbnail;
                img.alt = title;
            }
            
            // Update title
            const cardTitle = videoCards[index].querySelector('.video-card-title');
            if (cardTitle) cardTitle.textContent = title;
            
            // Update published date
            const cardMeta = videoCards[index].querySelector('.video-card-meta');
            if (cardMeta) {
                const timeAgo = getTimeAgo(publishedAt);
                cardMeta.textContent = `${timeAgo}`;
            }
            
            // Add click handler
            videoCards[index].addEventListener('click', () => {
                window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
            });
        }
    });
}

// Update video stats (view count, likes, etc.)
async function updateVideoStats(videoId) {
    try {
        const response = await gapi.client.youtube.videos.list({
            part: 'statistics',
            id: videoId
        });
        
        if (response.result.items && response.result.items.length > 0) {
            const stats = response.result.items[0].statistics;
            const viewCount = formatNumber(stats.viewCount);
            const likeCount = formatNumber(stats.likeCount);
            
            // Update stats display
            const statsContainer = document.querySelector('.video-stats');
            if (statsContainer) {
                statsContainer.innerHTML = `
                    <span class="stat"><i class="fas fa-eye"></i> ${viewCount} views</span>
                    <span class="stat"><i class="fas fa-thumbs-up"></i> ${likeCount} likes</span>
                    <span class="stat"><i class="fas fa-clock"></i> ${getTimeAgo(new Date())}</span>
                `;
            }
        }
    } catch (error) {
        console.error('Error loading video stats:', error);
    }
}

// Update video card metrics
async function updateVideoCardMetrics(videoCard, videoId, publishedAt) {
    try {
        const response = await gapi.client.youtube.videos.list({
            part: 'statistics,contentDetails',
            id: videoId
        });
        
        if (response.result.items && response.result.items.length > 0) {
            const stats = response.result.items[0].statistics;
            const contentDetails = response.result.items[0].contentDetails;
            
            // Update view count
            const viewCountElement = videoCard.querySelector('.view-count');
            if (viewCountElement) {
                viewCountElement.textContent = formatNumber(stats.viewCount);
            }
            
            // Update like count
            const likeCountElement = videoCard.querySelector('.like-count');
            if (likeCountElement) {
                likeCountElement.textContent = formatNumber(stats.likeCount);
            }
            
            // Update publish date
            const publishDateElement = videoCard.querySelector('.publish-date');
            if (publishDateElement) {
                publishDateElement.textContent = getTimeAgo(publishedAt);
            }
            
            // Update duration
            const durationElement = videoCard.querySelector('.duration');
            if (durationElement && contentDetails.duration) {
                durationElement.textContent = formatDuration(contentDetails.duration);
            }
        }
    } catch (error) {
        console.error('Error loading video card stats:', error);
    }
}

// Load channel statistics
async function loadChannelStats() {
    try {
        const response = await gapi.client.youtube.channels.list({
            part: 'statistics',
            id: CHANNEL_ID
        });
        
        if (response.result.items && response.result.items.length > 0) {
            const stats = response.result.items[0].statistics;
            
            // Update subscriber count
            const subscriberElement = document.getElementById('subscriber-count');
            if (subscriberElement) {
                subscriberElement.textContent = formatNumber(stats.subscriberCount);
            }
            
            // Update total views
            const totalViewsElement = document.getElementById('total-views');
            if (totalViewsElement) {
                totalViewsElement.textContent = formatNumber(stats.viewCount);
            }
            
            // Update video count
            const videoCountElement = document.getElementById('video-count');
            if (videoCountElement) {
                videoCountElement.textContent = formatNumber(stats.videoCount);
            }
            
            console.log('📊 Channel stats loaded:', stats);
        }
    } catch (error) {
        console.error('Error loading channel stats:', error);
    }
}

// Format duration from ISO 8601 format
function formatDuration(duration) {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return '--:--';
    
    const hours = (parseInt(match[1]) || 0);
    const minutes = (parseInt(match[2]) || 0);
    const seconds = (parseInt(match[3]) || 0);
    
    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}

// Helper functions
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function getTimeAgo(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
    return `${Math.floor(diffInSeconds / 31536000)} years ago`;
}

// Fallback content if API fails
function showFallbackContent() {
    console.log('Using fallback content - API not available');
    // Keep the existing static content
}

// Track line animation
function animateTrackLines() {
    const trackLines = document.querySelector('.track-lines');
    if (trackLines) {
        let position = 0;
        setInterval(() => {
            position += 1;
            trackLines.style.background = `linear-gradient(90deg, transparent, transparent ${position}%, #ffffff ${position + 10}%, transparent ${position + 20}%, transparent)`;
            if (position > 100) position = -20;
        }, 50);
    }
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎬 Page loaded, initializing...');
    initVideoHero();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Initialize YouTube API after a delay to ensure Google API loads
    setTimeout(() => {
        if (YOUTUBE_API_KEY !== 'YOUR_API_KEY_HERE') {
            console.log('🔑 API key found, initializing YouTube API...');
            initYouTubeAPI();
        } else {
            console.log('⚠️ No API key found, using fallback content');
        }
    }, 2000); // Wait 2 seconds for Google API to load
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.98)';
    } else {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
    }
}, 10));

// Lazy loading for images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Add loading states for better UX
function showLoading(element) {
    element.style.opacity = '0.5';
    element.style.pointerEvents = 'none';
}

function hideLoading(element) {
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
}

// Error handling for external resources
window.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';
        console.warn('Image failed to load:', e.target.src);
    }
});

// Review Request Modal Functions
function openReviewModal() {
    const modal = document.getElementById('reviewModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeReviewModal() {
    const modal = document.getElementById('reviewModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('reviewModal');
    if (event.target === modal) {
        closeReviewModal();
    }
}

// Review form submission
document.addEventListener('DOMContentLoaded', () => {
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(reviewForm);
            const reviewData = {
                carMake: formData.get('carMake'),
                carModel: formData.get('carModel'),
                carYear: formData.get('carYear'),
                reviewType: formData.get('reviewType'),
                location: formData.get('location'),
                ownerName: formData.get('ownerName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                instagram: formData.get('instagram'),
                carModifications: formData.get('carModifications'),
                availability: formData.get('availability'),
                additionalInfo: formData.get('additionalInfo')
            };
            
            // Basic validation
            if (!reviewData.carMake || !reviewData.carModel || !reviewData.carYear || 
                !reviewData.reviewType || !reviewData.location || !reviewData.ownerName || 
                !reviewData.email) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // In a real implementation, you would send this data to a server
            console.log('Review request submitted:', reviewData);
            
            // Show success message
            alert('Thank you for your review request! We\'ll get back to you soon.');
            
            // Reset form and close modal
            reviewForm.reset();
            closeReviewModal();
        });
    }
});

// Console welcome message
console.log(`
🏁 Welcome to Feroz Moto! 🏁
Track & Motorsport Excellence
Built with passion for performance driving
`);
