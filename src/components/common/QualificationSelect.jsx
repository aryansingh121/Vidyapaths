/**
 * QualificationSelect.jsx
 * Premium, accessible custom dropdown component for Vidyapaths Counselling Form.
 * 
 * Adheres strictly to Vidyapaths brand tokens:
 * - Deep navy blue typography & accents
 * - Vibrant orange focus & selection highlights
 * - Clean white card background with soft shadows and rounded corners
 * - Portaled fixed positioning to prevent any clipping from modal containers or viewports
 * - Smart vertical positioning (opens upward if space below is constrained)
 * - Complete keyboard accessibility (Arrows, Enter, Space, Escape, Tab, Type-ahead)
 * - Synchronized hidden native <select> for automated testing and browser compatibility
 */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { GraduationCap, ChevronDown, Check } from 'lucide-react';
import { COUNSELLING_QUALIFICATIONS } from '../../services/enquiryService';

export default function QualificationSelect({
  id = 'counselling-qualification',
  name = 'qualification',
  value = '',
  onChange,
  onBlur,
  error = null,
  touched = false,
  disabled = false,
  options = COUNSELLING_QUALIFICATIONS,
  placeholder = 'Select your current qualification',
  label = 'Current Qualification'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [openDirection, setOpenDirection] = useState('down');
  const [dropdownCoords, setDropdownCoords] = useState({ top: 0, left: 0, width: 0, maxHeight: 280 });

  const triggerRef = useRef(null);
  const listboxRef = useRef(null);
  const optionsListRef = useRef(null);
  const hiddenSelectRef = useRef(null);

  const hasError = Boolean(error && touched);

  // Calculate dropdown position and available space
  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const vh = window.innerHeight;
    const spaceBelow = vh - rect.bottom - 12;
    const spaceAbove = rect.top - 12;

    // Open upwards if space below is tight (< 260px) and there's more room above
    const shouldOpenUp = spaceBelow < 260 && spaceAbove > spaceBelow;
    setOpenDirection(shouldOpenUp ? 'up' : 'down');

    const maxH = shouldOpenUp
      ? Math.min(300, Math.max(160, spaceAbove))
      : Math.min(300, Math.max(160, spaceBelow));

    setDropdownCoords({
      left: Math.round(rect.left),
      width: Math.round(rect.width),
      top: shouldOpenUp ? undefined : Math.round(rect.bottom + 6),
      bottom: shouldOpenUp ? Math.round(vh - rect.top + 6) : undefined,
      maxHeight: maxH
    });
  }, []);

  // Sync focused option index when opened
  useEffect(() => {
    if (isOpen) {
      updatePosition();
      const selectedIdx = options.findIndex((opt) => opt === value);
      setFocusedIndex(selectedIdx >= 0 ? selectedIdx : 0);
    } else {
      setFocusedIndex(-1);
    }
  }, [isOpen, value, options, updatePosition]);

  // Keep dropdown anchored to trigger on scroll or resize
  useEffect(() => {
    if (!isOpen) return;

    const handleScrollOrResize = () => {
      // If trigger is scrolled out of viewport, close dropdown
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          setIsOpen(false);
          return;
        }
      }
      updatePosition();
    };

    window.addEventListener('resize', handleScrollOrResize);
    window.addEventListener('scroll', handleScrollOrResize, true);

    return () => {
      window.removeEventListener('resize', handleScrollOrResize);
      window.removeEventListener('scroll', handleScrollOrResize, true);
    };
  }, [isOpen, updatePosition]);

  // Auto-scroll focused item into view
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && optionsListRef.current) {
      const optionElements = optionsListRef.current.querySelectorAll('[role="option"]');
      if (optionElements[focusedIndex]) {
        optionElements[focusedIndex].scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    }
  }, [focusedIndex, isOpen]);

  // Global capture-phase Escape listener: closes dropdown without closing parent modal
  useEffect(() => {
    if (!isOpen) return;

    const handleGlobalKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        setIsOpen(false);
        triggerRef.current?.focus();
        onBlur?.({ target: { name, value } });
      }
    };

    window.addEventListener('keydown', handleGlobalKey, true);
    return () => {
      window.removeEventListener('keydown', handleGlobalKey, true);
    };
  }, [isOpen, name, value, onBlur]);

  // Click outside listener
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (
        triggerRef.current?.contains(e.target) ||
        listboxRef.current?.contains(e.target)
      ) {
        return;
      }
      setIsOpen(false);
      onBlur?.({ target: { name, value } });
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen, name, value, onBlur]);

  const handleSelect = (optionValue) => {
    // Notify React state
    onChange?.({ target: { name, value: optionValue } });
    
    // Also trigger change on hidden native select for full form/DOM compatibility
    if (hiddenSelectRef.current) {
      hiddenSelectRef.current.value = optionValue;
      hiddenSelectRef.current.dispatchEvent(new Event('change', { bubbles: true }));
    }

    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const handleTriggerClick = () => {
    if (disabled) return;
    if (isOpen) {
      setIsOpen(false);
      onBlur?.({ target: { name, value } });
    } else {
      setIsOpen(true);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (disabled) return;

    if (!isOpen) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(false);
        triggerRef.current?.focus();
        onBlur?.({ target: { name, value } });
        break;

      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
        break;

      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
        break;

      case 'Home':
        e.preventDefault();
        setFocusedIndex(0);
        break;

      case 'End':
        e.preventDefault();
        setFocusedIndex(options.length - 1);
        break;

      case 'Enter':
      case ' ':
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < options.length) {
          handleSelect(options[focusedIndex]);
        }
        break;

      case 'Tab':
        setIsOpen(false);
        onBlur?.({ target: { name, value } });
        break;

      default:
        // Type-ahead jump: jump to option starting with typed character
        if (e.key.length === 1 && /[a-zA-Z0-9]/.test(e.key)) {
          const char = e.key.toLowerCase();
          const matchIdx = options.findIndex((opt, idx) => 
            idx > focusedIndex && opt.toLowerCase().startsWith(char)
          );
          if (matchIdx >= 0) {
            setFocusedIndex(matchIdx);
          } else {
            const firstMatch = options.findIndex((opt) => 
              opt.toLowerCase().startsWith(char)
            );
            if (firstMatch >= 0) {
              setFocusedIndex(firstMatch);
            }
          }
        }
        break;
    }
  };

  return (
    <div>
      {/* Accessible Label */}
      <label
        id={`${id}-label`}
        htmlFor={`${id}-trigger`}
        className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1.5 select-none"
      >
        {label} <span className="text-orange-500">*</span>
      </label>

      {/* Hidden Native Select for test runners, screen readers, and automated fill */}
      <select
        ref={hiddenSelectRef}
        id={id}
        name={name}
        value={value}
        onChange={(e) => {
          onChange?.({ target: { name, value: e.target.value } });
        }}
        tabIndex={-1}
        aria-hidden="true"
        className="sr-only pointer-events-none"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      {/* Closed State Trigger Button */}
      <div className="relative">
        {/* Left Graduation Cap Icon */}
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 z-10">
          <GraduationCap className="w-4 h-4" />
        </div>

        <button
          ref={triggerRef}
          id={`${id}-trigger`}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={`${id}-listbox`}
          aria-labelledby={`${id}-label`}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
          disabled={disabled}
          onClick={handleTriggerClick}
          onKeyDown={handleKeyDown}
          className={`w-full pl-10 pr-10 py-2.5 sm:py-3 rounded-xl border text-base sm:text-sm text-left transition-all cursor-pointer flex items-center justify-between min-h-[46px] sm:min-h-[48px] focus:outline-none ${
            hasError
              ? 'border-rose-400 bg-rose-50/30 text-rose-900 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
              : isOpen
              ? 'border-orange-500 bg-white ring-2 ring-orange-500/20 shadow-sm'
              : value
              ? 'border-slate-200 bg-white text-slate-800 hover:border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
              : 'border-slate-200 bg-slate-50/50 text-slate-400 hover:border-slate-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20'
          } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          <span className={`truncate block ${value ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>
            {value || placeholder}
          </span>

          {/* Right Chevron Down Icon with 180° rotation on open */}
          <ChevronDown
            className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-orange-500' : 'text-slate-400'
            }`}
          />
        </button>
      </div>

      {/* Validation Error Message */}
      {hasError && (
        <p id={`${id}-error`} className="text-xs text-rose-600 mt-1 font-medium">
          {error}
        </p>
      )}

      {/* Open State: Portaled Dropdown Panel */}
      {isOpen &&
        createPortal(
          <div
            ref={listboxRef}
            id={`${id}-listbox`}
            role="listbox"
            aria-labelledby={`${id}-label`}
            style={{
              position: 'fixed',
              left: `${dropdownCoords.left}px`,
              width: `${dropdownCoords.width}px`,
              top: dropdownCoords.top !== undefined ? `${dropdownCoords.top}px` : undefined,
              bottom: dropdownCoords.bottom !== undefined ? `${dropdownCoords.bottom}px` : undefined,
              maxHeight: `${dropdownCoords.maxHeight}px`,
              zIndex: 9999
            }}
            className={`bg-white rounded-2xl border border-slate-200/90 shadow-2xl overflow-hidden flex flex-col transition-all duration-150 animate-in fade-in ${
              openDirection === 'up'
                ? 'slide-in-from-bottom-2 origin-bottom'
                : 'slide-in-from-top-2 origin-top'
            }`}
          >
            {/* Options List Container */}
            <div
              ref={optionsListRef}
              className="overflow-y-auto overscroll-contain py-1.5 focus:outline-none divide-y divide-slate-100/60"
            >
              {options.map((opt, index) => {
                const isSelected = opt === value;
                const isFocused = index === focusedIndex;

                return (
                  <div
                    key={opt}
                    id={`${id}-option-${index}`}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(opt)}
                    onMouseEnter={() => setFocusedIndex(index)}
                    className={`min-h-[44px] px-4 py-2.5 text-base sm:text-sm flex items-center justify-between cursor-pointer transition-colors select-none ${
                      isSelected
                        ? 'bg-orange-50 text-orange-600 font-semibold'
                        : isFocused
                        ? 'bg-orange-50/50 text-navy-950 font-medium'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-navy-950'
                    }`}
                  >
                    <span className="truncate pr-2">{opt}</span>
                    {isSelected && (
                      <Check className="w-4 h-4 text-orange-500 shrink-0 ml-2" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
