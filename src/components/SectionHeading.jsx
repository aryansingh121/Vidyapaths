import React from 'react';

export default function SectionHeading({
  badge,
  title,
  subtitle,
  centered = true,
  theme = 'light' // 'light' or 'dark'
}) {
  return (
    <div className={`max-w-3xl mb-12 md:mb-16 ${centered ? 'mx-auto text-center' : ''}`}>
      {badge && (
        <span className={`inline-block px-3.5 py-1 text-xs font-semibold rounded-full uppercase tracking-wider mb-3 ${
          theme === 'dark'
            ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
            : 'bg-orange-50 text-orange-600 border border-orange-200/60'
        }`}>
          {badge}
        </span>
      )}
      <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4 ${
        theme === 'dark' ? 'text-white' : 'text-navy-900'
      }`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base sm:text-lg leading-relaxed ${
          theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
