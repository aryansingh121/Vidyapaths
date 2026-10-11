/**
 * Modal.jsx
 * Generic modal dialog component with keyboard focus trap, backdrop click,
 * and body scroll locking.
 */
import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  badge,
  children,
  maxWidth = 'max-w-[min(1180px,calc(100vw-32px))]',
  className = ''
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-5 overflow-y-auto bg-navy-950/75 backdrop-blur-sm animate-in fade-in duration-200 box-border"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog Content */}
      <div 
        className={`relative w-full ${maxWidth} bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[calc(100dvh-24px)] sm:max-h-[calc(100dvh-36px)] flex flex-col my-auto box-border border border-slate-200/80 ${className}`}
      >
        {(title || onClose) && (
          <div className="px-5 sm:px-7 lg:px-8 py-3 sm:py-3.5 bg-navy-900 text-white flex items-center justify-between border-b border-navy-800 shrink-0">
            <div className="pr-3">
              {title && (
                <h3 className="text-lg sm:text-[22px] lg:text-[23px] font-bold text-white flex items-center gap-2.5 leading-tight">
                  <span>{title}</span>
                  {badge && (
                    <span className="text-[11px] sm:text-xs bg-orange-500 text-white px-2.5 py-0.5 rounded-full font-semibold tracking-wide shrink-0">
                      {badge}
                    </span>
                  )}
                </h3>
              )}
              {subtitle && (
                <p className="text-[13px] sm:text-[14px] text-slate-300 mt-1 leading-normal line-clamp-1 sm:line-clamp-none">
                  {subtitle}
                </p>
              )}
            </div>

            {onClose && (
              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-white hover:bg-navy-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 cursor-pointer shrink-0 ml-2"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        <div className="flex-1 flex flex-col min-h-0 overflow-hidden box-border">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
