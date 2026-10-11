import React, { useState, useMemo } from 'react';
import FinalCTA from '../sections/FinalCTA';
import { 
  collegesData, 
  commonCourseCategories, 
  directoryFilterCategories 
} from '../data/colleges';
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
  Info,
  Search,
  X,
  ExternalLink,
  Cpu,
  Briefcase,
  FlaskConical,
  Stethoscope,
  Scale,
  Palette
} from 'lucide-react';

// Stream icon mapper
const categoryIcons = {
  Cpu: Cpu,
  Briefcase: Briefcase,
  BookOpen: BookOpen,
  FlaskConical: FlaskConical,
  Stethoscope: Stethoscope,
  Scale: Scale,
  Palette: Palette
};

// Stream to directory filter mapping for quick filter buttons
const streamToCategoryMap = {
  'eng-tech': 'engineering',
  'comm-mgmt': 'management',
  'arts-hum': 'du',
  'sci': 'du',
  'med-health': 'medical',
  'law': 'law-media',
  'design-media': 'law-media'
};

export default function Colleges({ onOpenEnquiry }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Track open/closed state for each college card accordion
  const [expandedMap, setExpandedMap] = useState(() => {
    // Expand the first college card initially for preview
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

  // Filtered colleges based on search and category tab
  const filteredColleges = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return collegesData.filter((college) => {
      // Category filter match
      const matchesCategory = 
        activeCategory === 'all' || 
        (college.categories && college.categories.includes(activeCategory));

      if (!matchesCategory) return false;

      // Search query match
      if (!query) return true;

      const nameMatch = college.name.toLowerCase().includes(query);
      const univMatch = college.university && college.university.toLowerCase().includes(query);
      const locMatch = college.location && college.location.toLowerCase().includes(query);
      const areaMatch = college.programAreas && college.programAreas.toLowerCase().includes(query);
      const programMatch = college.programs && college.programs.some(
        p => p.name.toLowerCase().includes(query) || (p.description && p.description.toLowerCase().includes(query))
      );

      return nameMatch || univMatch || locMatch || areaMatch || programMatch;
    });
  }, [searchQuery, activeCategory]);

  const handleStreamClick = (streamId) => {
    const targetCategory = streamToCategoryMap[streamId] || 'all';
    setActiveCategory(targetCategory);
    const directorySection = document.getElementById('college-directory');
    if (directorySection) {
      directorySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
  };

  return (
    <div className="pt-24 md:pt-28 bg-white min-h-screen">
      
      {/* ====================================================
          A. HERO SECTION
          ==================================================== */}
      <section className="bg-gradient-to-b from-slate-50 via-white to-white py-14 sm:py-20 md:py-24 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>Delhi Higher Education Directory</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-navy-950 tracking-tight leading-tight">
            Explore <span className="text-orange-500">Colleges & Courses</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Explore colleges across Delhi and discover programs in engineering, management, commerce, science, humanities, healthcare, law, design, and other fields. Get guidance to choose a suitable academic path.
          </p>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onOpenEnquiry('Colleges Page Hero')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-orange-500 hover:bg-orange-600 shadow-md shadow-orange-500/20 active:scale-95 transition-all cursor-pointer min-h-[46px]"
            >
              <span>Get Admission Guidance</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#college-directory"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-navy-900 bg-slate-100 hover:bg-slate-200 transition-colors min-h-[46px]"
            >
              <BookOpen className="w-4 h-4 text-orange-500" />
              <span>Browse 80+ Institutions</span>
            </a>
          </div>

          {/* Verification Integrity Notice */}
          <div className="mt-8 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 max-w-2xl mx-auto text-xs text-slate-500 flex items-center justify-center gap-2">
            <Info className="w-4 h-4 text-orange-500 shrink-0" />
            <span>Directory data compiled from official Delhi university records and institution prospectuses. Admission cutoffs & quotas are governed by official university notices.</span>
          </div>
        </div>
      </section>

      {/* ====================================================
          B. COMMON COURSE CATEGORIES & STREAMS
          ==================================================== */}
      <section id="academic-streams" className="py-16 md:py-20 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block mb-2">
              Academic Streams
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy-950 mb-3">
              Common Course Categories
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Explore key disciplines offered across Delhi NCR universities. Click any stream to view institutions offering related programs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {commonCourseCategories.map((cat) => {
              const IconComponent = categoryIcons[cat.icon] || BookOpen;
              return (
                <div
                  key={cat.id}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:border-orange-300 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 mb-4 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <h3 className="text-lg font-bold text-navy-950 mb-2">
                      {cat.name}
                    </h3>

                    <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                      {cat.description}
                    </p>

                    <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100 mb-4">
                      <span className="text-[11px] font-semibold text-slate-600 block mb-1">
                        Key Degrees & Specializations:
                      </span>
                      <p className="text-[11px] text-slate-500 leading-normal">
                        {cat.programs}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleStreamClick(cat.id)}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold text-orange-600 bg-orange-50 hover:bg-orange-100 transition-colors cursor-pointer min-h-[38px]"
                  >
                    <span>View Institutions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================
          C. COLLEGE & UNIVERSITY DIRECTORY (SEARCH & FILTERS)
          ==================================================== */}
      <section id="college-directory" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block mb-1">
                Verified Directory
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy-950">
                Delhi Institutions & Universities
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Explore official Delhi University colleges, premier central universities, medical institutions, and specialized colleges.
              </p>
            </div>
            
            <div className="shrink-0 flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-navy-50 text-navy-950 border border-navy-100">
                Showing {filteredColleges.length} of {collegesData.length} Institutions
              </span>
            </div>
          </div>

          {/* Search Bar & Category Filter Controls */}
          <div className="space-y-4 mb-10">
            {/* Search Input */}
            <div className="relative max-w-3xl">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by college name, university, or program (e.g. SRCC, BTech, Economics, AIIMS, Nursing)..."
                className="w-full pl-11 pr-10 py-3.5 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-base md:text-sm bg-white text-navy-900 placeholder:text-slate-400 placeholder:font-normal placeholder:opacity-100 transition-all shadow-xs min-h-[48px]"
                aria-label="Search college directory"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  aria-label="Clear search text"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter Pills (Scrollable Container) */}
            <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="flex items-center gap-1.5 min-w-max" role="tablist" aria-label="Directory Categories">
                {directoryFilterCategories.map((filter) => {
                  const isActive = activeCategory === filter.id;
                  return (
                    <button
                      key={filter.id}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveCategory(filter.id)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap min-h-[40px] flex items-center border ${
                        isActive
                          ? 'bg-navy-950 text-white border-navy-950 shadow-xs'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-navy-950'
                      }`}
                    >
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Query Helper */}
            {(searchQuery || activeCategory !== 'all') && (
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-500">
                <span>Active filters:</span>
                {activeCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-orange-50 text-orange-700 border border-orange-200">
                    Category: {directoryFilterCategories.find(c => c.id === activeCategory)?.label}
                    <button 
                      onClick={() => setActiveCategory('all')}
                      className="hover:text-orange-950 ml-0.5 cursor-pointer"
                      aria-label="Remove category filter"
                    >
                      ×
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                    Keyword: "{searchQuery}"
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="hover:text-blue-950 ml-0.5 cursor-pointer"
                      aria-label="Remove keyword filter"
                    >
                      ×
                    </button>
                  </span>
                )}
                <button
                  onClick={handleClearFilters}
                  className="text-xs text-orange-600 hover:underline font-semibold ml-2 cursor-pointer"
                >
                  Reset all
                </button>
              </div>
            )}
          </div>

          {/* Institution Cards Grid */}
          <div className="space-y-6">
            {filteredColleges.map((college) => {
              const isExpanded = !!expandedMap[college.id];

              return (
                <div
                  key={college.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-orange-300 hover:shadow-md transition-all duration-200 overflow-hidden"
                >
                  {/* Card Header & Summary */}
                  <div className="p-5 sm:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="space-y-3 flex-1">
                      
                      {/* Affiliation & Category Badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        {college.university && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                            <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            <span>{college.university}</span>
                          </span>
                        )}
                        {college.location && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700">
                            <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                            <span>{college.location}</span>
                          </span>
                        )}
                      </div>

                      {/* Institution Name */}
                      <h3 className="text-xl sm:text-2xl font-bold text-navy-950 tracking-tight">
                        {college.name}
                      </h3>

                      {/* Broad Program Areas */}
                      {college.programAreas && (
                        <div className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                          <strong className="text-slate-800">Key Offerings: </strong>
                          {college.programAreas}
                        </div>
                      )}

                      {/* Verification Caveat Notice */}
                      {college.caveat && (
                        <div className="text-[11px] text-slate-500 flex items-center gap-1.5 italic">
                          <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{college.caveat}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap sm:flex-nowrap lg:flex-col items-center sm:items-stretch gap-2.5 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                      
                      {/* View Programs Toggle */}
                      <button
                        onClick={() => toggleExpand(college.id)}
                        className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer min-h-[42px] ${
                          isExpanded
                            ? 'bg-navy-950 text-white shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                        }`}
                        aria-expanded={isExpanded}
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>{isExpanded ? "Hide Programs" : `View Programs (${college.programs.length})`}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 ml-0.5" />
                        ) : (
                          <ChevronDown className="w-4 h-4 ml-0.5" />
                        )}
                      </button>

                      {/* Get Admission Guidance */}
                      <button
                        onClick={() => onOpenEnquiry({ service: 'college-admission', college: college.name })}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 shadow-sm active:scale-95 transition-all cursor-pointer min-h-[42px] whitespace-nowrap"
                      >
                        <span>Get Admission Guidance</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      {/* Official Website Link (if provided) */}
                      {college.officialWebsite && (
                        <a
                          href={college.officialWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-navy-950 hover:bg-slate-100 transition-colors border border-slate-200 min-h-[38px]"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                          <span>Official Portal</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Expandable Associated Programs Accordion */}
                  {isExpanded && (
                    <div className="border-t border-slate-200 bg-slate-50/70 p-5 sm:p-7 animate-in slide-in-from-top-2 duration-200">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xs sm:text-sm font-bold text-navy-950 uppercase tracking-wider flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-orange-500" />
                          <span>Offered Programs Under {college.name}</span>
                        </h4>
                        <span className="text-xs font-semibold text-slate-500">
                          {college.programs.length} program pathways listed
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                        {college.programs.map((program, pIdx) => {
                          const levelUpper = (program.level || '').toUpperCase();
                          const isUg = levelUpper.includes('UG') || levelUpper.includes('UNDERGRADUATE');
                          const isPg = levelUpper.includes('PG') || levelUpper.includes('MASTER');
                          const isDoc = levelUpper.includes('DOCTORAL') || levelUpper.includes('PHD');

                          return (
                            <div
                              key={pIdx}
                              className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-orange-200 transition-colors"
                            >
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                                    isUg
                                      ? 'bg-blue-50 text-blue-700 border border-blue-100'
                                      : isPg
                                      ? 'bg-purple-50 text-purple-700 border border-purple-100'
                                      : isDoc
                                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                      : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                  }`}>
                                    {program.level || 'Degree Track'}
                                  </span>
                                  {program.duration && (
                                    <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                                      <Clock className="w-3 h-3 text-slate-400" />
                                      {program.duration}
                                    </span>
                                  )}
                                </div>

                                <h5 className="text-sm font-bold text-navy-950 mb-1.5 leading-snug">
                                  {program.name}
                                </h5>

                                {program.description && (
                                  <p className="text-xs text-slate-500 leading-relaxed mb-3">
                                    {program.description}
                                  </p>
                                )}
                              </div>

                              <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-2">
                                <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                  Guidance Available
                                </span>
                                <button
                                  onClick={() => onOpenEnquiry({ service: 'college-admission', college: college.name, course: program.name })}
                                  className="text-xs font-bold text-orange-600 hover:text-orange-700 cursor-pointer inline-flex items-center gap-1"
                                >
                                  <span>Enquire</span>
                                  <ArrowRight className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-500">
                        <span>Check official university portal for exact syllabus, prerequisites, and seat reservations.</span>
                        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                          <button
                            onClick={() => onOpenEnquiry({ service: 'college-comparison', college: college.name })}
                            className="font-semibold text-slate-600 hover:text-orange-600 hover:underline cursor-pointer"
                          >
                            Compare Options
                          </button>
                          <span className="text-slate-300">•</span>
                          <button
                            onClick={() => onOpenEnquiry({ service: 'college-admission', college: college.name })}
                            className="font-bold text-orange-600 hover:underline cursor-pointer"
                          >
                            Request Counselling for {college.name} →
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Empty Search State */}
          {filteredColleges.length === 0 && (
            <div className="text-center py-16 px-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-navy-950 mb-2">No Institutions Found</h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-5 leading-relaxed">
                We couldn't find any institutions matching your search for "{searchQuery}". Try searching by course type (e.g. BTech, Commerce, Medical) or resetting filters.
              </p>
              <button
                onClick={handleClearFilters}
                className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-navy-950 hover:bg-navy-900 cursor-pointer transition-all"
              >
                Reset All Filters
              </button>
            </div>
          )}

        </div>
      </section>

      {/* ====================================================
          D. 1-ON-1 ADMISSION GUIDANCE CTA
          ==================================================== */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-block px-3.5 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-orange-50 text-orange-600 border border-orange-200">
            Expert Advisory
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy-950">
            Need Help Choosing the Right College?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Our team can help you explore suitable courses, understand the CUET, JEE, NEET or institutional admission process, and prepare a personalized college shortlist based on your scores and preferences.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenEnquiry('Colleges Page Final CTA')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm sm:text-base text-white bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/25 active:scale-95 transition-all cursor-pointer min-h-[48px]"
            >
              <span>Get Free Admission Counselling</span>
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
