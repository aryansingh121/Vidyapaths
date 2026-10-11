import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft, ShieldAlert } from 'lucide-react';
import { siteConfig } from '../data/siteData';

export default function TermsOfService() {
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
              <FileText className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
              Terms & Conditions
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Last Updated: October 2026 • Vidyapaths Career & Education Consultancy
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-slate-700 text-sm sm:text-base leading-relaxed">
          
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 text-xs sm:text-sm text-amber-950 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p>
              <strong>Important Advisory Notice:</strong> Vidyapaths is an independent educational counselling and career guidance service. We provide transparent mentorship, eligibility analysis, and application assistance. <strong>Final admission allotments, scholarship awards, and visa approvals are decided solely by respective universities, government bodies, and embassies.</strong>
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-navy-950">1. Nature of Advisory Services</h2>
            <p>
              Vidyapaths provides student-focused guidance, including college shortlisting, program comparison, career counselling, resume reviews, internship preparation, and study abroad consultation. Our advisory aims to inform and empower students to make confident academic decisions.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-navy-950">2. No Guarantee of Admission or Placement</h2>
            <p>
              While Vidyapaths mentors students on optimizing their profiles and application materials, Vidyapaths does not guarantee admission into any particular college or course, nor does it guarantee specific internship or job offers. Admission decisions, cutoff marks, and seat allocations remain entirely under the jurisdiction of the respective colleges and admission authorities.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-navy-950">3. Accuracy of University Information</h2>
            <p>
              All university profiles, program listings, and country regulations displayed on the website are compiled from official prospectuses and circulars available at the time of publication. Admission policies, fee structures, eligibility criteria, and visa requirements are subject to revision by university and government authorities. Students and parents are encouraged to verify current seat matrices with official institutional prospectuses.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-navy-950">4. User Responsibilities</h2>
            <p>
              Users agree to provide accurate, truthful academic details when requesting counselling or applying for institutional guidance. Falsification of academic scores, eligibility credentials, or identities may result in immediate discontinuation of consultation services.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-navy-950">5. Limitation of Liability</h2>
            <p>
              Vidyapaths shall not be held liable for changes in admission cutoffs, government visa policy updates, exam cancellations, or changes in college affiliation rules enacted by third-party educational bodies.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-200 space-y-3">
            <h2 className="text-xl font-bold text-navy-950">6. Questions and Contact</h2>
            <p className="text-xs sm:text-sm text-slate-600">
              For any clarification regarding these terms, please contact:
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
