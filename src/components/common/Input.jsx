/**
 * Input.jsx
 * Reusable input component with label, error states, and responsive styling.
 */
import React from 'react';
import { AlertCircle } from 'lucide-react';

export function Input({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  helperText,
  disabled = false,
  className = '',
  ...props
}) {
  const inputId = id || name;

  return (
    <div className="w-full space-y-1">
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-xs sm:text-sm font-semibold text-slate-700"
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          id={inputId}
          name={name}
          type={type}
          value={value ?? ''}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`w-full px-3.5 py-2.5 rounded-xl border text-base md:text-sm transition-all focus:outline-none focus:ring-2 disabled:bg-slate-100 disabled:cursor-not-allowed ${
            error 
              ? 'border-red-400 bg-red-50/20 text-red-950 focus:border-red-500 focus:ring-red-200' 
              : 'border-slate-300 bg-white text-navy-950 focus:border-orange-500 focus:ring-orange-100 hover:border-slate-400'
          } ${className}`}
          {...props}
        />
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

export default Input;
