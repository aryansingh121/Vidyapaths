# Vidyapaths — Component Reference & API Documentation

> **Complete catalog of reusable UI components**, layout modules, modal dialogs, and form engines with props specifications, state behavior, and usage examples.

---

## 1. Component Architecture Index

```
src/components/
├── Button.jsx                 # Versatile button primitive with stylistic variants
├── Card.jsx                   # Container primitive with elevation and border tokens
├── CollegeComparisonModal.jsx # Dedicated dialog for free college comparison requests
├── ComparisonRequestForm.jsx  # Structured comparison intake form
├── EnquiryForm.jsx            # Dynamic multi-service lead capture form engine
├── EnquiryModal.jsx           # Global modal dialog container for lead capture
├── Footer.jsx                 # Site-wide responsive multi-column footer
├── Navbar.jsx                 # Sticky desktop header and mobile drawer navigation
├── ScrollToTop.jsx            # Route restoration and anchor scroll offset watcher
└── WhatsAppButton.jsx         # Persistent floating quick-chat action trigger
```

---

## 2. Layout & Global Shell Components

### 2.1 `Navbar.jsx`
- **Path:** `src/components/Navbar.jsx`
- **Purpose:** Primary application header offering persistent branding, desktop navigation links, phone contact badge, direct "Book Counselling" action, and mobile hamburger drawer.
- **Props:**
  | Prop Name | Type | Required | Default | Description |
  | :--- | :--- | :--- | :--- | :--- |
  | `onOpenEnquiry` | `Function` | No | `undefined` | Callback invoked when the user clicks the "Book Free Call" button. |
- **Internal State:**
  - `isScrolled` (`boolean`): Adds `backdrop-blur-md bg-white/95 shadow-sm` when window scroll exceeds 20px.
  - `isMobileMenuOpen` (`boolean`): Controls visibility of the mobile slide-out navigation drawer.
- **Example Usage:**
  ```jsx
  <Navbar onOpenEnquiry={() => setIsEnquiryModalOpen(true)} />
  ```

---

### 2.2 `Footer.jsx`
- **Path:** `src/components/Footer.jsx`
- **Purpose:** Informational footer rendering company summary, quick navigation routes, direct service links, contact tokens, and social media icons.
- **Props:** None (Consumes `siteConfig` directly from `src/data/siteData.js`).
- **Example Usage:**
  ```jsx
  <Footer />
  ```

---

### 2.3 `ScrollToTop.jsx`
- **Path:** `src/components/ScrollToTop.jsx`
- **Purpose:** Solves SPA scroll retention issues. Listens to `useLocation()` updates:
  1. On route changes without hash: Resets `window.scrollTo({ top: 0, left: 0, behavior: 'instant' })`.
  2. On route changes with hash (e.g. `#internship-process`): Locates element by ID and executes smooth scroll with `90px` offset to prevent the sticky navbar from obscuring section headings.
- **Props:** None.
- **Example Usage:**
  ```jsx
  // Inside App.jsx router wrapper
  <Router>
    <ScrollToTop />
    ...
  </Router>
  ```

---

### 2.4 `WhatsAppButton.jsx`
- **Path:** `src/components/WhatsAppButton.jsx`
- **Purpose:** Persistent floating action button in the bottom-right corner connecting visitors directly to Vidyapaths counsellors on WhatsApp.
- **Props:** None (Reads phone token and message from `siteConfig.whatsappNumber` and `siteConfig.whatsappMessage`).
- **Styling:** Circular `bg-[#25D366]` badge with pulsing hover ring and high-contrast SVG WhatsApp icon.
- **Example Usage:**
  ```jsx
  <WhatsAppButton />
  ```

---

## 3. UI Primitives

### 3.1 `Button.jsx`
- **Path:** `src/components/Button.jsx`
- **Purpose:** Universal interactive button primitive supporting standard styles, sizes, and icon adornments.
- **Props:**
  | Prop Name | Type | Required | Default | Description |
  | :--- | :--- | :--- | :--- | :--- |
  | `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | No | `'primary'` | Visual style preset. |
  | `size` | `'sm' \| 'md' \| 'lg'` | No | `'md'` | Padding and font scale preset. |
  | `children`| `ReactNode` | Yes | — | Button label and content. |
  | `icon` | `LucideIcon` | No | `null` | Optional icon rendered alongside label. |
  | `iconPosition` | `'left' \| 'right'` | No | `'right'` | Alignment of the icon. |
  | `className`| `string` | No | `''` | Supplemental Tailwind classes. |
  | `disabled`| `boolean` | No | `false` | Disabled state with opacity reduction. |
  | `onClick` | `Function` | No | `undefined` | Click event handler. |
- **Example Usage:**
  ```jsx
  <Button variant="primary" size="lg" icon={ArrowRight} onClick={handleOpenModal}>
    Get Free Counselling
  </Button>
  ```

---

### 3.2 `Card.jsx`
- **Path:** `src/components/Card.jsx`
- **Purpose:** Layout container establishing consistent surface elevation, rounded borders, and hover micro-interactions.
- **Props:**
  | Prop Name | Type | Required | Default | Description |
  | :--- | :--- | :--- | :--- | :--- |
  | `children`| `ReactNode` | Yes | — | Inner card content. |
  | `hover` | `boolean` | No | `true` | Enables `-translate-y-1` and shadow lift on hover. |
  | `className`| `string` | No | `''` | Custom styling overrides. |
- **Example Usage:**
  ```jsx
  <Card hover={true} className="p-6 border-slate-200">
    <h3 className="font-bold text-xl">B.Tech / B.E.</h3>
    <p className="text-slate-600 mt-2">Comprehensive engineering admissions.</p>
  </Card>
  ```

---

## 4. Modal Dialogs & Lead Forms

### 4.1 `EnquiryModal.jsx`
- **Path:** `src/components/EnquiryModal.jsx`
- **Purpose:** Global responsive dialog managing backdrop animation, modal dismissal, and wrapping `EnquiryForm`.
- **Props:**
  | Prop Name | Type | Required | Default | Description |
  | :--- | :--- | :--- | :--- | :--- |
  | `isOpen` | `boolean` | Yes | `false` | Controls modal visibility. |
  | `onClose` | `Function` | Yes | — | Callback invoked to close modal. |
  | `defaultService` | `string` | No | `'college-admissions'` | Active service schema ID. |
  | `prefilledData` | `Object` | No | `{}` | Contextual values passed into the form. |
- **Example Usage:**
  ```jsx
  <EnquiryModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    defaultService="study-abroad"
    prefilledData={{ country: 'United Kingdom' }}
  />
  ```

---

### 4.2 `EnquiryForm.jsx`
- **Path:** `src/components/EnquiryForm.jsx`
- **Purpose:** Dynamic multi-service form engine that loads field definitions from `src/data/serviceFormConfigs.js` and submits leads.
- **Props:**
  | Prop Name | Type | Required | Default | Description |
  | :--- | :--- | :--- | :--- | :--- |
  | `defaultService` | `string` | No | `'college-admissions'` | Initial service selection. |
  | `prefilledData` | `Object` | No | `{}` | Key-value pairs matching field IDs. |
  | `onSuccess` | `Function` | No | `undefined` | Callback invoked after successful dispatch. |
- **State Properties:**
  - `selectedService` (`string`): Selected service identifier.
  - `formData` (`Object`): Controlled input values keyed by field ID.
  - `errors` (`Object`): Validation errors for required or malformed fields.
  - `isSubmitting` (`boolean`): Disables buttons and displays loading spinner.
  - `isSubmitted` (`boolean`): Toggles success confirmation UI.
- **Validation Rules:**
  - Full Name: Minimum 2 characters.
  - Phone Number: 10-digit Indian standard regex (`^[6-9]\d{9}$` or standard length check).
  - Email: Valid RFC 5322 regex pattern when provided.
  - Required Service Fields: Validates selection against schema.

---

### 4.3 `CollegeComparisonModal.jsx`
- **Path:** `src/components/CollegeComparisonModal.jsx`
- **Purpose:** Dedicated modal dialog presenting the free college comparison request workflow.
- **Props:**
  | Prop Name | Type | Required | Default | Description |
  | :--- | :--- | :--- | :--- | :--- |
  | `isOpen` | `boolean` | Yes | `false` | Controls modal visibility. |
  | `onClose` | `Function` | Yes | — | Callback invoked to close modal. |
- **Example Usage:**
  ```jsx
  <CollegeComparisonModal
    isOpen={isCompareModalOpen}
    onClose={() => setIsCompareModalOpen(false)}
  />
  ```

---

### 4.4 `ComparisonRequestForm.jsx`
- **Path:** `src/components/ComparisonRequestForm.jsx`
- **Purpose:** Dedicated controlled form capturing student academic profile and comparison parameters.
- **Fields:**
  - Student Name (Required)
  - Phone Number (Required)
  - Email (Optional)
  - Current Academic Score (Required)
  - Current Qualification / Class (Required)
  - Preferred Course / Stream (Required)
  - Colleges You Want to Compare (Required textarea)
  - Factors to Compare (Multi-select checkboxes)
  - Additional Questions (Optional textarea)
- **Special Layout Refinement:** Contains no tuition budget field, with balanced vertical spacing across remaining controls.
