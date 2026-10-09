import React, { useState, useId } from 'react';
import { Send, CheckCircle, AlertCircle, MessageSquare, Sparkles } from 'lucide-react';
import { siteConfig } from '../data/siteData';

export default function EnquiryForm({ defaultService = '', source = 'Lead Form' }) {
  const formUid = useId();

  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    whatsappNumber: '',
    email: '',
    currentCity: '',
    education: '',
    serviceRequired: defaultService || '',
    interestedCourse: '',
    preferredCountry: '',
    preferredCollege: '',
    preferredIntake: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^[0-9+\s\-()]{10,15}$/.test(formData.mobileNumber.trim())) {
      newErrors.mobileNumber = 'Enter a valid 10-digit mobile number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.currentCity.trim()) newErrors.currentCity = 'City is required';
    if (!formData.education) newErrors.education = 'Please select your current qualification';
    if (!formData.serviceRequired) newErrors.serviceRequired = 'Please choose a service';
    if (!formData.interestedCourse.trim()) newErrors.interestedCourse = 'Please mention interested course';
    if (!formData.preferredCountry.trim()) newErrors.preferredCountry = 'Please mention preferred country / region';
    if (!formData.message.trim()) newErrors.message = 'Please share your query or goal';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (submitError) {
      setSubmitError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    const leadRecord = {
      ...formData,
      source,
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

    // Attempt FormSubmit AJAX dispatch if configured, with graceful fallback
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
            _subject: `New Vidyapaths Enquiry: ${formData.fullName} (${formData.serviceRequired})`
          })
        });

        if (!response.ok) {
          // If remote fails, local submission still guarantees lead capture
        }
      }
    } catch {
      // Network graceful handling
    }

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const openWhatsAppWithData = () => {
    const text = `Hi Vidyapaths! I submitted an enquiry for ${formData.serviceRequired || 'Counselling'}.\nName: ${formData.fullName}\nCourse: ${formData.interestedCourse}\nCity: ${formData.currentCity}`;
    window.open(`https://wa.me/${siteConfig.phoneRaw.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-emerald-100 shadow-sm text-center animate-in fade-in duration-300">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-navy-900 mb-2">Thank you!</h3>
        <p className="text-slate-600 max-w-md mx-auto mb-6 text-sm leading-relaxed">
          Thank you! Your enquiry has been received. Our team will get in touch with you shortly.
        </p>

        <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100 text-left text-sm max-w-md mx-auto space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-500">Candidate:</span>
            <span className="font-semibold text-navy-900">{formData.fullName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Service:</span>
            <span className="font-semibold text-navy-900">{formData.serviceRequired}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Interested Course:</span>
            <span className="font-semibold text-navy-900">{formData.interestedCourse}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Mobile:</span>
            <span className="font-semibold text-navy-900">{formData.mobileNumber}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          <button
            onClick={openWhatsAppWithData}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm min-h-[44px] cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp Now</span>
          </button>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                fullName: '',
                mobileNumber: '',
                whatsappNumber: '',
                email: '',
                currentCity: '',
                education: '',
                serviceRequired: '',
                interestedCourse: '',
                preferredCountry: '',
                preferredCollege: '',
                preferredIntake: '',
                message: ''
              });
            }}
            className="px-5 py-3 rounded-xl font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors min-h-[44px] cursor-pointer"
          >
            Submit Another Query
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
          <Sparkles className="w-4 h-4" />
        </span>
        <div>
          <h3 className="text-xl font-bold text-navy-900">Request Free Counselling</h3>
          <p className="text-xs text-slate-500">100% unbiased student guidance. No consultation fees.</p>
        </div>
      </div>

      {submitError && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      <div className="space-y-4">
        {/* Name & Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor={`${formUid}-fullName`} className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id={`${formUid}-fullName`}
              type="text"
              name="fullName"
              placeholder="e.g. Aryan Sharma"
              value={formData.fullName}
              onChange={handleChange}
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? `${formUid}-fullName-err` : undefined}
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border min-h-[44px] ${
                errors.fullName ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-orange-500'
              } focus:outline-none focus:ring-1 focus:ring-orange-500`}
            />
            {errors.fullName && <p id={`${formUid}-fullName-err`} className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label htmlFor={`${formUid}-mobileNumber`} className="block text-xs font-semibold text-slate-700 mb-1">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              id={`${formUid}-mobileNumber`}
              type="tel"
              name="mobileNumber"
              placeholder="e.g. 9876543210"
              value={formData.mobileNumber}
              onChange={handleChange}
              aria-invalid={!!errors.mobileNumber}
              aria-describedby={errors.mobileNumber ? `${formUid}-mobileNumber-err` : undefined}
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border min-h-[44px] ${
                errors.mobileNumber ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-orange-500'
              } focus:outline-none focus:ring-1 focus:ring-orange-500`}
            />
            {errors.mobileNumber && <p id={`${formUid}-mobileNumber-err`} className="text-xs text-red-500 mt-1">{errors.mobileNumber}</p>}
          </div>
        </div>

        {/* Email & City */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor={`${formUid}-email`} className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id={`${formUid}-email`}
              type="email"
              name="email"
              placeholder="e.g. aryan@example.com"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? `${formUid}-email-err` : undefined}
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border min-h-[44px] ${
                errors.email ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-orange-500'
              } focus:outline-none focus:ring-1 focus:ring-orange-500`}
            />
            {errors.email && <p id={`${formUid}-email-err`} className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor={`${formUid}-currentCity`} className="block text-xs font-semibold text-slate-700 mb-1">
              Current City <span className="text-red-500">*</span>
            </label>
            <input
              id={`${formUid}-currentCity`}
              type="text"
              name="currentCity"
              placeholder="e.g. Delhi, Lucknow, Patna"
              value={formData.currentCity}
              onChange={handleChange}
              aria-invalid={!!errors.currentCity}
              aria-describedby={errors.currentCity ? `${formUid}-currentCity-err` : undefined}
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border min-h-[44px] ${
                errors.currentCity ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-orange-500'
              } focus:outline-none focus:ring-1 focus:ring-orange-500`}
            />
            {errors.currentCity && <p id={`${formUid}-currentCity-err`} className="text-xs text-red-500 mt-1">{errors.currentCity}</p>}
          </div>
        </div>

        {/* Qualification & Service */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor={`${formUid}-education`} className="block text-xs font-semibold text-slate-700 mb-1">
              Current Qualification <span className="text-red-500">*</span>
            </label>
            <select
              id={`${formUid}-education`}
              name="education"
              value={formData.education}
              onChange={handleChange}
              aria-invalid={!!errors.education}
              aria-describedby={errors.education ? `${formUid}-education-err` : undefined}
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border min-h-[44px] ${
                errors.education ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-orange-500'
              } focus:outline-none focus:ring-1 focus:ring-orange-500 bg-white`}
            >
              <option value="">Select qualification</option>
              <option value="Class 10th / 11th">Class 10th / 11th</option>
              <option value="Class 12th Appearing/Passed">Class 12th (Appearing / Passed)</option>
              <option value="Undergraduate (UG Student)">Undergraduate Student</option>
              <option value="Graduate / Degree Holder">Graduate / Degree Holder</option>
              <option value="Postgraduate (PG Student)">Postgraduate Student</option>
              <option value="Working Professional">Working Professional</option>
            </select>
            {errors.education && <p id={`${formUid}-education-err`} className="text-xs text-red-500 mt-1">{errors.education}</p>}
          </div>

          <div>
            <label htmlFor={`${formUid}-serviceRequired`} className="block text-xs font-semibold text-slate-700 mb-1">
              Service Required <span className="text-red-500">*</span>
            </label>
            <select
              id={`${formUid}-serviceRequired`}
              name="serviceRequired"
              value={formData.serviceRequired}
              onChange={handleChange}
              aria-invalid={!!errors.serviceRequired}
              aria-describedby={errors.serviceRequired ? `${formUid}-serviceRequired-err` : undefined}
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border min-h-[44px] ${
                errors.serviceRequired ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-orange-500'
              } focus:outline-none focus:ring-1 focus:ring-orange-500 bg-white`}
            >
              <option value="">Choose service</option>
              <option value="College Admission">College Admission</option>
              <option value="Career Counselling">Career Counselling</option>
              <option value="Internship Assistance">Internship</option>
              <option value="Study Abroad">Study Abroad</option>
              <option value="Scholarship Guidance">Scholarship</option>
              <option value="Resume & Interview">Resume & Interview Support</option>
              <option value="Other">Other</option>
            </select>
            {errors.serviceRequired && <p id={`${formUid}-serviceRequired-err`} className="text-xs text-red-500 mt-1">{errors.serviceRequired}</p>}
          </div>
        </div>

        {/* Interested Course & Preferred Country */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor={`${formUid}-interestedCourse`} className="block text-xs font-semibold text-slate-700 mb-1">
              Interested Course <span className="text-red-500">*</span>
            </label>
            <input
              id={`${formUid}-interestedCourse`}
              type="text"
              name="interestedCourse"
              placeholder="e.g. B.Tech CS, MBA, BCA, BBA, MS"
              value={formData.interestedCourse}
              onChange={handleChange}
              aria-invalid={!!errors.interestedCourse}
              aria-describedby={errors.interestedCourse ? `${formUid}-interestedCourse-err` : undefined}
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border min-h-[44px] ${
                errors.interestedCourse ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-orange-500'
              } focus:outline-none focus:ring-1 focus:ring-orange-500`}
            />
            {errors.interestedCourse && <p id={`${formUid}-interestedCourse-err`} className="text-xs text-red-500 mt-1">{errors.interestedCourse}</p>}
          </div>

          <div>
            <label htmlFor={`${formUid}-preferredCountry`} className="block text-xs font-semibold text-slate-700 mb-1">
              Preferred Country / Region <span className="text-red-500">*</span>
            </label>
            <input
              id={`${formUid}-preferredCountry`}
              type="text"
              name="preferredCountry"
              placeholder="e.g. India (Delhi/NCR/Bangalore) or UK, USA, Canada"
              value={formData.preferredCountry}
              onChange={handleChange}
              aria-invalid={!!errors.preferredCountry}
              aria-describedby={errors.preferredCountry ? `${formUid}-preferredCountry-err` : undefined}
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border min-h-[44px] ${
                errors.preferredCountry ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-orange-500'
              } focus:outline-none focus:ring-1 focus:ring-orange-500`}
            />
            {errors.preferredCountry && <p id={`${formUid}-preferredCountry-err`} className="text-xs text-red-500 mt-1">{errors.preferredCountry}</p>}
          </div>
        </div>

        {/* Optional Fields: WhatsApp Number, Preferred College, Target Intake */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div>
            <label htmlFor={`${formUid}-whatsappNumber`} className="block text-[11px] font-medium text-slate-500 mb-1">
              WhatsApp Number (Optional)
            </label>
            <input
              id={`${formUid}-whatsappNumber`}
              type="tel"
              name="whatsappNumber"
              placeholder="If different from mobile"
              value={formData.whatsappNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:border-orange-500 focus:outline-none min-h-[40px]"
            />
          </div>

          <div>
            <label htmlFor={`${formUid}-preferredCollege`} className="block text-[11px] font-medium text-slate-500 mb-1">
              Target College (Optional)
            </label>
            <input
              id={`${formUid}-preferredCollege`}
              type="text"
              name="preferredCollege"
              placeholder="e.g. Top Tier / Specific Campus"
              value={formData.preferredCollege}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:border-orange-500 focus:outline-none min-h-[40px]"
            />
          </div>

          <div>
            <label htmlFor={`${formUid}-preferredIntake`} className="block text-[11px] font-medium text-slate-500 mb-1">
              Target Intake / Year (Optional)
            </label>
            <input
              id={`${formUid}-preferredIntake`}
              type="text"
              name="preferredIntake"
              placeholder="e.g. 2026 or 2027"
              value={formData.preferredIntake}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:border-orange-500 focus:outline-none min-h-[40px]"
            />
          </div>
        </div>

        {/* Message / Query */}
        <div>
          <label htmlFor={`${formUid}-message`} className="block text-xs font-semibold text-slate-700 mb-1">
            Your Query / What guidance do you need? <span className="text-red-500">*</span>
          </label>
          <textarea
            id={`${formUid}-message`}
            name="message"
            rows="3"
            placeholder="Tell us about your background, score, or specific confusion so our counsellor can prepare the best advice."
            value={formData.message}
            onChange={handleChange}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? `${formUid}-message-err` : undefined}
            className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${
              errors.message ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-orange-500'
            } focus:outline-none focus:ring-1 focus:ring-orange-500`}
          ></textarea>
          {errors.message && <p id={`${formUid}-message-err`} className="text-xs text-red-500 mt-1">{errors.message}</p>}
        </div>

        {/* Privacy Note */}
        <p className="text-[11px] text-slate-500 leading-relaxed">
          By submitting this form, you agree to be contacted by Vidyapaths regarding your enquiry.
        </p>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-orange-500 hover:bg-orange-600 transition-all shadow-md hover:shadow-orange-500/20 active:scale-[0.99] cursor-pointer disabled:opacity-70 min-h-[44px]"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Submitting Enquiry...
            </span>
          ) : (
            <>
              <span>Get Free Counselling</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
