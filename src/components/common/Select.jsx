/**
 * Select.jsx
 * Reusable select dropdown with custom chevron, error state, and placeholder handling.
 */
import React from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';

export function Select({
  label,
  id,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  required = false,
  error,
  helperText,
  disabled = false,
  className = '',
  ...props
}) {
  const selectId = id || name;
  const isPlaceholderSelected = !value;

  return (
    <div className="w-full space-y-1">
      {label && (
        <label 
          htmlFor={selectId}
          className="block text-xs sm:text-sm font-semibold text-slate-700"
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      <div className="relative">
        <select
          id={selectId}
          name={name}
          value={value ?? ''}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`w-full appearance-none px-3.5 py-2.5 pr-10 rounded-xl border text-base md:text-sm transition-all focus:outline-none focus:ring-2 disabled:bg-slate-100 disabled:cursor-not-allowed ${
            isPlaceholderSelected ? 'text-slate-400' : 'text-navy-950 font-medium'
          } ${
            error
              ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-red-200'
              : 'border-slate-300 bg-white focus:border-orange-500 focus:ring-orange-100 hover:border-slate-400'
          } ${className}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled className="text-slate-400">
              {placeholder}
            </option>
          )}
          {options.map((opt, idx) => {
            const optVal = typeof opt === 'object' ? opt.value : opt;
            const optLabel = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={idx} value={optVal} className="text-navy-900 font-normal">
                {optLabel}
              </option>
            );
          })}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {error ? (
        <p className="flex items-center gap-1 text-xs text-red-600 mt-1 font-medium">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p className="text-xs text-slate-500 mt-1">{helperText}</p>
      ) : null}
    </div>
  );
}

export default Select;
