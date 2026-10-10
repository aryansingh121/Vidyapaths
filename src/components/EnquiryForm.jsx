import React, { useState, useEffect, useId } from 'react';
import { Send, CheckCircle, AlertCircle, MessageSquare, Sparkles, ChevronDown } from 'lucide-react';
import { siteConfig } from '../data/siteData';
import { 
  SHARED_FIELDS, 
  SERVICE_FORM_CONFIGS, 
  SERVICE_OPTIONS, 
  getServiceConfig 
} from '../data/serviceFormConfigs';

export default function EnquiryForm({ 
  defaultService = '', 
  activeServiceId: propActiveServiceId,
  onServiceChange,
  source = 'Lead Form', 
  isModal = false 
}) {
  const formUid = useId();

  // Active Service State
  const [currentServiceId, setCurrentServiceId] = useState(() => {
    if (propActiveServiceId && SERVICE_FORM_CONFIGS[propActiveServiceId]) {
      return propActiveServiceId;
    }
    return getServiceConfig(defaultService).id;
  });

  // Sync when propActiveServiceId or defaultService changes
  useEffect(() => {
    if (propActiveServiceId && SERVICE_FORM_CONFIGS[propActiveServiceId]) {
      setCurrentServiceId(propActiveServiceId);
    } else if (defaultService) {
      const resolved = getServiceConfig(defaultService);
      setCurrentServiceId(resolved.id);
    }
  }, [propActiveServiceId, defaultService]);

  const activeConfig = SERVICE_FORM_CONFIGS[currentServiceId] || SERVICE_FORM_CONFIGS['college-admissions'];

  // Shared contact fields across all forms
  const [sharedData, setSharedData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    currentCity: ''
  });

  // Service-specific field states (isolated by service ID to prevent stale cross-service submission)
  const [serviceFields, setServiceFields] = useState({
    'college-admissions': {},
    'career-counselling': {},
    'internship-assistance': {},
    'study-abroad': {},
    'resume-interview': {},
    'scholarships-loans': {}
  });

  // Prefill specific prompts (e.g. from college page or country cards)
  useEffect(() => {
    if (defaultService) {
      if (defaultService.startsWith('Admission Guidance - ')) {
        const collegeName = defaultService.replace('Admission Guidance - ', '').trim();
        setServiceFields(prev => ({
          ...prev,
          'college-admissions': {
            ...prev['college-admissions'],
            preferredCollege: collegeName,
            message: prev['college-admissions'].message || `Seeking admission guidance for ${collegeName}.`
          }
        }));
      } else if (defaultService.startsWith('Admission Guidance: ')) {
        const details = defaultService.replace('Admission Guidance: ', '').trim();
        setServiceFields(prev => ({
          ...prev,
          'college-admissions': {
            ...prev['college-admissions'],
            message: prev['college-admissions'].message || `Seeking guidance for ${details}.`
          }
        }));
      } else if (defaultService.startsWith('Study Abroad - ') || defaultService.startsWith('Study Abroad Counselling for ')) {
        const countryName = defaultService
          .replace('Study Abroad - ', '')
          .replace('Study Abroad Counselling for ', '')
          .trim();
        setServiceFields(prev => ({
          ...prev,
          'study-abroad': {
            ...prev['study-abroad'],
            intendedCountries: countryName
          }
        }));
      } else if (defaultService.startsWith('Internship in ')) {
        const domain = defaultService.replace('Internship in ', '').trim();
        setServiceFields(prev => ({
          ...prev,
          'internship-assistance': {
            ...prev['internship-assistance'],
            preferredDomain: domain
          }
        }));
      }
    }
  }, [defaultService]);

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Handle switching service category
  const handleServiceSelect = (newServiceId) => {
    setCurrentServiceId(newServiceId);
    if (onServiceChange) {
      onServiceChange(newServiceId);
    }
    // Clear errors when switching service
    setErrors({});
    if (submitError) setSubmitError('');
  };

  // Shared fields change handler
  const handleSharedChange = (e) => {
    const { name, value } = e.target;
    setSharedData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (submitError) setSubmitError('');
  };

  // Service-specific field change handler
  const handleServiceFieldChange = (name, value) => {
    setServiceFields(prev => ({
      ...prev,
      [currentServiceId]: {
        ...prev[currentServiceId],
        [name]: value
      }
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (submitError) setSubmitError('');
  };

  // Field validation
  const validate = () => {
    const newErrors = {};

    // 1. Shared fields validation
    if (!sharedData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    if (!sharedData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^[0-9+\s\-()]{10,15}$/.test(sharedData.mobileNumber.trim())) {
      newErrors.mobileNumber = 'Enter a valid 10-digit mobile number';
    }

    if (!sharedData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sharedData.email.trim())) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!sharedData.currentCity.trim()) {
      newErrors.currentCity = 'Current City is required';
    }

    // 2. Active service fields validation
    const currentValues = serviceFields[currentServiceId] || {};
    activeConfig.fields.forEach(field => {
      const val = currentValues[field.name];

      if (field.required) {
        if (!val || (typeof val === 'string' && !val.trim())) {
          newErrors[field.name] = field.errorMessage || `${field.label} is required`;
        }
      }

      // URL validation when non-empty
      if (field.type === 'url' && val && val.trim()) {
        const trimmed = val.trim();
        if (!/^https?:\/\/.+/i.test(trimmed)) {
          newErrors[field.name] = field.errorMessage || 'Please enter a valid URL starting with http:// or https://';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    const currentValues = serviceFields[currentServiceId] || {};

    // Assemble comprehensive lead payload (isolating only active service's fields)
    const leadRecord = {
      serviceId: currentServiceId,
      serviceName: activeConfig.displayName,
      source,
      fullName: sharedData.fullName,
      mobileNumber: sharedData.mobileNumber,
      email: sharedData.email,
      currentCity: sharedData.currentCity,
      ...currentValues,
      timestamp: new Date().toISOString()
    };

    // Save lead to local storage backup
    try {
      const storedLeads = JSON.parse(localStorage.getItem('vidyapaths_leads') || '[]');
      storedLeads.push(leadRecord);
      localStorage.setItem('vidyapaths_leads', JSON.stringify(storedLeads));
    } catch {
      // LocalStorage access handling
    }

    // Build human-readable details summary for email delivery
    const formattedDetails = activeConfig.fields
      .map(f => {
        const val = currentValues[f.name];
        return val ? `${f.label}: ${val}` : null;
      })
      .filter(Boolean)
      .join('\n');

    // Attempt FormSubmit AJAX dispatch if configured
    try {
      if (siteConfig.formSubmitEmail && siteConfig.formSubmitEmail !== 'admissions@vidyapaths.com') {
        const response = await fetch(`https://formsubmit.co/ajax/${siteConfig.formSubmitEmail}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            ...leadRecord,
            _subject: `New Vidyapaths Enquiry [${activeConfig.displayName}]: ${sharedData.fullName} (${sharedData.mobileNumber})`,
            'Selected Service': activeConfig.displayName,
            'Candidate Name': sharedData.fullName,
            'Mobile': sharedData.mobileNumber,
            'Email': sharedData.email,
            'City': sharedData.currentCity,
            'Service Details': formattedDetails
          })
        });

        if (!response.ok) {
          // Fallback handled gracefully
        }
      }
    } catch {
      // Network graceful handling
    }

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const openWhatsAppWithData = () => {
    const text = `Hi Vidyapaths! I submitted an enquiry for ${activeConfig.displayName}.\nName: ${sharedData.fullName}\nCity: ${sharedData.currentCity}\nContact: ${sharedData.mobileNumber}`;
    window.open(`https://wa.me/${siteConfig.phoneRaw.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Confirmation view
  if (submitted) {
    return (
      <div className={`text-center animate-in fade-in duration-300 ${isModal ? 'py-3' : 'bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm'}`}>
        <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-navy-900 mb-1.5">Thank you!</h3>
        <p className="text-slate-600 max-w-md mx-auto mb-4 text-xs sm:text-sm leading-relaxed">
          Your enquiry for <span className="font-semibold text-navy-900">{activeConfig.displayName}</span> has been received. Our dedicated mentors will get in touch shortly.
        </p>

        <div className="bg-slate-50 rounded-xl p-3.5 mb-4 border border-slate-100 text-left text-xs sm:text-sm max-w-md mx-auto space-y-1.5">
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
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm min-h-[42px] cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp Now</span>
          </button>
          <button
            onClick={() => {
              setSubmitted(false);
              setServiceFields(prev => ({
                ...prev,
                [currentServiceId]: {}
              }));
            }}
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors min-h-[42px] cursor-pointer"
          >
            Submit Another Query
          </button>
        </div>
      </div>
    );
  }

  const currentValues = serviceFields[currentServiceId] || {};

  return (
    <form 
      onSubmit={handleSubmit} 
      noValidate 
      className={isModal ? "w-full box-border" : "bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm box-border"}
    >
      {!isModal && (
        <div className="flex items-center gap-2 mb-5">
          <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-navy-900">{activeConfig.modalHeading}</h3>
            <p className="text-xs text-slate-500">{activeConfig.shortDescription}</p>
          </div>
        </div>
      )}

      {submitError && (
        <div className="mb-3 p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      <div className="space-y-3">
        {/* Service Selector Dropdown */}
        <div className="bg-slate-50 p-2.5 sm:p-3 rounded-xl border border-slate-200/80">
          <label htmlFor={`${formUid}-serviceCategory`} className="block text-xs font-semibold text-navy-900 mb-1">
            Service Required <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              id={`${formUid}-serviceCategory`}
              value={currentServiceId}
              onChange={(e) => handleServiceSelect(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 font-semibold text-navy-900 bg-white hover:border-orange-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 h-10 sm:h-[42px] transition-colors appearance-none pr-8 cursor-pointer"
            >
              {SERVICE_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.displayName}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Section 1: Shared Contact Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          {SHARED_FIELDS.map((field) => (
            <div key={field.name}>
              <label htmlFor={`${formUid}-${field.name}`} className="block text-xs font-semibold text-slate-700 mb-1">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              <input
                id={`${formUid}-${field.name}`}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={sharedData[field.name]}
                onChange={handleSharedChange}
                aria-invalid={!!errors[field.name]}
                aria-describedby={errors[field.name] ? `${formUid}-${field.name}-err` : undefined}
                className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg border h-10 sm:h-[42px] transition-colors ${
                  errors[field.name] ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-orange-500'
                } focus:outline-none focus:ring-1 focus:ring-orange-500`}
              />
              {errors[field.name] && (
                <p id={`${formUid}-${field.name}-err`} className="text-xs text-red-500 mt-0.5">
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Section 2: Service-Specific Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          {activeConfig.fields.map((field) => {
            const isFullWidth = field.colSpan === 2 || field.type === 'textarea';
            const value = currentValues[field.name] || '';
            const fieldError = errors[field.name];

            return (
              <div 
                key={field.name} 
                className={isFullWidth ? "sm:col-span-2" : "col-span-1"}
              >
                <label 
                  htmlFor={`${formUid}-${field.name}`} 
                  className={`block mb-1 ${
                    field.required 
                      ? 'text-xs font-semibold text-slate-700' 
                      : 'text-[11px] sm:text-xs font-medium text-slate-500'
                  }`}
                >
                  {field.label} {field.required ? <span className="text-red-500">*</span> : <span className="text-slate-400">(Optional)</span>}
                </label>

                {field.type === 'select' ? (
                  <div className="relative">
                    <select
                      id={`${formUid}-${field.name}`}
                      value={value}
                      onChange={(e) => handleServiceFieldChange(field.name, e.target.value)}
                      aria-invalid={!!fieldError}
                      aria-describedby={fieldError ? `${formUid}-${field.name}-err` : undefined}
                      className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg border h-10 sm:h-[42px] transition-colors bg-white appearance-none pr-8 cursor-pointer ${
                        fieldError ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-orange-500'
                      } focus:outline-none focus:ring-1 focus:ring-orange-500`}
                    >
                      <option value="">Select {field.label.toLowerCase()}</option>
                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                ) : field.type === 'textarea' ? (
                  <textarea
                    id={`${formUid}-${field.name}`}
                    rows={field.rows || 2}
                    placeholder={field.placeholder}
                    value={value}
                    onChange={(e) => handleServiceFieldChange(field.name, e.target.value)}
                    aria-invalid={!!fieldError}
                    aria-describedby={fieldError ? `${formUid}-${field.name}-err` : undefined}
                    className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg border h-[64px] sm:h-[68px] resize-none transition-colors ${
                      fieldError ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-orange-500'
                    } focus:outline-none focus:ring-1 focus:ring-orange-500`}
                  />
                ) : (
                  <input
                    id={`${formUid}-${field.name}`}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={value}
                    onChange={(e) => handleServiceFieldChange(field.name, e.target.value)}
                    aria-invalid={!!fieldError}
                    aria-describedby={fieldError ? `${formUid}-${field.name}-err` : undefined}
                    className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg border h-10 sm:h-[42px] transition-colors ${
                      fieldError ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-orange-500'
                    } focus:outline-none focus:ring-1 focus:ring-orange-500`}
                  />
                )}

                {fieldError && (
                  <p id={`${formUid}-${field.name}-err`} className="text-xs text-red-500 mt-0.5">
                    {fieldError}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Section 3: Submit Button & Privacy Note */}
        <div className="pt-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-4">
          <p className="text-[11px] text-slate-500 leading-tight order-2 sm:order-1 sm:max-w-xs md:max-w-md">
            By submitting, you agree to receive guidance from Vidyapaths regarding your enquiry. Unbiased & 100% free.
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="order-1 sm:order-2 w-full sm:w-auto min-w-[200px] sm:min-w-[220px] inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:py-3 rounded-xl font-bold text-white bg-orange-500 hover:bg-orange-600 transition-all shadow-md hover:shadow-orange-500/20 active:scale-[0.99] cursor-pointer disabled:opacity-70 min-h-[42px] shrink-0 text-xs sm:text-sm"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Submitting Enquiry...</span>
              </span>
            ) : (
              <>
                <span>Get Free Guidance</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
