import React from 'react';
import SectionHeading from '../components/SectionHeading';
import { UserCheck, Compass, LifeBuoy, Globe2, HeartHandshake, BriefcaseBusiness } from 'lucide-react';

export default function WhyVidyapaths() {
  const pillars = [
    {
      title: "Student-Focused",
      description: "We represent the student’s genuine interest first. We do not push irrelevant institutes or expensive options that don't fit your aspirations.",
      icon: UserCheck
    },
    {
      title: "Right Direction",
      description: "Data-backed cutoff metrics, aptitude analysis, and realistic counseling ensure you don't take misinformed academic risks.",
      icon: Compass
    },
    {
      title: "End-to-End Guidance",
      description: "From entrance exam planning and college shortlisting all the way to documentation, loans, and campus onboarding.",
      icon: LifeBuoy
    },
    {
      title: "Global Opportunities",
      description: "Direct assistance for premier institutions across 9 top international study destinations with post-study visa insights.",
      icon: Globe2
    },
    {
      title: "Personal Guidance",
      description: "Every student has an assigned dedicated counselor who takes the time to understand your unique circumstances.",
      icon: HeartHandshake
    },
    {
      title: "Career Focus",
      description: "We look beyond just getting an admission offer. We map your degree to 5-year employment outcomes and corporate internships.",
      icon: BriefcaseBusiness
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Why Vidyapaths"
          title="The Trusted Partner in Your Educational Journey"
          subtitle="Education consultancy built on integrity, transparency, and personal commitment to every student's career success."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-orange-200 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-navy-900 text-white flex items-center justify-center mb-5 group-hover:bg-orange-500 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-orange-400 group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-xl font-bold text-navy-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
