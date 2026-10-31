import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, Award, Users, BookOpen, GraduationCap, Sparkles } from 'lucide-react';

export default function Hero({ onOpenEnquiry, onOpenCounselling }) {
  const handleCounselling = (source = 'Hero') => {
    if (onOpenCounselling) {
      onOpenCounselling(source);
    } else if (onOpenEnquiry) {
      onOpenEnquiry(source);
    }
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white dark:from-[#0B1220] dark:via-[#0B1220] dark:to-[#111C2E] transition-colors duration-200">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-40 dark:opacity-20 overflow-hidden">
        <div className="absolute -top-20 right-10 w-80 h-80 bg-orange-200/50 dark:bg-orange-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-100/60 dark:bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/60 border border-orange-200/80 dark:border-orange-800/50 text-orange-600 dark:text-orange-400 text-xs sm:text-sm font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              <span>Beginning Your Path with Vidyapaths</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-navy-900 dark:text-white tracking-tight leading-[1.15]">
                From College Admission to Your <span className="text-orange-500">First Job</span>
              </h1>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-navy-800 dark:text-slate-100 tracking-tight leading-snug">
                Complete Career Guidance Under One Roof
              </h2>
            </div>

            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Shaping Futures and Securing Careers Across India and Abroad.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => handleCounselling('Hero Primary CTA')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-base font-bold text-white bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer min-h-[48px]"
              >
                <span>Get Free Counselling</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <Link
                to="/colleges"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-base font-semibold text-navy-900 dark:text-white bg-white dark:bg-[#17243A] hover:bg-slate-50 dark:hover:bg-[#1e2f4a] border border-slate-200 dark:border-[#29384F] hover:border-slate-300 dark:hover:border-slate-600 shadow-sm transition-all min-h-[48px]"
              >
                <span>Explore Colleges</span>
              </Link>
            </div>

            {/* Trust bullet indicators */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-[#17243A]/90 p-2.5 rounded-lg border border-slate-100 dark:border-[#29384F] shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>100% Unbiased Advice</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-[#17243A]/90 p-2.5 rounded-lg border border-slate-100 dark:border-[#29384F] shadow-xs">
                <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0" />
                <span>UGC / AICTE Approved</span>
              </div>
              <div className="col-span-2 sm:col-span-1 flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-[#17243A]/90 p-2.5 rounded-lg border border-slate-100 dark:border-[#29384F] shadow-xs">
                <Award className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Zero Admission Hidden Fees</span>
              </div>
            </div>

          </div>

          {/* Right Visual Card Presentation */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Interactive Spotlight Card */}
              <div className="bg-white dark:bg-[#111C2E] rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 dark:border-[#29384F] relative z-10 transition-colors">
                <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-[#29384F]">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-navy-900 dark:bg-white/10 flex items-center justify-center text-white">
                      <GraduationCap className="w-7 h-7 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-900 dark:text-white text-lg">Student Roadmap</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Personalized Career Pathway</p>
                    </div>
                  </div>
                  <span className="text-xs bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-semibold px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/60">
                    Active Intake 2026-27
                  </span>
                </div>

                <div className="space-y-4 my-6">
                  {/* Step 1 */}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-[#17243A] border border-slate-100 dark:border-[#29384F] hover:bg-white dark:hover:bg-[#1e2f4a] transition-all">
                    <div className="w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      01
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-navy-900 dark:text-white">Aptitude & Profile Mapping</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Identify natural strengths, interest fields & budget.</p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-[#17243A] border border-slate-100 dark:border-[#29384F] hover:bg-white dark:hover:bg-[#1e2f4a] transition-all">
                    <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-navy-900 dark:text-blue-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      02
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-navy-900 dark:text-white">Institution & Course Shortlisting</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Verified campus ratings, faculty reviews & placement stats.</p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-[#17243A] border border-slate-100 dark:border-[#29384F] hover:bg-white dark:hover:bg-[#1e2f4a] transition-all">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      03
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-navy-900 dark:text-white">Admissions & Global Visa Assistance</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Direct application management & scholarship guidance.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => handleCounselling('Hero Consultation Card')}
                    className="w-full py-3 rounded-xl bg-navy-900 hover:bg-navy-800 dark:bg-orange-500 dark:hover:bg-orange-600 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Start Free Consultation</span>
                    <ArrowRight className="w-4 h-4 text-orange-500 dark:text-white" />
                  </button>
                </div>
              </div>

              {/* Floating Badge Bottom Left */}
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-[#17243A] rounded-2xl p-4 shadow-xl border border-slate-100 dark:border-[#29384F] flex items-center gap-3 z-20 hidden sm:flex transition-colors">
                <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-navy-900 dark:text-white">1-on-1 Guidance</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Personalized attention</div>
                </div>
              </div>

              {/* Floating Badge Top Right */}
              <div className="absolute -top-6 -right-4 bg-white dark:bg-[#17243A] rounded-2xl p-4 shadow-xl border border-slate-100 dark:border-[#29384F] flex items-center gap-3 z-20 hidden sm:flex transition-colors">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-navy-900 dark:text-white">9 Global Countries</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">UK, USA, Canada & more</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
