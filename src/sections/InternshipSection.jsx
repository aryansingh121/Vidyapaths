import React from 'react';
import SectionHeading from '../components/SectionHeading';
import { Briefcase, FileCheck, Users, Target, ArrowRight, CheckCircle2, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function InternshipSection({ onOpenEnquiry }) {
  const domains = [
    { title: "Software & Web Development", roles: "Frontend, Backend, Fullstack, Python/React interns" },
    { title: "Digital Marketing & Growth", roles: "SEO, Social Media Marketing, Performance, Content" },
    { title: "Business & Sales Development", roles: "Lead Generation, Client Relations, Market Research" },
    { title: "Finance & Data Analysis", roles: "Financial Modeling, Excel/SQL Reporting, Valuation" },
    { title: "UI/UX & Graphic Design", roles: "Figma wireframing, Brand design, User journeys" },
    { title: "Human Resources (HR)", roles: "Talent acquisition, Employee engagement, Screening" }
  ];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-block px-3.5 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-orange-50 text-orange-600 border border-orange-200">
              Internship & Corporate Readiness
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight leading-tight">
              Gain Real-World Experience Before You Graduate
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              Academic theory is only half the battle. Vidyapaths assists undergraduates and fresh graduates in landing impactful internships that turn into pre-placement job offers.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <FileCheck className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-navy-900">ATS Resume & LinkedIn Optimization</h4>
                  <p className="text-xs text-slate-500">Transform your college project details into quantifiable resume achievements that recruiters notice.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <Users className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-navy-900">Behavioral & Technical Mock Rounds</h4>
                  <p className="text-xs text-slate-500">Practice real interview questions, group discussion guidelines, and confidence-building simulations.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <Target className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-navy-900">Direct Application Mentorship</h4>
                  <p className="text-xs text-slate-500">Guidance on approaching startup founders, corporate portals, and verified internship platforms.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button
                onClick={() => onOpenEnquiry('Internship Assistance Request')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-orange-500 hover:bg-orange-600 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <span>Find Internship Opportunities</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/internships-admissions"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-navy-900 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <span>Explore Process</span>
              </Link>
            </div>

          </div>

          {/* Right Column: In-demand roles grid */}
          <div className="lg:col-span-6">
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-lg font-bold text-navy-900">Key Internship Sectors</h3>
                  <p className="text-xs text-slate-500">High-demand opportunities for college students</p>
                </div>
                <span className="text-xs bg-orange-100 text-orange-700 font-bold px-2.5 py-1 rounded-full">
                  Summer & Winter 2026
                </span>
              </div>

              <div className="space-y-3">
                {domains.map((dom, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-orange-300 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-navy-900 group-hover:text-orange-600 transition-colors">
                        {dom.title}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        {dom.roles}
                      </p>
                    </div>
                    <button
                      onClick={() => onOpenEnquiry(`Internship in ${dom.title}`)}
                      className="text-xs font-semibold text-orange-600 hover:text-orange-700 px-2 py-1 rounded bg-orange-50 group-hover:bg-orange-500 group-hover:text-white transition-colors cursor-pointer shrink-0 ml-2"
                    >
                      Apply
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Verified opportunities
                </span>
                <span className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-orange-500" />
                  Certificate guidance
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
