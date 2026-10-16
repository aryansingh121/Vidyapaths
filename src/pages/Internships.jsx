import React from 'react';
import SectionHeading from '../components/SectionHeading';
import FinalCTA from '../sections/FinalCTA';
import InternshipSection from '../sections/InternshipSection';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function Internships({ onOpenEnquiry, onOpenCounselling }) {
  const roadmapSteps = [
    {
      num: "01",
      title: "Skill Gap Audit",
      desc: "Identify high-leverage tools in your sector (e.g. React/Node, SQL, Excel, Figma, SEO, CRM tools) required by modern corporate teams."
    },
    {
      num: "02",
      title: "Project Portfolio Guidance",
      desc: "Structure 2-3 live case studies or practical GitHub repositories showing real proof of capability instead of generic classroom notes."
    },
    {
      num: "03",
      title: "ATS Resume & Profile Optimization",
      desc: "Format single-page ATS-compliant resumes and crafted professional LinkedIn outreach messaging to founders and talent managers."
    },
    {
      num: "04",
      title: "Interview & Soft-Skills Mastery",
      desc: "One-on-one mock interviews with simulated HR questions and problem-solving scenarios to build communication confidence."
    }
  ];

  return (
    <div className="pt-24 md:pt-28 bg-white min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-b from-slate-50 via-white to-white py-16 md:py-24 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-block px-3.5 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-orange-50 text-orange-600 border border-orange-200">
            Career & Corporate Readiness
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-950 tracking-tight leading-tight">
            Internship Assistance & <span className="text-orange-500">Profile Preparation</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Bridge academic learning with corporate exposure. Vidyapaths mentors undergraduate and graduate students in portfolio refinement, ATS resume structuring, and interview readiness.
          </p>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onOpenEnquiry('Internship Profile Audit')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-orange-500 hover:bg-orange-600 shadow-md shadow-orange-500/20 active:scale-95 transition-all cursor-pointer min-h-[44px]"
            >
              <span>Schedule Profile Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#internship-domains"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-navy-900 bg-slate-100 hover:bg-slate-200 transition-colors min-h-[44px]"
            >
              <span>Explore Internship Sectors</span>
            </a>
          </div>
        </div>
      </section>

      {/* Internship Focus & Domains */}
      <div id="internship-domains">
        <InternshipSection onOpenEnquiry={onOpenEnquiry} />
      </div>

      {/* Structured Roadmap */}
      <section 
        id="internship-process"
        className="py-20 bg-slate-50 border-t border-slate-200/80 scroll-mt-24 sm:scroll-mt-28"
        style={{ scrollMarginTop: '100px' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="The Preparation Journey"
            title="How We Prepare You For Meaningful Internships"
            subtitle="We do not just hand out job links. We upgrade your credentials and interviewing capability so hiring managers notice you."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {roadmapSteps.map((step, idx) => (
              <div 
                key={idx} 
                className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs hover:border-orange-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl font-black text-orange-500 mb-3 block">{step.num}</span>
                  <h4 className="text-base font-bold text-navy-950 mb-2">{step.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Guided Step</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onOpenEnquiry('Internship Guidance Request')}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-navy-950 hover:bg-navy-900 transition-colors shadow-md cursor-pointer min-h-[44px]"
            >
              <span>Get 1-on-1 Internship Mentorship</span>
              <ArrowRight className="w-4 h-4 text-orange-500" />
            </button>
          </div>
        </div>
      </section>

      {/* Ethical Transparency Disclaimer */}
      <div className="py-8 bg-white border-t border-slate-100 text-center">
        <div className="max-w-2xl mx-auto px-4 text-xs text-slate-500 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-orange-500 shrink-0" />
          <span>Vidyapaths provides training and mentorship. Selection for internships depends on student merit, performance, and employer evaluation.</span>
        </div>
      </div>

      {/* Final CTA */}
      <FinalCTA 
        onOpenEnquiry={() => onOpenEnquiry?.('Internships Page CTA')} 
        onOpenCounselling={onOpenCounselling}
      />
    </div>
  );
}
