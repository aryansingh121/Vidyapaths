import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, Clock, ArrowUpRight, MessageCircle } from 'lucide-react';
import { siteConfig } from '../data/siteData';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer({ onOpenEnquiry, onOpenCounselling }) {
  const location = useLocation();
  const currentYear = CURRENT_YEAR;

  const handleNavClick = (targetPath) => {
    if (location.pathname === targetPath) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const services = [
    { name: "College Admission & Guidance", path: "/colleges" },
    { name: "Career Counselling", path: "/services#career-counselling" },
    { name: "Internship Assistance", path: "/internships" },
    { name: "Study Abroad", path: "/study-abroad" },
    { name: "Resume & Interview Support", path: "/services#resume-interview" },
    { name: "Scholarship & Loan Guidance", path: "/services#scholarships-loans" },
  ];

  const studyDestinations = [
    { name: "United Kingdom", id: "uk" },
    { name: "United States", id: "usa" },
    { name: "Canada", id: "canada" },
    { name: "Australia", id: "australia" },
    { name: "Germany", id: "germany" },
    { name: "Ireland", id: "ireland" },
    { name: "New Zealand", id: "new-zealand" },
    { name: "UAE (Dubai)", id: "uae" },
    { name: "Singapore", id: "singapore" }
  ];

  const cleanWhatsappNumber = (siteConfig.whatsappNumber || siteConfig.phoneRaw).replace(/[^0-9]/g, '');
  const encodedWhatsappMsg = encodeURIComponent(siteConfig.whatsappMessage);

  return (
    <footer className="bg-navy-900 text-slate-300 pt-16 pb-24 sm:pb-28 border-t border-navy-800 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-navy-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" onClick={() => handleNavClick('/')} className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-white p-1.5 flex items-center justify-center shadow-md shrink-0 group-hover:scale-105 transition-transform duration-200">
                <img 
                  src="/logo-icon.png" 
                  alt="Vidyapaths Logo" 
                  className="w-full h-full object-contain" 
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-2xl font-extrabold tracking-tight text-white leading-none">
                  Vidya<span className="text-orange-500">paths</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-orange-400 mt-1 leading-none">
                  Career Consultants
                </span>
              </div>
            </Link>
            
            <p className="text-orange-400 font-medium text-sm">
              {siteConfig.tagline}
            </p>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {siteConfig.shortDescription} Empowering students with unbiased guidance, verified college options, and roadmap clarity.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => (onOpenCounselling ? onOpenCounselling('Footer CTA') : onOpenEnquiry?.('Footer CTA'))}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-colors shadow-sm cursor-pointer min-h-[38px]"
              >
                <span>Get Free Counselling</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <a
                href={`https://wa.me/${cleanWhatsappNumber}?text=${encodedWhatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 hover:bg-emerald-900/40 transition-colors min-h-[38px]"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" onClick={() => handleNavClick('/')} className="text-slate-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" onClick={() => handleNavClick('/about')} className="text-slate-400 hover:text-white transition-colors">About Vidyapaths</Link>
              </li>
              <li>
                <Link to="/services" onClick={() => handleNavClick('/services')} className="text-slate-400 hover:text-white transition-colors">All Services</Link>
              </li>
              <li>
                <Link to="/colleges" onClick={() => handleNavClick('/colleges')} className="text-slate-400 hover:text-white transition-colors">Colleges & Courses</Link>
              </li>
              <li>
                <Link to="/study-abroad" onClick={() => handleNavClick('/study-abroad')} className="text-slate-400 hover:text-white transition-colors">Study Abroad</Link>
              </li>
              <li>
                <Link to="/internships" onClick={() => handleNavClick('/internships')} className="text-slate-400 hover:text-white transition-colors">Internships</Link>
              </li>
              <li>
                <Link to="/contact#enquiry-form" className="text-slate-400 hover:text-white transition-colors">Contact & Enquire</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Key Services</h4>
            <ul className="space-y-2.5 text-sm">
              {services.map((item, index) => (
                <li key={index}>
                  <Link to={item.path} className="text-slate-400 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Contact Details</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <a href={`tel:${siteConfig.phoneRaw}`} className="hover:text-white transition-colors">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors break-all text-xs sm:text-sm">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-orange-400 shrink-0" />
                <span>{siteConfig.hours}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Study Abroad Country Badges */}
        <div className="py-6 border-b border-navy-800 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2">
            Study Destinations:
          </span>
          {studyDestinations.map((dest) => (
            <Link
              key={dest.id}
              to={`/study-abroad#${dest.id}`}
              className="text-xs bg-navy-800/80 hover:bg-navy-700 hover:text-white text-slate-300 px-2.5 py-1 rounded-md transition-colors"
            >
              {dest.name}
            </Link>
          ))}
        </div>

        {/* Bottom Bar & Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 sm:pr-28 md:pr-32">
          <p>
            © {currentYear} Vidyapaths. All rights reserved. Built with precision for student success.
          </p>
          <div className="flex items-center space-x-6">
            <span className="text-[11px] text-slate-500 hidden sm:inline">
              Transparent, Merit-based Career Guidance
            </span>
            <Link to="/privacy-policy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
          </div>
        </div>

        {/* Content Rule Notice */}
        <p className="mt-4 text-[11px] text-slate-600 text-center md:text-left">
          Disclaimer: Vidyapaths is an independent education and career consultancy. Admissions, scholarships, and visa approvals are subject to student eligibility, entrance exams, and respective university/government regulations.
        </p>

      </div>
    </footer>
  );
}
