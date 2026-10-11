/**
 * validation.js
 * Pure validation utility functions for client forms.
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_REGEX = /^[6-9]\d{9}$/;

export function validateEmail(email) {
  if (!email || !email.trim()) {
    return 'Email address is required';
  }
  if (!EMAIL_REGEX.test(email.trim())) {
    return 'Enter a valid email address (e.g. name@example.com)';
  }
  return null;
}

export function validateMobile(mobile) {
  if (!mobile || !mobile.trim()) {
    return 'Mobile number is required';
  }
  const clean = mobile.replace(/[^0-9]/g, '');
  if (!MOBILE_REGEX.test(clean)) {
    return 'Enter a valid 10-digit Indian mobile number';
  }
  return null;
}

export function validateRequired(value, fieldLabel = 'This field') {
  if (value === undefined || value === null) {
    return `${fieldLabel} is required`;
  }
  if (typeof value === 'string' && !value.trim()) {
    return `${fieldLabel} is required`;
  }
  if (Array.isArray(value) && value.length === 0) {
    return `Please select at least one ${fieldLabel.toLowerCase()}`;
  }
  return null;
}

/**
 * Validates full enquiry form payload.
 * Returns an errors dictionary `{ [fieldName]: errorMessage }`.
 */
export function validateEnquiryForm(sharedData, serviceValues, fieldsConfig = []) {
  const errors = {};

  // 1. Shared validations
  if (!sharedData.fullName?.trim()) {
    errors.fullName = 'Full Name is required';
  }

  const mobileErr = validateMobile(sharedData.mobileNumber);
  if (mobileErr) {
    errors.mobileNumber = mobileErr;
  }

  const emailErr = validateEmail(sharedData.email);
  if (emailErr) {
    errors.email = emailErr;
  }

  if (!sharedData.currentCity?.trim()) {
    errors.currentCity = 'Current City is required';
  }

  // 2. Service field validations
  if (Array.isArray(fieldsConfig)) {
    fieldsConfig.forEach(field => {
      if (field.required) {
        const val = serviceValues?.[field.name];
        const reqErr = validateRequired(val, field.label);
        if (reqErr) {
          errors[field.name] = field.errorMessage || reqErr;
        }
      }
    });
  }

  return errors;
}

export default {
  validateEmail,
  validateMobile,
  validateRequired,
  validateEnquiryForm
};
