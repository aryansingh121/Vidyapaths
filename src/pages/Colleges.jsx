import React, { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import FinalCTA from '../sections/FinalCTA';
import { collegesData, programCategories } from '../data/colleges';
import { 
  GraduationCap, 
  MapPin, 
  BookOpen, 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Clock, 
  Building2,
  Info
} from 'lucide-react';

export default function Colleges({ onOpenEnquiry }) {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Track open/closed state for each college card independently
  const [expandedMap, setExpandedMap] = useState(() => {
    // Open the first college by default for instant preview
    const initial = {};
    if (collegesData.length > 0) {
      initial[collegesData[0].id] = true;
    }
    return initial;
  });

  const toggleExpand = (collegeId) => {
    setExpandedMap(prev => ({
      ...prev,
      [collegeId]: !prev[collegeId]
    }));
  };

  // Filter colleges based on whether they offer programs in the selected category
  const filteredColleges = collegesData.filter(college => {
    if (activeCategory === 'all') return true;
    return college.programs.some(p => p.category === activeCategory);
  });

  return (
    <div className="pt-24 md:pt-28 bg-white min-h-screen">
      
      {/* A. Hero Section */}
      <section className="bg-gradient-to-b from-slate-50 via-white to-white py-16 md:py-24 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>Academic Pathways & Admissions</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-950 tracking-tight leading-tight">
            Explore <span className="text-orange-500">Colleges & Courses</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover colleges and explore undergraduate, postgraduate, and specialized programs. Get personalized guidance to choose a course that fits your interests and career goals.
          </p>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onOpenEnquiry('Colleges Page Hero')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-orange-500 hover:bg-orange-600 shadow-md shadow-orange-500/20 active:scale-95 transition-all cursor-pointer min-h-[44px]"
            >
              <span>Get Admission Guidance</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#college-catalogue"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-navy-900 bg-slate-100 hover:bg-slate-200 transition-colors min-h-[44px]"
            >
              <span>Browse Programs Below</span>
            </a>
          </div>

          {/* Ethical Disclosure Banner */}
          <div className="mt-8 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 max-w-2xl mx-auto text-xs text-slate-500 flex items-center justify-center gap-2">
            <Info className="w-4 h-4 text-orange-500 shrink-0" />
            <span>Catalogue listings are editable and will be updated with client-verified institution records upon official handover.</span>
          </div>
        </div>
      </section>

      {/* D. Program Browsing Category Tabs */}
      <section id="college-catalogue" className="py-12 bg-slate-50/50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-navy-950 mb-2">Browse Programs by Category</h2>
            <p className="text-xs sm:text-sm text-slate-600">Select a category to view offering institutions and curriculum areas.</p>
          </div>

          <div className="flex justify-center overflow-x-auto max-w-full pb-2" role="tablist" aria-label="Program Categories">
            <div className="inline-flex p-1.5 rounded-xl bg-slate-200/80 border border-slate-300/50 shrink-0 gap-1">
              {programCategories.map((cat) => {
                const isSelected = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      // When switching to a specific category, ensure cards are expanded so programs are visible immediately
                      if (cat.id !== 'all') {
                        const openAll = {};
                        collegesData.forEach(c => { openAll[c.id] = true; });
                        setExpandedMap(openAll);
                      }
                    }}
                    className={`px-4 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap min-h-[40px] flex items-center ${
                      isSelected
                        ? 'bg-white text-navy-950 shadow-sm font-bold'
                        : 'text-slate-600 hover:text-navy-950 hover:bg-white/50'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* B. College Listings & C. Associated Programs */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block mb-1">
                Participating Institutions
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
                Colleges Offering Programs ({filteredColleges.length})
              </h3>
            </div>
            <p className="text-xs text-slate-500 max-w-md">
              Each card details programs associated exclusively with that institution. Click <strong className="text-navy-900">View Programs</strong> to expand courses.
            </p>
          </div>

          <div className="space-y-8">
            {filteredColleges.map((college) => {
              const isExpanded = !!expandedMap[college.id];
              
              // Filter this college's programs by the currently selected category
              const displayedPrograms = activeCategory === 'all'
                ? college.programs
                : college.programs.filter(p => p.category === activeCategory);

              return (
                <div
                  key={college.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-orange-300 hover:shadow-md transition-all duration-200 overflow-hidden"
                >
                  {/* College Header Card */}
                  <div className="p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white">
                    <div className="space-y-3 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                          <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{college.type}</span>
                        </span>
                        {college.badge && (
                          <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
                            {college.badge}
                          </span>
                        )}
                      </div>

                      <h4 className="text-xl sm:text-2xl font-bold text-navy-950">
                        {college.name}
                      </h4>

                      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                        <span>Campus Location: {college.location}</span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                        {college.description}
                      </p>

                      <div className="pt-1 flex flex-wrap items-center gap-1.5 text-xs">
                        <span className="font-semibold text-slate-700 mr-1">Available Tracks:</span>
                        {college.programs.map((p, idx) => (
                          <span key={idx} className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded text-[11px]">
                            {p.name.split(' (')[0]}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-row lg:flex-col items-center sm:items-stretch gap-3 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                      <button
                        onClick={() => toggleExpand(college.id)}
                        className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer min-h-[42px] ${
                          isExpanded
                            ? 'bg-navy-950 text-white shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                        }`}
                        aria-expanded={isExpanded}
                      >
                        <span>{isExpanded ? "Hide Programs" : "View Programs"}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>

                      <button
                        onClick={() => onOpenEnquiry(`Admission Guidance - ${college.name}`)}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 shadow-sm active:scale-95 transition-all cursor-pointer min-h-[42px] whitespace-nowrap"
                      >
                        <span>Get Admission Guidance</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* C. Programs List (Accordion Panel) */}
                  {isExpanded && (
                    <div className="border-t border-slate-200 bg-slate-50/60 p-6 sm:p-8 animate-in slide-in-from-top-2 duration-200">
                      <div className="flex items-center justify-between mb-4">
                        <h5 className="text-sm font-bold text-navy-950 uppercase tracking-wider flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-orange-500" />
                          <span>Offered Programs Under {college.name}</span>
                        </h5>
                        <span className="text-xs font-semibold text-slate-500">
                          Showing {displayedPrograms.length} of {college.programs.length} programs
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {displayedPrograms.map((program, pIdx) => (
                          <div
                            key={pIdx}
                            className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-orange-200 transition-colors"
                          >
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                                  program.category === 'ug'
                                    ? 'bg-blue-50 text-blue-700 border border-blue-100'
                                    : program.category === 'pg'
                                    ? 'bg-purple-50 text-purple-700 border border-purple-100'
                                    : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                }`}>
                                  {program.category === 'ug' ? 'Undergraduate' : program.category === 'pg' ? 'Postgraduate' : 'Specialized'}
                                </span>
                                {program.duration && (
                                  <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                                    <Clock className="w-3 h-3 text-slate-400" />
                                    {program.duration}
                                  </span>
                                )}
                              </div>

                              <h6 className="text-sm font-bold text-navy-950 mb-1.5">
                                {program.name}
                              </h6>

                              <p className="text-xs text-slate-500 leading-relaxed mb-3">
                                {program.description}
                              </p>
                            </div>

                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                              <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                Admissions Advisory Open
                              </span>
                              <button
                                onClick={() => onOpenEnquiry(`Admission Guidance: ${program.name} at ${college.name}`)}
                                className="text-xs font-bold text-orange-600 hover:text-orange-700 cursor-pointer"
                              >
                                Enquire →
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {displayedPrograms.length === 0 && (
                        <div className="text-center py-6 text-xs text-slate-500">
                          No programs found in the "{activeCategory.toUpperCase()}" category for this institution. Switch category tab to view other programs.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Fallback for when category filters show no colleges */}
          {filteredColleges.length === 0 && (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-sm text-slate-600 mb-4">No institutions found matching the current program category filter.</p>
              <button
                onClick={() => setActiveCategory('all')}
                className="px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-navy-950 hover:bg-navy-900 cursor-pointer"
              >
                Reset to All Programs
              </button>
            </div>
          )}

        </div>
      </section>

      {/* E. Admission Guidance CTA */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-block px-3.5 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-orange-50 text-orange-600 border border-orange-200">
            Expert Advisory
          </span>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy-950">
            Need Help Choosing the Right College?
          </h3>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Our team can help you explore suitable courses and understand the admission process. Get 100% unbiased counselling tailored to your scores and budget.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenEnquiry('Colleges Page Final CTA')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm sm:text-base text-white bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/25 active:scale-95 transition-all cursor-pointer min-h-[48px]"
            >
              <span>Get Free Counselling</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Global Final CTA Banner */}
      <FinalCTA onOpenEnquiry={() => onOpenEnquiry('Colleges Page Final Banner')} />

    </div>
  );
}
