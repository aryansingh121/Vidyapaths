import React from 'react';
import SectionHeading from '../components/SectionHeading';
import { Search, MessagesSquare, CheckCircle, Rocket, ArrowRight } from 'lucide-react';

export default function HowItWorks({ onOpenEnquiry }) {
  const steps = [
    {
      step: "01",
      title: "Discover",
      heading: "Explore & Evaluate Options",
      description: "Share your academic scores, career inclinations, preferred locations, and budget considerations with our counsellors.",
      icon: Search,
      highlight: "Profile Assessment"
    },
    {
      step: "02",
      title: "Get Guidance",
      heading: "1-on-1 Mentorship Session",
      description: "Receive unbiased comparison of courses, accredited universities, cutoff realities, and future placement trajectories.",
      icon: MessagesSquare,
      highlight: "Unbiased Recommendations"
    },
    {
      step: "03",
      title: "Apply",
      heading: "Seamless Application Support",
      description: "Get end-to-end guidance for paperwork, SOPs, portfolio refinement, scholarships, or college application deadlines.",
      icon: CheckCircle,
      highlight: "Error-Free Process"
    },
    {
      step: "04",
      title: "Move Forward",
      heading: "Step Into Your Dream Future",
      description: "Confirm your admission, secure internships, or pack your bags for study abroad with total clarity and confidence.",
      icon: Rocket,
      highlight: "Confident Career Growth"
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="How It Works"
          title="A Structured 4-Step Journey to Your Goal"
          subtitle="We eliminate stress and uncertainty by breaking down your admission or career planning into a simple, transparent path."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative bg-slate-50/70 hover:bg-white rounded-2xl p-7 border border-slate-200/80 hover:border-orange-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Step badge */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-extrabold text-slate-300 group-hover:text-orange-500 transition-colors">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-slate-200 flex items-center justify-center text-navy-900 group-hover:bg-navy-900 group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <span className="inline-block text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md mb-2">
                    {item.title}
                  </span>

                  <h3 className="text-lg font-bold text-navy-900 mb-2">
                    {item.heading}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60">
                  <span className="text-[11px] font-semibold text-slate-500">
                    Key Outcome: <span className="text-navy-900">{item.highlight}</span>
                  </span>
                </div>
              </div>
            );
          })}

        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => onOpenEnquiry('How It Works Enquiry')}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-navy-900 hover:bg-navy-800 shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <span>Start Step 1 Today — It's Free</span>
            <ArrowRight className="w-4 h-4 text-orange-500" />
          </button>
        </div>

      </div>
    </section>
  );
}
