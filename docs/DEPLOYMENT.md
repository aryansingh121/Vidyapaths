# Vidyapaths — Deployment Guide & Hosting Manual

> **Step-by-step deployment guide** covering production build generation, static edge hosting (Vercel, Netlify, Cloudflare Pages), custom domain setup, and pre-launch client verification checklists.

---

## 1. Production Build Pipeline

Vidyapaths compiles into a self-contained static distribution folder (`dist/`) that can be hosted on any modern static web server or CDN edge network.

### Building for Production
```bash
# 1. Install clean dependencies
npm ci

# 2. Run static analysis
npm run lint

# 3. Compile optimized production bundle
npm run build
```

- **Output Directory:** `dist/`
- **Output Artifacts:**
  - `dist/index.html` (Minified HTML root)
  - `dist/assets/*.js` (Tree-shaken, chunk-split ESM JavaScript bundles)
  - `dist/assets/*.css` (Purged atomic Tailwind CSS stylesheet)
  - `dist/robots.txt` & `dist/sitemap.xml` (Copied automatically from `public/`)
  - `dist/favicon.svg` & `dist/og-image.png` (Edge image assets)

---

## 2. Recommended Hosting Targets

### 2.1 Deploying to Vercel (Recommended)
Vercel offers zero-configuration deployment for Vite applications:

1. Push your repository to GitHub / GitLab / Bitbucket.
2. Sign in to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import the `Vidyapaths` repository.
4. Verify the build settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Configure SPA Routing Rewrites: Ensure a `vercel.json` exists in the repository root:
   ```json
   {
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```
6. Click **Deploy**. Vercel will build and assign an SSL-enabled `.vercel.app` URL.

---

### 2.2 Deploying to Netlify
1. Log in to [Netlify](https://www.netlify.com/) and select **"Add new site" > "Import an existing project"**.
2. Connect your GitHub repository.
3. Configure build parameters:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Configure SPA Redirects: Create a `public/_redirects` file containing:
   ```
   /*    /index.html   200
   ```
   *(During build, Vite copies files from `public/` directly into `dist/`).*
5. Click **Deploy Site**.

---

### 2.3 Deploying to Cloudflare Pages
1. Connect Cloudflare to your Git repository.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Under **Settings > Builds & Deployments > Single Page Application**, enable SPA mode or supply a `_redirects` file.

---

## 3. Custom Domain & DNS Setup

To link a custom domain (e.g. `vidyapaths.com`):

### DNS Records Table

| Type | Name / Host | Target / Value | TTL | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `@` (Root) | `76.76.21.21` (For Vercel) or `104.198.14.52` (For Netlify) | Automatic / 300 | Directs apex domain to host |
| **CNAME** | `www` | `cname.vercel-dns.com.` or `<site-name>.netlify.app.` | Automatic / 300 | Directs www subdomain to host |

- **SSL / TLS Certificate:** Both Vercel and Netlify provision free Let's Encrypt Wildcard SSL certificates automatically within 15 minutes of DNS propagation.

---

## 4. Pre-Flight Client Handover Checklist

Before launching to the public, verify this checklist:

- [ ] **Contact Token Verification:** Open `src/data/siteData.js` and replace placeholder values with the client's verified credentials:
  - `phone` and `phoneRaw` (Official helpline number).
  - `whatsappNumber` (Active WhatsApp Business number in international format).
  - `email` and `formSubmitEmail` (Verified reception inbox for student leads).
  - `address` and `hours` (Physical office address).
- [ ] **FormSubmit Activation Test:**
  1. Open the live site and submit a test inquiry.
  2. Check the client inbox for an email from FormSubmit titled *"Action Required: Activate FormSubmit"*.
  3. Click the activation link to authorize the form.
  4. Submit a second test enquiry and confirm delivery in the inbox.
- [ ] **WhatsApp Deep Link Verification:** Tap the floating WhatsApp button on mobile to ensure it launches WhatsApp with the pre-filled enquiry text.
- [ ] **Social Media Links:** Confirm that links to Instagram, LinkedIn, Facebook, and YouTube in `siteData.js` point to the client's live social channels.
- [ ] **Search Engine Submission:**
  1. Register the domain in [Google Search Console](https://search.google.com/search-console).
  2. Submit sitemap URL: `https://vidyapaths.com/sitemap.xml`.
  3. Verify that `robots.txt` is accessible at `https://vidyapaths.com/robots.txt`.

---

## 5. Rollback & Emergency Incident Protocol

If an issue occurs after deployment:
1. **Instant Rollback on Vercel/Netlify:** Navigate to the **Deployments** tab in the hosting dashboard, select the previous stable deployment, and click **"Promote to Production"**. Rollbacks execute instantaneously.
2. **Git Revert:**
   ```bash
   git revert HEAD
   git push origin master
   ```
