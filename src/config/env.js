/**
 * env.js
 * Centralized, validated environment configuration with fallback defaults.
 * Decouples runtime application code from direct `import.meta.env` access.
 */

const getEnv = (key, defaultValue = '') => {
  return import.meta.env?.[key] || defaultValue;
};

export const env = Object.freeze({
  /** Application environment: 'development', 'staging', or 'production' */
  NODE_ENV: getEnv('MODE', 'development'),
  IS_DEV: import.meta.env?.DEV ?? true,
  IS_PROD: import.meta.env?.PROD ?? false,

  /** Canonical website URL */
  SITE_URL: getEnv('VITE_SITE_URL', 'https://vidyapaths.com'),

  /** Email destination for FormSubmit enquiries */
  FORM_SUBMIT_EMAIL: getEnv('VITE_FORM_SUBMIT_EMAIL', 'Vidyapaths@gmail.com'),

  /** Official Contact Phone Details */
  CONTACT_PHONE: getEnv('VITE_CONTACT_PHONE', '+91 8252332061'),
  CONTACT_PHONE_RAW: getEnv('VITE_CONTACT_PHONE_RAW', '+918252332061'),

  /** Official WhatsApp Contact Details */
  WHATSAPP_NUMBER: getEnv('VITE_WHATSAPP_NUMBER', '918252332061'),

  /** Official Contact Email Address */
  CONTACT_EMAIL: getEnv('VITE_CONTACT_EMAIL', 'Vidyapaths@gmail.com'),

  /** API Base URL */
  API_BASE_URL: getEnv('VITE_API_BASE_URL', 'https://formsubmit.co/ajax')
});

export default env;
