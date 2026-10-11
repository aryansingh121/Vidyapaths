# Vidyapaths — Changelog & Release History

> All notable changes, architectural milestones, feature additions, and bug fixes for the Vidyapaths platform are documented in this file.
> The project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [v1.5.0] — 2026-10-11
### Added
- **Production Documentation Suite:** Authoring of the complete technical documentation suite in `docs/`:
  - `docs/BRAIN.md`: Project philosophy, brand strategy, design rationale, and constraints.
  - `docs/PROJECT_SCOPE.md`: Formal scope definition, deliverables, and boundary rules.
  - `docs/IMPLEMENTATION_PLAN.md`: Chronological implementation history and future milestones.
  - `docs/ARCHITECTURE.md`: SPA system architecture, state flow, and component hierarchy.
  - `docs/DESIGN_SYSTEM.md`: Color tokens, typographic scale, component primitives, and WCAG rules.
  - `docs/FEATURES.md`: In-depth feature catalog distinguishing live vs. planned capabilities.
  - `docs/COMPONENTS.md`: Complete reusable component reference with prop specifications.
  - `docs/ROUTES.md`: Route mapping, aliases, and static hosting rewrite configurations.
  - `docs/FORMS_AND_INTEGRATIONS.md`: Lead capture engine, FormSubmit, localStorage, and WhatsApp setup.
  - `docs/SEO.md`: Dynamic route meta tags, OpenGraph protocol, XML sitemap, and robots.txt.
  - `docs/TESTING.md`: Static analysis, build verification, and manual QA test matrices.
  - `docs/DEPLOYMENT.md`: Vercel, Netlify, and custom DNS deployment manuals.
  - `docs/MAINTENANCE.md`: Operations manual for updating data catalogs and debugging.
  - `docs/CHANGELOG.md`: Full version history and release log.
- **Root README Modernization:** Overhauled root `README.md` to provide a concise overview linking directly to all technical documentation.

---

## [v1.4.1] — 2026-10-10
### Added
- **College Directory Contextual Prefill:** Connected "Get Admission Guidance" on individual college cards in `/colleges` to automatically pre-populate the `preferredCollege` input with the exact college name while leaving `preferredCourse` open.
- **Program-Level Direct Enquiry:** Connected individual course tags within college cards to pre-populate both the college name and the specific program title in the enquiry modal.

---

## [v1.4.0] — 2026-10-10
### Added
- **Smooth Anchor Navigation Offset:** Enhanced `ScrollToTop.jsx` with an automatic 90px vertical offset calculation for hash links (e.g. `#internship-process`), preventing fixed headers from covering section headings.
- **Dynamic SEO Hook:** Introduced `usePageMeta.js` hook synchronizing `document.title` and `<meta name="description">` across all route transitions.

---

## [v1.3.1] — 2026-10-10
### Changed
- **College Comparison Form Refactoring:** Completely removed the "Maximum Annual Tuition Budget" field from `ComparisonRequestForm.jsx` and associated state payloads to reduce user friction.
- **Form Layout Optimization:** Balanced vertical grid spacing and typography across remaining comparison controls without visual gaps.

---

## [v1.3.0] — 2026-10-10
### Added
- **Dedicated College Comparison Request System:** Implemented `CollegeComparisonModal.jsx` and `ComparisonRequestForm.jsx` triggered by the "Get Free College Comparison" banner on `/colleges`.
- **Structured Comparison Dossier Schema:** Captures student name, phone, academic percentage/CGPA, current qualification, preferred course, institutions to compare, and comparison evaluation criteria.

---

## [v1.2.1] — 2026-10-09
### Added
- **Internship Sector Dynamic Prefill:** Connected "Apply" buttons across all 6 sector cards in `/internships` to pre-select the `internship-assistance` service and populate the `internshipDomain` field with the specific sector.

---

## [v1.2.0] — 2026-10-09
### Fixed
- **Study Abroad Routing Bug:** Corrected an issue where country card "Apply" buttons in `/study-abroad` opened the Career Counselling form; updated handlers to open the dedicated `study-abroad` schema with the clicked destination pre-filled.

---

## [v1.1.0] — 2026-10-09
### Added
- **Course Card Contextual Prefill:** Enabled "Get Guidance" buttons across Undergraduate, Postgraduate, and Specialized course cards on `/` and `/services` to open the modal with `College Admission & Guidance` preselected and the course title pre-filled.

---

## [v1.0.0] — 2026-10-08
### Initial Production Release
- **Core Platform Scaffolding:** React 19 SPA built with Vite 8 and Tailwind CSS v4.
- **Directory Data:** Curated 80+ institutions in Delhi NCR (`colleges.js`) and 9 overseas destinations (`countriesData.js`).
- **Core Public Pages:** Homepage, About Us, Services, Colleges Directory, Study Abroad Hub, Internships Hub, Contact Us, Privacy Policy, Terms of Service.
- **Lead Capture Engine:** Dynamic multi-service modal supporting 8 advisory tracks with FormSubmit AJAX dispatch and `localStorage['vidyapaths_leads']` backup caching.
- **Global UI Shell:** Sticky navbar with mobile navigation drawer, multi-column footer, and persistent floating WhatsApp quick-action button.
