import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, Award, Users, BookOpen, GraduationCap, Sparkles } from 'lucide-react';

export default function Hero({ onOpenEnquiry }) {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-40 overflow-hidden">
        <div className="absolute -top-20 right-10 w-80 h-80 bg-orange-200/50 rounded-full blur-3xl"></div>
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-orange-600 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              <span>Right Guidance. Brighter Future.</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-navy-900 tracking-tight leading-[1.15]">
              Find the <span className="text-orange-500">Right Path</span> for Your Future.
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              From choosing the right college to building your career and studying abroad, Vidyapaths helps students make confident decisions at every step.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenEnquiry}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-base font-bold text-white bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer min-h-[48px]"
              >
                <span>Get Free Counselling</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <Link
                to="/colleges"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-base font-semibold text-navy-900 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 shadow-sm transition-all min-h-[48px]"
              >
                <span>Explore Colleges</span>
              </Link>
            </div>

            {/* Trust bullet indicators */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-white/80 p-2.5 rounded-lg border border-slate-100 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>100% Unbiased Advice</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-white/80 p-2.5 rounded-lg border border-slate-100 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0" />
                <span>UGC / AICTE Approved</span>
              </div>
              <div className="col-span-2 sm:col-span-1 flex items-center gap-2 text-xs font-medium text-slate-700 bg-white/80 p-2.5 rounded-lg border border-slate-100 shadow-xs">
                <Award className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Zero Admission Hidden Fees</span>
              </div>
            </div>

          </div>

          {/* Right Visual Card Presentation */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Interactive Spotlight Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 relative z-10">
                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-navy-900 flex items-center justify-center text-white">
                      <GraduationCap className="w-7 h-7 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-900 text-lg">Student Roadmap</h3>
                      <p className="text-xs text-slate-500">Personalized Career Pathway</p>
                    </div>
                  </div>
                  <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-1 rounded-full border border-emerald-200">
                    Active Intake 2026-27
                  </span>
                </div>

                <div className="space-y-4 my-6">
                  {/* Step 1 */}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-orange-200 transition-all">
                    <div className="w-7 h-7 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      01
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-navy-900">Aptitude & Profile Mapping</h4>
                      <p className="text-xs text-slate-500">Identify natural strengths, interest fields & budget.</p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-orange-200 transition-all">
                    <div className="w-7 h-7 rounded-lg bg-blue-100 text-navy-900 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      02
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-navy-900">Institution & Course Shortlisting</h4>
                      <p className="text-xs text-slate-500">Verified campus ratings, faculty reviews & placement stats.</p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-orange-200 transition-all">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      03
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-navy-900">Admissions & Global Visa Assistance</h4>
                      <p className="text-xs text-slate-500">Direct application management & scholarship guidance.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onOpenEnquiry}
                    className="w-full py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Start Free Consultation</span>
                    <ArrowRight className="w-4 h-4 text-orange-500" />
                  </button>
                </div>
              </div>

              {/* Floating Badge Bottom Left */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-slate-100 flex items-center gap-3 z-20 hidden sm:flex">
                <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-navy-900">1-on-1 Guidance</div>
                  <div className="text-xs text-slate-500">Personalized attention</div>
                </div>
              </div>

              {/* Floating Badge Top Right */}
              <div className="absolute -top-6 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-slate-100 flex items-center gap-3 z-20 hidden sm:flex">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-navy-900">9 Global Countries</div>
                  <div className="text-xs text-slate-500">UK, USA, Canada & more</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
