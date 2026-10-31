import React from 'react';
import { Target, Eye, Sparkles } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import WhyVidyapaths from '../sections/WhyVidyapaths';
import FinalCTA from '../sections/FinalCTA';

export default function About({ onOpenEnquiry, onOpenCounselling }) {
  return (
    <div className="pt-24 md:pt-28 bg-slate-50 dark:bg-[#0B1220] min-h-screen">
      {/* About Hero Header */}
      <section className="bg-slate-50 dark:bg-[#0B1220] py-16 md:py-24 border-b border-slate-100 dark:border-[#1E2D44]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="flex justify-center mb-2">
            <div className="p-3 bg-white dark:bg-[#111C2E] rounded-2xl shadow-sm border border-slate-200/80 dark:border-[#29384F] inline-flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="Vidyapaths Logo" 
                className="h-20 sm:h-24 w-auto object-contain dark:hidden" 
              />
              <img 
                src="/logo-dark.png" 
                alt="Vidyapaths Logo" 
                className="h-20 sm:h-24 w-auto object-contain hidden dark:block" 
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 text-xs sm:text-sm font-bold rounded-full uppercase tracking-wider bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/60 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-orange-500 shrink-0" />
            <span>Beginning Your Path</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-900 dark:text-white tracking-tight leading-tight">
            About Vidyapaths: <span className="text-orange-500">Your Trusted Partner from Classroom to Career</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium">
            We Bridge the Gap Between Academic Confusion and Lifelong Professional Success.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white dark:bg-[#0B1220]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Mission */}
            <div className="bg-slate-50 dark:bg-[#111C2E] rounded-3xl p-8 sm:p-10 border border-slate-200/80 dark:border-[#29384F] flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-orange-500 text-white flex items-center justify-center mb-6 shadow-md">
                  <Target className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-bold text-navy-900 dark:text-white mb-4">Our Mission</h2>
                <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-6">
                  To democratize access to genuine, unbiased career counseling and college admissions guidance, ensuring no student misses out on their true potential due to misinformation or lack of timely mentorship.
                </p>
              </div>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 pt-4 border-t border-slate-200/60 dark:border-[#1E2D44]">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  Transparent information without hidden tie-up biases
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  Affordable, accessible counseling for every socio-economic group
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  Focus on long-term career growth, not just university placement
                </li>
              </ul>
            </div>

            {/* Vision */}
            <div className="bg-navy-900 dark:bg-[#17243A] text-white rounded-3xl p-8 sm:p-10 border border-navy-800 dark:border-[#29384F] flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white/10 text-orange-400 flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
                <p className="text-slate-300 text-base leading-relaxed mb-6">
                  To become India’s most trustworthy and preferred career launchpad, known for transforming uncertainty into decisive action, from school graduation to corporate leadership and international degree achievements.
                </p>
              </div>
              <ul className="space-y-2 text-sm text-slate-300 pt-4 border-t border-navy-800 dark:border-[#1E2D44]">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                  Setting high ethical standards in educational advisory
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                  Global pathway integration with 9 premier study destinations
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                  Empowering 100,000+ students with career clarity
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Student-Focused Approach */}
      <section className="py-20 bg-slate-50 dark:bg-[#0B1220] border-t border-slate-200/60 dark:border-[#1E2D44]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="The Vidyapaths Way"
            title="Our Student-Centric Advisory Philosophy"
            subtitle="Traditional consultants often push high-commission institutions. Vidyapaths does the opposite: we analyze the student's unique abilities and match them to institutions that foster genuine career development."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-[#111C2E] rounded-2xl p-7 border border-slate-200/80 dark:border-[#29384F] shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-5 font-bold text-lg">
                01
              </div>
              <h3 className="text-lg font-bold text-navy-900 dark:text-white mb-2">Unbiased Evaluation</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                We assess your 10th/12th/UG scores, competitive entrance percentiles, financial budget, and geographic comfort before recommending any course or campus.
              </p>
            </div>

            <div className="bg-white dark:bg-[#111C2E] rounded-2xl p-7 border border-slate-200/80 dark:border-[#29384F] shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5 font-bold text-lg">
                02
              </div>
              <h3 className="text-lg font-bold text-navy-900 dark:text-white mb-2">Honest Cutoff Realities</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                No false promises or unrealistic claims. We provide historical cutoff benchmarks and help you build strong backup strategies alongside your target choices.
              </p>
            </div>

            <div className="bg-white dark:bg-[#111C2E] rounded-2xl p-7 border border-slate-200/80 dark:border-[#29384F] shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5 font-bold text-lg">
                03
              </div>
              <h3 className="text-lg font-bold text-navy-900 dark:text-white mb-2">Long-Term Employability</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                An academic degree is an investment. We map the curricular strength, alumni network, internship opportunities, and corporate placements before finalizing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Vidyapaths */}
      <WhyVidyapaths />

      {/* CTA */}
      <FinalCTA 
        onOpenEnquiry={() => onOpenEnquiry?.('About Page CTA')} 
        onOpenCounselling={onOpenCounselling}
      />
    </div>
  );
}
