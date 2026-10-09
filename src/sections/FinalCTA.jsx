import React from 'react';
import { ArrowRight, MessageCircle, PhoneCall, Sparkles } from 'lucide-react';
import { siteConfig } from '../data/siteData';

export default function FinalCTA({ onOpenEnquiry }) {
  const cleanNumber = siteConfig.phoneRaw.replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(siteConfig.whatsappMessage);
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMsg}`;

  return (
    <section className="py-20 bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 text-white relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-orange-400" />
          <span>Take The First Step Today</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Not Sure Which Path Is Right for You?
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Book a 100% free, zero-obligation counselling consultation with our education mentors. Let's build a roadmap tailored to your strengths and aspirations.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => onOpenEnquiry('Final CTA Section')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold text-white bg-orange-500 hover:bg-orange-600 shadow-xl shadow-orange-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer min-h-[48px]"
          >
            <span>Get Free Counselling</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold text-emerald-400 bg-emerald-950/70 border border-emerald-700/60 hover:bg-emerald-900/40 transition-all shadow-md min-h-[48px]"
          >
            <MessageCircle className="w-5 h-5 text-emerald-400" />
            <span>WhatsApp Us Now</span>
          </a>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <span>✓ Quick 15-Minute Profile Assessment</span>
          <span>✓ Zero Pressure, 100% Student-Centric</span>
          <span>✓ Free Admission & Career Guidance</span>
        </div>

      </div>
    </section>
  );
}
