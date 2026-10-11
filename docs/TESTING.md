# Vidyapaths — Quality Assurance, Testing & Verification

> **Comprehensive testing manual** detailing static linting, production build verification, automated browser test patterns, and step-by-step manual QA test matrices.

---

## 1. Testing Strategy Overview

The testing framework for Vidyapaths ensures stability, responsiveness, and zero-defect lead capture across all devices and browsers:

```mermaid
flowchart TD
    subgraph Layer 1 [Static Analysis]
        Lint["Oxlint (Fast AST Linter)"]
        Type["Syntax & Module Resolution"]
    end

    subgraph Layer 2 [Build Integrity]
        Build["Vite Production Build (Rollup Bundling)"]
        Chunks["Bundle Size & Asset Integrity"]
    end

    subgraph Layer 3 [Automated Verification]
        Puppeteer["Headless Puppeteer Browser Tests"]
        PrefillCheck["Prefill State & Form Flow Tests"]
    end

    subgraph Layer 4 [Manual QA Protocols]
        CrossDevice["Cross-Device Viewport Matrix"]
        LeadVerify["Lead Persistence & Dispatch Verification"]
    end

    Layer 1 --> Layer 2
    Layer 2 --> Layer 3
    Layer 3 --> Layer 4
```

---

## 2. Static Code Analysis (`oxlint`)

Vidyapaths utilizes **Oxlint** for ultra-fast static analysis and linting:

### Running the Linter
```bash
npm run lint
```

- **Scope:** Analyzes all `.js` and `.jsx` files in `src/`.
- **Criteria for Pass:** `0 errors, 0 warnings`.
- **Key Rules Enforced:**
  - `no-unused-vars`: Eliminates dead imports and orphaned variables.
  - `react-hooks/rules-of-hooks`: Guarantees hooks are called strictly at the top level of function components.
  - `react-hooks/exhaustive-deps`: Prevents stale closures in `useEffect` and `useCallback`.

---

## 3. Production Build Verification

Verify that the application compiles without rollup errors, broken imports, or missing styles:

### Executing the Production Build
```bash
npm run build
```

- **Expected Output:**
  ```
  vite v8.x.x building for production...
  transforming...
  ✓ built in ~450ms
  dist/index.html                   ... kB
  dist/assets/index-xxxx.css        ... kB
  dist/assets/index-xxxx.js         ... kB
  ```

### Local Production Preview
```bash
npm run preview
```
Spins up a lightweight local server serving the `dist/` production bundle to test performance and edge routing.

---

## 4. Automated Browser Testing (Puppeteer)

Automated headless browser scripts verify critical lead generation flows and interactive components:

### Automated Test Coverage
1. **Modal Opening & Dismissal:** Verifies that clicking modal triggers opens the dialog, mounts the backdrop, and closes cleanly via the `X` button or `Escape` key.
2. **Contextual Prefill Verification:** Validates that clicking "Get Guidance" on course cards, "Apply" on country cards, or "Get Admission Guidance" on college cards correctly sets the expected service and pre-populates the input fields.
3. **Form Validation Enforcement:** Verifies that submitting an empty form highlights invalid inputs with error text and prevents submission.
4. **Anchor Scrolling Offset:** Validates that clicking "Explore Process" navigates smoothly to `#internship-process` with proper 90px header clearance.

---

## 5. Manual QA Verification Matrices

### Matrix 1: Contextual Prefill Verification

| Test Case ID | Action / Trigger | Expected Modal State | Expected Prefilled Field Value |
| :--- | :--- | :--- | :--- |
| **TC-PF-01** | Click "Get Guidance" on B.Tech card (Home) | Service: `College Admission & Guidance` | Preferred Course: `B.Tech / B.E.` |
| **TC-PF-02** | Click "Get Guidance" on MBA card (Home) | Service: `College Admission & Guidance` | Preferred Course: `MBA / PGDM` |
| **TC-PF-03** | Click "Get Admission Guidance" on DTU (Colleges) | Service: `College Admission & Guidance` | Preferred College: `Delhi Technological University (DTU)` |
| **TC-PF-04** | Click "Apply" on UK country card (Study Abroad) | Service: `Study Abroad` | Preferred Country: `United Kingdom` |
| **TC-PF-05** | Click "Apply" on Germany country card (Study Abroad) | Service: `Study Abroad` | Preferred Country: `Germany` |
| **TC-PF-06** | Click "Apply" on Software Dev sector (Internships) | Service: `Internship Assistance` | Preferred Domain: `Software & Web Development` |

---

### Matrix 2: Form Validation & Submission

| Test Case ID | Test Scenario | Input Data | Expected Result |
| :--- | :--- | :--- | :--- |
| **TC-VAL-01**| Empty submission | All fields blank | Form blocked; "Full Name" and "Phone Number" display red error state. |
| **TC-VAL-02**| Invalid phone number | Phone: `12345` | Form blocked; error: "Please enter a valid 10-digit phone number". |
| **TC-VAL-03**| Invalid email | Email: `student@` | Form blocked; error: "Please enter a valid email address". |
| **TC-VAL-04**| Successful submission | Name: "Rohan", Phone: "9876543210" | Form displays success confirmation; lead serialized into `localStorage['vidyapaths_leads']`. |

---

### Matrix 3: College Comparison Request Form

| Test Case ID | Feature / Component | Validation Requirement | Verification Result |
| :--- | :--- | :--- | :--- |
| **TC-CMP-01**| Comparison Button Trigger | Clicking "Get Free College Comparison" opens dedicated comparison dialog. | PASS |
| **TC-CMP-02**| Form Header & Badge | Modal displays heading "Compare Colleges With Confidence" and "FREE GUIDANCE" badge. | PASS |
| **TC-CMP-03**| Tuition Budget Absence | Form contains **no** "Maximum Annual Tuition Budget" field. | PASS |
| **TC-CMP-04**| Layout & Alignment | Remaining form controls align evenly without visual gaps. | PASS |
| **TC-CMP-05**| Factors Checkbox Group | Multiple factors (Fees, Placements, Cutoffs) can be selected simultaneously. | PASS |

---

### Matrix 4: Responsive & Viewport Compatibility

| Device Profile | Viewport Width | Elements Tested | Expected Pass Criteria |
| :--- | :--- | :--- | :--- |
| **Mobile (iPhone SE / Galaxy S8)** | `375px` | Mobile Drawer, Hero CTAs, Modals | Full vertical scrolling, zero horizontal overflow, touch targets >= 44px. |
| **Large Mobile (iPhone 14 / Pixel 7)** | `414px` | College cards, comparison form | Cards wrap into single column, form inputs comfortably spaced. |
| **Tablet Portrait (iPad Mini)** | `768px` | Navbar, grid sections | 2-column card layouts, search filters stack neatly. |
| **Laptop / Desktop** | `1280px` | Header, multi-column footer | Full horizontal navigation, 3-column service and college grids. |
| **Ultra-Wide** | `1920px` | Global container bounds | Centered max-width container (`max-w-7xl`) with balanced gutters. |
