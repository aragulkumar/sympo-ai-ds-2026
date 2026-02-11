# GitHub Setup Instructions

## Quick Setup

1. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Repository name: `heisenbyte-website`
   - Description: "Breaking Bad themed symposium website with React + Vite"
   - Keep it Public or Private (your choice)
   - **DO NOT** initialize with README (we already have one)
   - Click "Create repository"

2. **Connect your local repository to GitHub:**

```bash
cd c:\Users\Ragul\Desktop\sympo-ai-ds-2026\heisenbyte-website

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/heisenbyte-website.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

3. **Verify the push:**
   - Visit your repository on GitHub
   - You should see all files including README.md

## Alternative: Using GitHub CLI

If you have GitHub CLI installed:

```bash
gh repo create heisenbyte-website --public --source=. --remote=origin --push
```

## Next Steps After Pushing

### Deploy to Vercel (Recommended)

1. Go to https://vercel.com
2. Click "Import Project"
3. Select your GitHub repository
4. Vercel will auto-detect Vite
5. Click "Deploy"
6. Your site will be live in ~1 minute!

### Deploy to Netlify

1. Go to https://app.netlify.com
2. Drag and drop the `dist/` folder (after running `npm run build`)
3. Or connect your GitHub repository for automatic deployments

### Enable GitHub Pages

```bash
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "npm run build && gh-pages -d dist"

npm run deploy
```

Then enable GitHub Pages in repository settings → Pages → Source: gh-pages branch

## Current Git Status

✅ Repository initialized
✅ Initial commit completed
✅ README added and committed
✅ Ready to push to GitHub

## Commits Made

1. `c33ac25` - Initial commit: Heisenbyte Breaking Bad themed website with React + Vite
2. `efa155c` - docs: Add comprehensive README with setup and deployment instructions
