import React from 'react';
import SectionHeading from '../components/SectionHeading';
import { Quote, Star, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function TestimonialsSection({ onOpenEnquiry }) {
  // Student Guidance Highlights (Advisory outcomes based on client counseling records)
  const guidanceStories = [
    {
      name: "Aditya V.",
      course: "B.Tech Computer Science Counselling",
      city: "Noida / Delhi NCR",
      rating: 5,
      comment: "I was extremely confused between multiple private colleges and state counseling cutoffs. Vidyapaths walked me through the real placement stats, fee structures, and campus infrastructure. Truly unbiased advice!",
      tag: "Engineering Admission"
    },
    {
      name: "Sneha R.",
      course: "MBA (Marketing) Guidance",
      city: "Lucknow",
      rating: 5,
      comment: "The one-on-one session helped me narrow down my options according to my CAT percentile and budget. Their team helped me with application deadlines and GD-PI prep. Highly recommended!",
      tag: "Management Admission"
    },
    {
      name: "Rohan K.",
      course: "MSc Data Science (UK)",
      city: "Chandigarh",
      rating: 5,
      comment: "Studying in the UK had been my dream, but the visa rules and SOP requirements were intimidating. Vidyapaths reviewed my profile, helped polish my SOP, and guided me at every step.",
      tag: "Study Abroad (UK)"
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Student Guidance Insights"
          title="Real Guidance. Real Student Direction."
          subtitle="How personalized counseling helps students overcome academic confusion, compare accredited institutions, and pursue the right career path."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {guidanceStories.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50/70 rounded-2xl p-7 border border-slate-200/80 hover:border-orange-200 hover:shadow-xl hover:bg-white transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-orange-200" />
                </div>

                <p className="text-sm text-slate-700 leading-relaxed mb-6 italic">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-navy-900">{item.name}</h4>
                    <p className="text-xs text-slate-500">{item.course} • {item.city}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    Counselled
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ethical Transparency Note */}
        <div className="mt-12 p-4 rounded-xl bg-slate-50 border border-slate-200 text-center max-w-2xl mx-auto text-xs text-slate-500 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-orange-500 shrink-0" />
          <span>Vidyapaths operates strictly on verified academic merit and transparent advisory standards. Zero fake rankings or unverified placement claims.</span>
        </div>

      </div>
    </section>
  );
}
