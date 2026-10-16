import React from 'react';
import { 
  Building2, 
  MapPin, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  ExternalLink, 
  Info, 
  GraduationCap, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';

/**
 * Standardized College Card Component
 * 
 * Provides consistent layout and three action buttons for every institution:
 * 1. Show Programs / Hide Programs (with program count when pathways exist)
 * 2. Get Admission Guidance (pre-populates enquiry modal)
 * 3. Official Portal (verified link or elegant disabled 'Portal Unavailable')
 * 
 * @param {Object} props
 * @param {Object} props.college - College object data
 * @param {boolean} props.isExpanded - Whether programs accordion is expanded
 * @param {Function} props.onToggleExpand - Handler to toggle expansion
 * @param {Function} props.onOpenEnquiry - Handler to open enquiry modal
 */
export default function CollegeCard({
  college,
  isExpanded = false,
  onToggleExpand,
  onOpenEnquiry
}) {
  const programs = college.programs || [];
  const hasPrograms = programs.length > 0;
  const hasWebsite = Boolean(college.officialWebsite && college.officialWebsite.trim() !== '');

  const handleToggle = () => {
    if (onToggleExpand) {
      onToggleExpand(college.id);
    }
  };

  const handleGuidanceClick = () => {
    if (onOpenEnquiry) {
      onOpenEnquiry({ service: 'college-admission', college: college.name });
    }
  };

  const handleProgramEnquiry = (programName) => {
    if (onOpenEnquiry) {
      onOpenEnquiry({ service: 'college-admission', college: college.name, course: programName });
    }
  };

  const handleComparisonClick = () => {
    if (onOpenEnquiry) {
      onOpenEnquiry({ service: 'college-comparison', college: college.name });
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-orange-300 hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Card Header & Summary */}
      <div className="p-5 sm:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-3 flex-1">
          
          {/* Affiliation, Location & Delhi NCR Badges */}
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

            {college.isDelhiNCR && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-orange-50 text-orange-700 border border-orange-200">
                Delhi NCR
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

        {/* Action Buttons: 3 Consistent Actions on Every Card */}
        <div className="flex flex-wrap sm:flex-nowrap lg:flex-col items-center sm:items-stretch gap-2.5 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
          
          {/* Action 1: Show / Hide Programs Toggle */}
          <button
            type="button"
            onClick={handleToggle}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer min-h-[42px] ${
              isExpanded
                ? 'bg-navy-950 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
            }`}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? `Hide programs for ${college.name}` : `Show programs for ${college.name}`}
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            <span>
              {isExpanded 
                ? 'Hide Programs' 
                : (hasPrograms ? `Show Programs (${programs.length})` : 'Show Programs')
              }
            </span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 ml-0.5 shrink-0" />
            ) : (
              <ChevronDown className="w-4 h-4 ml-0.5 shrink-0" />
            )}
          </button>

          {/* Action 2: Get Admission Guidance */}
          <button
            type="button"
            onClick={handleGuidanceClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 shadow-sm active:scale-95 transition-all cursor-pointer min-h-[42px] whitespace-nowrap"
            aria-label={`Get admission guidance for ${college.name}`}
          >
            <span>Get Admission Guidance</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>

          {/* Action 3: Official Portal (Active or Restrained Disabled) */}
          {hasWebsite ? (
            <a
              href={college.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-navy-950 hover:bg-slate-100 transition-colors border border-slate-200 min-h-[38px]"
              aria-label={`Visit official portal for ${college.name} (opens in a new tab)`}
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Official Portal</span>
            </a>
          ) : (
            <button
              type="button"
              disabled
              title="Official portal link not yet verified for this institution"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 bg-slate-50 border border-slate-200 cursor-not-allowed opacity-75 min-h-[38px]"
              aria-label={`Official portal unavailable for ${college.name}`}
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              <span>Portal Unavailable</span>
            </button>
          )}
        </div>
      </div>

      {/* Expandable Associated Programs Accordion */}
      {isExpanded && (
        <div className="border-t border-slate-200 bg-slate-50/70 p-5 sm:p-7 animate-in slide-in-from-top-2 duration-200">
          
          {hasPrograms ? (
            /* Pathway 1: Structured programs exist */
            <>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs sm:text-sm font-bold text-navy-950 uppercase tracking-wider flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>Offered Programs Under {college.name}</span>
                </h4>
                <span className="text-xs font-semibold text-slate-500">
                  {programs.length} program {programs.length === 1 ? 'pathway' : 'pathways'} listed
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {programs.map((program, pIdx) => {
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
                              <Clock className="w-3 h-3 text-slate-400 shrink-0" />
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
                          <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                          Guidance Available
                        </span>
                        <button
                          type="button"
                          onClick={() => handleProgramEnquiry(program.name)}
                          className="text-xs font-bold text-orange-600 hover:text-orange-700 cursor-pointer inline-flex items-center gap-1"
                        >
                          <span>Enquire</span>
                          <ArrowRight className="w-3 h-3 shrink-0" />
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
                    type="button"
                    onClick={handleComparisonClick}
                    className="font-semibold text-slate-600 hover:text-orange-600 hover:underline cursor-pointer"
                  >
                    Compare Options
                  </button>
                  <span className="text-slate-300">•</span>
                  <button
                    type="button"
                    onClick={handleGuidanceClick}
                    className="font-bold text-orange-600 hover:underline cursor-pointer"
                  >
                    Request Counselling for {college.name} →
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Pathway 2: Honest fallback when program breakdown is not yet in dataset */
            <div className="py-2">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs sm:text-sm font-bold text-navy-950 uppercase tracking-wider flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>Offered Programs Under {college.name}</span>
                </h4>
              </div>

              <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/80 shadow-xs text-center max-w-2xl mx-auto space-y-3.5">
                <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center mx-auto">
                  <GraduationCap className="w-6 h-6" />
                </div>

                <div className="space-y-1.5">
                  <h5 className="text-base font-bold text-navy-950">
                    Program Details Coming Soon
                  </h5>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
                    Program seat matrices and specializations for this institution are currently being updated from official university prospectuses.
                  </p>
                </div>

                {college.programAreas && (
                  <div className="inline-block px-3.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200/70 text-xs text-slate-600">
                    <strong className="text-slate-800">Key Focus Areas: </strong>
                    {college.programAreas}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleGuidanceClick}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 shadow-sm active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Get Admission Guidance for {college.name}</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
