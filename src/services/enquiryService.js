/**
 * enquiryService.js
 * Business logic for student lead capture, email forwarding via FormSubmit,
 * and offline/local backup synchronization.
 */
import { apiClient } from './apiClient';
import { safeLocalStorage } from './storageService';
import { siteConfig } from '../data/siteData';

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

  // 4. Send via API client
  const recipientEmail = (siteConfig.formSubmitEmail || siteConfig.email || 'Vidyapaths@gmail.com').trim();
  const endpoint = `https://formsubmit.co/ajax/${recipientEmail}`;

  const result = await apiClient.post(endpoint, emailBody);

  if (result.success) {
    return {
      success: true,
      message: 'Thank you! Your enquiry has been submitted successfully. Our team will get in touch with you shortly.'
    };
  }

  return {
    success: false,
    error: result.error || 'Submission failed. Please check your connection or contact us directly on WhatsApp.'
  };
}

export default {
  SERVICE_SUBJECT_MAP,
  submitEnquiry,
  backupLeadLocally,
  getStoredLeads
};
