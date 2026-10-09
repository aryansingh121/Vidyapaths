import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, MessageSquare, PhoneCall, Sparkles } from 'lucide-react';
import { siteConfig } from '../data/siteData';

export default function EnquiryForm({ defaultService = '', source = 'Lead Form' }) {
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

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^[0-9+ ]{10,15}$/.test(formData.mobileNumber.trim())) {
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Save lead to local storage / simulate asynchronous dispatch
    try {
      const storedLeads = JSON.parse(localStorage.getItem('vidyapaths_leads') || '[]');
      storedLeads.push({
        ...formData,
        source,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('vidyapaths_leads', JSON.stringify(storedLeads));
    } catch {
      // Local storage fallback
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const openWhatsAppWithData = () => {
    const text = `Hi Vidyapaths! I submitted an enquiry for ${formData.serviceRequired || 'Counselling'}.\nName: ${formData.fullName}\nCourse: ${formData.interestedCourse}\nCity: ${formData.currentCity}`;
    window.open(`https://wa.me/${siteConfig.phoneRaw.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-emerald-100 shadow-sm text-center">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-navy-900 mb-2">Thank you, {formData.fullName.split(' ')[0]}!</h3>
        <p className="text-slate-600 max-w-md mx-auto mb-6">
          Your enquiry has been received successfully. Our dedicated educational counsellor will review your profile and reach out within 24 hours.
        </p>

        <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100 text-left text-sm max-w-md mx-auto space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-500">Service:</span>
            <span className="font-semibold text-navy-900">{formData.serviceRequired}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Target Course:</span>
            <span className="font-semibold text-navy-900">{formData.interestedCourse}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Contact:</span>
            <span className="font-semibold text-navy-900">{formData.mobileNumber}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          <button
            onClick={openWhatsAppWithData}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm"
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
            className="px-5 py-3 rounded-xl font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            Submit Another Query
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
          <Sparkles className="w-4 h-4" />
        </span>
        <div>
          <h3 className="text-xl font-bold text-navy-900">Request Free Counselling</h3>
          <p className="text-xs text-slate-500">No fees. 100% unbiased student guidance.</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Name & Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="e.g. Aryan Sharma"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${
                errors.fullName ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-orange-500'
              } focus:outline-none focus:ring-1 focus:ring-orange-500`}
            />
            {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="mobileNumber"
              placeholder="e.g. 9876543210"
              value={formData.mobileNumber}
              onChange={handleChange}
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${
                errors.mobileNumber ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-orange-500'
              } focus:outline-none focus:ring-1 focus:ring-orange-500`}
            />
            {errors.mobileNumber && <p className="text-xs text-red-500 mt-1">{errors.mobileNumber}</p>}
          </div>
        </div>

        {/* Email & City */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="e.g. aryan@example.com"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${
                errors.email ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-orange-500'
              } focus:outline-none focus:ring-1 focus:ring-orange-500`}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Current City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="currentCity"
              placeholder="e.g. Delhi, Lucknow, Patna"
              value={formData.currentCity}
              onChange={handleChange}
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${
                errors.currentCity ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-orange-500'
              } focus:outline-none focus:ring-1 focus:ring-orange-500`}
            />
            {errors.currentCity && <p className="text-xs text-red-500 mt-1">{errors.currentCity}</p>}
          </div>
        </div>

        {/* Qualification & Service */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Current Qualification <span className="text-red-500">*</span>
            </label>
            <select
              name="education"
              value={formData.education}
              onChange={handleChange}
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${
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
            {errors.education && <p className="text-xs text-red-500 mt-1">{errors.education}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Service Required <span className="text-red-500">*</span>
            </label>
            <select
              name="serviceRequired"
              value={formData.serviceRequired}
              onChange={handleChange}
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${
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
            {errors.serviceRequired && <p className="text-xs text-red-500 mt-1">{errors.serviceRequired}</p>}
          </div>
        </div>

        {/* Interested Course & Preferred Country */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Interested Course <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="interestedCourse"
              placeholder="e.g. B.Tech CS, MBA, BCA, BBA, MS"
              value={formData.interestedCourse}
              onChange={handleChange}
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${
                errors.interestedCourse ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-orange-500'
              } focus:outline-none focus:ring-1 focus:ring-orange-500`}
            />
            {errors.interestedCourse && <p className="text-xs text-red-500 mt-1">{errors.interestedCourse}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Preferred Country / Region <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="preferredCountry"
              placeholder="e.g. India (Delhi/NCR/Bangalore) or UK, USA, Canada"
              value={formData.preferredCountry}
              onChange={handleChange}
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${
                errors.preferredCountry ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-orange-500'
              } focus:outline-none focus:ring-1 focus:ring-orange-500`}
            />
            {errors.preferredCountry && <p className="text-xs text-red-500 mt-1">{errors.preferredCountry}</p>}
          </div>
        </div>

        {/* Optional Fields: WhatsApp Number, Preferred College, Target Intake */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">
              WhatsApp Number (Optional)
            </label>
            <input
              type="tel"
              name="whatsappNumber"
              placeholder="If different from mobile"
              value={formData.whatsappNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:border-orange-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">
              Target College (Optional)
            </label>
            <input
              type="text"
              name="preferredCollege"
              placeholder="e.g. Top Tier / Any Specific"
              value={formData.preferredCollege}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:border-orange-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">
              Target Intake / Year (Optional)
            </label>
            <input
              type="text"
              name="preferredIntake"
              placeholder="e.g. 2026 or 2027"
              value={formData.preferredIntake}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:border-orange-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Message / Query */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Your Query / What guidance do you need? <span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            rows="3"
            placeholder="Tell us about your background, score, or specific confusion so our counsellor can prepare the best advice."
            value={formData.message}
            onChange={handleChange}
            className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${
              errors.message ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-orange-500'
            } focus:outline-none focus:ring-1 focus:ring-orange-500`}
          ></textarea>
          {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
        </div>

        {/* Privacy Note */}
        <p className="text-[11px] text-slate-500 leading-relaxed">
          By submitting this form, you agree to be contacted by Vidyapaths regarding your enquiry via phone, WhatsApp, or email. We respect your privacy and never sell student data.
        </p>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-orange-500 hover:bg-orange-600 transition-all shadow-md hover:shadow-orange-500/20 active:scale-[0.99] cursor-pointer disabled:opacity-70"
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
