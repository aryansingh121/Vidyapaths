/**
 * enquiryService.js
 * Business logic for student lead capture, email forwarding via FormSubmit,
 * and offline/local backup synchronization.
 */
import { apiClient } from './apiClient.js';
import { safeLocalStorage } from './storageService.js';
import { siteConfig } from '../data/siteData.js';

const LEADS_STORAGE_KEY = 'vidyapaths_leads';

/**
 * Standardized email subject templates for inbound leads.
 */
export const SERVICE_SUBJECT_MAP = Object.freeze({
  'college-admissions': 'New College Admission Enquiry — Vidyapaths',
  'career-counselling': 'New Career Counselling Enquiry — Vidyapaths',
  'career-roadmap': 'New Career Roadmap Consultation — Vidyapaths',
  'internship-assistance': 'New Internship Enquiry — Vidyapaths',
  'study-abroad': 'New Study Abroad Enquiry — Vidyapaths',
  'college-comparison': 'New College Comparison Request — Vidyapaths',
  'resume-interview': 'New Resume & Interview Support Enquiry — Vidyapaths',
  'scholarships-loans': 'New Scholarship & Education Loan Enquiry — Vidyapaths'
});

/**
 * Persists lead submission to local storage with safe quota handling.
 * @param {Object} leadRecord 
 */
export function backupLeadLocally(leadRecord) {
  try {
    const storedLeads = safeLocalStorage.getItem(LEADS_STORAGE_KEY, []);
    storedLeads.push(leadRecord);
    safeLocalStorage.setItem(LEADS_STORAGE_KEY, storedLeads);
    return true;
  } catch (err) {
    console.warn('[enquiryService] Failed to record lead locally:', err);
    return false;
  }
}

/**
 * Retrieves all locally backed-up student leads.
 * @returns {Array} List of lead records
 */
export function getStoredLeads() {
  return safeLocalStorage.getItem(LEADS_STORAGE_KEY, []);
}

/**
 * Dispatches form data via direct url-encoded FormSubmit transport as fallback.
 */
async function dispatchDirectFormSubmit(emailBody, recipientEmail) {
  const formSubmitUrl = `https://formsubmit.co/${encodeURIComponent(recipientEmail)}`;
  const formPayload = new URLSearchParams();
  for (const [key, value] of Object.entries(emailBody)) {
    if (value !== undefined && value !== null) {
      formPayload.append(key, String(value));
    }
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(formSubmitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formPayload.toString(),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      return { success: true };
    }
    return {
      success: false,
      error: `Form delivery service returned status ${response.status}.`
    };
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      return {
        success: false,
        error: 'The request took too long to complete. Please try again or reach out on WhatsApp.'
      };
    }
    return {
      success: false,
      error: err.message || 'Unable to connect to submission service.'
    };
  }
}

/**
 * Dispatches the enquiry payload to the configured email service endpoint.
 * 
 * @param {Object} params
 * @param {string} params.serviceId - Selected service ID
 * @param {Object} params.serviceConfig - Service metadata configuration
 * @param {Object} params.sharedData - Shared student contact details (fullName, mobile, email, city)
 * @param {Object} params.currentValues - Specific form field answers for this service
 * @param {string} [params.source='Lead Form'] - Source page or trigger button
 * @returns {Promise<{ success: boolean, message: string, error?: string }>}
 */
export async function submitEnquiry({
  serviceId,
  serviceConfig,
  sharedData,
  currentValues,
  source = 'Lead Form'
}) {
  const timestamp = new Date().toISOString();
  const indianDate = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  // 1. Create offline lead record
  const leadRecord = {
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    serviceId,
    serviceName: serviceConfig?.displayName || serviceId,
    ...sharedData,
    ...currentValues,
    source,
    createdAt: timestamp
  };

  backupLeadLocally(leadRecord);

  // 2. Format human-readable subject line
  const emailSubject = SERVICE_SUBJECT_MAP[serviceId] ||
    (serviceConfig?.emailSubject || `New ${serviceConfig?.displayName || 'Service'} Enquiry — Vidyapaths`);

  // 3. Assemble FormSubmit payload with strictly relevant service fields
  const emailBody = {
    _subject: emailSubject,
    _template: 'table',
    _captcha: 'false',
    _replyto: sharedData.email.trim(),
    'Enquiry Type': serviceConfig?.displayName || serviceId,
    'Service ID': serviceId,
    'Student Name': sharedData.fullName.trim(),
    'Mobile Number': sharedData.mobileNumber.trim(),
    'Email Address': sharedData.email.trim(),
    'Current City': sharedData.currentCity.trim(),
    'Source Page / Trigger': source,
    'Submission Date': indianDate
  };

  // Add field data strictly configured for the active service
  if (serviceConfig?.fields && Array.isArray(serviceConfig.fields)) {
    serviceConfig.fields.forEach(field => {
      const rawVal = currentValues[field.name];
      if (rawVal !== undefined && rawVal !== null && rawVal !== '') {
        const formattedVal = Array.isArray(rawVal) ? rawVal.join(', ') : String(rawVal).trim();
        if (formattedVal) {
          emailBody[field.label] = formattedVal;
        }
      }
    });
  }

  // 4. Primary: Dispatch via same-origin /api/enquiry endpoint
  const primaryResult = await apiClient.post('/api/enquiry', emailBody);

  if (primaryResult.success) {
    return {
      success: true,
      message: 'Thank you! Your enquiry has been submitted successfully. Our team will get in touch with you shortly.'
    };
  }

  if (primaryResult.status === 400 || primaryResult.status === 429) {
    return {
      success: false,
      error: primaryResult.error
    };
  }

  // 5. Fallback: Direct URL-encoded dispatch to FormSubmit
  const recipientEmail = (siteConfig.formSubmitEmail || siteConfig.email || 'Vidyapaths@gmail.com').trim();
  const fallbackResult = await dispatchDirectFormSubmit(emailBody, recipientEmail);

  if (fallbackResult.success) {
    return {
      success: true,
      message: 'Thank you! Your enquiry has been submitted successfully. Our team will get in touch with you shortly.'
    };
  }

  return {
    success: false,
    error: primaryResult.error || fallbackResult.error || 'Submission failed. Please connect with us directly on WhatsApp (+91 8252332061).'
  };
}

/**
 * Permitted qualifications for the 4-field Free Counselling form.
 */
export const COUNSELLING_QUALIFICATIONS = Object.freeze([
  'Class 10',
  'Class 12 / Higher Secondary',
  'Diploma',
  'Undergraduate — Pursuing',
  'Undergraduate — Completed',
  'Postgraduate — Pursuing',
  'Postgraduate — Completed',
  'Other'
]);

/**
 * Validates Indian mobile numbers (10 digits starting with 6, 7, 8, or 9).
 * Handles inputs with +91, 91, leading 0, spaces, and hyphens.
 */
export function validateIndianPhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  let cleaned = phone.replace(/[\s\-()+]/g, '');
  if (cleaned.startsWith('91') && cleaned.length === 12) {
    cleaned = cleaned.slice(2);
  } else if (cleaned.startsWith('0') && cleaned.length === 11) {
    cleaned = cleaned.slice(1);
  }
  return /^[6-9]\d{9}$/.test(cleaned);
}

/**
 * Normalizes Indian phone numbers to 10-digit standard format.
 */
export function normalizeIndianPhone(phone) {
  if (!phone || typeof phone !== 'string') return '';
  let cleaned = phone.replace(/[\s\-()+]/g, '');
  if (cleaned.startsWith('91') && cleaned.length === 12) {
    cleaned = cleaned.slice(2);
  } else if (cleaned.startsWith('0') && cleaned.length === 11) {
    cleaned = cleaned.slice(1);
  }
  return cleaned;
}

/**
 * Validates email format using standard pattern.
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim());
}

/**
 * Validates student name (at least 2 letters, alphabetic characters).
 */
export function validateName(name) {
  if (!name || typeof name !== 'string') return false;
  const trimmed = name.trim();
  if (trimmed.length < 2 || trimmed.length > 80) return false;
  return /^[a-zA-Z\s.'-]+$/.test(trimmed) && (trimmed.match(/[a-zA-Z]/g) || []).length >= 2;
}

/**
 * Validates qualification choice against permitted options.
 */
export function validateQualification(qualification) {
  return COUNSELLING_QUALIFICATIONS.includes(qualification);
}

/**
 * Submits the 4-field Free Counselling enquiry.
 * Reuses existing FormSubmit endpoint and local storage backup.
 * 
 * @param {Object} params
 * @param {string} params.name - Student Name
 * @param {string} params.phone - Indian Phone Number
 * @param {string} params.email - Email Address
 * @param {string} params.qualification - Selected Current Qualification
 * @param {string} [params.source='Get Free Counselling Button'] - Trigger button / location
 * @returns {Promise<{ success: boolean, message?: string, error?: string }>}
 */
export async function submitFreeCounselling({
  name,
  phone,
  email,
  qualification,
  source = 'Get Free Counselling Button'
}) {
  const timestamp = new Date().toISOString();
  const indianDate = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const normalizedPhone = normalizeIndianPhone(phone);

  // 1. Create offline lead record
  const leadRecord = {
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    serviceId: 'free-counselling',
    serviceName: 'Free Counselling Consultation',
    fullName: name.trim(),
    mobileNumber: normalizedPhone || phone.trim(),
    email: email.trim(),
    qualification: qualification.trim(),
    source,
    createdAt: timestamp
  };

  backupLeadLocally(leadRecord);

  // 2. Assemble Structured Enquiry Payload
  const payload = {
    name: name.trim(),
    phone: normalizedPhone || phone.trim(),
    email: email.trim(),
    qualification: qualification.trim(),
    source
  };

  // 3. Primary Dispatch: Same-origin Vercel serverless endpoint /api/counselling
  const primaryResult = await apiClient.post('/api/counselling', payload);

  if (primaryResult.success) {
    return {
      success: true,
      message: primaryResult.data?.message || 'Thank you! Your counselling request has been received. Our senior counselling mentor will contact you shortly.'
    };
  }

  // If primary returned a validation error (400) or rate-limit (429), surface it directly
  if (primaryResult.status === 400 || primaryResult.status === 429) {
    return {
      success: false,
      error: primaryResult.error
    };
  }

  // 4. Secondary Fallback: Direct FormSubmit transport
  console.warn('[enquiryService] Primary /api/counselling unavailable, falling back to direct form transport:', primaryResult.error);
  const recipientEmail = (siteConfig.formSubmitEmail || siteConfig.email || 'Vidyapaths@gmail.com').trim();
  const emailBody = {
    _subject: `New Free Counselling Enquiry — ${name.trim()} (Vidyapaths)`,
    _template: 'table',
    _captcha: 'false',
    _replyto: email.trim(),
    'Enquiry Type': 'Free Counselling Consultation',
    'Student Name': name.trim(),
    'Phone Number': normalizedPhone || phone.trim(),
    'Email Address': email.trim(),
    'Current Qualification': qualification.trim(),
    'Trigger Source': source,
    'Submission Date': indianDate
  };

  const fallbackResult = await dispatchDirectFormSubmit(emailBody, recipientEmail);

  if (fallbackResult.success) {
    return {
      success: true,
      message: 'Thank you! Your counselling request has been received. Our senior counselling mentor will contact you shortly.'
    };
  }

  return {
    success: false,
    error: primaryResult.error || fallbackResult.error || 'Submission failed. Please connect with us directly on WhatsApp (+91 8252332061).'
  };
}

export default {
  SERVICE_SUBJECT_MAP,
  COUNSELLING_QUALIFICATIONS,
  validateIndianPhone,
  normalizeIndianPhone,
  validateEmail,
  validateName,
  validateQualification,
  submitEnquiry,
  submitFreeCounselling,
  backupLeadLocally,
  getStoredLeads
};

