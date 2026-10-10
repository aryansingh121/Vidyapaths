import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Phone, 
  ArrowRight, 
  Compass, 
  Home, 
  Users, 
  Sparkles, 
  GraduationCap,
  Globe, 
  Briefcase, 
  Mail,
  ChevronRight
} from 'lucide-react';
import { siteConfig } from '../data/siteData';

export default function Navbar({ onOpenEnquiry }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ensure mobile menu closes on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: Users },
    { name: 'Services', path: '/services', icon: Sparkles },
    { name: 'Colleges', path: '/colleges', icon: GraduationCap },
    { name: 'Study Abroad', path: '/study-abroad', icon: Globe },
    { name: 'Internships', path: '/internships', icon: Briefcase },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    if (path === '/internships' && location.pathname === '/internships-admissions') return true;
    return location.pathname.startsWith(path);
  };

  const handleNavClick = (path) => {
    if (path === '/' && location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out w-full ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(11,31,58,0.06)] py-2 sm:py-2.5' 
          : 'bg-white border-b border-slate-100 shadow-[0_1px_3px_0_rgba(11,31,58,0.02)] py-2.5 sm:py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between gap-1.5 sm:gap-4 w-full">
          
          {/* Logo & Tagline */}
          <Link 
            to="/" 
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-2 sm:gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-xl min-h-[44px] shrink-0"
            aria-label="Vidyapaths Home"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 flex items-center justify-center text-white shadow-md shadow-navy-900/10 ring-1 ring-white/10 group-hover:scale-[1.03] transition-transform duration-200 shrink-0">
              <Compass className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-orange-500 transform group-hover:rotate-45 transition-transform duration-300" />
            </div>
            
            <div className="flex flex-col text-left">
              <span className="text-base min-[360px]:text-lg sm:text-xl font-bold tracking-tight text-navy-950 leading-none whitespace-nowrap">
                Vidya<span className="text-orange-500">paths</span>
              </span>
              <span className="hidden min-[380px]:block text-[8px] sm:text-[9px] uppercase tracking-[0.14em] sm:tracking-[0.16em] font-semibold text-slate-400 mt-1 leading-none whitespace-nowrap">
                Right Guidance • Brighter Future
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Positioned with Colleges between Services & Study Abroad) */}
          <nav 
            className="hidden lg:flex items-center gap-0.5 xl:gap-1 shrink-0" 
            aria-label="Primary Navigation"
          >
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`px-2 xl:px-2.5 py-1.5 xl:py-2 rounded-lg text-xs xl:text-sm font-medium transition-all whitespace-nowrap relative ${
                    active
                      ? 'text-orange-600 bg-orange-50/80 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-navy-950 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.name}</span>
                  {active && (
                    <span 
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-orange-500 rounded-full" 
                      aria-hidden="true" 
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions (Phone Secondary on 2XL + Primary CTA) */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-2.5 shrink-0">
            {/* Secondary Phone (only on wide screens to prevent crowding) */}
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="hidden 2xl:inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-navy-950 px-2.5 py-2 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap group"
              title={`Call ${siteConfig.phone}`}
            >
              <Phone className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-500 transition-colors" />
              <span>{siteConfig.phone}</span>
            </a>

            {/* Primary Orange CTA */}
            <button
              onClick={() => onOpenEnquiry('Header Main CTA')}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 xl:px-4 py-2 xl:py-2.5 rounded-xl text-xs xl:text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 shadow-sm hover:shadow-md hover:shadow-orange-500/20 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap min-h-[40px] xl:min-h-[42px] group"
            >
              <span>Get Free Counselling</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile & Tablet Header Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden shrink-0">
            {/* Compact Header CTA Button (available on 350px+) */}
            <button
              onClick={() => onOpenEnquiry('Mobile Header Button')}
              className="hidden min-[350px]:inline-flex text-[11px] sm:text-xs px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg font-semibold text-white bg-orange-500 hover:bg-orange-600 shadow-xs active:scale-95 transition-all min-h-[38px] sm:min-h-[40px] items-center justify-center cursor-pointer whitespace-nowrap"
            >
              Enquire
            </button>

            {/* Accessible Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-navy-950 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer transition-colors"
              aria-label={isOpen ? "Close main menu" : "Open main menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-navy-900" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-navy-900" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile & Tablet Dropdown Navigation */}
      {isOpen && (
        <div 
          className="lg:hidden bg-white/98 backdrop-blur-md border-b border-slate-200 shadow-xl px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto"
          id="mobile-navigation-menu"
        >
          <div className="flex flex-col space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-3 py-1 mb-1">
              Navigation Menu
            </span>

            {navLinks.map((link) => {
              const active = isActive(link.path);
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => {
                    setIsOpen(false);
                    handleNavClick(link.path);
                  }}
                  className={`px-3.5 py-3 rounded-xl text-sm font-medium min-h-[44px] flex items-center justify-between transition-colors ${
                    active
                      ? 'text-orange-600 bg-orange-50/80 font-semibold'
                      : 'text-slate-800 hover:bg-slate-50 active:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      active ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="truncate">{link.name}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 ${active ? 'text-orange-500' : 'text-slate-300'}`} />
                </Link>
              );
            })}

            {/* Mobile Contact & CTA Footer */}
            <div className="pt-4 border-t border-slate-100 mt-2 space-y-2.5">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 min-h-[44px] transition-colors"
              >
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <span className="truncate">Direct Support: {siteConfig.phone}</span>
              </a>

              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenEnquiry('Mobile Menu Big CTA');
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 shadow-md shadow-orange-500/20 min-h-[44px] active:scale-[0.99] transition-all cursor-pointer"
              >
                <span>Get Free Counselling</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
