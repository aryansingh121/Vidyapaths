/**
 * api/enquiry.js
 * Vercel Serverless Function for General / Specialized Vidyapaths Inquiries.
 */

const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

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
  return entry.count <= limit;
}

export default async function handler(req, res) {
  const origin = req.headers.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, X-Requested-With');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed. Please use POST.'
    });
  }

  const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
  const ip = typeof clientIp === 'string' ? clientIp.split(',')[0].trim() : 'unknown';

  if (!checkRateLimit(ip)) {
    return res.status(429).json({
      success: false,
      error: 'Too many submissions received. Please wait a minute before submitting again.'
    });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ success: false, error: 'Invalid JSON payload received.' });
    }
  }

  const recipientEmail = (
    process.env.FORM_SUBMIT_EMAIL ||
    process.env.VITE_FORM_SUBMIT_EMAIL ||
    'Vidyapaths@gmail.com'
  ).trim();

  const formSubmitUrl = `https://formsubmit.co/${recipientEmail}`;
  const formData = new URLSearchParams(body).toString();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

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
        message: 'Thank you! Your enquiry has been submitted successfully. Our team will get in touch with you shortly.'
      });
    }

    return res.status(502).json({
      success: false,
      error: 'Email delivery service temporarily delayed. Please contact us directly on WhatsApp (+91 8252332061).'
    });
  } catch (err) {
    if (err.name === 'AbortError') {
      return res.status(504).json({
        success: false,
        error: 'Email delivery gateway timed out. Please try again or reach out on WhatsApp.'
      });
    }

    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while processing your enquiry.'
    });
  }
}
