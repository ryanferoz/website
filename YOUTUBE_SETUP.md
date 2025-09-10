# YouTube API Setup Guide for Feroz Moto Website

## 🎥 **How to Connect Your YouTube Channel**

### **Step 1: Get YouTube Data API Key**

1. **Go to Google Cloud Console**

   - Visit: https://console.cloud.google.com/
   - Sign in with your Google account

2. **Create a New Project**

   - Click "Select a project" → "New Project"
   - Name it "Feroz Moto Website"
   - Click "Create"

3. **Enable YouTube Data API v3**

   - Go to "APIs & Services" → "Library"
   - Search for "YouTube Data API v3"
   - Click on it and press "Enable"

4. **Create API Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy your API key

### **Step 2: Update Your Website**

1. **Open `script.js`**
2. **Find this line:**
   ```javascript
   const YOUTUBE_API_KEY = "YOUR_API_KEY_HERE";
   ```
3. **Replace with your actual API key:**
   ```javascript
   const YOUTUBE_API_KEY = "AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
   ```

### **Step 3: Test Your Setup**

1. **Refresh your website** at http://localhost:8000
2. **Check browser console** (F12) for any errors
3. **Your latest videos should now load automatically!**

## 🚀 **What This Does**

- **Hero Video**: Automatically shows your latest video as background
- **Featured Video**: Displays your most recent video with real stats
- **Video Grid**: Shows your 4 most recent videos with thumbnails
- **Real-time Data**: View counts, like counts, and publish dates
- **Auto-updates**: New videos appear automatically when you upload

## 🔧 **Troubleshooting**

### **If videos don't load:**

1. Check that your API key is correct
2. Ensure YouTube Data API v3 is enabled
3. Check browser console for error messages
4. Verify your channel username is "ferozmoto"

### **If you get quota errors:**

- YouTube API has daily limits
- The website will fall back to static content
- Consider upgrading to a paid plan if needed

## 📱 **Features Included**

- ✅ Automatic video loading from your channel
- ✅ Real-time view counts and statistics
- ✅ Responsive design for all devices
- ✅ Click to open videos in YouTube
- ✅ Fallback content if API fails
- ✅ Professional black and white theme

## 🎯 **Next Steps**

1. Get your YouTube API key
2. Update the script.js file
3. Test the website
4. Deploy to your domain (ferozmoto.com)

Your website will now automatically showcase your latest Feroz Moto content!
