/**
 * VIDYAPATHS — COLLEGE & PROGRAM CATALOGUE DATA
 * 
 * IMPORTANT CONTENT INTEGRITY NOTICE:
 * Vidyapaths adheres to strict ethical disclosure rules.
 * No unverified college rankings, affiliations, fee structures, or partnerships are published.
 * 
 * This file serves as the editable single source of truth for institution and course listings.
 * Replace the sample structure below with client-verified partner institutions upon handover.
 */

export const collegesData = [
  {
    id: "institute-delhi-ncr",
    name: "Sample Institute of Technology & Management",
    location: "Delhi NCR, India",
    type: "AICTE / UGC Recognized Institution (Sample Listing)",
    description: "Multi-disciplinary campus offering technical engineering, computer applications, and business administration programs with modern lab infrastructure.",
    badge: "Sample Listing • Awaiting Client Verification",
    isSample: true,
    programs: [
      { name: "B.Tech Computer Science & Engineering", category: "ug", duration: "4 Years", description: "Core algorithms, full-stack software development, AI foundations." },
      { name: "BCA (Bachelor of Computer Applications)", category: "ug", duration: "3 Years", description: "Application architecture, database management, and cloud basics." },
      { name: "BBA (Bachelor of Business Administration)", category: "ug", duration: "3 Years", description: "Principles of management, marketing, accounting, and organization." },
      { name: "MBA / PGDM (Finance & Marketing)", category: "pg", duration: "2 Years", description: "Executive leadership, financial modeling, and marketing strategy." },
      { name: "MCA (Master of Computer Applications)", category: "pg", duration: "2 Years", description: "Advanced system engineering and enterprise software." },
      { name: "Information Technology (Cybersecurity & Cloud)", category: "specialized", duration: "Integrated", description: "Specialized labs in cloud computing and digital security." }
    ]
  },
  {
    id: "institute-bangalore-tech",
    name: "Sample Academy of Business & Media Studies",
    location: "Bengaluru / Pune, India",
    type: "Affiliated Higher Education Campus (Sample Listing)",
    description: "Focused on creative design, mass communication, commerce, and contemporary digital media with hands-on studio training.",
    badge: "Sample Listing • Awaiting Client Verification",
    isSample: true,
    programs: [
      { name: "BJMC (Journalism & Mass Communication)", category: "ug", duration: "3 Years", description: "Broadcast media, digital journalism, and public relations." },
      { name: "B.Des (Design / UI-UX)", category: "ug", duration: "4 Years", description: "Visual communication, product design, and digital interfaces." },
      { name: "B.Com (Hons)", category: "ug", duration: "3 Years", description: "Corporate accounting, banking, financial audit, and taxation." },
      { name: "MA (Communication & Media Studies)", category: "pg", duration: "2 Years", description: "Advanced communication theory, content strategy, and media management." },
      { name: "Design & Creative Media", category: "specialized", duration: "Certification / Minor", description: "Portfolio development in multimedia and brand design." },
      { name: "Marketing & Brand Strategy", category: "specialized", duration: "Executive Track", description: "Consumer insights, performance marketing, and digital growth." }
    ]
  },
  {
    id: "institute-hospitality-arts",
    name: "Sample College of Professional & Hospitality Studies",
    location: "Greater Noida / Jaipur, India",
    type: "Professional Degree Campus (Sample Listing)",
    description: "Professional training in hospitality management, hotel operations, liberal arts, and applied commerce studies.",
    badge: "Sample Listing • Awaiting Client Verification",
    isSample: true,
    programs: [
      { name: "Hotel Management (BHM)", category: "ug", duration: "3-4 Years", description: "Culinary arts, front-office operations, hospitality accounting." },
      { name: "BA (Economics & Humanities)", category: "ug", duration: "3 Years", description: "Applied economics, public policy, and communicative English." },
      { name: "B.Sc (Applied Science & Data Analytics)", category: "ug", duration: "3 Years", description: "Applied mathematical sciences, data analytics, and research." },
      { name: "M.Com (International Business)", category: "pg", duration: "2 Years", description: "Global trade regulations, corporate treasury, and investment laws." },
      { name: "Hospitality & Event Operations", category: "specialized", duration: "Applied Track", description: "Luxury brand hospitality, international event coordination." },
      { name: "Finance & Wealth Advisory", category: "specialized", duration: "Specialization", description: "Fintech fundamentals, wealth advisory, and corporate tax." }
    ]
  }
];

export const programCategories = [
  { id: "all", label: "All Programs" },
  { id: "ug", label: "Undergraduate (UG)" },
  { id: "pg", label: "Postgraduate (PG)" },
  { id: "specialized", label: "Specialized Areas" }
];
