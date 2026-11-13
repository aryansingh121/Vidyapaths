/**
 * api/counselling.js
 * Vercel Serverless Function for Vidyapaths Free Counselling Enquiries.
 * 
 * Handles lead capture, server-side validation for the 4 student fields,
 * anti-spam cooldown, and reliable email dispatch to Vidyapaths inbox.
 */

// Permitted qualifications matching frontend schema
const COUNSELLING_QUALIFICATIONS = [
  'Class 10',
  'Class 12 / Higher Secondary',
  'Diploma',
  'Undergraduate — Pursuing',
  'Undergraduate — Completed',
  'Postgraduate — Pursuing',
  'Postgraduate — Completed',
  'Other'
];

// In-memory rate limiting map (IP -> timestamp)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window

function checkRateLimit(ip) {
  const isLocal = ip === '127.0.0.1' || ip === '::1' || ip === 'localhost' || ip === 'unknown';
  const limit = isLocal ? 100 : 10;

  const now = Date.now();
  const entry = rateLimitMap.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW_MS };

  if (now > entry.resetTime) {
    entry.count = 1;
    entry.resetTime = now + RATE_LIMIT_WINDOW_MS;
  } else {
    entry.count += 1;
  }

  rateLimitMap.set(ip, entry);

  // Periodically clean up old entries to prevent memory growth
  if (rateLimitMap.size > 1000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (now > val.resetTime) rateLimitMap.delete(key);
    }
  }

  return entry.count <= limit;
}

// Server-side validation helpers
function validateName(name) {
  if (!name || typeof name !== 'string') return false;
  const trimmed = name.trim();
  if (trimmed.length < 2 || trimmed.length > 80) return false;
  return /^[a-zA-Z\s.'-]+$/.test(trimmed) && (trimmed.match(/[a-zA-Z]/g) || []).length >= 2;
}

function normalizeIndianPhone(phone) {
  if (!phone || typeof phone !== 'string') return '';
  let cleaned = phone.replace(/[\s\-()+]/g, '');
  if (cleaned.startsWith('91') && cleaned.length === 12) {
    cleaned = cleaned.slice(2);
  } else if (cleaned.startsWith('0') && cleaned.length === 11) {
    cleaned = cleaned.slice(1);
  }
  return cleaned;
}

function validateIndianPhone(phone) {
  const cleaned = normalizeIndianPhone(phone);
  return /^[6-9]\d{9}$/.test(cleaned);
}

function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim());
}

function validateQualification(qual) {
  return typeof qual === 'string' && COUNSELLING_QUALIFICATIONS.includes(qual.trim());
}

export default async function handler(req, res) {
  // 1. CORS Configuration for production & local dev
  const origin = req.headers.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, X-Requested-With');

  // Handle CORS Preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only POST method is accepted
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed. Please use POST.'
    });
  }

  // 2. IP Rate Limiting
  const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
  const ip = typeof clientIp === 'string' ? clientIp.split(',')[0].trim() : 'unknown';

  if (!checkRateLimit(ip)) {
    return res.status(429).json({
      success: false,
      error: 'Too many submissions received from your connection. Please wait a minute before submitting again.'
    });
  }

  // 3. Body Parsing & Field Extraction
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({
        success: false,
        error: 'Invalid JSON payload received.'
      });
    }
  }

  const { name, phone, email, qualification, source = 'Get Free Counselling Modal' } = body || {};

  // 4. Strict Validation of 4 Required Fields
  const errors = {};
  if (!validateName(name)) {
    errors.name = 'Please provide a valid full name (at least 2 alphabetic letters).';
  }
  if (!validateIndianPhone(phone)) {
    errors.phone = 'Please provide a valid 10-digit Indian phone number (starting with 6-9).';
  }
  if (!validateEmail(email)) {
    errors.email = 'Please provide a valid email address (e.g. name@example.com).';
  }
  if (!validateQualification(qualification)) {
    errors.qualification = 'Please select a valid qualification from the provided list.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      error: Object.values(errors)[0],
      errors
    });
  }

  const normalizedPhone = normalizeIndianPhone(phone);
  const indianDate = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  // 5. Build Structured Email Payload
  const recipientEmail = (
    process.env.FORM_SUBMIT_EMAIL ||
    process.env.VITE_FORM_SUBMIT_EMAIL ||
    'Vidyapaths@gmail.com'
  ).trim();

  const emailSubject = `New Free Counselling Enquiry — ${name.trim()} (Vidyapaths)`;

  const payload = {
    _subject: emailSubject,
    _template: 'table',
    _captcha: 'false',
    _replyto: email.trim(),
    'Enquiry Type': 'Free Counselling Consultation',
    'Student Name': name.trim(),
    'Phone Number': normalizedPhone,
    'Email Address': email.trim(),
    'Current Qualification': qualification.trim(),
    'Trigger Source': source,
    'Submission Date': indianDate
  };

  // 6. Dispatch Email to Vidyapaths Business Inbox via FormSubmit
  const formSubmitUrl = `https://formsubmit.co/${recipientEmail}`;
  const formData = new URLSearchParams(payload).toString();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

    const forwardRes = await fetch(formSubmitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'https://www.vidyapaths.com',
        'Referer': 'https://www.vidyapaths.com/',
        'User-Agent': 'Vidyapaths-Production-Server/1.0'
      },
      body: formData,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (forwardRes.ok) {
      return res.status(200).json({
        success: true,
        message: 'Thank you! Your counselling request has been received. Our senior counselling mentor will contact you shortly.',
        data: {
          name: name.trim(),
          phone: normalizedPhone,
          email: email.trim(),
          qualification: qualification.trim()
        }
      });
    }

    // If FormSubmit returned an unexpected non-200 status
    console.error(`[api/counselling] FormSubmit responded with status ${forwardRes.status}`);
    return res.status(502).json({
      success: false,
      error: 'Email delivery service temporarily delayed. Please contact us directly on WhatsApp (+91 8252332061).'
    });

  } catch (err) {
    console.error('[api/counselling] Email dispatch error:', err);

    if (err.name === 'AbortError') {
      return res.status(504).json({
        success: false,
        error: 'Email delivery gateway timed out. Please try again or message us on WhatsApp.'
      });
    }

    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while processing your enquiry. Please reach out via WhatsApp.'
    });
  }
}
