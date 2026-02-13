# Heisenbyte Website Deployment Guide

## Deployment Options

### Option 1: Vercel (Recommended - Easiest & Free)

**Why Vercel?**
- Free hosting for static sites
- Automatic deployments from GitHub
- Custom domain support
- Fast global CDN
- Zero configuration for Vite projects

**Steps:**

1. **Sign up for Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account

2. **Import Your Repository**
   - Click "Add New Project"
   - Select your `sympo-ai-ds-2026` repository
   - Vercel will auto-detect it's a Vite project

3. **Configure Build Settings** (Auto-detected)
   - Framework Preset: Vite
   - Root Directory: `heisenbyte-website`
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Deploy**
   - Click "Deploy"
   - Your site will be live in ~2 minutes!
   - You'll get a URL like: `heisenbyte-website.vercel.app`

5. **Custom Domain (Optional)**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

---

### Option 2: Netlify (Also Great & Free)

**Steps:**

1. **Sign up for Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub

2. **New Site from Git**
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your repository

3. **Build Settings**
   - Base directory: `heisenbyte-website`
   - Build command: `npm run build`
   - Publish directory: `heisenbyte-website/dist`

4. **Deploy**
   - Click "Deploy site"
   - Live URL: `heisenbyte-website.netlify.app`

---

### Option 3: GitHub Pages (Free)

**Steps:**

1. **Install gh-pages package**
   ```bash
   cd heisenbyte-website
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   Add these scripts:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. **Add base path in vite.config.js**
   ```javascript
   export default defineConfig({
     base: '/sympo-ai-ds-2026/',
     plugins: [react()],
   })
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from branch
   - Branch: `gh-pages`
   - Your site: `https://aragulkumar.github.io/sympo-ai-ds-2026/`

---

## Pre-Deployment Checklist

- [ ] Update contact email in `Contact.jsx`
- [ ] Add real social media links
- [ ] Test all navigation links
- [ ] Verify countdown timer works
- [ ] Check responsive design on mobile
- [ ] Test all event cards display correctly
- [ ] Optimize images if any added

---

## Recommended: Vercel

**Easiest deployment process:**
1. Push your code to GitHub ✅ (Already done!)
2. Connect Vercel to your GitHub repo
3. Click Deploy
4. Done! 🎉

**Automatic Updates:**
- Every time you push to `main` branch
- Vercel automatically rebuilds and redeploys
- No manual steps needed!

---

## Custom Domain Setup (After Deployment)

If you want `heisenbyte.com` instead of `heisenbyte.vercel.app`:

1. Buy domain from Namecheap, GoDaddy, etc.
2. Add domain in Vercel/Netlify dashboard
3. Update DNS records (they'll provide instructions)
4. SSL certificate auto-generated (free)

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- GitHub Pages: https://pages.github.com
