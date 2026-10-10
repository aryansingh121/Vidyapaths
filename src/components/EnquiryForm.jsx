import React, { useState, useEffect, useId } from 'react';
import { Send, CheckCircle, AlertCircle, MessageSquare, Sparkles, ChevronDown } from 'lucide-react';
import { siteConfig } from '../data/siteData';
import { 
  SHARED_FIELDS, 
  SERVICE_FORM_CONFIGS, 
  SERVICE_OPTIONS, 
  getServiceConfig 
} from '../data/serviceFormConfigs';
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

  // Active Service State
  const [currentServiceId, setCurrentServiceId] = useState(() => {
    if (propActiveServiceId && SERVICE_FORM_CONFIGS[propActiveServiceId]) {
      return propActiveServiceId;
    }
    return getServiceConfig(defaultService).id;
  });

  // Sync when propActiveServiceId or defaultService changes
  useEffect(() => {
    if (propActiveServiceId) {
      const resolved = getServiceConfig(propActiveServiceId);
      setCurrentServiceId(resolved.id);
      setErrors({});
      setSubmitError('');
    } else if (defaultService) {
      const resolved = getServiceConfig(defaultService);
      setCurrentServiceId(resolved.id);
      setErrors({});
      setSubmitError('');
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
  const [serviceFields, setServiceFields] = useState(() => {
    const base = {
      'college-admissions': {},
      'career-counselling': {},
      'internship-assistance': {},
      'study-abroad': {},
      'resume-interview': {},
      'scholarships-loans': {},
      'career-roadmap': {
        guidanceNeeds: []
      },
      'college-comparison': {
        comparisonPriorities: []
      }
    };
    if (initialValues && Object.keys(initialValues).length > 0) {
      base['college-admissions'] = {
        preferredCourse: initialValues.preferredCourse || '',
        preferredCollege: initialValues.preferredCollege || initialValues.college || '',
        ...initialValues
      };
      base['college-comparison'] = {
        ...base['college-comparison'],
        ...initialValues
      };
      if (initialValues.intendedCountries || initialValues.country) {
        base['study-abroad'] = {
          ...base['study-abroad'],
          intendedCountries: initialValues.intendedCountries || initialValues.country,
          ...initialValues
        };
      }
      if (initialValues.preferredDomain || initialValues.domain) {
        base['internship-assistance'] = {
          ...base['internship-assistance'],
          preferredDomain: initialValues.preferredDomain || initialValues.domain,
          ...initialValues
        };
      }
    }
    return base;
  });

  // Sync when initialValues prop updates
  useEffect(() => {
    if (initialValues && Object.keys(initialValues).length > 0) {
      setServiceFields(prev => ({
        ...prev,
        'college-admissions': {
          ...prev['college-admissions'],
          preferredCourse: initialValues.preferredCourse !== undefined 
            ? initialValues.preferredCourse 
            : (initialValues.preferredCollege || initialValues.college ? '' : (prev['college-admissions']?.preferredCourse || '')),
          preferredCollege: initialValues.preferredCollege !== undefined 
            ? initialValues.preferredCollege 
            : (initialValues.college !== undefined 
                ? initialValues.college 
                : (prev['college-admissions']?.preferredCollege || '')),
          ...initialValues
        },
        'college-comparison': {
          ...prev['college-comparison'],
          ...initialValues
        },
        'study-abroad': {
          ...prev['study-abroad'],
          ...(initialValues.intendedCountries || initialValues.country
            ? { intendedCountries: initialValues.intendedCountries || initialValues.country }
            : {}),
          ...initialValues
        },
        'internship-assistance': {
          ...prev['internship-assistance'],
          ...(initialValues.preferredDomain || initialValues.domain
            ? { preferredDomain: initialValues.preferredDomain || initialValues.domain }
            : {}),
          ...initialValues
        }
      }));
      if (initialValues.preferredDomain || initialValues.domain) {
        setErrors(prev => {
          if (prev.preferredDomain) {
            const next = { ...prev };
            delete next.preferredDomain;
            return next;
          }
          return prev;
        });
      }
      if (initialValues.preferredCourse) {
        setErrors(prev => {
          if (prev.preferredCourse) {
            const next = { ...prev };
            delete next.preferredCourse;
            return next;
          }
          return prev;
        });
      }
    }
  }, [initialValues]);

  // Prefill specific prompts
  useEffect(() => {
    if (defaultService) {
      if (defaultService.startsWith('Admission Guidance for ')) {
        const courseName = defaultService.replace('Admission Guidance for ', '').trim();
        setServiceFields(prev => ({
          ...prev,
          'college-admissions': {
            ...prev['college-admissions'],
            preferredCourse: courseName
          }
        }));
      } else if (defaultService.startsWith('Colleges in ')) {
        const domainName = defaultService.replace('Colleges in ', '').trim();
        setServiceFields(prev => ({
          ...prev,
          'college-admissions': {
            ...prev['college-admissions'],
            preferredCourse: domainName
          }
        }));
      } else if (defaultService.startsWith('Admission Guidance - ')) {
        const collegeName = defaultService.replace('Admission Guidance - ', '').trim();
        setServiceFields(prev => ({
          ...prev,
          'college-admissions': {
            ...prev['college-admissions'],
            preferredCollege: collegeName,
            preferredCourse: '',
            message: prev['college-admissions'].message || `Seeking admission guidance for ${collegeName}.`
          },
          'college-comparison': {
            ...prev['college-comparison'],
            preferredCollege1: collegeName
          }
        }));
      } else if (defaultService.startsWith('College Comparison Request - ')) {
        const item = defaultService.replace('College Comparison Request - ', '').trim();
        setServiceFields(prev => ({
          ...prev,
          'college-comparison': {
            ...prev['college-comparison'],
            preferredCollege1: item
          }
        }));
      } else if (defaultService.startsWith('Admission Guidance: ')) {
        const details = defaultService.replace('Admission Guidance: ', '').trim();
        let courseName = '';
        let collegeName = '';
        if (details.includes(' at ')) {
          const parts = details.split(' at ');
          courseName = parts[0].trim();
          collegeName = parts[1].trim();
        }
        setServiceFields(prev => ({
          ...prev,
          'college-admissions': {
            ...prev['college-admissions'],
            ...(courseName ? { preferredCourse: courseName } : {}),
            ...(collegeName ? { preferredCollege: collegeName } : {}),
            message: prev['college-admissions'].message || `Seeking guidance for ${details}.`
          }
        }));
        if (courseName) {
          setErrors(prev => {
            if (prev.preferredCourse) {
              const next = { ...prev };
              delete next.preferredCourse;
              return next;
            }
            return prev;
          });
        }
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
        setErrors(prev => {
          if (prev.preferredDomain) {
            const next = { ...prev };
            delete next.preferredDomain;
            return next;
          }
          return prev;
        });
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
        if (field.type === 'checkbox-group') {
          if (!val || !Array.isArray(val) || val.length === 0) {
            newErrors[field.name] = field.errorMessage || 'Please select at least one option';
          }
        } else if (!val || (typeof val === 'string' && !val.trim())) {
          newErrors[field.name] = field.errorMessage || `${field.label} is required`;
        }
      }

      // URL validation when non-empty
      if (field.type === 'url' && val && val.trim()) {
        const trimmed = val.trim();
        if (!/^https?:\/\/.+/i.test(trimmed)) {
          newErrors[field.name] = field.errorMessage || 'Please enter a valid URL (http:// or https://)';
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
    const isCareerRoadmap = currentServiceId === 'career-roadmap';
    const isCollegeComparison = currentServiceId === 'college-comparison';

    let effectiveSource = source;
    if (isCareerRoadmap) {
      effectiveSource = 'Career Roadmap Consultation CTA';
    } else if (isCollegeComparison) {
      effectiveSource = 'College Comparison Request CTA';
    }

    const leadRecord = {
      serviceId: currentServiceId,
      serviceName: activeConfig.displayName,
      source: effectiveSource,
      fullName: sharedData.fullName.trim(),
      mobileNumber: sharedData.mobileNumber.trim(),
      email: sharedData.email.trim(),
      currentCity: sharedData.currentCity.trim(),
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
        if (!val) return null;
        if (Array.isArray(val)) {
          return val.length > 0 ? `${f.label}: ${val.join(', ')}` : null;
        }
        return `${f.label}: ${val}`;
      })
      .filter(Boolean)
      .join('\n');

    const emailSubject = isCareerRoadmap
      ? 'New Career Roadmap Consultation — Vidyapaths'
      : isCollegeComparison
      ? 'New College Comparison Request — Vidyapaths'
      : (activeConfig.emailSubject || `New Vidyapaths Enquiry [${activeConfig.displayName}]: ${sharedData.fullName.trim()} (${sharedData.mobileNumber.trim()})`);

    const emailBody = {
      ...leadRecord,
      _subject: emailSubject,
      'Selected Service': activeConfig.displayName,
      'Candidate Name': sharedData.fullName.trim(),
      'Mobile': sharedData.mobileNumber.trim(),
      'Email': sharedData.email.trim(),
      'City': sharedData.currentCity.trim(),
      'Source': effectiveSource
    };

    if (isCareerRoadmap) {
      emailBody['Academic Background'] = `${currentValues.currentEducation || ''} | Stream: ${currentValues.currentStream || ''} | Stage: ${currentValues.careerStage || ''}`;
      emailBody['Selected Guidance Concerns'] = Array.isArray(currentValues.guidanceNeeds) ? currentValues.guidanceNeeds.join(', ') : (currentValues.guidanceNeeds || 'None');
      emailBody['Preferred Career Fields'] = currentValues.preferredCareerFields || 'Not specified';
      emailBody['Main Question or Concern'] = currentValues.mainQuestion || 'None';
      emailBody['Preferred Consultation Mode'] = currentValues.consultationMode || 'Not specified';
      emailBody['Preferred Time'] = currentValues.preferredTime || 'Flexible';
    } else if (isCollegeComparison) {
      emailBody['Academic Profile'] = `${currentValues.currentQualification || ''} (Passing: ${currentValues.passingYear || ''}) | Course: ${currentValues.preferredCourse || ''} | Score: ${currentValues.academicPercentage || ''} | Year: ${currentValues.admissionYear || ''}`;
      if (currentValues.entranceExam || currentValues.entranceScore) {
        emailBody['Entrance Exam'] = `${currentValues.entranceExam || 'None'} (${currentValues.entranceScore || 'N/A'})`;
      }
      emailBody['Location Preference'] = currentValues.preferredStudyLocation || 'Not specified';
      const targetColleges = [currentValues.preferredCollege1, currentValues.preferredCollege2, currentValues.preferredCollege3].filter(Boolean);
      emailBody['Target Colleges'] = targetColleges.length > 0 ? targetColleges.join(', ') : 'Requested counselor recommendations';
      emailBody['Comparison Factors'] = Array.isArray(currentValues.comparisonPriorities) ? currentValues.comparisonPriorities.join(', ') : (currentValues.comparisonPriorities || 'Not specified');
      emailBody['Additional Note'] = currentValues.message || 'None';
      emailBody['Service Details'] = formattedDetails;
      emailBody['Disclaimer'] = 'Student requested comparative evaluation sheet. Will be provided after counselor cutoff and eligibility review.';
    } else {
      emailBody['Service Details'] = formattedDetails;
    }

    if (currentServiceId === 'internship-assistance') {
      emailBody['Preferred Domain'] = currentValues.preferredDomain || 'Not specified';
    }

    if (currentServiceId === 'college-admissions') {
      if (currentValues.preferredCollege) {
        emailBody['Preferred College / University'] = currentValues.preferredCollege;
      }
      if (currentValues.preferredCourse) {
        emailBody['Preferred Course'] = currentValues.preferredCourse;
      }
    }

    try {
      if (siteConfig.formSubmitEmail && siteConfig.formSubmitEmail !== 'admissions@vidyapaths.com') {
        const response = await fetch(`https://formsubmit.co/ajax/${siteConfig.formSubmitEmail}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(emailBody)
        });

        if (!response.ok) {
          throw new Error('Unable to send consultation request right now. Please try again or reach out on WhatsApp.');
        }
      } else {
        // Simulated latency for local test / placeholder environment
        await new Promise(r => setTimeout(r, 600));
      }
    } catch (err) {
      setIsSubmitting(false);
      setSubmitError(err.message || 'Submission failed. Please try again.');
      return;
    }

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const openWhatsAppWithData = () => {
    let text = `Hi Vidyapaths! I submitted an enquiry for ${activeConfig.displayName}.\nName: ${sharedData.fullName}\nCity: ${sharedData.currentCity}\nContact: ${sharedData.mobileNumber}`;
    if (currentServiceId === 'career-roadmap') {
      const cv = serviceFields['career-roadmap'] || {};
      text = `Hi Vidyapaths! I requested a Free 15-Minute Career Roadmap Consultation.\nName: ${sharedData.fullName}\nCity: ${sharedData.currentCity}\nEducation: ${cv.currentEducation || ''} (${cv.currentStream || ''})\nMode: ${cv.consultationMode || ''}`;
    } else if (currentServiceId === 'college-comparison') {
      const cv = serviceFields['college-comparison'] || {};
      text = `Hi Vidyapaths! I requested a Free College Comparison Sheet.\nName: ${sharedData.fullName}\nCity: ${sharedData.currentCity}\nCourse: ${cv.preferredCourse || ''}\nLocation: ${cv.preferredStudyLocation || ''}`;
    }
    window.open(`https://wa.me/${siteConfig.phoneRaw.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Confirmation view
  if (submitted) {
    return (
      <div className={`text-center animate-in fade-in duration-300 ${isModal ? 'py-6 px-6 sm:px-8 my-auto' : 'bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm'}`}>
        <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-navy-900 mb-1.5">Thank you!</h3>
        <p className="text-slate-600 max-w-md mx-auto mb-4 text-xs sm:text-[14px] leading-relaxed">
          {currentServiceId === 'college-comparison' ? (
            <span>
              Your College Comparison Request has been received. Our academic counselors will review your profile, evaluate cutoff trends and eligibility, and prepare an unbiased comparison sheet for you shortly.
            </span>
          ) : (
            <span>
              Your enquiry for <span className="font-semibold text-navy-900">{activeConfig.displayName}</span> has been received. Our dedicated mentors will get in touch shortly.
            </span>
          )}
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
            onClick={() => {
              setSubmitted(false);
              setServiceFields(prev => ({
                ...prev,
                [currentServiceId]: {}
              }));
            }}
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors h-[42px] cursor-pointer"
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

      {/* Form Scrollable Body (Refined 20-24px horizontal and 14-16px vertical padding) */}
      <div className={isModal ? "flex-1 overflow-y-auto px-5 sm:px-7 lg:px-8 py-3 sm:py-3.5 space-y-2 box-border" : "space-y-3"}>
        
        {/* Premium Service Selector or Dedicated Consultation Header */}
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

        {/* Unified Two-Column Grid (Row Gap: 10px, Col Gap: 16px) */}
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
                value={sharedData[field.name]}
                onChange={handleSharedChange}
                aria-invalid={!!errors[field.name]}
                aria-describedby={errors[field.name] ? `${formUid}-${field.name}-err` : undefined}
                className={`w-full px-3 text-[13.5px] rounded-xl border h-[38px] sm:h-[40px] transition-colors bg-white text-navy-900 placeholder:text-slate-400 placeholder:font-normal placeholder:opacity-100 ${
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

          {/* Row 3 onwards: Service-Specific Fields */}
          {activeConfig.fields.map((field) => {
            const isFullWidth = field.colSpan === 2 || field.type === 'textarea' || field.type === 'checkbox-group';
            const value = currentValues[field.name] || '';
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
                              onChange={(e) => {
                                const currentArr = Array.isArray(value) ? [...value] : [];
                                const updated = e.target.checked
                                  ? [...currentArr, opt]
                                  : currentArr.filter(item => item !== opt);
                                handleServiceFieldChange(field.name, updated);
                              }}
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
                      onChange={(e) => handleServiceFieldChange(field.name, e.target.value)}
                      style={{ color: !value ? '#94A3B8' : '#0B1F3A' }}
                      aria-invalid={!!fieldError}
                      aria-describedby={fieldError ? `${formUid}-${field.name}-err` : undefined}
                      className={`w-full px-3 text-[13.5px] rounded-xl border h-[38px] sm:h-[40px] transition-colors bg-white appearance-none pr-8 cursor-pointer ${
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
                    onChange={(e) => handleServiceFieldChange(field.name, e.target.value)}
                    aria-invalid={!!fieldError}
                    aria-describedby={fieldError ? `${formUid}-${field.name}-err` : undefined}
                    className={`w-full px-3 py-1.5 text-[13.5px] rounded-xl border h-[48px] sm:h-[50px] resize-none transition-colors leading-snug bg-white text-navy-900 placeholder:text-slate-400 placeholder:font-normal placeholder:opacity-100 ${
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
                    onChange={(e) => handleServiceFieldChange(field.name, e.target.value)}
                    aria-invalid={!!fieldError}
                    aria-describedby={fieldError ? `${formUid}-${field.name}-err` : undefined}
                    className={`w-full px-3 text-[13.5px] rounded-xl border h-[38px] sm:h-[40px] transition-colors bg-white text-navy-900 placeholder:text-slate-400 placeholder:font-normal placeholder:opacity-100 ${
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

      {/* Refined Submit Footer (12-14px vertical padding, 42-44px button, 13px privacy note) */}
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
