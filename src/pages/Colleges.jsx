import React, { useState, useMemo, useEffect } from 'react';
import FinalCTA from '../sections/FinalCTA';
import CollegeLocationFilter from '../components/CollegeLocationFilter';
import CollegeCard from '../components/CollegeCard';
import { 
  collegesData, 
  commonCourseCategories, 
  directoryFilterCategories,
  DELHI_NCR_CITIES 
} from '../data/colleges';
import { 
  BookOpen, 
  ArrowRight, 
  Sparkles, 
  Info,
  Search,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Briefcase,
  FlaskConical,
  Stethoscope,
  Scale,
  Palette
} from 'lucide-react';

// Stream icon mapper
const categoryIcons = {
  Cpu,
  Briefcase,
  BookOpen,
  FlaskConical,
  Stethoscope,
  Scale,
  Palette
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

const ITEMS_PER_PAGE = 15;

export default function Colleges({ onOpenEnquiry, onOpenCounselling }) {
  // Primary Location & Stream Filter States
  const [selectedState, setSelectedState] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [courseQuery, setCourseQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  // Track open/closed state for each college card accordion
  const [expandedMap, setExpandedMap] = useState({});

  const toggleExpand = (collegeId) => {
    setExpandedMap(prev => ({
      ...prev,
      [collegeId]: !prev[collegeId]
    }));
  };

  // Reset to first page whenever any filter criteria changes
  const handleStateChange = (state) => {
    setSelectedState(state);
    setCurrentPage(1);
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setCurrentPage(1);
  };

  const handleCourseChange = (course) => {
    setCourseQuery(course);
    setCurrentPage(1);
  };

  const handleLevelChange = (level) => {
    setSelectedLevel(level);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  // Filtered colleges based on State, City, Course, Level and Category
  const filteredColleges = useMemo(() => {
    const courseTerm = courseQuery.trim().toLowerCase();

    return collegesData.filter((college) => {
      // 1. Institution Category Filter
      const matchesCategory = 
        activeCategory === 'all' || 
        (college.categories && college.categories.includes(activeCategory));

      if (!matchesCategory) return false;

      // 2. State / Region Filter
      if (selectedState === 'Delhi NCR') {
        const isNCR = college.isDelhiNCR || (college.city && DELHI_NCR_CITIES.includes(college.city));
        if (!isNCR) return false;
      } else if (selectedState && selectedState !== 'all') {
        const collegeState = (college.state || '').toLowerCase();
        if (collegeState !== selectedState.toLowerCase()) return false;
      }

      // 3. City Filter
      if (selectedCity && selectedCity !== 'all') {
        const collegeCity = (college.city || '').toLowerCase();
        if (collegeCity !== selectedCity.toLowerCase()) return false;
      }

      // 4. Course / Program Keyword Filter
      if (courseTerm) {
        const nameMatch = college.name.toLowerCase().includes(courseTerm);
        const areaMatch = college.programAreas && college.programAreas.toLowerCase().includes(courseTerm);
        const programMatch = college.programs && college.programs.some(
          p => p.name.toLowerCase().includes(courseTerm) || 
               (p.description && p.description.toLowerCase().includes(courseTerm))
        );

        if (!nameMatch && !areaMatch && !programMatch) return false;
      }

      // 5. Level Filter (UG / PG)
      if (selectedLevel && selectedLevel !== 'all') {
        const targetLevel = selectedLevel.toUpperCase();
        if (college.programs && college.programs.length > 0) {
          const hasLevel = college.programs.some(p => {
            const lvl = (p.level || '').toUpperCase();
            return lvl.includes(targetLevel);
          });
          if (!hasLevel) return false;
        } else {
          // Fallback based on inferred areas if program breakdown not granular
          const areas = (college.programAreas || '').toUpperCase();
          if (targetLevel === 'UG') {
            const hasUg = areas.includes('UG') || areas.includes('B.TECH') || areas.includes('BBA') || areas.includes('MBBS') || areas.includes('BA') || areas.includes('UNDERGRADUATE') || areas.includes('DEGREE');
            if (!hasUg) return false;
          } else if (targetLevel === 'PG') {
            const hasPg = areas.includes('PG') || areas.includes('MBA') || areas.includes('M.TECH') || areas.includes('MD') || areas.includes('MS') || areas.includes('POSTGRADUATE') || areas.includes('MASTER');
            if (!hasPg) return false;
          }
        }
      }

      return true;
    });
  }, [selectedState, selectedCity, courseQuery, selectedLevel, activeCategory]);

  // Total pages and current page slice
  const totalPages = Math.ceil(filteredColleges.length / ITEMS_PER_PAGE) || 1;

  // Safe page correction if results count drops
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const paginatedColleges = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredColleges.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredColleges, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      const directorySection = document.getElementById('college-directory');
      if (directorySection) {
        directorySection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleStreamClick = (streamId) => {
    const targetCategory = streamToCategoryMap[streamId] || 'all';
    setActiveCategory(targetCategory);
    setCurrentPage(1);
    const directorySection = document.getElementById('college-directory');
    if (directorySection) {
      directorySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClearFilters = () => {
    setSelectedState('all');
    setSelectedCity('all');
    setCourseQuery('');
    setSelectedLevel('all');
    setActiveCategory('all');
    setCurrentPage(1);
  };

  const handleSearchScroll = () => {
    const directorySection = document.getElementById('college-directory');
    if (directorySection) {
      directorySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Determine if any filters are active
  const hasActiveFilters = 
    (selectedState && selectedState !== 'all') ||
    (selectedCity && selectedCity !== 'all') ||
    Boolean(courseQuery.trim()) ||
    (selectedLevel && selectedLevel !== 'all') ||
    activeCategory !== 'all';

  // Construct dynamic location results text
  const locationResultText = useMemo(() => {
    if (selectedCity && selectedCity !== 'all') {
      if (selectedState && selectedState !== 'all') {
        const stateDisplay = selectedState === 'Delhi NCR' ? 'Delhi NCR' : selectedState;
        return `in ${selectedCity}, ${stateDisplay}`;
      }
      return `in ${selectedCity}`;
    }
    if (selectedState === 'Delhi NCR') {
      return 'in Delhi NCR (All NCR Hubs)';
    }
    if (selectedState && selectedState !== 'all') {
      return `in ${selectedState}`;
    }
    return 'across India';
  }, [selectedState, selectedCity]);

  const activeCategoryObject = directoryFilterCategories.find(c => c.id === activeCategory);

  return (
    <div className="pt-24 md:pt-28 bg-white min-h-screen">
      
      {/* ====================================================
          A. HERO SECTION
          ==================================================== */}
      <section className="bg-gradient-to-b from-slate-50 via-white to-white py-14 sm:py-20 md:py-24 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>National College & Higher Education Directory</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-navy-950 tracking-tight leading-tight">
            Explore <span className="text-orange-500">Colleges & Courses</span> by Location
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover premier universities and accredited colleges across Delhi NCR, capital cities, and leading educational hubs in India. Filter by state, city, category, and degree programs with personalized admission guidance.
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
              <span>Browse 320+ Institutions</span>
            </a>
          </div>

          {/* Verification Integrity Notice */}
          <div className="mt-8 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 max-w-2xl mx-auto text-xs text-slate-500 flex items-center justify-center gap-2">
            <Info className="w-4 h-4 text-orange-500 shrink-0" />
            <span>Directory compiled from official institutional prospectuses and verified university registries. Admission cutoffs & quotas are governed by official university notices.</span>
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
              Explore key disciplines offered across premier Indian universities. Click any stream to view institutions offering related programs.
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
          C. COLLEGE & UNIVERSITY DIRECTORY (LOCATION SEARCH & FILTERS)
          ==================================================== */}
      <section id="college-directory" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header with Dynamic Result Counter */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block mb-1">
                Higher Education Directory
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy-950">
                Colleges & Universities in India
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Explore accredited universities, Delhi NCR institutions, central universities, and top private colleges.
              </p>
            </div>
            
            <div className="shrink-0 flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-navy-50 text-navy-950 border border-navy-100">
                Showing {filteredColleges.length} of {collegesData.length} Institutions {locationResultText}
              </span>
            </div>
          </div>

          {/* Location-Based Search Interface */}
          <CollegeLocationFilter
            selectedState={selectedState}
            onStateChange={handleStateChange}
            selectedCity={selectedCity}
            onCityChange={handleCityChange}
            courseQuery={courseQuery}
            onCourseChange={handleCourseChange}
            selectedLevel={selectedLevel}
            onLevelChange={handleLevelChange}
            onSearch={handleSearchScroll}
            onClearFilters={handleClearFilters}
            hasActiveFilters={hasActiveFilters}
            activeCategory={activeCategory}
            onCategoryReset={() => handleCategoryChange('all')}
            categoryLabel={activeCategoryObject?.label || activeCategory}
          />

          {/* Category Filter Pills (Scrollable Container) */}
          <div className="mb-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex items-center gap-1.5 min-w-max" role="tablist" aria-label="Directory Categories">
              {directoryFilterCategories.map((filter) => {
                const isActive = activeCategory === filter.id;
                return (
                  <button
                    key={filter.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleCategoryChange(filter.id)}
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

          {/* Results Summary & Pagination Count Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 text-xs text-slate-500">
            <div className="font-medium">
              {filteredColleges.length > 0 ? (
                <span>
                  Showing <strong className="text-navy-950 font-bold">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</strong> - <strong className="text-navy-950 font-bold">{Math.min(currentPage * ITEMS_PER_PAGE, filteredColleges.length)}</strong> of <strong className="text-navy-950 font-bold">{filteredColleges.length}</strong> matching institutions
                </span>
              ) : (
                <span>No matching institutions found</span>
              )}
            </div>

            {totalPages > 1 && (
              <div className="text-slate-500">
                Page <strong className="text-navy-950">{currentPage}</strong> of <strong className="text-navy-950">{totalPages}</strong>
              </div>
            )}
          </div>

          {/* Institution Cards Grid */}
          <div className="space-y-6">
            {paginatedColleges.map((college) => (
              <CollegeCard
                key={college.id}
                college={college}
                isExpanded={Boolean(expandedMap[college.id])}
                onToggleExpand={toggleExpand}
                onOpenEnquiry={onOpenEnquiry}
              />
            ))}
          </div>

          {/* Empty Search State */}
          {filteredColleges.length === 0 && (
            <div className="text-center py-16 px-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-navy-950 mb-2">No institutions found for this location</h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-5 leading-relaxed">
                We couldn't find any institutions matching your selected location {locationResultText} and filter criteria. Try selecting "All Cities", clearing your course keyword, or resetting all filters.
              </p>
              <button
                onClick={handleClearFilters}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-navy-950 hover:bg-navy-900 cursor-pointer transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200/80">
              <span className="text-xs text-slate-500 order-2 sm:order-1">
                Showing page <strong className="text-navy-950">{currentPage}</strong> of <strong className="text-navy-950">{totalPages}</strong> ({filteredColleges.length} institutions)
              </span>

              <div className="flex items-center gap-1.5 order-1 sm:order-2">
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1 min-h-[38px]"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                {/* Page numbers with responsive windowing */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page => {
                    if (totalPages <= 7) return true;
                    if (page === 1 || page === totalPages) return true;
                    if (Math.abs(page - currentPage) <= 1) return true;
                    return false;
                  })
                  .map((page, idx, arr) => {
                    const prevPage = arr[idx - 1];
                    const showEllipsis = prevPage && page - prevPage > 1;

                    return (
                      <React.Fragment key={page}>
                        {showEllipsis && (
                          <span className="px-2 text-xs text-slate-400 select-none">...</span>
                        )}
                        <button
                          type="button"
                          onClick={() => handlePageChange(page)}
                          className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            currentPage === page
                              ? 'bg-navy-950 text-white shadow-xs'
                              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-navy-950'
                          }`}
                          aria-current={currentPage === page ? 'page' : undefined}
                        >
                          {page}
                        </button>
                      </React.Fragment>
                    );
                  })}

                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1 min-h-[38px]"
                  aria-label="Next page"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
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
            Our team can help you explore suitable courses, understand the CUET, JEE, NEET or institutional admission process, and prepare a personalized college shortlist based on your scores and location preferences.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                if (onOpenCounselling) {
                  onOpenCounselling('Colleges Page Guidance CTA');
                } else if (onOpenEnquiry) {
                  onOpenEnquiry('Colleges Page Final CTA');
                }
              }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm sm:text-base text-white bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/25 active:scale-95 transition-all cursor-pointer min-h-[48px]"
            >
              <span>Get Free Admission Counselling</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Global Final CTA Banner */}
      <FinalCTA 
        onOpenEnquiry={() => onOpenEnquiry?.('Colleges Page Final Banner')} 
        onOpenCounselling={onOpenCounselling}
      />

    </div>
  );
}
