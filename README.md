# Vidyapaths

**Right Guidance. Brighter Future.**

Vidyapaths is a student-focused career and education consultancy website that helps students explore colleges, courses, career guidance, internships, and international education opportunities.

The project focuses on providing a professional online presence, clear service information, and a simple enquiry experience, with a foundation that can support future platform development.

## Project Overview

- **Project:** Vidyapaths
- **Category:** Career & Education Consultancy
- **Current Scope:** Public Website MVP
- **Design:** Minimal, modern, responsive, mobile-first
- **Primary Goal:** Generate student enquiries

## Technology Stack

- **Frontend:** React.js
- **Build Tool:** Vite
- **Styling:** Tailwind CSS and project-specific CSS
- **Routing:** React Router
- **Icons:** Lucide React
- **Forms:** React form components with FormSubmit email delivery integration
- **Deployment:** Vercel / Netlify

> The actual dependencies and integrations are confirmed in `package.json` and project configurations. A separate backend or database is not assumed to be part of the current MVP.

## Website Features

### Public Pages

- **Home** — Introduction, key services, benefits, and primary calls to action.
- **About** — Brand introduction and student-focused approach.
- **Services** — Overview of education and career support services.
- **Colleges** — College directory, program listings, category filters, and search.
- **Study Abroad** — International study destinations and country-specific enquiry entry points.
- **Internships** — Internship sectors, preparation guidance, and enquiry entry points.
- **Contact** — Contact information and enquiry options.

### Enquiry Experience

- Reusable enquiry modal with service-specific form configurations.
- College admission enquiry with college and course prefill.
- Study Abroad enquiry with country prefill.
- Internship enquiry with domain prefill.
- Career counselling and career roadmap consultation forms.
- College comparison request form.
- Client-side validation and submission feedback.
- Email delivery through configured form integration.
- WhatsApp contact CTA.

### User Experience

- Responsive desktop, tablet, and mobile layouts.
- Reusable UI components.
- Consistent navigation and footer.
- Smooth scrolling and section navigation.
- Muted form placeholders and clear input states.
- Basic SEO and accessibility considerations.

## Design System

| Element | Specification |
|---|---|
| Primary colour | Deep Navy `#0B1F3A` |
| Accent colour | Orange `#F97316` |
| Background | White `#FFFFFF` |
| Typography | Poppins / Inter |
| Visual style | Clean, modern, minimal |
| Layout | Mobile-first and responsive |
| Components | Reusable cards, buttons, forms, and modals |

The interface communicates trust, clarity, professionalism, growth, and opportunity.

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm
- Git

### Installation

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/aryansingh121/Vidyapaths.git
cd vidyapaths
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL provided by Vite in your browser (typically `http://localhost:5173`).

### Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Configuration

Before deployment, verify the following:

- Contact number and WhatsApp number in `src/data/siteData.js`.
- Enquiry recipient email and form submission configuration.
- Approved brand assets and favicon.
- Social media links.
- Page titles and meta descriptions.
- Legal pages (`/privacy-policy`, `/terms-of-service`) and client-approved content.
- Environment variables required by configured integrations.

> Never commit API keys, email credentials, tokens, or other secrets to the repository.

## Project Scope

The current MVP is a public-facing website focused on explaining services and collecting enquiries.

### Included in the MVP

- Public website pages.
- College and course information presented by the frontend.
- Study Abroad and internship information.
- Service-specific enquiry forms.
- Contextual prefilled fields across colleges, courses, countries, and domains.
- WhatsApp CTA.
- Responsive UI across desktop, tablet, and mobile.
- Basic SEO and accessibility.
- Production deployment and source-code handover.

### Excluded from the MVP

- Student authentication and accounts.
- Student or counsellor dashboards.
- Admin panel and content management system.
- Database-backed college or university management.
- Automated admission eligibility or cutoff prediction.
- Application status tracking.
- Internship application portal and company accounts.
- Document upload management.
- Payment gateway.
- OTP/SMS automation.
- Automated WhatsApp API.
- CRM integration.
- AI recommendations.
- Native mobile application.

Requests outside this scope require separate approval, pricing, and timeline estimates.

## Future Roadmap

Future development may introduce the following modules without requiring the entire public website to be redesigned.

| Phase | Planned capabilities |
|---|---|
| Phase 2 — Student Platform | Authentication, profiles, dashboards, college/course database, application tracking |
| Phase 3 — Admissions & Internships | University database, internship listings, applications, counsellor tools, appointment management |
| Phase 4 — Automation | Email notifications, WhatsApp integration, CRM, analytics |
| Phase 5 — Intelligence | College and course comparisons, AI recommendations, aptitude tests, scholarship finder |
| Phase 6 — Ecosystem | Mentor network, student community, placement assistance, recruiter tools, mobile app |

*These are planned features, not commitments or claims about existing functionality.*

## Quality Checklist

Before releasing changes, verify:

- Navigation and footer links work correctly.
- All buttons open the intended page, section, or form.
- College and course details populate the correct fields.
- Country and internship selections populate the appropriate forms.
- Required fields and validation work correctly.
- Form submissions reach the configured destination.
- No placeholder content or unverified claims are published.
- Layouts work at mobile, tablet, and desktop widths.
- No horizontal overflow or clipped modal content exists.
- Production build succeeds without errors.
- The deployed website is tested on mobile and desktop.

## Content and Accuracy

College names, course availability, admission criteria, fees, cutoffs, university partnerships, placements, and visa or employment claims must be verified before publication.

Do not publish fabricated testimonials, rankings, success statistics, partnerships, or guarantees.

The client is responsible for supplying approved business information, contact details, legal content, and appropriately licensed assets.

## Deployment and Handover

The final handover should include:

- Production website URL.
- Source code or repository access.
- Basic setup and deployment instructions.
- Required integration configuration.
- List of excluded features and potential future enhancements.

Domain, hosting, premium services, and third-party subscription charges are separate unless explicitly agreed.

---

**Vidyapaths — Right Guidance. Brighter Future.**
