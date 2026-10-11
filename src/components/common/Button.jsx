/**
 * Button.jsx
 * Reusable, accessible button with variant styling and loading states.
 */
import React from 'react';
import { Loader2 } from 'lucide-react';

const VARIANTS = {
  primary: 'bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-lg focus-visible:ring-orange-500',
  secondary: 'bg-navy-900 hover:bg-navy-800 text-white shadow-md hover:shadow-lg focus-visible:ring-navy-800',
  outline: 'border-2 border-slate-300 hover:border-orange-500 hover:text-orange-600 text-slate-700 bg-white focus-visible:ring-orange-500',
  ghost: 'text-slate-700 hover:text-navy-900 hover:bg-slate-100 focus-visible:ring-slate-400'
};

const SIZES = {
  sm: 'px-3.5 py-1.5 text-xs rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-6 py-3.5 text-base rounded-xl font-bold'
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  className = '',
  icon: Icon,
  type = 'button',
  ...props
}) {
  const variantClass = VARIANTS[variant] || VARIANTS.primary;
  const sizeClass = SIZES[size] || SIZES.md;
  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`inline-flex items-center justify-center gap-2 font-semibold transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : Icon ? (
        <Icon className="w-4 h-4 shrink-0" />
      ) : null}
      <span>{children}</span>
    </button>
  );
}

export default Button;
