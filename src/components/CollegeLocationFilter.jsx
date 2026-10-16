/**
 * CollegeLocationFilter.jsx
 * Responsive, location-based college discovery and filtering interface.
 * Features custom accessible dropdowns for State / UT, City, and Level with
 * real-time search, keyboard navigation, and Vidyapaths brand styling.
 */
import React, { useMemo } from 'react';
import { 
  MapPin, 
  Building2, 
  Search, 
  RotateCcw, 
  BookOpen, 
  GraduationCap, 
  X, 
  Sparkles 
} from 'lucide-react';
import CustomSelect from './common/CustomSelect';
import { 
  INDIAN_STATES, 
  CITIES_BY_STATE, 
  ALL_CITIES, 
  DELHI_NCR_CITIES 
} from '../data/colleges';

export default function CollegeLocationFilter({
  selectedState,
  onStateChange,
  selectedCity,
  onCityChange,
  courseQuery,
  onCourseChange,
  selectedLevel,
  onLevelChange,
  onSearch,
  onClearFilters,
  hasActiveFilters,
  activeCategory,
  onCategoryReset,
  categoryLabel
}) {
  // Determine available cities based on current state selection
  const availableCities = useMemo(() => {
    if (selectedState === 'Delhi NCR') {
      return DELHI_NCR_CITIES;
    }
    if (selectedState && selectedState !== 'all' && CITIES_BY_STATE[selectedState]) {
      return CITIES_BY_STATE[selectedState];
    }
    return ALL_CITIES;
  }, [selectedState]);

  // Options for State / UT dropdown - Delhi NCR has standard neutral styling
  const stateOptions = useMemo(() => [
    { value: 'all', label: 'All States & Union Territories' },
    { value: 'Delhi NCR', label: 'Delhi NCR (All NCR Hubs)' },
    ...INDIAN_STATES.map(state => ({ value: state, label: state }))
  ], []);

  // Options for City dropdown
  const cityOptions = useMemo(() => {
    const defaultLabel = selectedState && selectedState !== 'all'
      ? `All Cities in ${selectedState === 'Delhi NCR' ? 'Delhi NCR' : selectedState}`
      : 'All Cities across India';

    return [
      { value: 'all', label: defaultLabel },
      ...availableCities.map(city => ({ value: city, label: city }))
    ];
  }, [selectedState, availableCities]);

  // Options for Program Level dropdown
  const levelOptions = useMemo(() => [
    { value: 'all', label: 'All Levels (UG & PG)' },
    { value: 'UG', label: 'Undergraduate (UG)' },
    { value: 'PG', label: 'Postgraduate (PG)' }
  ], []);

  // Handle direct city change: if state is 'all' or empty, auto-detect city's state
  const handleCitySelect = (city) => {
    onCityChange(city);

    if (city && city !== 'all' && (!selectedState || selectedState === 'all')) {
      for (const [st, cities] of Object.entries(CITIES_BY_STATE)) {
        if (cities.includes(city)) {
          onStateChange(st);
          break;
        }
      }
    }
  };

  // Popular educational hub shortcuts
  const popularHubs = [
    { label: 'Delhi NCR', state: 'Delhi NCR', city: 'all' },
    { label: 'Delhi', state: 'Delhi', city: 'Delhi' },
    { label: 'Bengaluru', state: 'Karnataka', city: 'Bengaluru' },
    { label: 'Mumbai', state: 'Maharashtra', city: 'Mumbai' },
    { label: 'Pune', state: 'Maharashtra', city: 'Pune' },
    { label: 'Chennai', state: 'Tamil Nadu', city: 'Chennai' },
    { label: 'Hyderabad', state: 'Telangana', city: 'Hyderabad' },
    { label: 'Kolkata', state: 'West Bengal', city: 'Kolkata' },
    { label: 'Jaipur', state: 'Rajasthan', city: 'Jaipur' },
    { label: 'Dehradun', state: 'Uttarakhand', city: 'Dehradun' }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-6 md:p-7 space-y-5 mb-8 relative z-20">
      
      {/* Title & helper */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block mb-0.5">
            Location-Based Discovery
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-navy-950">
            Find Colleges by State, City & Stream
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Sparkles className="w-3.5 h-3.5 text-orange-500 shrink-0" />
          <span>Real-time location & program filtering</span>
        </div>
      </div>

      {/* Main Filter Controls Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        
        {/* 1. Custom State / Union Territory Dropdown */}
        <CustomSelect
          id="state-select"
          name="state"
          label="Select State / UT"
          icon={MapPin}
          value={selectedState}
          onChange={(val) => {
            onStateChange(val);
            onCityChange('all'); // Reset city on state change
          }}
          options={stateOptions}
          searchable={true}
          searchPlaceholder="Search state or UT..."
          emptyMessage="No matching states found"
        />

        {/* 2. Custom City Dropdown (Dependent on State) */}
        <CustomSelect
          id="city-select"
          name="city"
          label="Select City"
          icon={Building2}
          value={selectedCity}
          onChange={handleCitySelect}
          options={cityOptions}
          searchable={true}
          searchPlaceholder="Search city..."
          emptyMessage="No matching cities found"
        />

        {/* 3. Course / Program Search */}
        <div className="space-y-1.5 relative z-10">
          <label 
            htmlFor="course-input" 
            className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 select-none"
          >
            <BookOpen className="w-3.5 h-3.5 text-slate-500" />
            <span>Course / Stream (Optional)</span>
          </label>
          <div className="relative">
            <input
              id="course-input"
              type="text"
              value={courseQuery}
              onChange={(e) => onCourseChange(e.target.value)}
              placeholder="e.g. B.Tech, MBA, MBBS, Law..."
              className="w-full pl-3.5 pr-8 py-2.5 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-base md:text-sm bg-white text-navy-950 placeholder:text-slate-400 placeholder:opacity-100 transition-all shadow-xs min-h-[46px]"
              aria-label="Filter by course, degree or stream"
            />
            {courseQuery && (
              <button
                type="button"
                onClick={() => onCourseChange('')}
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                aria-label="Clear course input"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* 4. Custom Program Level Dropdown */}
        <CustomSelect
          id="level-select"
          name="level"
          label="Program Level"
          icon={GraduationCap}
          value={selectedLevel}
          onChange={onLevelChange}
          options={levelOptions}
          searchable={false}
        />

      </div>

      {/* Popular Educational Hub Shortcuts */}
      <div className="pt-2">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            Popular Hubs:
          </span>
          {popularHubs.map((hub) => {
            const isSelected = 
              (hub.state === selectedState && (hub.city === 'all' || hub.city === selectedCity));
            
            return (
              <button
                key={hub.label}
                type="button"
                onClick={() => {
                  onStateChange(hub.state);
                  onCityChange(hub.city);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap min-h-[30px] border ${
                  isSelected
                    ? 'bg-orange-50 text-orange-700 border-orange-300 shadow-xs font-semibold'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-navy-950'
                }`}
              >
                {hub.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Buttons & Filter Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
        
        {/* Active Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
          {hasActiveFilters ? (
            <>
              <span className="font-semibold text-slate-600">Applied filters:</span>
              
              {selectedState && selectedState !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-orange-50 text-orange-800 border border-orange-200">
                  <span>State: {selectedState}</span>
                  <button
                    type="button"
                    onClick={() => {
                      onStateChange('all');
                      onCityChange('all');
                    }}
                    className="hover:text-orange-950 font-bold ml-0.5 cursor-pointer"
                    aria-label="Remove state filter"
                  >
                    ×
                  </button>
                </span>
              )}

              {selectedCity && selectedCity !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 border border-blue-200">
                  <span>City: {selectedCity}</span>
                  <button
                    type="button"
                    onClick={() => onCityChange('all')}
                    className="hover:text-blue-950 font-bold ml-0.5 cursor-pointer"
                    aria-label="Remove city filter"
                  >
                    ×
                  </button>
                </span>
              )}

              {courseQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                  <span>Course: "{courseQuery}"</span>
                  <button
                    type="button"
                    onClick={() => onCourseChange('')}
                    className="hover:text-amber-950 font-bold ml-0.5 cursor-pointer"
                    aria-label="Remove course filter"
                  >
                    ×
                  </button>
                </span>
              )}

              {selectedLevel && selectedLevel !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-purple-50 text-purple-800 border border-purple-200">
                  <span>Level: {selectedLevel}</span>
                  <button
                    type="button"
                    onClick={() => onLevelChange('all')}
                    className="hover:text-purple-950 font-bold ml-0.5 cursor-pointer"
                    aria-label="Remove level filter"
                  >
                    ×
                  </button>
                </span>
              )}

              {activeCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 border border-slate-300">
                  <span>Category: {categoryLabel}</span>
                  <button
                    type="button"
                    onClick={onCategoryReset}
                    className="hover:text-slate-950 font-bold ml-0.5 cursor-pointer"
                    aria-label="Remove category filter"
                  >
                    ×
                  </button>
                </span>
              )}
            </>
          ) : (
            <span className="text-slate-400 italic">No location or stream filters applied — showing all institutions.</span>
          )}
        </div>

        {/* Search & Clear Buttons */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer min-h-[42px]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Filters</span>
            </button>
          )}

          <button
            type="button"
            onClick={onSearch}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 shadow-sm active:scale-95 transition-all cursor-pointer min-h-[42px]"
          >
            <Search className="w-4 h-4" />
            <span>Search Colleges</span>
          </button>
        </div>

      </div>

    </div>
  );
}
