import React from 'react';
import FinalCTA from '../sections/FinalCTA';
import { servicesData } from '../data/servicesData';
import { 
  GraduationCap, 
  Compass, 
  Briefcase, 
  Globe, 
  FileText, 
  Coins, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

const iconMap = {
  GraduationCap,
  Compass,
  Briefcase,
  Globe,
  FileText,
  Coins
};

export default function Services({ onOpenEnquiry, onOpenCounselling }) {
  return (
    <div className="pt-24 md:pt-28 bg-white dark:bg-[#0B1220] min-h-screen">
      {/* Header */}
      <section className="bg-slate-50 dark:bg-[#0B1220] py-16 md:py-24 border-b border-slate-100 dark:border-[#1E2D44]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-block px-3.5 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/60">
            What We Do
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-900 dark:text-white tracking-tight">
            Comprehensive Education & Career Guidance
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Tailored advisory services designed to solve every roadblock across your academic journey—from high school decisions to corporate placements and international university admissions.
          </p>
        </div>
      </section>

      {/* Services Detailed List */}
      <section className="py-20 bg-white dark:bg-[#0B1220]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {servicesData.map((service, index) => {
            const Icon = iconMap[service.icon] || GraduationCap;
            const isEven = index % 2 === 1;

            return (
              <div
                key={service.id}
                id={service.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-[#29384F] bg-slate-50/50 dark:bg-[#111C2E] hover:bg-white dark:hover:bg-[#17243A] hover:shadow-xl hover:border-orange-200 dark:hover:border-orange-500/50 transition-all duration-300 scroll-mt-28 target:border-orange-500 target:ring-2 target:ring-orange-500/20`}
              >
                <div className={`lg:col-span-7 space-y-4 ${isEven ? 'lg:order-2' : ''}`}>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Service #{index + 1}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white">
                    {service.title}
                  </h2>

                  <p className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                    {service.tagline}
                  </p>

                  <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="pt-2">
                    <h4 className="text-xs font-bold text-navy-900 dark:text-white uppercase tracking-wider mb-3">
                      Key Highlights & Deliverables:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {service.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => onOpenEnquiry(service.title)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-orange-500 hover:bg-orange-600 shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      <span>Quick Enquire</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : ''}`}>
                  <div className="bg-white dark:bg-[#17243A] rounded-2xl p-8 border border-slate-200 dark:border-[#29384F] text-center shadow-sm">
                    <div className="w-20 h-20 rounded-2xl bg-navy-900 dark:bg-[#0B1220] text-orange-400 flex items-center justify-center mx-auto mb-6 shadow-md">
                      <Icon className="w-10 h-10" />
                    </div>
                    <h3 className="text-lg font-bold text-navy-900 dark:text-white mb-2">{service.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto mb-6">
                      Get personalized assessment and direct handholding from verified career counselors.
                    </p>
                    <div className="bg-orange-50 dark:bg-orange-950/40 rounded-xl p-3 border border-orange-100 dark:border-orange-900/40 text-xs font-semibold text-orange-700 dark:text-orange-300">
                      ✓ 100% Student-Centric • Unbiased Advisory
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <FinalCTA 
        onOpenEnquiry={() => onOpenEnquiry?.('Services Page CTA')} 
        onOpenCounselling={onOpenCounselling}
      />
    </div>
  );
}
