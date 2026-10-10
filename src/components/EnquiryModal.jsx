import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import EnquiryForm from './EnquiryForm';
import { SERVICE_FORM_CONFIGS, getServiceConfig } from '../data/serviceFormConfigs';

export default function EnquiryModal({ 
  isOpen, 
  onClose, 
  defaultService = '',
  initialValues = {}
}) {
  const [activeServiceId, setActiveServiceId] = useState(() => getServiceConfig(defaultService).id);

  // When defaultService prop changes or modal opens, update active service
  useEffect(() => {
    if (isOpen) {
      setActiveServiceId(getServiceConfig(defaultService).id);
    }
  }, [isOpen, defaultService]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentConfig = SERVICE_FORM_CONFIGS[activeServiceId] || getServiceConfig(defaultService);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-5 overflow-y-auto bg-navy-950/75 backdrop-blur-sm animate-in fade-in duration-200 box-border">
      <div 
        className="fixed inset-0" 
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-[min(1180px,calc(100vw-32px))] bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[calc(100dvh-24px)] sm:max-h-[calc(100dvh-36px)] flex flex-col my-auto box-border border border-slate-200/80">
        
        {/* Refined Header (approx 14-15px padding, 22-24px heading on desktop) */}
        <div className="px-5 sm:px-7 lg:px-8 py-3 sm:py-3.5 bg-navy-900 text-white flex items-center justify-between border-b border-navy-800 shrink-0">
          <div className="pr-3">
            <h3 className="text-lg sm:text-[22px] lg:text-[23px] font-bold text-white flex items-center gap-2.5 leading-tight">
              <span>{currentConfig.modalHeading}</span>
              {currentConfig.badgeText !== null && (
                <span className="text-[11px] sm:text-xs bg-orange-500 text-white px-2.5 py-0.5 rounded-full font-semibold tracking-wide shrink-0">
                  {currentConfig.badgeText || "100% Free"}
                </span>
              )}
            </h3>
            <p className="text-[13px] sm:text-[14px] text-slate-300 mt-1 leading-normal line-clamp-1 sm:line-clamp-none">
              {currentConfig.shortDescription}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-white hover:bg-navy-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 cursor-pointer shrink-0 ml-2"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form Container */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden box-border">
          <EnquiryForm 
            defaultService={defaultService} 
            activeServiceId={activeServiceId}
            onServiceChange={setActiveServiceId}
            initialValues={initialValues}
            source="Popup Modal" 
            isModal={true} 
          />
        </div>
      </div>
    </div>
  );
}
