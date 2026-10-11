/**
 * formatting.js
 * String, URL, and contact formatting helpers.
 */
import { siteConfig } from '../data/siteData';

/**
 * Returns a clean numeric telephone string without symbols.
 * @param {string} phone 
 * @returns {string}
 */
export function sanitizePhone(phone = '') {
  return String(phone).replace(/[^0-9]/g, '');
}

/**
 * Generates an accessible, URL-encoded WhatsApp direct link.
 * @param {string} [customMessage] 
 * @param {string} [customNumber] 
 * @returns {string}
 */
export function buildWhatsAppUrl(customMessage, customNumber) {
  const num = sanitizePhone(customNumber || siteConfig.whatsappNumber || siteConfig.phoneRaw);
  const msg = encodeURIComponent(customMessage || siteConfig.whatsappMessage);
  return `https://wa.me/${num}?text=${msg}`;
}

/**
 * Generates a standard tel: URI.
 * @param {string} [phone] 
 * @returns {string}
 */
export function buildTelUri(phone) {
  const p = phone || siteConfig.phoneRaw || siteConfig.phone;
  return `tel:${p.replace(/\s+/g, '')}`;
}

/**
 * Generates a standard mailto: URI.
 * @param {string} [email] 
 * @param {string} [subject] 
 * @returns {string}
 */
export function buildMailtoUri(email, subject) {
  const target = email || siteConfig.email;
  return subject 
    ? `mailto:${target}?subject=${encodeURIComponent(subject)}` 
    : `mailto:${target}`;
}

export default {
  sanitizePhone,
  buildWhatsAppUrl,
  buildTelUri,
  buildMailtoUri
};
