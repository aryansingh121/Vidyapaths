import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ArrowRight, Compass } from 'lucide-react';
import { siteConfig } from '../data/siteData';

export default function Navbar({ onOpenEnquiry }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu upon navigation
  useEffect(() => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Study Abroad', path: '/study-abroad' },
    { name: 'Internships & Admissions', path: '/internships-admissions' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-2.5' : 'bg-white py-3.5 border-b border-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none min-h-[44px]">
            <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center text-white shadow-md group-hover:bg-navy-800 transition-colors">
              <Compass className="w-6 h-6 text-orange-500 transform group-hover:rotate-45 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-navy-900 leading-none">
                Vidya<span className="text-orange-500">paths</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mt-0.5">
                Right Guidance • Brighter Future
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all min-h-[44px] flex items-center ${
                  isActive(link.path)
                    ? 'text-orange-600 bg-orange-50 font-semibold'
                    : 'text-slate-700 hover:text-navy-900 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-navy-900 px-3.5 py-2.5 rounded-lg border border-slate-200 hover:border-slate-300 transition-all min-h-[44px]"
            >
              <Phone className="w-3.5 h-3.5 text-orange-500" />
              <span>{siteConfig.phone}</span>
            </a>
            <button
              onClick={onOpenEnquiry}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 shadow-sm hover:shadow transition-all cursor-pointer transform active:scale-95 min-h-[44px]"
            >
              <span>Get Free Counselling</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu & Enquire Buttons (Touch-friendly 44px min-height) */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenEnquiry}
              className="text-xs px-3.5 py-2 rounded-lg font-semibold text-white bg-orange-500 hover:bg-orange-600 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer shadow-xs"
            >
              Enquire
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-lg text-slate-700 hover:text-navy-900 hover:bg-slate-100 focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-3 rounded-lg text-base font-medium min-h-[44px] flex items-center ${
                  isActive(link.path)
                    ? 'text-orange-600 bg-orange-50 font-semibold'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-slate-100 mt-2 space-y-2">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg text-sm font-semibold text-slate-700 border border-slate-200 min-h-[44px]"
              >
                <Phone className="w-4 h-4 text-orange-500" />
                <span>Call {siteConfig.phone}</span>
              </a>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenEnquiry();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 shadow-sm min-h-[44px] cursor-pointer"
              >
                <span>Get Free Counselling</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
