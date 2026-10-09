import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Compass, 
  Briefcase, 
  Globe, 
  FileText, 
  Coins, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { servicesData } from '../data/servicesData';

const iconMap = {
  GraduationCap,
  Compass,
  Briefcase,
  Globe,
  FileText,
  Coins
};

export default function ServicesPreview({ onOpenEnquiry }) {
  return (
    <section className="py-20 md:py-28 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Our Core Services"
          title="Complete Guidance From Campus to Career"
          subtitle="Whether you need admissions guidance, clarity on your life goals, or assistance navigating global degrees, our specialized advisory has you covered."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => {
            const IconComponent = iconMap[service.icon] || GraduationCap;
            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-orange-200 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-5 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-navy-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs font-medium text-orange-600 mb-3">
                    {service.tagline}
                  </p>

                  <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                    {service.summary}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100 mb-6">
                    {service.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={service.link}
                    className="inline-flex items-center gap-2 text-xs font-bold text-navy-900 hover:text-orange-600 transition-colors"
                  >
                    <span>{service.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-orange-500 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <button
                    onClick={() => onOpenEnquiry(service.title)}
                    className="text-xs px-3 py-1.5 rounded-lg font-semibold text-orange-600 bg-orange-50 hover:bg-orange-500 hover:text-white transition-colors cursor-pointer"
                  >
                    Quick Enquire
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 bg-navy-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg sm:text-xl font-bold">Unsure which service matches your current stage?</h4>
            <p className="text-sm text-slate-300">Speak with our academic counsellors for a free 15-minute roadmap consultation.</p>
          </div>
          <button
            onClick={() => onOpenEnquiry('General Counselling')}
            className="shrink-0 px-6 py-3 rounded-xl font-bold text-sm bg-orange-500 hover:bg-orange-600 text-white shadow-md transition-all active:scale-95 cursor-pointer"
          >
            Get Free Consultation
          </button>
        </div>

      </div>
    </section>
  );
}
