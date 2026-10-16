# Vidyapaths — Right Guidance. Brighter Future.

[![React](https://img.shields.io/badge/React-19.2.8-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.3.3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-7.18.4-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![Code Quality](https://img.shields.io/badge/Linter-Oxlint_1.81.0-F97316)](https://oxc.rs/)
[![License](https://img.shields.io/badge/License-Proprietary-0B1F3A)]()

> **Vidyapaths** is an ethical, student-first educational consultancy and career advisory platform. It empowers students, school leavers, undergraduates, and working professionals to make confident, well-informed academic and career decisions through verified institutional data, stream discovery, corporate internships, and international education pathways.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Verified Features](#verified-features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation and Local Development](#installation-and-local-development)
- [Environment Variables](#environment-variables)
- [College and Programme Dataset](#college-and-programme-dataset)
- [Forms and Lead Capture](#forms-and-lead-capture)
- [Design System and Responsiveness](#design-system-and-responsiveness)
- [Deployment Workflow](#deployment-workflow)
- [Current Limitations and Future Roadmap](#current-limitations-and-future-roadmap)
- [Contributing and Maintenance](#contributing-and-maintenance)
- [Technical Documentation Suite](#technical-documentation-suite)

---

## Project Overview

- **Platform Name:** Vidyapaths
- **Tagline:** *"Right Guidance. Brighter Future."*
- **Target Audience:** Class 10 & 12 students, undergraduate aspirants, postgraduate applicants, study abroad seekers, and early-career job seekers looking for structured, transparent guidance.
- **Core Mission:** Eliminate misinformation, quota confusion, and aggressive marketing bias in higher education by providing verified admission information, direct statutory portal links, curated academic pathways, and personalised 1-on-1 mentorship.

---

## Verified Features

The following capabilities are actively implemented and tested in the codebase:

### 1. Institution Discovery and Search
- **Location-Based College Filtering:** Filter institutions dynamically by State / Union Territory and City with responsive, keyboard-navigable dropdowns.
- **Category Tabs:** Group colleges by ecosystem: All, Delhi University (DU), Central Universities, State/Government, Private & Deemed, and Premier Tech/Management (IITs/NITs/IIMs).
- **Academic Stream & Level Filter:** Filter institutions by degree level (Undergraduate, Postgraduate, Diploma, Doctorate) and search by course name or specialisation keywords.
- **Expandable Programme Breakdown:** Every institution card features an interactive accordion toggle (*"Show Programs"* / *"Hide Programs"*) displaying degree titles, academic levels (UG/PG), and course specialisations.
- **Direct Official Portal Links:** Verified external links to institutional official websites (`officialWebsite`) and dedicated admission portals (`admissionsUrl`).
- **Contextual Admission Guidance:** Each college card includes a *"Get Admission Guidance"* action that opens the inquiry modal with the specific institution name prefilled.

### 2. Guidance & Mentorship Services
- **Higher Education Admissions:** Guidance across engineering, medicine, law, commerce, management, design, and humanities.
- **Study Abroad Advisory:** Dedicated international education directory covering 9 major destination countries (USA, UK, Canada, Australia, Germany, Ireland, New Zealand, Singapore, UAE) with visa rights, upcoming intakes, and cost insights.
- **Internship Assistance & Corporate Readiness:** Resume review, portfolio structuring, ATS formatting, and interview preparation tracks.
- **Career Roadmaps:** Structured guidance for high school stream selection and post-graduation career pivots.

### 3. Unified Forms & Lead Pipelines
- **Global "Get Free Counselling" Form:** Dedicated 4-field modal accessible site-wide from the navigation bar, hero sections, service cards, mobile drawer, promotional banners, and footer.
  - **Name:** Required text input ($\ge 2$ characters).
  - **Phone Number:** Required telephone input with strict Indian mobile validation ($10$ digits starting with $6\text{--}9$, supporting `+91`, `91`, and `0` prefixes).
  - **Email Address:** Required email input with RFC format validation.
  - **Current Qualification:** Required custom dropdown with 8 standardised options.
- **Custom Qualification Dropdown:** Implemented via [QualificationSelect.jsx](file:///c:/Users/aryan/OneDrive/Desktop/Vidyapaths/src/components/common/QualificationSelect.jsx) using React `createPortal` to `document.body`, eliminating clipping inside modal bounds. Features smart collision detection (opens upward when near the viewport bottom), full WAI-ARIA combobox accessibility, arrow key navigation, type-ahead search, and mobile zoom prevention ($\ge 16\text{px}$).
- **Service-Specific Enquiry Modal:** Contextual lead form for in-depth inquiries (prefilled with specific college names, study abroad countries, or internship domains).
- **Dual-Layer Transport Engine:** Submits leads to FormSubmit.co via asynchronous AJAX POST while simultaneously creating a timestamped, quota-safe backup in browser LocalStorage (`vidyapaths_leads`).
- **Floating WhatsApp CTA & Direct Calling:** Direct-dial phone triggers and pre-composed WhatsApp chat links configured with official contact numbers.

### 4. Robustness & Accessibility
- **React Error Boundary:** Protects route views against unexpected runtime exceptions with user-friendly recovery actions.
- **Responsive Layout:** Complete mobile-first responsive layout tested across desktop, tablet, and small mobile viewports ($375\text{px}$).
- **Zero Horizontal Overflow:** Enforced via `overflow-x: clip` and responsive grid systems.

---

## Technology Stack

| Category | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | [React](https://react.dev/) | `^19.2.8` | Component runtime and declarative UI rendering |
| **Build Tool & Bundler** | [Vite](https://vitejs.dev/) | `^8.3.0` | Ultra-fast HMR and optimized production bundling |
| **Styling & CSS** | [Tailwind CSS v4](https://tailwindcss.com/) | `^4.3.3` | Utility-first styling via `@tailwindcss/vite` |
| **Routing** | [React Router DOM](https://reactrouter.com/) | `^7.18.4` | Client-side SPA routing with history navigation |
| **Icons** | [Lucide React](https://lucide.dev/) | `^1.54.0` | Accessible SVG icon suite |
| **State Management** | React Context API | Built-in | Global enquiry and counselling modal lifecycle |
| **HTTP Transport** | Fetch API + [apiClient](file:///c:/Users/aryan/OneDrive/Desktop/Vidyapaths/src/services/apiClient.js) | Native | Resilient network requests with timeout and error wrapping |
| **Email Endpoint** | [FormSubmit.co](https://formsubmit.co/) | Public API | AJAX email forwarding without dedicated server infrastructure |
| **Local Storage** | [storageService](file:///c:/Users/aryan/OneDrive/Desktop/Vidyapaths/src/services/storageService.js) | Native | Quota-defensive offline lead persistence |
| **Static Analysis** | [Oxlint](https://oxc.rs/) | `^1.81.0` | High-speed Rust-based JavaScript and React linter |
| **End-to-End Testing** | [Puppeteer Core](https://pptr.dev/) | `^25.13.0` | Headless browser test automation |

---

## Project Structure

```
Vidyapaths/
├── .env.example                       # Environment variable template
├── .gitignore                         # Git exclusion rules (node_modules, dist, scratch)
├── index.html                         # SPA entrypoint with preconnects & SEO meta
├── package.json                       # Scripts, dependencies, and metadata
├── vite.config.js                     # Vite build configuration with Tailwind plugin
├── public/                            # Static edge assets (favicon, robots.txt, sitemap.xml)
├── docs/                              # Dedicated architectural and operations guides
│   ├── ARCHITECTURE.md                # System topology and component hierarchy
│   ├── BRAIN.md                       # Brand philosophy, positioning, and voice
│   ├── CHANGELOG.md                   # Version release notes and changes
│   ├── COMPONENTS.md                  # Component prop specifications and catalog
│   ├── DEPLOYMENT.md                  # Hosting guides (Vercel, Netlify, Cloudflare)
│   ├── DESIGN_SYSTEM.md               # Tokens, typography scale, and color palette
│   ├── FEATURES.md                    # Detailed capability breakdown
│   ├── FORMS_AND_INTEGRATIONS.md      # Lead pipeline, FormSubmit, and storage engine
│   ├── IMPLEMENTATION_PLAN.md         # Phased delivery roadmap
│   ├── MAINTENANCE.md                 # Operator guide for updating institutions & data
│   ├── PROJECT_SCOPE.md               # Formal scope boundaries and MVP requirements
│   ├── ROUTES.md                      # Route table, query parameters, and redirects
│   ├── SEO.md                         # Meta tags, OpenGraph, sitemap, and robots config
│   └── TESTING.md                     # QA checklists and static verification rules
└── src/
    ├── App.jsx                        # Root component with routing and modal mounting
    ├── index.css                      # Tailwind CSS v4 design tokens and base styles
    ├── main.jsx                       # DOM mount entrypoint
    ├── assets/                        # Static bundled assets (flags, hero artwork)
    ├── components/                    # Reusable UI components
    │   ├── CollegeCard.jsx            # Institution card with accordion program view
    │   ├── CollegeLocationFilter.jsx  # Location, stream, category, and level filters
    │   ├── CounsellingModal.jsx       # 4-field global Free Counselling dialog
    │   ├── CountryFlag.jsx            # SVG country flag renderer
    │   ├── EnquiryForm.jsx            # Dynamic service-specific multi-step form
    │   ├── EnquiryModal.jsx           # Service-specific inquiry dialog
    │   ├── FloatingWhatsApp.jsx       # Persistent WhatsApp floating action button
    │   ├── Footer.jsx                 # Site footer with brand info and quick links
    │   ├── Navbar.jsx                 # Responsive header with desktop/mobile CTAs
    │   ├── ScrollToTop.jsx            # Route-change scroll restoration
    │   ├── SectionHeading.jsx         # Section headers with badge and title
    │   ├── ServiceSelector.jsx        # Service picker for general inquiries
    │   ├── SocialIcons.jsx            # Social channel link icons
    │   └── common/                    # Primitive design system components
    │       ├── Button.jsx             # Accessible button with loading states
    │       ├── CustomSelect.jsx       # Searchable custom select primitive
    │       ├── ErrorBoundary.jsx      # React error boundary component
    │       ├── Input.jsx              # Form input with mobile zoom prevention
    │       ├── Modal.jsx              # Accessible modal wrapper
    │       ├── QualificationSelect.jsx# Portaled 8-option qualification dropdown
    │       └── Select.jsx             # Fallback select primitive
    ├── config/
    │   └── env.js                     # Validated runtime environment variables
    ├── context/
    │   ├── EnquiryContext.jsx         # Combined modal state and prefill provider
    │   └── enquiryContextCore.js      # Pure React context definition
    ├── data/                          # Headless data models
    │   ├── colleges.js                # 318 canonical college records with courses
    │   ├── countriesData.js           # 9 destination countries with work rights
    │   ├── coursesData.js             # Course catalog and stream disciplines
    │   ├── serviceFormConfigs.js      # Dynamic field definitions for 8 service tracks
    │   ├── servicesData.js            # Guidance services catalog
    │   └── siteData.js                # Business phone numbers, emails, and tokens
    ├── hooks/
    │   ├── useEnquiry.js              # Hook for triggering modals and prefills
    │   └── useEnquiryForm.js          # Hook managing form validation and field sync
    ├── pages/                         # Main page views
    │   ├── About.jsx                  # Mission, vision, and advisory philosophy
    │   ├── Colleges.jsx               # College directory with location filters
    │   ├── Contact.jsx                # Contact details, address, and inquiry form
    │   ├── Home.jsx                   # Primary landing page
    │   ├── Internships.jsx            # Corporate internship guidance and sectors
    │   ├── PrivacyPolicy.jsx          # Student data privacy declaration
    │   ├── Services.jsx               # Comprehensive services catalog
    │   ├── StudyAbroad.jsx            # International universities and intakes
    │   └── TermsOfService.jsx         # Advisory terms and legal notices
    ├── sections/                      # Landing page modular sections
    │   ├── Benefits.jsx               # Value proposition cards
    │   ├── CollegeAdmissionSection.jsx# Featured course cutoffs and admissions
    │   ├── FinalCTA.jsx               # High-conversion bottom banner
    │   ├── Hero.jsx                   # Primary header section with main CTAs
    │   ├── HowItWorks.jsx             # 3-step guidance methodology
    │   ├── InternshipSection.jsx      # Domain highlights and preparation steps
    │   ├── ServicesPreview.jsx        # Services grid preview
    │   ├── StudyAbroadSection.jsx     # International destinations summary
    │   ├── TestimonialsSection.jsx    # Student success case studies
    │   └── WhyVidyapaths.jsx          # Institutional credibility highlights
    ├── services/                      # Business logic and external communication
    │   ├── apiClient.js               # Resilient fetch client with error normalization
    │   ├── enquiryService.js          # Form validation, email formatting, and backup
    │   └── storageService.js          # Safe LocalStorage wrapper with quota defense
    └── utils/
        ├── formatting.js              # Phone normalisation and URL builders
        ├── logger.js                  # Environment-aware logging
        ├── serviceMapper.js           # Heuristic service and query resolver
        ├── usePageMeta.js             # Route title and OpenGraph metadata hook
        └── validation.js              # Regex validation for phone, email, and names
```

---

## Installation and Local Development

### Prerequisites
- **Node.js:** v18.0.0 or higher (LTS recommended)
- **npm:** v9.0.0 or higher (or pnpm / yarn)
- **Web Browser:** Google Chrome, Microsoft Edge, or Firefox

### 1. Clone and Install Dependencies
```bash
# Clone the repository
git clone https://github.com/aryansingh121/Vidyapaths.git
cd Vidyapaths

# Install dependencies
npm install
```

### 2. Configure Local Environment
Copy the sample environment file to create your local override:
```bash
cp .env.example .env.local
```
*(Windows PowerShell: `Copy-Item .env.example .env.local`)*

### 3. Start Development Server
```bash
npm run dev
```
The application will launch with Hot Module Replacement (HMR) at `http://localhost:5173`.

### 4. Code Quality & Linting
Run the fast Rust-based Oxlint linter to verify syntax and hook conventions:
```bash
npm run lint
```

### 5. Production Build & Preview
```bash
# Compile and optimize production bundle into dist/
npm run build

# Preview the compiled production build locally
npm run preview
```

---

## Environment Variables

All runtime environment variables are prefixed with `VITE_` in compliance with Vite's client-bundling conventions. Default fallback values are managed in [src/config/env.js](file:///c:/Users/aryan/OneDrive/Desktop/Vidyapaths/src/config/env.js).

| Variable Name | Required | Default / Fallback | Purpose |
| :--- | :---: | :--- | :--- |
| `VITE_APP_ENV` | Optional | `development` | Environment mode (`development`, `staging`, `production`) |
| `VITE_SITE_URL` | Optional | `https://vidyapaths.com` | Canonical site origin for SEO metadata and OpenGraph |
| `VITE_FORM_SUBMIT_EMAIL` | **Required in Prod** | `Vidyapaths@gmail.com` | Recipient inbox for inbound student inquiries |
| `VITE_CONTACT_PHONE` | Optional | `+91 8252332061` | Formatted contact phone number displayed across the UI |
| `VITE_CONTACT_PHONE_RAW` | Optional | `+918252332061` | Machine-readable phone number for `tel:` links |
| `VITE_WHATSAPP_NUMBER` | Optional | `918252332061` | International format phone number for WhatsApp direct links |
| `VITE_CONTACT_EMAIL` | Optional | `Vidyapaths@gmail.com` | Official contact email address displayed across the UI |
| `VITE_API_BASE_URL` | Optional | `https://formsubmit.co/ajax` | Endpoint for AJAX form lead dispatching |

> **Security Note:** Never commit secret tokens or credentials to version control. The client application runs entirely in the user's browser.

---

## College and Programme Dataset

### Storage and Structure
The institutional dataset is maintained in [src/data/colleges.js](file:///c:/Users/aryan/OneDrive/Desktop/Vidyapaths/src/data/colleges.js). It contains **318 canonical institutions** across India, covering Central Universities, State Universities, premier technical/management institutes (IITs/NITs), Delhi University colleges, and accredited private universities.

Each institution record adheres to the following schema:

```javascript
{
  id: "hindu-college",
  name: "Hindu College",
  aliases: ["Hindu College", "DU Hindu"],
  institutionType: "affiliated_college", // university | autonomous_institute | affiliated_college
  university: "University of Delhi",
  location: "North Campus, Delhi",
  state: "Delhi",
  city: "Delhi",
  campusLocation: "North Campus, Delhi",
  isDelhiNCR: true,
  region: "Delhi NCR",
  categories: ["du"],                 // du | central | state | private | iit-nit
  programAreas: "BA (Hons), BSc (Hons), BCom (Hons), humanities and sciences",
  officialWebsite: "https://www.du.ac.in/index.php?page=colleges-at-du",
  admissionsUrl: "https://admission.uod.ac.in/",
  programmesUrl: "https://www.du.ac.in/index.php?page=colleges-at-du",
  verificationStatus: "verified",       // verified | provisional | pending_review
  lastVerified: "2026-10-09",
  caveat: "Check current DU admission notice and prospectus for seat matrix and eligibility.",
  programs: [
    {
      name: "BA (Hons) Humanities",
      level: "UG",                     // UG | PG | Diploma | Doctorate
      description: "English, Hindi, History, Political Science, Philosophy, Economics"
    },
    {
      name: "BSc (Hons) Sciences",
      level: "UG",
      description: "Physics, Chemistry, Mathematics, Statistics, Botany, Zoology"
    }
  ]
}
```

### Maintaining Institution Records
1. **Adding an Institution:** Append a valid record to `collegesData` in [src/data/colleges.js](file:///c:/Users/aryan/OneDrive/Desktop/Vidyapaths/src/data/colleges.js) with a unique kebab-case `id`.
2. **Official Portal Integrity:** Always provide direct links to the institution's primary domain (`.ac.in`, `.edu.in`, `.org`, or official state `.gov.in` subdomains) and separate admission portals where applicable.
3. **Caveat Notice:** Include admission caveat guidelines regarding statutory entrance exams (CUET, JEE, NEET, CAT, state CETs) to advise students on current eligibility criteria.
4. **Missing or Provisional Data:** When official program breakdowns are pending institutional publication, records are marked with `verificationStatus: "provisional"` or `verificationStatus: "pending_review"` with an advisory note encouraging students to verify directly via the provided admissions URL.

---

## Forms and Lead Capture

### 1. Global "Get Free Counselling" Form
The global counselling dialog is rendered once at the application root via [CounsellingModal.jsx](file:///c:/Users/aryan/OneDrive/Desktop/Vidyapaths/src/components/CounsellingModal.jsx).

**The 4 Strict Fields:**
1. **Full Name:** Required text field. Validates for alphabet characters and minimum length ($\ge 2$).
2. **Phone Number:** Required telephone field. Validated via `validateIndianPhone()`:
   $$\text{Pattern: } \wedge[6\text{--}9]\backslash d^{9}\$$
   Automatically strips spaces, dashes, brackets, and `+91` / `0` prefixes.
3. **Email Address:** Required email field with standard format validation.
4. **Current Qualification:** Required custom selection menu rendered by [QualificationSelect.jsx](file:///c:/Users/aryan/OneDrive/Desktop/Vidyapaths/src/components/common/QualificationSelect.jsx). Options:
   - `Class 10`
   - `Class 12 / Higher Secondary`
   - `Diploma`
   - `Undergraduate — Pursuing`
   - `Undergraduate — Completed`
   - `Postgraduate — Pursuing`
   - `Postgraduate — Completed`
   - `Other`

### 2. Service-Specific Enquiry Modal
Rendered via [EnquiryModal.jsx](file:///c:/Users/aryan/OneDrive/Desktop/Vidyapaths/src/components/EnquiryModal.jsx). Dynamically loads customized fields defined in [serviceFormConfigs.js](file:///c:/Users/aryan/OneDrive/Desktop/Vidyapaths/src/data/serviceFormConfigs.js) based on the user's journey:
- **College Admissions:** Captures target degree, course, scores, and specific college prefill.
- **Study Abroad:** Captures target destination country, intake period, and English exam status.
- **Internships:** Captures domain interest (Technology, Marketing, Design, Finance) and portfolio links.

### 3. Submission Mechanics & Lead Pipeline
1. **Frontend Validation:** Inputs are validated on blur and on change if touched. Duplicate submissions are prevented by disabling the button and showing an animated spinner.
2. **Local Quota-Safe Backup:** The lead record is formatted and stored in LocalStorage under `vidyapaths_leads` via [storageService.js](file:///c:/Users/aryan/OneDrive/Desktop/Vidyapaths/src/services/storageService.js) to safeguard against unexpected network interruptions.
3. **AJAX Email Delivery:** Dispatches a structured payload to `https://formsubmit.co/ajax/{recipientEmail}`.
4. **First-Time FormSubmit Activation:** Upon the first inquiry sent to a new email address, FormSubmit delivers an activation email. Clicking *"Activate Form"* verifies the recipient inbox for subsequent automated forwarding.

---

## Design System and Responsiveness

Vidyapaths utilizes a modern, accessible design system defined via Tailwind CSS v4 design tokens in [src/index.css](file:///c:/Users/aryan/OneDrive/Desktop/Vidyapaths/src/index.css):

### Color Tokens
- **Navy Palette (Trust, Authority, Focus):**
  - Navy 950: `#061224` (Dark surfaces, high-contrast text)
  - Navy 900: `#0B1F3A` (Primary brand color, headers, navigation bars)
  - Navy 800: `#122B4E` (Card borders, secondary headers)
  - Navy 50: `#F0F4F9` (Light surface backgrounds)
- **Orange Palette (Optimism, Action, Energy):**
  - Orange 500: `#F97316` (Primary action buttons, focus rings, badges)
  - Orange 600: `#EA580C` (Button hover and active states)
  - Orange 50: `#FFF7ED` (Selected option backgrounds, highlight pills)
- **Status Accents:**
  - Success Emerald: `#10B981` (Verification badges, confirmation views)
  - Alert Rose: `#F43F5E` (Field error banners and validation alerts)

### Typography
- **Headings:** `Poppins`, system font stack (`--font-heading`)
- **Body & Controls:** `Inter`, system font stack (`--font-sans`)

### Mobile-First Conventions
- **Touch Heights:** Interactive buttons and dropdown items maintain a touch target of $\ge 44\text{--}48\text{px}$.
- **iOS Auto-Zoom Prevention:** All form inputs and trigger buttons specify font sizes $\ge 16\text{px}$ (`text-base sm:text-sm`).
- **Scroll Margin:** All section target IDs use `scroll-margin-top: 5.5rem` to prevent anchor links from hiding underneath the sticky header.
- **Reduced Motion:** Fully respects `prefers-reduced-motion: reduce` by disabling transitions and animations for users with motion sensitivities.

---

## Deployment Workflow

Vidyapaths is architected as a pure client-side Single Page Application (JAMstack) and can be hosted on any modern static edge platform (Vercel, Netlify, Cloudflare Pages, GitHub Pages).

### Build Command
```bash
npm run build
```
Generates production-ready static assets in the `dist/` directory.

### SPA Rewrite Configuration
Because client-side routing is handled by React Router DOM v7, the host server must rewrite all non-file route requests to `/index.html`:

- **Vercel (`vercel.json`):**
  ```json
  {
    "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
  }
  ```
- **Netlify (`public/_redirects`):**
  ```text
  /*    /index.html   200
  ```

---

## Current Limitations and Future Roadmap

### Current Architectural Boundaries
- **Headless Client Architecture:** Currently operates without a dedicated relational backend database. Leads are dispatched via FormSubmit.co and stored in client LocalStorage.
- **Manual Dataset Catalog:** Institutional cutoffs and course offerings are updated statically in `colleges.js`.

### Planned Future Enhancements
The following features are designed in the product roadmap and will be delivered in upcoming platform versions:
1. **Student Authentication & Profiles:** Secure login via email OTP or OAuth to save college shortlists and application drafts.
2. **Student Application Tracker:** Real-time milestone tracker for college admissions and foreign visa document filing.
3. **Head-to-Head College Comparison:** Side-by-side comparison matrix for comparing tuition, fees, placements, and hostel infrastructure.
4. **Corporate Recruiter Portal:** Dedicated portal for startup and enterprise partners to post student internship vacancies.
5. **Administrative CMS Dashboard:** Role-based admin portal for editing college records, uploading prospectus PDFs, and auditing student inquiries.
6. **Student Document Vault:** Encrypted cloud storage for Class 10/12 marksheets, entrance scorecards, and SOP drafts.
7. **Appointment Scheduler & Payment Gateway:** Real-time calendar booking for paid 1-on-1 career counselling sessions.
8. **CRM Integration:** Direct webhooks connecting lead forms to CRM platforms (HubSpot, LeadSquared, Zoho).

---

## Contributing and Maintenance

To maintain high code quality and prevent regressions:

1. **Verify Lints Before Committing:**
   ```bash
   npm run lint
   ```
2. **Verify Production Build:**
   ```bash
   npm run build
   ```
3. **Component Guidelines:**
   - Keep forms accessible with associated `<label>` tags and ARIA descriptors.
   - Use [QualificationSelect.jsx](file:///c:/Users/aryan/OneDrive/Desktop/Vidyapaths/src/components/common/QualificationSelect.jsx) or [CustomSelect.jsx](file:///c:/Users/aryan/OneDrive/Desktop/Vidyapaths/src/components/common/CustomSelect.jsx) when building customized dropdowns to preserve portaling and avoid clipping.
   - Maintain Indian phone validation patterns (`validateIndianPhone`) on all lead generation inputs.
4. **Dataset Changes:**
   - Maintain the data schema in [colleges.js](file:///c:/Users/aryan/OneDrive/Desktop/Vidyapaths/src/data/colleges.js).
   - Ensure external links include valid protocols (`https://`) and point to official institutional websites.

---

## Technical Documentation Suite

For comprehensive architectural specifications, consult the dedicated guides in the [`docs/`](./docs/) directory:

- **[docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)**: SPA application architecture, provider topology, and state lifecycle.
- **[docs/DESIGN_SYSTEM.md](./docs/DESIGN_SYSTEM.md)**: Color palette, typography scale, and responsive layout standards.
- **[docs/COMPONENTS.md](./docs/COMPONENTS.md)**: Reusable component inventory with props specifications.
- **[docs/FEATURES.md](./docs/FEATURES.md)**: Complete catalog of live versus planned platform features.
- **[docs/FORMS_AND_INTEGRATIONS.md](./docs/FORMS_AND_INTEGRATIONS.md)**: Deep dive into the FormSubmit transport engine and storage backups.
- **[docs/ROUTES.md](./docs/ROUTES.md)**: Route table, URL redirects, and static host rewrite configs.
- **[docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)**: Production deployment instructions for Vercel, Netlify, and custom domains.
- **[docs/MAINTENANCE.md](./docs/MAINTENANCE.md)**: Maintenance manual for updating data catalogs and debugging.
- **[docs/CHANGELOG.md](./docs/CHANGELOG.md)**: Version history and sprint release logs.

---

## License & Proprietary Rights

Copyright © 2026 Vidyapaths. All rights reserved.  
Commercial deployment and usage are subject to client agreement.
