# Notekit Website

Public website for Notekit Chrome Extension.

## Deployment to Vercel

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   cd notekit-website
   vercel
   ```

3. **Set Environment Variables** (if needed):
   - Go to Vercel dashboard → Project Settings → Environment Variables
   - Add `API_BASE_URL` if you want to override the default API URL

4. **Update API URLs:**
   - Update `activate.html` with your actual Vercel API URL
   - Update `pricing.html` with your Lemon Squeezy checkout URL

## Files Structure

```
notekit-website/
├── index.html          # Landing page
├── pricing.html        # Pricing page
├── activate.html       # License activation page
├── privacy.html        # Privacy policy
├── terms.html          # Terms of service
├── styles.css          # All styles (brand colors: #2d6ba8)
├── script.js           # JavaScript functionality
├── vercel.json         # Vercel configuration
├── assets/
│   └── logo.png        # Logo (icon128.png)
└── api/                # API endpoints (if deploying here)
    ├── verify-license.js
    ├── activate-license.js
    └── webhooks/
        └── lemonsqueezy.js
```

## Brand Colors

- Primary: `#2d6ba8`
- Primary Hover: `#2a6aa5`
- Success: `#2e7d32`
- Danger: `#c62828`

## Customization

Before deploying, update:
1. API URLs in `activate.html` (line with `your-vercel-domain.vercel.app`)
2. Lemon Squeezy checkout URL in `pricing.html` (line with `your-store.lemonsqueezy.com`)
3. Contact email (replace `support@notekit.app` with your email)

## Features

- ✅ Responsive design
- ✅ Mobile-friendly navigation
- ✅ Brand colors throughout
- ✅ SEO-friendly
- ✅ License activation integration
- ✅ Privacy-first messaging

