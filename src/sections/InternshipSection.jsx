import React from 'react';
import { FileCheck, Users, Target, ArrowRight, CheckCircle2, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function InternshipSection({ onOpenEnquiry }) {
  const domains = [
    { name: "Software & Web Development", title: "Software & Web Development", roles: "Frontend, Backend, Fullstack, Python/React interns" },
    { name: "Digital Marketing & Growth", title: "Digital Marketing & Growth", roles: "SEO, Social Media Marketing, Performance, Content" },
    { name: "Business & Sales Development", title: "Business & Sales Development", roles: "Lead Generation, Client Relations, Market Research" },
    { name: "Finance & Data Analysis", title: "Finance & Data Analysis", roles: "Financial Modeling, Excel/SQL Reporting, Valuation" },
    { name: "UI/UX & Graphic Design", title: "UI/UX & Graphic Design", roles: "Figma wireframing, Brand design, User journeys" },
    { name: "Human Resources (HR)", title: "Human Resources (HR)", roles: "Talent acquisition, Employee engagement, Screening" }
  ];

  const handleExploreProcess = (e) => {
    const target = document.getElementById('internship-process');
    if (target) {
      e.preventDefault();
      const navOffset = 95; // Fixed navbar offset
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });

      if (window.location.hash !== '#internship-process') {
        window.history.pushState(null, '', '/internships#internship-process');
      }
    }
  };

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-[#111C2E] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-block px-3.5 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/40">
              Internship & Corporate Readiness
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white tracking-tight leading-tight">
              Gain Real-World Experience Before You Graduate
            </h2>

            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Academic theory is only half the battle. Vidyapaths assists undergraduates and fresh graduates in landing impactful internships that turn into pre-placement job offers.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 dark:bg-[#17243A] border border-slate-100 dark:border-[#29384F]">
                <FileCheck className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-navy-900 dark:text-white">ATS Resume & LinkedIn Optimization</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Transform your college project details into quantifiable resume achievements that recruiters notice.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 dark:bg-[#17243A] border border-slate-100 dark:border-[#29384F]">
                <Users className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-navy-900 dark:text-white">Behavioral & Technical Mock Rounds</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Practice real interview questions, group discussion guidelines, and confidence-building simulations.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 dark:bg-[#17243A] border border-slate-100 dark:border-[#29384F]">
                <Target className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-navy-900 dark:text-white">Direct Application Mentorship</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Guidance on approaching startup founders, corporate portals, and verified internship platforms.</p>
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
                to="/internships#internship-process"
                onClick={handleExploreProcess}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-navy-900 dark:text-white bg-slate-100 dark:bg-[#17243A] hover:bg-slate-200 dark:hover:bg-[#1e2f4a] border border-transparent dark:border-[#29384F] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 cursor-pointer"
              >
                <span>Explore Process</span>
              </Link>
            </div>

          </div>

          {/* Right Column: In-demand roles grid */}
          <div className="lg:col-span-6">
            <div className="bg-slate-50 dark:bg-[#17243A] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-[#29384F] shadow-md">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-[#29384F]">
                <div>
                  <h3 className="text-lg font-bold text-navy-900 dark:text-white">Key Internship Sectors</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">High-demand opportunities for college students</p>
                </div>
                <span className="text-xs bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-400 font-bold px-2.5 py-1 rounded-full border border-orange-200 dark:border-orange-800/40">
                  Summer & Winter 2026
                </span>
              </div>

              <div className="space-y-3">
                {domains.map((dom, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-white dark:bg-[#111C2E] border border-slate-200 dark:border-[#29384F] hover:border-orange-300 dark:hover:border-orange-500/50 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-navy-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                        {dom.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {dom.roles}
                      </p>
                    </div>
                    <button
                      onClick={() => onOpenEnquiry({ service: 'internship-assistance', domain: dom.name || dom.title })}
                      className="text-xs font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 px-2 py-1 rounded bg-orange-50 dark:bg-orange-950/60 group-hover:bg-orange-500 group-hover:text-white transition-colors cursor-pointer shrink-0 ml-2"
                    >
                      Apply
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-[#29384F] flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
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
