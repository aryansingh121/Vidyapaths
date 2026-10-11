/**
 * EnquiryForm.jsx
 * Modular, accessible multi-track enquiry form.
 * Decoupled from direct HTTP fetch and validation logic via useEnquiryForm hook and enquiryService.
 */
import React, { useState, useId, useMemo } from 'react';
import { Send, CheckCircle, AlertCircle, MessageSquare, Sparkles, ChevronDown } from 'lucide-react';
import { siteConfig } from '../data/siteData';
import { 
  SHARED_FIELDS, 
  SERVICE_FORM_CONFIGS 
} from '../data/serviceFormConfigs';
import { resolveServiceAndPrefill } from '../utils/serviceMapper';
import { useEnquiryForm } from '../hooks/useEnquiryForm';
import ServiceSelector from './ServiceSelector';

export default function EnquiryForm({ 
  defaultService = '', 
  activeServiceId: propActiveServiceId,
  onServiceChange,
  initialValues = {},
  source = 'Lead Form', 
  isModal = false 
}) {
  const formUid = useId();

  // Resolve initial service configuration safely
  const initialResolved = resolveServiceAndPrefill(propActiveServiceId || defaultService, { initialValues });
  const [internalServiceId, setInternalServiceId] = useState(initialResolved.serviceId);

  const currentServiceId = propActiveServiceId && SERVICE_FORM_CONFIGS[propActiveServiceId]
    ? propActiveServiceId
    : internalServiceId;

  const activeConfig = SERVICE_FORM_CONFIGS[currentServiceId] || SERVICE_FORM_CONFIGS['college-admissions'];

  // Merged prefill values
  const mergedInitialValues = useMemo(() => ({
    ...(initialResolved.initialValues || {}),
    ...(initialValues || {})
  }), [initialResolved.initialValues, initialValues]);

  // Business logic hook
  const {
    sharedData,
    serviceFields,
    errors,
    isSubmitting,
    submitSuccess,
    submitError,
    handleSharedChange,
    handleFieldChange,
    handleCheckboxToggle,
    handleSubmit,
    resetForm
  } = useEnquiryForm({
    activeServiceId: currentServiceId,
    activeConfig,
    initialValues: mergedInitialValues,
    source
  });

  const handleServiceSelect = (newId) => {
    setInternalServiceId(newId);
    if (onServiceChange) {
      onServiceChange(newId);
    }
  };

  const openWhatsAppWithData = () => {
    let text = `Hi Vidyapaths! I submitted an enquiry for ${activeConfig.displayName}.\nName: ${sharedData.fullName}\nCity: ${sharedData.currentCity}\nContact: ${sharedData.mobileNumber}`;
    if (currentServiceId === 'career-roadmap') {
      text = `Hi Vidyapaths! I requested a Free 15-Minute Career Roadmap Consultation.\nName: ${sharedData.fullName}\nCity: ${sharedData.currentCity}\nEducation: ${serviceFields.currentEducation || ''} (${serviceFields.currentStream || ''})\nMode: ${serviceFields.consultationMode || ''}`;
    } else if (currentServiceId === 'college-comparison') {
      text = `Hi Vidyapaths! I requested a Free College Comparison Sheet.\nName: ${sharedData.fullName}\nCity: ${sharedData.currentCity}\nCourse: ${serviceFields.preferredCourse || ''}\nLocation: ${serviceFields.preferredStudyLocation || ''}`;
    }
    const cleanNumber = (siteConfig.whatsappNumber || siteConfig.phoneRaw).replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Confirmation view
  if (submitSuccess) {
    return (
      <div className={`text-center animate-in fade-in duration-300 ${isModal ? 'py-6 px-6 sm:px-8 my-auto' : 'bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm'}`}>
        <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-navy-900 mb-1.5">Thank you!</h3>
        <p className="text-slate-600 max-w-md mx-auto mb-4 text-xs sm:text-[14px] leading-relaxed">
          Thank you! Your enquiry has been submitted successfully. Our team will get in touch with you shortly.
        </p>

        <div className="bg-slate-50 rounded-xl p-3.5 mb-4 border border-slate-100 text-left text-xs sm:text-[13px] max-w-md mx-auto space-y-1.5">
          <div className="flex justify-between">
            <span className="text-slate-500">Service:</span>
            <span className="font-semibold text-orange-600">{activeConfig.displayName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Candidate:</span>
            <span className="font-semibold text-navy-900">{sharedData.fullName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Mobile:</span>
            <span className="font-semibold text-navy-900">{sharedData.mobileNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">City:</span>
            <span className="font-semibold text-navy-900">{sharedData.currentCity}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 justify-center max-w-md mx-auto">
          <button
            onClick={openWhatsAppWithData}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm h-[42px] cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp Now</span>
          </button>
          <button
            onClick={resetForm}
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors h-[42px] cursor-pointer"
          >
            Submit Another Query
          </button>
        </div>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      noValidate 
      className={isModal 
        ? "flex flex-col flex-1 min-h-0 w-full box-border" 
        : "bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm box-border"
      }
    >
      {!isModal && (
        <div className="flex items-center gap-2 mb-4">
          <span className="w-7 h-7 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
          </span>
          <div>
            <h3 className="text-lg font-bold text-navy-900">{activeConfig.modalHeading}</h3>
            <p className="text-xs text-slate-500">{activeConfig.shortDescription}</p>
          </div>
        </div>
      )}

      {/* Form Scrollable Body */}
      <div className={isModal ? "flex-1 overflow-y-auto px-5 sm:px-7 lg:px-8 py-3 sm:py-3.5 space-y-2 box-border" : "space-y-3"}>
        
        {/* Service Selector or Banner */}
        {activeConfig.hideServiceSelector ? (
          <div className="flex items-center justify-between bg-orange-50/80 border border-orange-200/80 rounded-xl px-3.5 py-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span className="text-xs font-semibold text-orange-950">
                {activeConfig.bannerTitle || activeConfig.displayName}
              </span>
            </div>
          </div>
        ) : (
          <div className="mb-2">
            <ServiceSelector
              selectedServiceId={currentServiceId}
              onSelectService={handleServiceSelect}
              formUid={formUid}
            />
            <input 
              type="hidden" 
              id={`${formUid}-serviceCategory`} 
              name="serviceCategory" 
              value={currentServiceId} 
            />
          </div>
        )}

        {submitError && (
          <div className="p-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{submitError}</span>
          </div>
        )}

        {/* Two-Column Grid for Input Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 sm:gap-y-2.5">
          
          {/* Row 1 & 2: Shared Contact Fields */}
          {SHARED_FIELDS.map((field) => (
            <div key={field.name} className="col-span-1">
              <label 
                htmlFor={`${formUid}-${field.name}`} 
                className="block text-[13px] font-medium text-slate-700 mb-1 leading-none"
              >
                {field.label} {field.required && <span className="text-red-500 font-bold ml-0.5">*</span>}
              </label>
              <input
                id={`${formUid}-${field.name}`}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={sharedData[field.name] || ''}
                onChange={(e) => handleSharedChange(field.name, e.target.value)}
                aria-invalid={!!errors[field.name]}
                aria-describedby={errors[field.name] ? `${formUid}-${field.name}-err` : undefined}
                className={`w-full px-3 text-base sm:text-[13.5px] rounded-xl border h-[40px] sm:h-[40px] transition-colors bg-white text-navy-900 placeholder:text-slate-400 placeholder:font-normal placeholder:opacity-100 ${
                  errors[field.name] ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-orange-500'
                } focus:outline-none focus:ring-1 focus:ring-orange-500`}
              />
              {errors[field.name] && (
                <p id={`${formUid}-${field.name}-err`} className="text-[11.5px] text-red-500 leading-none mt-1">
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}

          {/* Row 3 onwards: Dynamic Service-Specific Fields */}
          {activeConfig.fields.map((field) => {
            const isFullWidth = field.colSpan === 2 || field.type === 'textarea' || field.type === 'checkbox-group';
            const value = serviceFields[field.name] || '';
            const fieldError = errors[field.name];

            return (
              <div 
                key={field.name} 
                className={isFullWidth ? "sm:col-span-2 col-span-1" : "col-span-1"}
              >
                <label 
                  htmlFor={`${formUid}-${field.name}`} 
                  className={`block mb-1 leading-none ${
                    field.required 
                      ? 'text-[13px] font-medium text-slate-700' 
                      : 'text-[13px] font-normal text-slate-500'
                  }`}
                >
                  {field.label} {field.required ? (
                    <span className="text-red-500 font-bold ml-0.5">*</span>
                  ) : (
                    <span className="text-slate-400 font-normal ml-1 text-xs">(Optional)</span>
                  )}
                </label>

                {field.type === 'checkbox-group' ? (
                  <div className="space-y-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {field.options.map((opt, optIdx) => {
                        const isChecked = Array.isArray(value) && value.includes(opt);
                        const optId = `${formUid}-${field.name}-${optIdx}`;
                        return (
                          <label
                            key={opt}
                            htmlFor={optId}
                            className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-all select-none ${
                              isChecked
                                ? 'border-orange-500 bg-orange-50/80 text-navy-950 font-medium shadow-xs ring-1 ring-orange-500/30'
                                : 'border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700'
                            }`}
                          >
                            <input
                              id={optId}
                              type="checkbox"
                              name={field.name}
                              value={opt}
                              checked={isChecked}
                              onChange={() => handleCheckboxToggle(field.name, opt)}
                              className="w-4 h-4 mt-0.5 rounded text-orange-600 focus:ring-orange-500 border-slate-300 cursor-pointer accent-orange-600 shrink-0"
                            />
                            <span className="leading-snug">{opt}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ) : field.type === 'select' ? (
                  <div className="relative">
                    <select
                      id={`${formUid}-${field.name}`}
                      name={field.name}
                      value={value}
                      onChange={(e) => handleFieldChange(field.name, e.target.value)}
                      style={{ color: !value ? '#94A3B8' : '#0B1F3A' }}
                      aria-invalid={!!fieldError}
                      aria-describedby={fieldError ? `${formUid}-${field.name}-err` : undefined}
                      className={`w-full px-3 text-base sm:text-[13.5px] rounded-xl border h-[40px] sm:h-[40px] transition-colors bg-white appearance-none pr-8 cursor-pointer ${
                        !value ? 'text-[#94A3B8]' : 'text-[#0B1F3A] font-normal'
                      } ${
                        fieldError ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-orange-500'
                      } focus:outline-none focus:ring-1 focus:ring-orange-500`}
                    >
                      <option value="" className="text-[#94A3B8]">
                        Select {field.label.toLowerCase()}
                      </option>
                      {field.options.map((opt) => (
                        <option key={opt} value={opt} className="text-[#0B1F3A]">
                          {opt}
                        </option>
                      ))}
                      {value && !field.options.includes(value) && (
                        <option key={value} value={value} className="text-[#0B1F3A]">
                          {value}
                        </option>
                      )}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                ) : field.type === 'textarea' ? (
                  <textarea
                    id={`${formUid}-${field.name}`}
                    name={field.name}
                    rows={field.rows || 2}
                    placeholder={field.placeholder}
                    value={value}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    aria-invalid={!!fieldError}
                    aria-describedby={fieldError ? `${formUid}-${field.name}-err` : undefined}
                    className={`w-full px-3 py-1.5 text-base sm:text-[13.5px] rounded-xl border min-h-[48px] sm:h-[50px] resize-none transition-colors leading-snug bg-white text-navy-900 placeholder:text-slate-400 placeholder:font-normal placeholder:opacity-100 ${
                      fieldError ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-orange-500'
                    } focus:outline-none focus:ring-1 focus:ring-orange-500`}
                  />
                ) : (
                  <input
                    id={`${formUid}-${field.name}`}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={value}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    aria-invalid={!!fieldError}
                    aria-describedby={fieldError ? `${formUid}-${field.name}-err` : undefined}
                    className={`w-full px-3 text-base sm:text-[13.5px] rounded-xl border h-[40px] sm:h-[40px] transition-colors bg-white text-navy-900 placeholder:text-slate-400 placeholder:font-normal placeholder:opacity-100 ${
                      fieldError ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-orange-500'
                    } focus:outline-none focus:ring-1 focus:ring-orange-500`}
                  />
                )}

                {fieldError && (
                  <p id={`${formUid}-${field.name}-err`} className="text-[11.5px] text-red-500 leading-none mt-1">
                    {fieldError}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Submit Footer */}
      <div className={isModal 
        ? "shrink-0 border-t border-slate-200/80 bg-slate-50 px-5 sm:px-7 lg:px-8 py-2.5 sm:py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 box-border" 
        : "pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
      }>
        <p className="text-[13px] text-slate-500 leading-normal order-2 sm:order-1 sm:max-w-md">
          By submitting, you agree to receive guidance from Vidyapaths. Unbiased & 100% free.
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="order-1 sm:order-2 w-full sm:w-auto min-w-[210px] inline-flex items-center justify-center gap-2 px-6 py-2 rounded-xl font-bold text-white bg-orange-500 hover:bg-orange-600 transition-all shadow-md hover:shadow-orange-500/20 active:scale-[0.99] cursor-pointer disabled:opacity-70 h-[42px] sm:h-[43px] shrink-0 text-sm"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span>Submitting...</span>
            </span>
          ) : (
            <>
              <span>
                {currentServiceId === 'career-roadmap'
                  ? 'Get Free Consultation'
                  : currentServiceId === 'college-comparison'
                  ? 'Request Free Comparison'
                  : 'Get Free Guidance'}
              </span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
