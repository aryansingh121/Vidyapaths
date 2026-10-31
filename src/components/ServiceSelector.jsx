import React, { useState, useRef, useEffect } from 'react';
import { 
  GraduationCap, 
  Compass, 
  Briefcase, 
  Globe, 
  FileUser, 
  Wallet, 
  ChevronDown, 
  Check 
} from 'lucide-react';
import { SERVICE_OPTIONS } from '../data/serviceFormConfigs';

const serviceIconMap = {
  'college-admissions': GraduationCap,
  'career-counselling': Compass,
  'internship-assistance': Briefcase,
  'study-abroad': Globe,
  'resume-interview': FileUser,
  'scholarships-loans': Wallet,
};

export default function ServiceSelector({ 
  selectedServiceId, 
  onSelectService, 
  formUid = 'service-selector' 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const listboxRef = useRef(null);

  const activeOption = SERVICE_OPTIONS.find(opt => opt.id === selectedServiceId) || SERVICE_OPTIONS[0];
  const activeIndex = SERVICE_OPTIONS.findIndex(opt => opt.id === selectedServiceId);
  const [focusedIndex, setFocusedIndex] = useState(activeIndex >= 0 ? activeIndex : 0);

  // Sync focused index when selected service changes
  useEffect(() => {
    const idx = SERVICE_OPTIONS.findIndex(opt => opt.id === selectedServiceId);
    if (idx >= 0) {
      setFocusedIndex(idx);
    }
  }, [selectedServiceId]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  const handleSelect = (serviceId) => {
    onSelectService(serviceId);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => (prev + 1) % SERVICE_OPTIONS.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => (prev - 1 + SERVICE_OPTIONS.length) % SERVICE_OPTIONS.length);
        break;
      case 'Home':
        e.preventDefault();
        setFocusedIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setFocusedIndex(SERVICE_OPTIONS.length - 1);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (SERVICE_OPTIONS[focusedIndex]) {
          handleSelect(SERVICE_OPTIONS[focusedIndex].id);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
        break;
      case 'Tab':
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const ActiveIcon = serviceIconMap[activeOption.id] || GraduationCap;

  return (
    <div ref={containerRef} className="relative w-full text-left" onKeyDown={handleKeyDown}>
      {/* Label and Helper Header */}
      <div className="flex items-center justify-between gap-2 mb-1.5 px-0.5">
        <label 
          id={`${formUid}-service-label`} 
          className="text-[12.5px] sm:text-[13px] font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 leading-none"
        >
          <span>Select Service Required</span>
          <span className="text-red-500 font-bold">*</span>
        </label>
        <span className="text-[11px] sm:text-[11.5px] text-slate-400 dark:text-slate-400 font-normal hidden sm:inline">
          Form fields adapt automatically
        </span>
      </div>

      {/* Closed Selector Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        id={`${formUid}-service-btn`}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`${formUid}-service-listbox`}
        aria-labelledby={`${formUid}-service-label ${formUid}-service-btn`}
        onClick={handleToggle}
        className={`w-full h-[40px] sm:h-[42px] px-3.5 bg-white dark:bg-[#17243A] border rounded-xl flex items-center justify-between gap-3 text-left transition-all duration-150 cursor-pointer select-none group shadow-xs ${
          isOpen 
            ? 'border-orange-500 ring-2 ring-orange-500/20 shadow-sm' 
            : 'border-slate-200/90 dark:border-[#29384F] hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50/50 dark:hover:bg-[#1e2f4a]'
        } focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-6 h-6 rounded-lg bg-orange-100/70 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
            <ActiveIcon className="w-3.5 h-3.5" />
          </div>
          <span className="text-[13.5px] sm:text-[14px] font-semibold text-navy-950 dark:text-white truncate">
            {activeOption.displayName}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[11px] font-medium text-slate-400 dark:text-slate-400 group-hover:text-slate-500 dark:group-hover:text-slate-300 hidden md:inline">
            Change
          </span>
          <ChevronDown 
            className={`w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-orange-500' : ''
            }`} 
          />
        </div>
      </button>

      {/* Premium Open Menu Floating Panel */}
      {isOpen && (
        <div
          ref={listboxRef}
          id={`${formUid}-service-listbox`}
          role="listbox"
          aria-labelledby={`${formUid}-service-label`}
          tabIndex={-1}
          className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white dark:bg-[#17243A] rounded-xl shadow-xl shadow-navy-950/10 border border-slate-200/90 dark:border-[#29384F] p-1.5 max-h-[260px] sm:max-h-[280px] overflow-y-auto animate-in fade-in zoom-in-95 duration-150"
        >
          {SERVICE_OPTIONS.map((opt, index) => {
            const isSelected = opt.id === selectedServiceId;
            const isFocused = index === focusedIndex;
            const Icon = serviceIconMap[opt.id] || GraduationCap;

            return (
              <div
                key={opt.id}
                id={`${formUid}-option-${opt.id}`}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setFocusedIndex(index)}
                onClick={() => handleSelect(opt.id)}
                className={`flex items-center justify-between px-3 py-2 sm:py-2.5 rounded-lg text-[13px] sm:text-[13.5px] cursor-pointer transition-colors select-none ${
                  isSelected
                    ? 'bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 font-semibold'
                    : isFocused
                      ? 'bg-slate-50 dark:bg-[#1e2f4a] text-navy-950 dark:text-white font-medium'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#1e2f4a] hover:text-navy-950 dark:hover:text-white font-medium'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-orange-100 dark:bg-orange-900/60 text-orange-600 dark:text-orange-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="truncate">{opt.displayName}</span>
                </div>

                {isSelected && (
                  <Check className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0 ml-2" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
