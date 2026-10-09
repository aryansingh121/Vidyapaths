import React from 'react';
import ukFlag from '../assets/flags/uk.svg';
import usaFlag from '../assets/flags/usa.svg';
import canadaFlag from '../assets/flags/canada.svg';
import australiaFlag from '../assets/flags/australia.svg';
import germanyFlag from '../assets/flags/germany.svg';
import irelandFlag from '../assets/flags/ireland.svg';
import newZealandFlag from '../assets/flags/new-zealand.svg';
import uaeFlag from '../assets/flags/uae.svg';
import singaporeFlag from '../assets/flags/singapore.svg';

const flagsMap = {
  uk: ukFlag,
  gb: ukFlag,
  usa: usaFlag,
  us: usaFlag,
  canada: canadaFlag,
  ca: canadaFlag,
  australia: australiaFlag,
  au: australiaFlag,
  germany: germanyFlag,
  de: germanyFlag,
  ireland: irelandFlag,
  ie: irelandFlag,
  'new-zealand': newZealandFlag,
  nz: newZealandFlag,
  uae: uaeFlag,
  ae: uaeFlag,
  singapore: singaporeFlag,
  sg: singaporeFlag
};

export default function CountryFlag({ 
  countryId, 
  countryName, 
  className = "w-12 h-8 sm:w-14 sm:h-9" 
}) {
  const normalizedKey = (countryId || '').toLowerCase().trim();
  const flagSrc = flagsMap[normalizedKey];

  if (!flagSrc) {
    return null;
  }

  return (
    <div 
      className={`inline-flex items-center justify-center overflow-hidden rounded-lg border border-slate-200/90 shadow-xs shrink-0 bg-slate-100 ${className}`}
      title={`${countryName || countryId} Flag`}
    >
      <img
        src={flagSrc}
        alt={`${countryName || countryId} flag`}
        className="w-full h-full object-cover block"
        loading="lazy"
        width="56"
        height="38"
      />
    </div>
  );
}
