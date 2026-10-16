import React from 'react';
import { Target, Eye } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import WhyVidyapaths from '../sections/WhyVidyapaths';
import FinalCTA from '../sections/FinalCTA';

export default function About({ onOpenEnquiry, onOpenCounselling }) {
  return (
    <div className="pt-24 md:pt-28">
      {/* About Hero Header */}
      <section className="bg-slate-50 py-16 md:py-24 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-block px-3.5 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-orange-50 text-orange-600 border border-orange-200">
            About Vidyapaths
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-900 tracking-tight">
            Empowering Students to Make <span className="text-orange-500">Confident Career Choices</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Vidyapaths is an ethical, student-first educational consultancy founded with one clear commitment: to bring clarity, honesty, and strategic mentorship to every student's academic and career journey.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Mission */}
            <div className="bg-slate-50 rounded-3xl p-8 sm:p-10 border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-orange-500 text-white flex items-center justify-center mb-6 shadow-md">
                  <Target className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-bold text-navy-900 mb-4">Our Mission</h2>
                <p className="text-slate-600 text-base leading-relaxed mb-6">
                  To democratize access to genuine, unbiased career counseling and college admissions guidance, ensuring no student misses out on their true potential due to misinformation or lack of timely mentorship.
                </p>
              </div>
              <ul className="space-y-2 text-sm text-slate-700 pt-4 border-t border-slate-200/60">
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
            <div className="bg-navy-900 text-white rounded-3xl p-8 sm:p-10 border border-navy-800 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white/10 text-orange-400 flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
                <p className="text-slate-300 text-base leading-relaxed mb-6">
                  To become India’s most trustworthy and preferred career launchpad, known for transforming uncertainty into decisive action, from school graduation to corporate leadership and international degree achievements.
                </p>
              </div>
              <ul className="space-y-2 text-sm text-slate-300 pt-4 border-t border-navy-800">
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
      <section className="py-20 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="The Vidyapaths Way"
            title="Our Student-Centric Advisory Philosophy"
            subtitle="Traditional consultants often push high-commission institutions. Vidyapaths does the opposite: we analyze the student's unique abilities and match them to institutions that foster genuine career development."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-5 font-bold text-lg">
                01
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">Unbiased Evaluation</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We assess your 10th/12th/UG scores, competitive entrance percentiles, financial budget, and geographic comfort before recommending any course or campus.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 font-bold text-lg">
                02
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">Honest Cutoff Realities</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                No false promises or unrealistic claims. We provide historical cutoff benchmarks and help you build strong backup strategies alongside your target choices.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 font-bold text-lg">
                03
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">Long-Term Employability</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
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
