# Vidyapaths — Right Guidance. Brighter Future.

[![React](https://img.shields.io/badge/React-19.2.8-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3.0-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.3.3-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)]()

> **Vidyapaths** is a student-first career and higher education consultancy platform. It helps students navigate college admissions, career counselling, corporate internships, and international study through transparent, ethical, and structured guidance.

---

## 📚 Technical Documentation Suite

The project is thoroughly documented across specialized technical manuals in the [`docs/`](./docs/) directory:

| Document | Description |
| :--- | :--- |
| **[docs/BRAIN.md](./docs/BRAIN.md)** | Core project philosophy, brand strategy, design rationale, and constraints. |
| **[docs/PROJECT_SCOPE.md](./docs/PROJECT_SCOPE.md)** | Formal MVP scope, deliverables inventory, and explicit out-of-scope boundaries. |
| **[docs/IMPLEMENTATION_PLAN.md](./docs/IMPLEMENTATION_PLAN.md)** | Chronological delivery phases, sprint refactors, and the future roadmap. |
| **[docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)** | SPA system architecture, component tree, and dynamic prefill pipeline. |
| **[docs/DESIGN_SYSTEM.md](./docs/DESIGN_SYSTEM.md)** | Color tokens, typography scale, component primitives, and accessibility standards. |
| **[docs/FEATURES.md](./docs/FEATURES.md)** | Complete feature catalog covering live vs. planned platform capabilities. |
| **[docs/COMPONENTS.md](./docs/COMPONENTS.md)** | Reusable UI component catalog with props specifications and usage snippets. |
| **[docs/ROUTES.md](./docs/ROUTES.md)** | Route table, URL aliases, hash anchors, and static host rewrite configs. |
| **[docs/FORMS_AND_INTEGRATIONS.md](./docs/FORMS_AND_INTEGRATIONS.md)** | Dynamic form engine, FormSubmit, localStorage backup, and WhatsApp integration. |
| **[docs/SEO.md](./docs/SEO.md)** | Dynamic page metadata, OpenGraph tags, XML sitemap, and robots.txt. |
| **[docs/TESTING.md](./docs/TESTING.md)** | Static analysis (`oxlint`), build checks, and manual QA test matrices. |
| **[docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)** | Deployment guides for Vercel, Netlify, custom DNS setup, and pre-flight checklist. |
| **[docs/MAINTENANCE.md](./docs/MAINTENANCE.md)** | Operations manual for updating data catalogs, contact tokens, and debugging. |
| **[docs/CHANGELOG.md](./docs/CHANGELOG.md)** | Complete version history and release notes from v1.0.0 to v2.0.0. |

---

## ⚡ Technology Stack

- **Frontend Runtime:** [React 19](https://react.dev/) (`19.2.8`)
- **Build Engine & HMR:** [Vite 8](https://vitejs.dev/) (`^8.3.0`)
- **Styling & Theme:** [Tailwind CSS v4](https://tailwindcss.com/) (`^4.3.3`) via `@tailwindcss/vite`
- **Client-Side Routing:** [React Router DOM v7](https://reactrouter.com/) (`^7.18.4`)
- **State Management:** React Context API + Custom Hooks (`EnquiryContext`, `useEnquiry`, `useEnquiryForm`)
- **API & Lead Transport:** Unified `apiClient` + `enquiryService` (FormSubmit.co + `SafeStorage` offline backup)
- **Error Handling:** React `ErrorBoundary` + graceful validation error states
- **Iconography:** [Lucide React](https://lucide.dev/) (`^1.54.0`)
- **Linter & Code Quality:** [Oxlint](https://oxc.rs/) (`^1.81.0`)

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js:** v18.0.0 or higher
- **Package Manager:** npm (v9+) or pnpm

### 1. Environment Setup
```bash
# Clone the repository
git clone https://github.com/aryansingh121/Vidyapaths.git
cd Vidyapaths

# Copy environment template
cp .env.example .env.local

# Install dependencies
npm install
```

### 2. Development Server
```bash
npm run dev
```
Launches the Vite local development server at `http://localhost:5173`.

### 3. Static Analysis & Linting
```bash
npm run lint
```
Executes `oxlint` across all source files to verify syntax and hook conventions (0 warnings, 0 errors).

### 4. Production Build
```bash
npm run build
```
Compiles and tree-shakes the application into the static `dist/` directory.

### 5. Local Production Preview
```bash
npm run preview
```
Runs a local preview of the production bundle on `http://localhost:4173`.

---

## 🏛️ Scalable Directory Structure

```
Vidyapaths/
├── .env.example            # Environment variables template
├── public/                 # Static edge files (favicon.svg, robots.txt, sitemap.xml)
├── src/
│   ├── config/             # Centralized environment configuration
│   │   └── env.js          # Validated runtime environment values with fallbacks
│   ├── context/            # Global application state management
│   │   ├── enquiryContextCore.js # Pure React context definition
│   │   └── EnquiryContext.jsx    # Modal lifecycle and active service provider
│   ├── services/           # Scalable API and storage services
│   │   ├── apiClient.js    # Resilient HTTP client with timeouts and error wrapping
│   │   ├── enquiryService.js # Lead submission, email formatting, offline backup
│   │   └── storageService.js # Safe LocalStorage abstraction with quota defense
│   ├── hooks/              # Custom business logic hooks
│   │   ├── useEnquiry.js   # Ergonomic hook for EnquiryContext
│   │   └── useEnquiryForm.js # Form validation, field sync, submission lifecycle
│   ├── utils/              # Pure utilities and business helpers
│   │   ├── formatting.js   # Phone cleaner, WhatsApp link generator, mailto builders
│   │   ├── logger.js       # Environment-aware logging utility
│   │   ├── serviceMapper.js# Trigger and query parameter heuristic resolver
│   │   ├── usePageMeta.js  # Dynamic route title and meta description hook
│   │   └── validation.js   # Pure form validators (email, mobile, required)
│   ├── components/         # UI Components
│   │   ├── common/         # Modular reusable primitives
│   │   │   ├── Button.jsx  # Accessible button with variants and loading state
│   │   │   ├── ErrorBoundary.jsx # Production runtime error boundary
│   │   │   ├── Input.jsx   # Input field with mobile zoom protection
│   │   │   ├── Modal.jsx   # Accessible modal with body scroll lock
│   │   │   └── Select.jsx  # Styled select with chevron and error states
│   │   ├── CountryFlag.jsx
│   │   ├── EnquiryForm.jsx
│   │   ├── EnquiryModal.jsx
│   │   ├── FloatingWhatsApp.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── ScrollToTop.jsx
│   │   ├── SectionHeading.jsx
│   │   ├── ServiceSelector.jsx
│   │   └── SocialIcons.jsx
│   ├── data/               # Static headless data models
│   │   ├── colleges.js          # 80+ institutions with cutoffs & official links
│   │   ├── countriesData.js     # 9 destination countries with cost/visa criteria
│   │   ├── coursesData.js       # Academic courses and specialization streams
│   │   ├── serviceFormConfigs.js# Dynamic field schemas for 8 service tracks
│   │   ├── servicesData.js      # Core services catalog
│   │   └── siteData.js          # Centralized business tokens & contact coordinates
│   ├── pages/              # Primary route views (Home, About, Services, Colleges, etc.)
│   ├── sections/           # Section modules for landing pages
│   ├── App.jsx             # React Router topology and global provider mounting
│   ├── index.css           # Tailwind CSS v4 entry
│   └── main.jsx            # DOM entry point
├── docs/                   # Complete technical documentation suite
├── index.html              # HTML entry point with preconnects and OpenGraph tags
├── package.json            # Scripts, dependencies, and project metadata
└── vite.config.js          # Vite configuration with Tailwind CSS plugin
```

---

## 📋 Pre-Launch Handover Checklist

Prior to launching to production:
1. **Contact Tokens:** Update production phone numbers, WhatsApp lines, and official email addresses in `.env.local` or [`src/data/siteData.js`](file:///c:/Users/aryan/OneDrive/Desktop/Vidyapaths/src/data/siteData.js).
2. **FormSubmit Activation:** Submit a test lead on the live URL and click the one-time activation link sent to the recipient inbox (`Vidyapaths@gmail.com`).
3. **DNS Records:** Point domain A records and CNAME records to Vercel/Netlify as described in [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md).
4. **Google Search Console:** Submit `https://vidyapaths.com/sitemap.xml` for indexation.

---

## 📄 License & Proprietary Rights

Copyright © 2026 Vidyapaths. All rights reserved. Commercial use and deployment are governed by client agreement.
