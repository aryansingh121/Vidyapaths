import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import EnquiryForm from './EnquiryForm';

export default function EnquiryModal({ isOpen, onClose, defaultService = '' }) {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-navy-950/70 backdrop-blur-sm animate-in fade-in duration-200 box-border">
      <div 
        className="fixed inset-0" 
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-[940px] xl:max-w-[980px] bg-white rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[calc(100dvh-20px)] sm:max-h-[calc(100dvh-32px)] flex flex-col my-auto box-border border border-slate-100">
        {/* Compact Modal Header */}
        <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-navy-900 text-white flex items-center justify-between border-b border-navy-800 shrink-0">
          <div>
            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white flex items-center gap-2">
              <span>Book Your Free 1-on-1 Session</span>
              <span className="text-[10px] sm:text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full font-semibold">100% Free</span>
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5">Speak directly with an experienced career and admission mentor.</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 cursor-pointer shrink-0 ml-2"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body without nested scroll container */}
        <div className="p-3.5 sm:p-5 lg:p-6 overflow-y-auto box-border">
          <EnquiryForm defaultService={defaultService} source="Popup Modal" isModal={true} />
        </div>
      </div>
    </div>
  );
}
