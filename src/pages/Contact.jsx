import React from 'react';
import SectionHeading from '../components/SectionHeading';
import EnquiryForm from '../components/EnquiryForm';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { InstagramIcon, LinkedinIcon, FacebookIcon, YoutubeIcon } from '../components/SocialIcons';
import { siteConfig } from '../data/siteData';

export default function Contact() {
  const cleanNumber = siteConfig.phoneRaw.replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(siteConfig.whatsappMessage);
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMsg}`;

  return (
    <div className="pt-24 md:pt-28 bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="bg-white py-14 md:py-20 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="inline-block px-3.5 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-orange-50 text-orange-600 border border-orange-200">
            Contact Vidyapaths
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-900 tracking-tight">
            Let's Talk About Your <span className="text-orange-500">Career Goals</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Have questions about college cutoffs, study abroad options, or internship guidance? Reach out today—our academic mentors are here to guide you.
          </p>
        </div>
      </section>

      {/* Main Form & Contact Information Grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Contact Cards & Info */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Fast Connect Card */}
              <div className="bg-navy-900 text-white rounded-3xl p-7 sm:p-8 shadow-xl border border-navy-800 space-y-6">
                <div>
                  <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                    Direct Assistance
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-1">Get Immediate Support</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Prefer direct conversation? Call or message our student support desk.
                  </p>
                </div>

                <div className="space-y-4 text-sm">
                  <a
                    href={`tel:${siteConfig.phoneRaw}`}
                    className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-orange-500 text-white flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">Call Our Counsellor</span>
                      <span className="text-base font-bold text-white">{siteConfig.phone}</span>
                    </div>
                  </a>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3.5 p-3.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/60 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-emerald-300 block font-medium">WhatsApp Direct Chat</span>
                      <span className="text-sm font-bold text-white">Instant Response</span>
                    </div>
                  </a>

                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-500 text-white flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">Email Enquiries</span>
                      <span className="text-sm font-bold text-white break-all">{siteConfig.email}</span>
                    </div>
                  </a>

                  <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-10 h-10 rounded-lg bg-purple-500 text-white flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">Consulting Hours</span>
                      <span className="text-sm font-semibold text-white">{siteConfig.hours}</span>
                    </div>
                  </div>
                </div>

                {/* Social Connect */}
                <div className="pt-4 border-t border-navy-800">
                  <span className="text-xs font-semibold text-slate-400 block mb-3">Connect On Social Media</span>
                  <div className="flex items-center gap-3">
                    <a
                      href={siteConfig.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-lg bg-white/10 hover:bg-orange-500 text-white flex items-center justify-center transition-colors"
                      aria-label="Instagram"
                    >
                      <InstagramIcon className="w-4 h-4" />
                    </a>
                    <a
                      href={siteConfig.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-lg bg-white/10 hover:bg-blue-600 text-white flex items-center justify-center transition-colors"
                      aria-label="LinkedIn"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                    <a
                      href={siteConfig.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-lg bg-white/10 hover:bg-blue-700 text-white flex items-center justify-center transition-colors"
                      aria-label="Facebook"
                    >
                      <FacebookIcon className="w-4 h-4" />
                    </a>
                    <a
                      href={siteConfig.socials.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-lg bg-white/10 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
                      aria-label="YouTube"
                    >
                      <YoutubeIcon className="w-4 h-4" />
                    </a>
                  </div>
                </div>

              </div>

              {/* Office Location Box */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-navy-900 font-bold text-sm">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  <span>Main Consulting Office</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {siteConfig.address}
                </p>
                <div className="h-32 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center text-xs text-slate-500 font-medium">
                  <span>📍 Map Pin: Knowledge Park, Sector 62, Noida</span>
                </div>
              </div>

            </div>

            {/* Right Column: Lead / Enquiry Form */}
            <div id="enquiry-form" className="lg:col-span-7 scroll-mt-28">
              <EnquiryForm source="Contact Page" />
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
