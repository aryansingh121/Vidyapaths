import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { siteConfig } from '../data/siteData';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  const cleanNumber = siteConfig.phoneRaw.replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(siteConfig.whatsappMessage);
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMsg}`;

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end pointer-events-auto">
      {/* Tooltip notice (shown on tablet and desktop to avoid mobile screen obstruction) */}
      {showTooltip && (
        <div className="hidden sm:block relative mb-3 bg-white border border-slate-200 shadow-xl rounded-2xl p-3.5 pr-8 max-w-xs text-xs text-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
            aria-label="Close notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="font-bold text-navy-900">Career Mentors Online</span>
          </div>
          <p className="text-slate-600">Have questions about admissions or courses? Chat directly on WhatsApp!</p>
        </div>
      )}

      {/* Floating CTA Button with min-44px touch target */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-orange-500 rounded-full border-2 border-white"></span>
        <MessageCircle className="w-7 h-7" />
        
        {/* Hover label for desktop */}
        <span className="hidden md:block absolute right-16 bg-navy-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-md pointer-events-none">
          WhatsApp Us
        </span>
      </a>
    </div>
  );
}
