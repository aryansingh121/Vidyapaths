/**
 * siteData.js
 * Centralized site metadata and contact configuration.
 * Powered by validated environment configs with safe defaults.
 */
import { env } from '../config/env.js';

export const siteConfig = {
  name: "Vidyapaths",
  tagline: "Beginning Your Path",
  subTagline: "Career Consultants",
  logo: "/logo.png",
  logoDark: "/logo-dark.png",
  logoIcon: "/logo-icon.png",
  logoIconDark: "/logo-icon-dark.png",
  shortDescription: "Student-focused Career & Education Consultancy helping you make confident decisions about colleges, careers, internships, and global education.",
  
  // Official Client contact details linked to environment
  phone: env.CONTACT_PHONE,
  phoneRaw: env.CONTACT_PHONE_RAW,
  whatsappNumber: env.WHATSAPP_NUMBER,
  whatsappMessage: "Hello Vidyapaths, I would like guidance regarding admissions and career opportunities.",
  email: env.CONTACT_EMAIL,
  formSubmitEmail: env.FORM_SUBMIT_EMAIL,
  address: "",
  hours: "Mon - Sat: 9:30 AM - 6:30 PM",

  socials: {
    instagram: "https://www.instagram.com/vidyapaths.official?xtok=MTdidHNmZDkxazJnNQ==",
    instagramUsername: "@vidyapaths.official",
    linkedin: "https://linkedin.com/company/vidyapaths",
    facebook: "https://facebook.com/vidyapaths",
    youtube: "https://youtube.com/@vidyapaths"
  },

  instagramCta: {
    title: "Follow us on Instagram",
    username: "@vidyapaths.official",
    url: "https://www.instagram.com/vidyapaths.official?xtok=MTdidHNmZDkxazJnNQ==",
    description: "Stay updated with education opportunities, career guidance, admissions updates, and student resources."
  }
};

export default siteConfig;
