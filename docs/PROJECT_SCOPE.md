# Vidyapaths — Project Scope & Deliverables

> **Formal specification** of project boundaries, included deliverables, explicit out-of-scope items, constraints, and client handover requirements.

---

## 1. Project Overview & Commercial Context

- **Project Name:** Vidyapaths
- **Category:** Student Career & Higher Education Advisory
- **Scope Model:** Static Frontend Single Page Application (MVP)
- **Primary Business Goal:** Generate high-intent student leads for college admissions, career counselling, study abroad advisory, and corporate internships.
- **Delivery Framework:** Turnkey static codebase ready for automated deployment on zero-cost tiers (Vercel, Netlify, Cloudflare Pages, or GitHub Pages).

---

## 2. In-Scope Deliverables

The Vidyapaths codebase delivers the following production features and pages:

### 2.1 Public Pages & Navigation
1. **Homepage (`/`):**
   - Hero banner with primary value proposition and dual CTAs ("Book Free Counselling" & "Explore Colleges").
   - Trust indicators, core consultancy pillars, and key statistics counters.
   - Comprehensive Services Overview grid highlighting 6 service areas.
   - 4-step "How It Works" consultation journey.
   - Highlighted College Admission & Guidance section with course cards.
   - Study Abroad destination preview cards.
   - Internship & Industry Readiness highlight.
   - Why Choose Vidyapaths value comparison.
   - Student & Parent Testimonials showcase.
   - Final conversion banner with direct WhatsApp and booking buttons.
2. **About Us (`/about`):**
   - Mission statement, vision, and core educational philosophy.
   - Ethical advisory principles (transparency, student-first bias, non-commercial advice).
   - Our Approach: 4-stage mentoring framework.
   - Leadership & Advisory Board profile section.
3. **Services (`/services`):**
   - Full service catalog covering 8 specialized advisory offerings.
   - Detailed service descriptions, features breakdown, and individual "Get Guidance" triggers.
   - Comprehensive FAQs addressing admissions, cutoffs, study abroad, and internship assistance.
4. **Colleges Directory (`/colleges`):**
   - Searchable directory of 80+ leading institutions across Delhi NCR and India.
   - Stream category filtering (Engineering, Management, Commerce, Science, Arts/Humanities, Law, Medical/Paramedical, Design/Media).
   - Institution type filtering (Central, State, Private, Deemed).
   - Rich college cards with accreditation badges, location, key programs, cutoffs, and direct links to official university admission portals.
   - "Get Admission Guidance" contextual pre-fill button on college cards.
   - "Get Free College Comparison" banner triggering dedicated comparison modal.
5. **Study Abroad Hub (`/study-abroad`):**
   - Profiles for 9 premier overseas destinations: United Kingdom, United States, Canada, Australia, Germany, Ireland, New Zealand, United Arab Emirates, and Singapore.
   - Country profiles including top universities, popular programs, average tuition fees, living expenses, post-study work visa rights, and primary intakes.
   - End-to-end guidance roadmap (Counselling -> Test Prep -> Applications -> Visa -> Pre-departure).
   - Country card "Apply" CTAs with contextual pre-fill.
6. **Internships & Corporate Readiness (`/internships`, `/internships-admissions`):**
   - Comprehensive overview of corporate readiness mentoring.
   - 6 key internship sectors: Software & Web Development, Digital Marketing & Growth, Business & Sales Development, Finance & Data Analysis, Content & Media, Graphic & UI/UX Design.
   - Sector-specific "Apply" CTAs with prefilled domain field.
   - 4-stage preparation roadmap with smooth anchor scroll navigation (`#internship-process`).
7. **Contact (`/contact`):**
   - Dedicated direct consultation form with service selector.
   - Quick contact cards: Phone, WhatsApp, Email, Office Address, Operating Hours.
   - Office location information and Google Maps placeholder.
8. **Legal & Compliance Pages:**
   - Privacy Policy (`/privacy-policy`, `/privacy`).
   - Terms of Service (`/terms-of-service`, `/terms`).

### 2.2 Global Interactive Components
- **Responsive Sticky Header (`Navbar.jsx`):** Desktop navigation bar, logo, contact pills, and mobile slide-out drawer.
- **Global Footer (`Footer.jsx`):** Quick links, service links, contact details, social links, and copyright notices.
- **Scroll Restoration System (`ScrollToTop.jsx`):** Restores viewport to top on route transitions and handles smooth scrolling to anchor IDs with sticky header offset (90px).
- **Floating WhatsApp Trigger (`WhatsAppButton.jsx`):** Persistent mobile-friendly quick chat floating button.
- **Dynamic Lead Capture Modal (`EnquiryModal.jsx` & `EnquiryForm.jsx`):**
  - Multi-service selector supporting 8 distinct advisory areas.
  - Contextual pre-fill of courses, colleges, countries, and internship domains.
  - Dual delivery via FormSubmit AJAX endpoint and local browser cache backup (`localStorage['vidyapaths_leads']`).
- **Dedicated College Comparison Modal (`CollegeComparisonModal.jsx`):**
  - Captures student academic credentials, current class/qualification, preferred course, and colleges to compare.
  - Automatically identifies request as a College Comparison dossier.

---

## 3. Explicitly Out-of-Scope (Deferred to Future Releases)

To maintain clarity and prevent scope creep, the following capabilities are explicitly classified as out-of-scope for the MVP:

| Feature / Domain | Current Status | Future Roadmap Target |
| :--- | :--- | :--- |
| **User Accounts & Authentication** | Excluded | Phase 2 / Phase 3 (Supabase Auth / Clerk) |
| **Relational Database Backend** | Excluded | Phase 2 (PostgreSQL / Supabase) |
| **Real-time Live Comparison Engine** | Excluded (Manual dossier requested via dedicated form) | Phase 3 (Algorithmic cutoff comparison engine) |
| **Online Payment Gateway** | Excluded | Phase 3 (Razorpay / Stripe) |
| **Admin Dashboard / Lead CRM** | Excluded (Leads delivered via FormSubmit email & localStorage) | Phase 2 (Internal counsellor dashboard) |
| **Direct Application Portal** | Excluded (External official links provided) | Phase 4 (University API integrations) |
| **AI Counselling Chatbot** | Excluded (Human WhatsApp & phone handover) | Phase 3 (RAG-based education advisor) |
| **Dynamic CMS Backend** | Excluded (Managed via structured JSON/JS data files) | Phase 2 (Sanity or Strapi headless CMS) |

---

## 4. Technical Deliverables Inventory

| Category | File / Artifact Path | Description |
| :--- | :--- | :--- |
| **Source Code** | `src/` | Complete React 19 source code, hooks, components, pages, and data models. |
| **Static Assets** | `public/` | Favicon SVG, OpenGraph preview image, `robots.txt`, and XML sitemap. |
| **Build Configuration**| `vite.config.js`, `package.json` | Vite 8 + `@tailwindcss/vite` v4 build toolchain. |
| **Static Data Models**| `src/data/*.js` | Data catalogs for colleges (80+), countries (9), form configurations, and site tokens. |
| **Documentation** | `README.md` & `docs/*.md` | Comprehensive 15-document technical suite. |
| **Linter & Test Config** | `oxlint` configuration, test scripts | Oxlint integration and headless browser test runners. |

---

## 5. Constraints & Operational Assumptions

1. **Zero Recurring Infrastructure Cost:**
   - Built to run seamlessly on static hosting tiers (Vercel Hobby, Netlify Starter, GitHub Pages) without incurring database or compute bills.
2. **Client-Side Processing:**
   - All routing, search filtering, modal states, and form validations execute entirely inside the visitor's browser.
3. **Third-Party Email Relay:**
   - Form delivery utilizes FormSubmit's free endpoint. FormSubmit requires a one-time activation click upon first submission to the client's live email address.
4. **Client Token Handover:**
   - Contact numbers, WhatsApp numbers, and official enquiry email addresses are initialized with placeholder tokens and must be confirmed by the client prior to domain cutover.
