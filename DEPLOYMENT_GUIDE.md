# 🚀 Feroz Moto Website Deployment Guide

## 📋 **Pre-Deployment Checklist**

### ✅ **Files Ready for Deployment:**

- `index.html` - Main website file
- `styles.css` - All styling
- `script.js` - Interactive functionality
- `logo.svg` - Your Feroz Moto logo
- `CNAME` - Domain configuration (ferozmoto.com)

## 🌐 **Deployment Options**

### **Option 1: GitHub Pages (Recommended - Free)**

1. **Create GitHub Repository:**

   ```bash
   # In your website folder
   git init
   git add .
   git commit -m "Initial Feroz Moto website"
   ```

2. **Push to GitHub:**

   - Create new repository on GitHub.com
   - Name it: `ferozmoto-website` or `ferozmoto.github.io`
   - Follow GitHub's instructions to push your code

3. **Enable GitHub Pages:**

   - Go to repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch
   - Your site will be live at: `https://ferozmoto.github.io`

4. **Custom Domain (Optional):**
   - In Pages settings, add `ferozmoto.com`
   - Update your domain's DNS to point to GitHub Pages

### **Option 2: Netlify (Easy Drag & Drop)**

1. **Go to:** https://netlify.com
2. **Sign up** with GitHub or email
3. **Drag & drop** your website folder
4. **Your site is live** instantly!
5. **Custom domain:** Add ferozmoto.com in settings

### **Option 3: Vercel (Developer-Friendly)**

1. **Go to:** https://vercel.com
2. **Import** your GitHub repository
3. **Deploy** automatically
4. **Custom domain:** Add ferozmoto.com

## 🔧 **Quick GitHub Deployment**

### **Step 1: Initialize Git**

```bash
cd C:\website
git init
git add .
git commit -m "Feroz Moto website ready for deployment"
```

### **Step 2: Create GitHub Repository**

1. Go to https://github.com/new
2. Repository name: `ferozmoto-website`
3. Make it **Public**
4. Don't initialize with README
5. Click "Create repository"

### **Step 3: Connect and Push**

```bash
git remote add origin https://github.com/YOUR_USERNAME/ferozmoto-website.git
git branch -M main
git push -u origin main
```

### **Step 4: Enable GitHub Pages**

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section
4. Source: **Deploy from a branch**
5. Branch: **main**
6. Folder: **/ (root)**
7. Click **Save**

### **Step 5: Your Website is Live!**

- **GitHub URL:** `https://YOUR_USERNAME.github.io/ferozmoto-website`
- **Custom Domain:** Add `ferozmoto.com` in Pages settings

## 🌍 **Custom Domain Setup**

### **If you own ferozmoto.com:**

1. **In GitHub Pages settings:**

   - Add `ferozmoto.com` as custom domain
   - Enable "Enforce HTTPS"

2. **Update your domain's DNS:**

   - Add CNAME record: `www` → `YOUR_USERNAME.github.io`
   - Add A record: `@` → `185.199.108.153`
   - Add A record: `@` → `185.199.109.153`
   - Add A record: `@` → `185.199.110.153`
   - Add A record: `@` → `185.199.111.153`

3. **Wait 24-48 hours** for DNS propagation

## 📱 **Post-Deployment**

### **Test Your Live Website:**

- ✅ All pages load correctly
- ✅ YouTube videos work
- ✅ Review form functions
- ✅ Mobile responsive
- ✅ Social links work

### **Update API Key (Important!):**

- Your YouTube API key is currently in the code
- For production, consider using environment variables
- Monitor API usage in Google Cloud Console

## 🔄 **Future Updates**

### **To update your website:**

```bash
# Make changes to your files
git add .
git commit -m "Updated website content"
git push origin main
# GitHub Pages will automatically redeploy
```

## 🆘 **Troubleshooting**

### **If logo doesn't show:**

- Check file path: `logo.svg` in root directory
- Verify SVG file is valid
- Clear browser cache

### **If YouTube API doesn't work:**

- Check API key is correct
- Verify YouTube Data API v3 is enabled
- Check browser console for errors

### **If custom domain doesn't work:**

- Wait 24-48 hours for DNS
- Check DNS records are correct
- Verify domain is added in GitHub Pages

## 🎉 **You're Live!**

Your Feroz Moto website is now live and ready to showcase your motorsport content!

**Next Steps:**

1. Share your website URL
2. Update social media with new website
3. Monitor analytics and user feedback
4. Keep content updated with new videos

---

**Need Help?** Check GitHub Pages documentation or contact your domain provider for DNS assistance.
