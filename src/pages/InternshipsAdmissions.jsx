import React, { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import FinalCTA from '../sections/FinalCTA';
import CollegeAdmissionSection from '../sections/CollegeAdmissionSection';
import InternshipSection from '../sections/InternshipSection';
import { 
  Briefcase, 
  GraduationCap, 
  CheckCircle2, 
  FileCheck, 
  Users, 
  Compass, 
  ArrowRight,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

export default function InternshipsAdmissions({ onOpenEnquiry }) {
  const [activeSection, setActiveSection] = useState('admissions'); // 'admissions' | 'internships'

  return (
    <div className="pt-24 md:pt-28">
      {/* Header */}
      <section className="bg-slate-50 py-16 md:py-24 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-block px-3.5 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-orange-50 text-orange-600 border border-orange-200">
            Admissions & Career Readiness
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-900 tracking-tight">
            College Admissions & <span className="text-orange-500">Internship Assistance</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Gain direct entry to accredited institutions across engineering, management, technology, and design, and accelerate your market-ready profile with high-impact internships.
          </p>

          <div className="flex justify-center gap-3 pt-4">
            <button
              onClick={() => setActiveSection('admissions')}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeSection === 'admissions'
                  ? 'bg-navy-900 text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              College Admissions Hub
            </button>
            <button
              onClick={() => setActiveSection('internships')}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeSection === 'internships'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Internship Readiness Hub
            </button>
          </div>
        </div>
      </section>

      {/* College Admissions View */}
      {activeSection === 'admissions' && (
        <div className="animate-in fade-in duration-300">
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-navy-900 mb-2">Unbiased Shortlisting</h3>
                  <p className="text-xs text-slate-600">
                    We evaluate your entrance exam percentiles (JEE, CUET, CAT, MAT, State CETs) and shortlist colleges matching your score and budget.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-navy-900 mb-2">Accredited Campuses Only</h3>
                  <p className="text-xs text-slate-600">
                    All partner institutions hold recognized UGC, AICTE, NAAC ‘A’ grade, and NIRF rankings ensuring authentic degrees.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-navy-900 mb-2">Merit & Spot Counselling</h3>
                  <p className="text-xs text-slate-600">
                    Timely alerts on vacant seat counseling rounds, institutional scholarships, and fee concessions to save you lakhs.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <CollegeAdmissionSection onOpenEnquiry={onOpenEnquiry} />
        </div>
      )}

      {/* Internships View */}
      {activeSection === 'internships' && (
        <div className="animate-in fade-in duration-300">
          <InternshipSection onOpenEnquiry={onOpenEnquiry} />

          {/* Internship Methodology */}
          <section className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="The Internship Roadmap"
                title="How We Prepare You For Top Internships"
                subtitle="We do not just hand you job links. We upgrade your profile so corporate hiring teams enthusiastically interview you."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-2xl font-black text-orange-500 mb-3 block">01</span>
                  <h4 className="text-base font-bold text-navy-900 mb-2">Skill Gap Audit</h4>
                  <p className="text-xs text-slate-600">
                    Identify high-leverage tools in your sector (e.g. React/Node, SQL, Excel, Figma, SEO, CRM tools) you need to master.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-2xl font-black text-orange-500 mb-3 block">02</span>
                  <h4 className="text-base font-bold text-navy-900 mb-2">Project Portfolio</h4>
                  <p className="text-xs text-slate-600">
                    Structure 2-3 live case studies or GitHub repositories showing proof of work instead of generic college assignments.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-2xl font-black text-orange-500 mb-3 block">03</span>
                  <h4 className="text-base font-bold text-navy-900 mb-2">Resume & Cold Outreach</h4>
                  <p className="text-xs text-slate-600">
                    Format single-page ATS resumes and crafted LinkedIn outreach messages directly to founders and talent managers.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-2xl font-black text-orange-500 mb-3 block">04</span>
                  <h4 className="text-base font-bold text-navy-900 mb-2">Interview Mastery</h4>
                  <p className="text-xs text-slate-600">
                    One-on-one mock interview with simulated HR questions and problem-solving scenarios to ensure you get selected.
                  </p>
                </div>
              </div>

              <div className="mt-12 text-center">
                <button
                  onClick={() => onOpenEnquiry('Internship Profile Audit')}
                  className="px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-orange-500 hover:bg-orange-600 transition-colors shadow-md cursor-pointer"
                >
                  Schedule Your Profile Audit
                </button>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Final CTA */}
      <FinalCTA onOpenEnquiry={() => onOpenEnquiry('Internships/Admissions CTA')} />
    </div>
  );
}
