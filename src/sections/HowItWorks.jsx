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
    <section className="py-20 md:py-28 bg-white dark:bg-[#111C2E] transition-colors duration-200">
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
                className="relative bg-slate-50/70 dark:bg-[#17243A] hover:bg-white dark:hover:bg-[#1e2f4a] rounded-2xl p-7 border border-slate-200/80 dark:border-[#29384F] hover:border-orange-200 dark:hover:border-orange-500/40 hover:shadow-xl transition-[border-color,box-shadow,background-color] duration-200 flex flex-col justify-between group"
              >
                {/* Step badge */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-extrabold text-slate-300 dark:text-slate-600 group-hover:text-orange-500 transition-colors">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#111C2E] shadow-xs border border-slate-200 dark:border-[#29384F] flex items-center justify-center text-navy-900 dark:text-orange-400 group-hover:bg-navy-900 dark:group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <span className="inline-block text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/60 px-2.5 py-1 rounded-md mb-2">
                    {item.title}
                  </span>

                  <h3 className="text-lg font-bold text-navy-900 dark:text-white mb-2">
                    {item.heading}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-[#29384F]">
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    Key Outcome: <span className="text-navy-900 dark:text-slate-200">{item.highlight}</span>
                  </span>
                </div>
              </div>
            );
          })}

        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => onOpenEnquiry('How It Works Enquiry')}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-navy-900 hover:bg-navy-800 dark:bg-orange-500 dark:hover:bg-orange-600 shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <span>Start Step 1 Today — It's Free</span>
            <ArrowRight className="w-4 h-4 text-orange-500 dark:text-white" />
          </button>
        </div>

      </div>
    </section>
  );
}
