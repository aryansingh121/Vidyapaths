import React, { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import FinalCTA from '../sections/FinalCTA';
import { countriesData } from '../data/countriesData';
import { 
  Globe, 
  Plane, 
  FileCheck, 
  GraduationCap, 
  ShieldCheck, 
  ArrowRight, 
  Calendar, 
  Briefcase, 
  CheckCircle2 
} from 'lucide-react';

export default function StudyAbroad({ onOpenEnquiry }) {
  const [selectedCountry, setSelectedCountry] = useState(countriesData[0]);

  const processSteps = [
    {
      num: "01",
      title: "Profile Assessment",
      desc: "Detailed evaluation of academic marks, GRE/GMAT/IELTS requirements, budget constraints, and career aims."
    },
    {
      num: "02",
      title: "Country & Course Selection",
      desc: "Balancing university global ranking, tuition costs, part-time work flexibility, and post-study work visa rights."
    },
    {
      num: "03",
      title: "SOP & LOR Mentorship",
      desc: "Drafting unique, impactful Statements of Purpose and recommendation letters that convince admissions committees."
    },
    {
      num: "04",
      title: "Application Submission",
      desc: "Meticulous filing before intake deadlines to maximize admission offer letters and merit scholarship chances."
    },
    {
      num: "05",
      title: "Visa Filing & Mock Interviews",
      desc: "Full guidance on financial proof documents, embassy interview preparation, and genuine student validation."
    },
    {
      num: "06",
      title: "Pre-Departure & Forex",
      desc: "Student accommodation assistance, international student bank accounts, discounted flight tickets, and SIM cards."
    }
  ];

  return (
    <div className="pt-24 md:pt-28">
      {/* Hero Header */}
      <section className="bg-navy-900 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <span className="inline-block px-3.5 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-orange-500/20 text-orange-400 border border-orange-500/30">
            Global Education Mentorship
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Study at Top Universities Across <span className="text-orange-500">9 Countries</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            From premier European institutions with zero tuition fees to high-ROI STEM degrees in the USA and UK, Vidyapaths ensures your overseas education dream is strategically executed.
          </p>
          <div className="pt-4">
            <button
              onClick={() => onOpenEnquiry('Study Abroad Initial Assessment')}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
            >
              <span>Get Free Country Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 9 Countries Detailed Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Top Global Destinations"
            title="Explore Premier Higher Education Countries"
            subtitle="Click on any country to review its popular academic disciplines, post-study work regulations, and upcoming application intakes."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {countriesData.map((country) => (
              <div
                key={country.id}
                className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-orange-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{country.flag}</span>
                      <div>
                        <h3 className="text-xl font-bold text-navy-900 group-hover:text-orange-600 transition-colors">
                          {country.name}
                        </h3>
                        <span className="text-xs font-semibold text-slate-500">
                          {country.short}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                    {country.highlights}
                  </p>

                  <div className="space-y-3 pt-3 border-t border-slate-100 text-xs">
                    <div>
                      <span className="font-bold text-slate-700 block mb-1">Post-Study Work Rights:</span>
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold inline-block">
                        {country.workPermit}
                      </span>
                    </div>

                    <div>
                      <span className="font-bold text-slate-700 block mb-1">Target Intakes:</span>
                      <span className="text-slate-600 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                        {country.intakes}
                      </span>
                    </div>

                    <div>
                      <span className="font-bold text-slate-700 block mb-1">Top Career Disciplines:</span>
                      <div className="flex flex-wrap gap-1">
                        {country.popularCourses.map((c, i) => (
                          <span key={i} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px]">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Applications Open</span>
                  <button
                    onClick={() => onOpenEnquiry(`Study Abroad - ${country.name}`)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-navy-900 hover:bg-orange-500 px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Apply for {country.short}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 Step Global Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="The Process"
            title="Your 6-Step Pathway to an Overseas Degree"
            subtitle="From the very first aptitude consultation to landing at your overseas campus, Vidyapaths handles every critical milestone."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-orange-200 hover:shadow-lg transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-navy-900 text-orange-400 font-bold flex items-center justify-center mb-4 text-sm">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-2">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <FinalCTA onOpenEnquiry={() => onOpenEnquiry('Study Abroad Page CTA')} />
    </div>
  );
}
