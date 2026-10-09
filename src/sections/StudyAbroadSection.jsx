import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import { countriesData } from '../data/countriesData';
import { Globe, Plane, Award, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function StudyAbroadSection({ onOpenEnquiry }) {
  return (
    <section className="py-20 md:py-28 bg-navy-900 text-white relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionHeading
          badge="Study Abroad Advisory"
          title="Explore Premier Global Education Destinations"
          subtitle="From English proficiency tests and university shortlisting to visa filing and pre-departure briefings, we make international education transparent and reachable."
          theme="dark"
        />

        {/* 9 Countries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {countriesData.map((country) => (
            <div
              key={country.id}
              className="bg-navy-800/80 hover:bg-navy-800 border border-navy-700/80 hover:border-orange-500/40 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl" role="img" aria-label={country.name}>
                      {country.flag}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                        {country.name}
                      </h3>
                      <span className="text-xs text-slate-400 font-medium">PSW: {country.workPermit}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {country.highlights}
                </p>

                <div className="bg-navy-950/60 rounded-xl p-3 mb-4 border border-navy-900">
                  <span className="text-[11px] uppercase tracking-wider text-orange-400 font-semibold block mb-1">
                    Popular Fields
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {country.popularCourses.slice(0, 3).map((crs, i) => (
                      <span key={i} className="text-[11px] bg-navy-800 text-slate-300 px-2 py-0.5 rounded">
                        {crs}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-2">
                  <span className="text-slate-500">Upcoming Intakes:</span>
                  <span className="text-slate-200 font-medium">{country.intakes}</span>
                </div>
              </div>

              <div className="pt-4 mt-2 border-t border-navy-700/60 flex items-center justify-between">
                <Link
                  to="/study-abroad"
                  className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1"
                >
                  <span>Learn Details</span>
                  <ArrowRight className="w-3 h-3 text-orange-400" />
                </Link>

                <button
                  onClick={() => onOpenEnquiry(`Study Abroad Counselling for ${country.name}`)}
                  className="text-xs px-3 py-1.5 rounded-lg font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-colors cursor-pointer"
                >
                  Apply {country.short}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Global Support Highlights Banner */}
        <div className="mt-14 bg-navy-950 rounded-3xl p-8 border border-navy-800 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-1">High Visa Guidance Track</h4>
                <p className="text-xs text-slate-400">Mock interviews, financial sponsorship vetting, and genuine student documentation.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-1">Scholarship Mentorship</h4>
                <p className="text-xs text-slate-400">Assistance in crafting compelling SOPs and applications for merit and country bursaries.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                <Plane className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-1">Pre & Post Departure Help</h4>
                <p className="text-xs text-slate-400">Accommodation search advisory, student SIM card setup, and alumni community connect.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400">
              Need personalized country evaluation based on your GRE/IELTS or academic percentages?
            </p>
            <button
              onClick={() => onOpenEnquiry('Study Abroad Profile Evaluation')}
              className="px-6 py-3 rounded-xl font-bold text-sm bg-orange-500 hover:bg-orange-600 text-white transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
            >
              Get Free Study Abroad Assessment
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
