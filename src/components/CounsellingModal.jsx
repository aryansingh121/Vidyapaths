/**
 * CounsellingModal.jsx
 * Dedicated, reusable modal dialog for "Get Free Counselling".
 * 
 * Contains exactly four fields:
 * 1. Name (required text input)
 * 2. Phone Number (required tel input with Indian phone validation)
 * 3. Email Address (required email input with format validation)
 * 4. Current Qualification (required dropdown with the 8 specified options)
 * 
 * Reuses the Vidyapaths FormSubmit email integration & safe local storage backup.
 */
import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, AlertCircle, Loader2, Phone, Mail, User, ShieldCheck } from 'lucide-react';
import { 
  COUNSELLING_QUALIFICATIONS, 
  validateIndianPhone, 
  validateEmail, 
  validateName, 
  validateQualification,
  submitFreeCounselling 
} from '../services/enquiryService';
import QualificationSelect from './common/QualificationSelect';

const INITIAL_FORM_STATE = {
  name: '',
  phone: '',
  email: '',
  qualification: ''
};

export default function CounsellingModal({
  isOpen,
  onClose,
  source = 'Get Free Counselling Button'
}) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const nameInputRef = useRef(null);
  const modalRef = useRef(null);

  // Reset state and lock body scroll when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setFormData(INITIAL_FORM_STATE);
      setErrors({});
      setTouched({});
      setIsSubmitting(false);
      setIsSubmitted(false);
      setSubmitError(null);
      return;
    }

    // Lock body scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus first input after animation
    const timer = setTimeout(() => {
      nameInputRef.current?.focus();
    }, 100);

    // Escape key listener
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isSubmitting) {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) return null;

  // Real-time field validation helper
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Please enter your full name.';
        if (!validateName(value)) return 'Please enter a valid name (at least 2 letters).';
        return null;
      case 'phone':
        if (!value.trim()) return 'Please enter your phone number.';
        if (!validateIndianPhone(value)) {
          return 'Enter a valid 10-digit Indian phone number (starting with 6-9).';
        }
        return null;
      case 'email':
        if (!value.trim()) return 'Please enter your email address.';
        if (!validateEmail(value)) return 'Please enter a valid email (e.g. name@example.com).';
        return null;
      case 'qualification':
        if (!value) return 'Please select your current qualification.';
        if (!validateQualification(value)) return 'Please select a valid qualification from the list.';
        return null;
      default:
        return null;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitError(null);

    // Validate on change if field was already touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Validate all 4 fields
    const newErrors = {
      name: validateField('name', formData.name),
      phone: validateField('phone', formData.phone),
      email: validateField('email', formData.email),
      qualification: validateField('qualification', formData.qualification)
    };

    setTouched({
      name: true,
      phone: true,
      email: true,
      qualification: true
    });
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await submitFreeCounselling({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        qualification: formData.qualification,
        source
      });

      if (result.success) {
        setIsSubmitted(true);
      } else {
        setSubmitError(result.error || 'Unable to submit your enquiry. Please check your connection and try again.');
      }
    } catch (err) {
      console.error('[CounsellingModal] Submission error:', err);
      setSubmitError('A network error occurred while submitting. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-navy-950/75 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="counselling-modal-heading"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0"
        onClick={!isSubmitting ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        ref={modalRef}
        className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col my-auto border border-slate-200/80 transition-all"
      >
        {/* Navy Header */}
        <div className="px-5 sm:px-7 py-4 sm:py-5 bg-navy-900 text-white flex items-start justify-between border-b border-navy-800 shrink-0">
          <div className="flex items-start gap-3.5 pr-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-md">
              <img src="/logo-icon.png" alt="Vidyapaths" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-orange-500 text-white uppercase tracking-wider mb-1.5">
                <span>100% Free Consultation</span>
              </div>
              <h2
                id="counselling-modal-heading"
                className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight"
              >
                Get Free Counselling
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-normal">
                Share your details and our counselling team will get in touch with you.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-white hover:bg-navy-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 cursor-pointer shrink-0 disabled:opacity-50"
            aria-label="Close counselling modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 max-h-[calc(100dvh-180px)] overflow-y-auto">
          {isSubmitted ? (
            /* Success Confirmation State */
            <div className="py-4 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner border border-emerald-100">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-bold text-navy-950">
                  Enquiry Submitted Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-navy-900">{formData.name}</strong>! Our counselling team has received your request and will call or WhatsApp you shortly.
                </p>
              </div>

              {/* Summary Pill Box */}
              <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-3.5 text-left text-xs text-slate-600 space-y-1.5 max-w-sm mx-auto">
                <div className="flex justify-between">
                  <span className="text-slate-400">Phone:</span>
                  <span className="font-semibold text-slate-800">{formData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Email:</span>
                  <span className="font-semibold text-slate-800">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Qualification:</span>
                  <span className="font-semibold text-slate-800">{formData.qualification}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-3 px-6 rounded-xl font-bold text-sm text-white bg-navy-950 hover:bg-navy-900 transition-colors shadow-md cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Exactly Four Fields Form */
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {submitError && (
                <div
                  role="alert"
                  className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in duration-150"
                >
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-500" />
                  <div className="flex-1 leading-snug">{submitError}</div>
                </div>
              )}

              {/* 1. Name Field */}
              <div>
                <label
                  htmlFor="counselling-name"
                  className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1.5"
                >
                  Name <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    ref={nameInputRef}
                    id="counselling-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your full name"
                    disabled={isSubmitting}
                    aria-required="true"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'counselling-name-error' : undefined}
                    className={`w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border text-base sm:text-sm transition-all focus:outline-none ${
                      errors.name && touched.name
                        ? 'border-rose-400 bg-rose-50/30 text-rose-900 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                        : 'border-slate-200 bg-slate-50/50 text-slate-800 hover:border-slate-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20'
                    }`}
                  />
                </div>
                {errors.name && touched.name && (
                  <p id="counselling-name-error" className="text-xs text-rose-600 mt-1 font-medium">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* 2. Phone Number Field */}
              <div>
                <label
                  htmlFor="counselling-phone"
                  className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1.5"
                >
                  Phone Number <span className="text-orange-500">*</span>
                </label>
                <div className="relative flex rounded-xl border border-slate-200 bg-slate-50/50 focus-within:border-orange-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-orange-500/20 transition-all overflow-hidden">
                  <div className="flex items-center gap-1 pl-3.5 pr-2.5 bg-slate-100/80 border-r border-slate-200 text-slate-700 text-xs sm:text-sm font-semibold shrink-0 select-none">
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    <span>+91</span>
                  </div>
                  <input
                    id="counselling-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="10-digit mobile number"
                    disabled={isSubmitting}
                    aria-required="true"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'counselling-phone-error' : undefined}
                    className="w-full px-3.5 py-2.5 sm:py-3 text-base sm:text-sm bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none"
                  />
                </div>
                {errors.phone && touched.phone && (
                  <p id="counselling-phone-error" className="text-xs text-rose-600 mt-1 font-medium">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* 3. Email Address Field */}
              <div>
                <label
                  htmlFor="counselling-email"
                  className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1.5"
                >
                  Email Address <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="counselling-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="name@example.com"
                    disabled={isSubmitting}
                    aria-required="true"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'counselling-email-error' : undefined}
                    className={`w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border text-base sm:text-sm transition-all focus:outline-none ${
                      errors.email && touched.email
                        ? 'border-rose-400 bg-rose-50/30 text-rose-900 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                        : 'border-slate-200 bg-slate-50/50 text-slate-800 hover:border-slate-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20'
                    }`}
                  />
                </div>
                {errors.email && touched.email && (
                  <p id="counselling-email-error" className="text-xs text-rose-600 mt-1 font-medium">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* 4. Current Qualification Dropdown */}
              <QualificationSelect
                id="counselling-qualification"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.qualification}
                touched={touched.qualification}
                disabled={isSubmitting}
                options={COUNSELLING_QUALIFICATIONS}
                placeholder="Select your current qualification"
              />

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-base text-white bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/25 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed min-h-[48px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting Enquiry...</span>
                    </>
                  ) : (
                    <span>Submit Enquiry</span>
                  )}
                </button>
              </div>

              {/* Trust Indicator */}
              <div className="pt-1 flex items-center justify-center gap-1.5 text-[11px] text-slate-500 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>100% Free • Direct Mentor Call • Zero Spam Guarantee</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
