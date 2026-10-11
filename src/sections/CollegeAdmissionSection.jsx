import React, { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import { coursesData } from '../data/coursesData';
import { 
  GraduationCap, 
  ArrowRight, 
  Check, 
  Clock, 
  TrendingUp, 
  Cpu, 
  Code, 
  CircleDollarSign, 
  Megaphone, 
  Utensils, 
  Palette, 
  Radio 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const specializationIcons = {
  TrendingUp,
  Cpu,
  Code,
  CircleDollarSign,
  Megaphone,
  Utensils,
  Palette,
  Radio
};

export default function CollegeAdmissionSection({ onOpenEnquiry }) {
  const [activeTab, setActiveTab] = useState('ug'); // 'ug', 'pg', 'domains'

  const handleTabClick = (tabKey, e) => {
    setActiveTab(tabKey);
    if (e?.currentTarget) {
      e.currentTarget.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  };

  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="College Admissions"
          title="Top Undergraduate & Postgraduate Programs"
          subtitle="Explore leading course disciplines with cutoff trends, eligibility breakdown, and direct admission counselling across India's premier accredited institutions."
        />

        {/* Tab Switcher */}
        <div className="w-full max-w-full mb-10 box-border">
          <div 
            className="flex items-center justify-start md:justify-center overflow-x-auto pb-2.5 pt-1 px-4 sm:px-0 -mx-4 sm:mx-0 scroll-smooth touch-pan-x overscroll-x-contain"
            role="tablist"
            aria-label="Course Categories"
          >
            <div className="inline-flex p-1.5 rounded-xl bg-slate-200/80 border border-slate-300/50 shrink-0 gap-1 sm:gap-1.5">
              <button
                role="tab"
                aria-selected={activeTab === 'ug'}
                onClick={(e) => handleTabClick('ug', e)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                  activeTab === 'ug'
                    ? 'bg-white text-navy-900 shadow-sm'
                    : 'text-slate-600 hover:text-navy-900'
                }`}
              >
                Undergraduate (UG)
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'pg'}
                onClick={(e) => handleTabClick('pg', e)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                  activeTab === 'pg'
                    ? 'bg-white text-navy-900 shadow-sm'
                    : 'text-slate-600 hover:text-navy-900'
                }`}
              >
                Postgraduate (PG)
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'domains'}
                onClick={(e) => handleTabClick('domains', e)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                  activeTab === 'domains'
                    ? 'bg-white text-navy-900 shadow-sm'
                    : 'text-slate-600 hover:text-navy-900'
                }`}
              >
                Industry Specializations
              </button>
            </div>
          </div>
        </div>

        {/* Tab 1: Undergraduate */}
        {activeTab === 'ug' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
            {coursesData.undergraduate.map((course, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-orange-200 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-orange-50 text-orange-600 border border-orange-100">
                      {course.tag}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {course.duration}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-navy-900 mb-1 group-hover:text-orange-600 transition-colors">
                    {course.name}
                  </h3>

                  <p className="text-xs text-slate-600 mb-4">
                    Key Focus: {course.focus}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Admissions Open 2026</span>
                  <button
                    onClick={() => onOpenEnquiry({ service: 'college-admission', course: course.name })}
                    className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Get Guidance</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Postgraduate */}
        {activeTab === 'pg' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
            {coursesData.postgraduate.map((course, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-orange-200 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                      {course.tag}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {course.duration}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-navy-900 mb-1 group-hover:text-orange-600 transition-colors">
                    {course.name}
                  </h3>

                  <p className="text-xs text-slate-600 mb-4">
                    Key Focus: {course.focus}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Spot Counselling</span>
                  <button
                    onClick={() => onOpenEnquiry({ service: 'college-admission', course: course.name })}
                    className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Get Guidance</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Specializations */}
        {activeTab === 'domains' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-300">
            {coursesData.specializations.map((spec, idx) => {
              const Icon = specializationIcons[spec.icon] || TrendingUp;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-orange-200 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>

                    <h4 className="text-base font-bold text-navy-900 mb-1">
                      {spec.domain}
                    </h4>

                    <p className="text-xs text-slate-500 mb-3">
                      {spec.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      {spec.count}
                    </span>
                    <button
                      onClick={() => onOpenEnquiry({ service: 'college-admission', course: spec.domain })}
                      className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Get Guidance</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom CTA block */}
        <div className="mt-14 bg-white rounded-2xl p-8 border border-slate-200 text-center max-w-3xl mx-auto shadow-xs">
          <h4 className="text-xl font-bold text-navy-900 mb-2">Want to Compare Cutoffs and Course Fees?</h4>
          <p className="text-sm text-slate-600 mb-6">
            Our counselors will share unbiased college comparison sheets tailored to your academic score, location preferences, and career expectations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onOpenEnquiry({ service: 'college-comparison' })}
              className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-orange-500 hover:bg-orange-600 transition-colors shadow-sm cursor-pointer"
            >
              Get Free College Comparison
            </button>
            <Link
              to="/colleges"
              className="px-6 py-3 rounded-xl font-semibold text-sm text-navy-900 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              Explore Colleges Catalogue
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
