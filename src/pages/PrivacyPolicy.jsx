import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft, Lock } from 'lucide-react';
import { siteConfig } from '../data/siteData';

export default function PrivacyPolicy() {
  return (
    <div className="pt-24 md:pt-28 bg-white min-h-screen">
      {/* Header */}
      <section className="bg-slate-50 py-12 md:py-16 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Link 
            to="/" 
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-orange-100 text-orange-600">
              <Shield className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
              Legal & Student Protection
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Last Updated: October 2026 • Vidyapaths Career & Education Consultancy
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-slate-700 text-sm sm:text-base leading-relaxed">
          
          <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-5 text-xs sm:text-sm text-blue-900 flex items-start gap-3">
            <Lock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <p>
              <strong>Summary:</strong> At Vidyapaths, your trust is our highest priority. We collect only the information necessary to provide tailored educational counselling. We <strong>never sell, trade, or distribute</strong> your personal contact information to third-party commercial databases.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-navy-950">1. Information We Collect</h2>
            <p>
              When you submit a consultation request, book a counselling session, or reach out to us via lead forms, we may collect:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600">
              <li>Full Name</li>
              <li>Contact details (Phone Number, WhatsApp Number, and Email Address)</li>
              <li>City and Region of Residence</li>
              <li>Current Academic Qualification (e.g., Class 12, Undergraduate, Graduate)</li>
              <li>Course, Stream, and Country of Interest (e.g., Engineering, MBA, Study Abroad destination)</li>
              <li>Specific queries, career goals, or messages submitted voluntarily</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-navy-950">2. How We Use Your Information</h2>
            <p>
              The information collected is used strictly for the following purposes:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600">
              <li>Contacting you via call or WhatsApp to conduct your requested 1-on-1 counselling session.</li>
              <li>Assisting you in shortlisting verified college options, eligibility requirements, and deadlines.</li>
              <li>Providing profile evaluations for internships, resume reviews, or study abroad applications.</li>
              <li>Responding to specific queries submitted through our contact and enquiry channels.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-navy-950">3. Non-Disclosure & Third-Party Sharing</h2>
            <p>
              Vidyapaths operates an independent and ethical advisory practice. We <strong>do not sell, rent, lease, or trade</strong> student contact numbers or personal records to external commercial marketing agencies. Your contact details are accessible solely to our dedicated counselling and admissions team.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-navy-950">4. Communications & Opt-Out</h2>
            <p>
              We reach out only regarding the specific admissions, career, or study abroad consultation you initiated. If you wish to withdraw your enquiry or stop receiving counselling communications, you can notify us at any time by replying to our messages or emailing us at <a href={`mailto:${siteConfig.email}`} className="text-orange-600 underline font-semibold">{siteConfig.email}</a>.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-navy-950">5. Data Retention & Deletion</h2>
            <p>
              Student enquiry records are retained only for the duration necessary to provide guidance during the relevant academic admission cycle. You may request permanent deletion of your submission from our records at any point.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-200 space-y-3">
            <h2 className="text-xl font-bold text-navy-950">6. Contact Our Advisory Team</h2>
            <p className="text-xs sm:text-sm text-slate-600">
              For any questions or privacy requests regarding our data policies, please contact:
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm space-y-1.5">
              <p className="font-bold text-navy-950">Vidyapaths Career & Education Consultancy</p>
              <p className="text-slate-600">Address: {siteConfig.address}</p>
              <p className="text-slate-600">Email: <a href={`mailto:${siteConfig.email}`} className="text-orange-600 underline">{siteConfig.email}</a></p>
              <p className="text-slate-600">Phone: <a href={`tel:${siteConfig.phoneRaw}`} className="text-orange-600 underline">{siteConfig.phone}</a></p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
