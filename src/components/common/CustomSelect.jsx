/**
 * CustomSelect.jsx
 * Premium, accessible custom dropdown component adhering to Vidyapaths brand tokens:
 * - Deep navy typography (#0B1F3A)
 * - Restrained orange focus/selection accents (#F97316)
 * - Real-time in-dropdown option search with mobile auto-zoom prevention (>= 16px)
 * - Keyboard navigation (Arrows, Enter, Escape, Tab) with auto-scroll into view
 * - Outside click detection
 * - Integrated hidden native <select> for maximum test/form compatibility
 */
import React, { useState, useRef, useEffect, useId } from 'react';
import { ChevronDown, Check, Search, X } from 'lucide-react';

export default function CustomSelect({
  id,
  name,
  label,
  icon: IconComponent,
  value,
  onChange,
  options = [], // [{ value, label, groupHeader }]
  placeholder = 'Select an option',
  searchable = true,
  searchPlaceholder = 'Search...',
  emptyMessage = 'No matching options found',
  ariaLabel,
  className = ''
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const searchInputRef = useRef(null);
  const listboxRef = useRef(null);
  const optionsListRef = useRef(null);

  const reactId = useId();
  const selectId = id || name || `select-${reactId}`;
  const listboxId = `${selectId}-listbox`;

  // Find currently selected option
  const selectedOption = options.find(opt => opt.value === value) || options[0];

  // Filter options based on search query
  const filteredOptions = searchQuery.trim()
    ? options.filter(opt =>
        opt.label.toLowerCase().includes(searchQuery.trim().toLowerCase())
      )
    : options;

  // Sync focused index and focus search input when opened
  useEffect(() => {
    if (isOpen) {
      const idx = filteredOptions.findIndex(opt => opt.value === value);
      setFocusedIndex(idx >= 0 ? idx : 0);
      if (searchable) {
        setTimeout(() => searchInputRef.current?.focus(), 50);
      }
    } else {
      setSearchQuery('');
      setFocusedIndex(-1);
    }
  }, [isOpen, value, searchable, filteredOptions.length]);

  // Auto-scroll focused option into view during keyboard navigation
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
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => 
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
          handleSelect(filteredOptions[focusedIndex].value);
        }
        break;
      case 'Tab':
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const handleSelect = (optionValue) => {
    onChange?.(optionValue);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div className={`space-y-1.5 relative ${isOpen ? 'z-40' : 'z-10'} ${className}`} ref={containerRef}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={`${selectId}-button`} 
          className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 select-none"
        >
          {IconComponent && <IconComponent className="w-3.5 h-3.5 text-orange-500 shrink-0" />}
          <span>{label}</span>
        </label>
      )}

      {/* Hidden native select for form scrapers, screen readers, and automated testing */}
      <select
        id={selectId}
        name={name}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        tabIndex={-1}
        aria-hidden="true"
        className="sr-only pointer-events-none"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Dropdown Trigger Button */}
      <button
        id={`${selectId}-button`}
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-label={ariaLabel || label}
        onClick={() => setIsOpen(prev => !prev)}
        onKeyDown={handleKeyDown}
        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-base md:text-sm bg-white text-navy-950 transition-all shadow-xs min-h-[46px] cursor-pointer text-left ${
          isOpen
            ? 'border-orange-500 ring-2 ring-orange-100 shadow-sm'
            : 'border-slate-300 hover:border-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 focus:outline-none'
        }`}
      >
        <span className="truncate block font-normal text-slate-800 pr-2">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown 
          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-orange-500' : ''
          }`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          id={listboxId}
          ref={listboxRef}
          role="listbox"
          tabIndex={-1}
          className="absolute z-50 left-0 right-0 top-full mt-1.5 bg-white rounded-xl border border-slate-200/90 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Real-time search inside dropdown with iOS 16px auto-zoom prevention */}
          {searchable && (
            <div className="p-2 border-b border-slate-100 bg-slate-50/70">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-3.5 h-3.5" />
                </div>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={searchPlaceholder}
                  className="w-full pl-8 pr-7 py-2 rounded-lg border border-slate-200 bg-white text-base md:text-xs text-navy-950 placeholder:text-slate-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all"
                  aria-label={searchPlaceholder}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      searchInputRef.current?.focus();
                    }}
                    className="absolute inset-y-0 right-0 pr-2 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                    aria-label="Clear search text"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Options List */}
          <div 
            ref={optionsListRef}
            className="max-h-60 overflow-y-auto overscroll-contain py-1"
          >
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-6 text-center text-xs text-slate-500 italic">
                {emptyMessage}
              </div>
            ) : (
              filteredOptions.map((opt, index) => {
                const isSelected = opt.value === value;
                const isFocused = index === focusedIndex;

                return (
                  <React.Fragment key={opt.value}>
                    {/* Render optional group separator header */}
                    {opt.groupHeader && (
                      <div className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/60 select-none">
                        {opt.groupHeader}
                      </div>
                    )}

                    <div
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelect(opt.value)}
                      onMouseEnter={() => setFocusedIndex(index)}
                      className={`px-3.5 py-2.5 text-xs sm:text-sm flex items-center justify-between cursor-pointer transition-colors select-none ${
                        isSelected
                          ? 'bg-orange-50/80 text-orange-950 font-medium'
                          : isFocused
                          ? 'bg-slate-50 text-navy-950'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-navy-950'
                      }`}
                    >
                      <span className="truncate pr-2 font-normal text-slate-800">
                        {opt.label}
                      </span>
                      {isSelected && (
                        <Check className="w-4 h-4 text-orange-500 shrink-0 ml-2" />
                      )}
                    </div>
                  </React.Fragment>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
