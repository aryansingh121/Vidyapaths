import React from 'react';
import { GraduationCap, Compass, Globe, Briefcase, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Benefits({ onOpenEnquiry }) {
  const benefits = [
    {
      title: "College Guidance",
      description: "Find accredited colleges matching your academic profile, budget, and desired location with zero confusion.",
      icon: GraduationCap,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      link: "/internships-admissions"
    },
    {
      title: "Career Guidance",
      description: "Structured scientific counselling sessions to identify your true calling, emerging industries, and growth paths.",
      icon: Compass,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      link: "/services"
    },
    {
      title: "Study Abroad",
      description: "Global admissions, country selection, scholarship options, and end-to-end visa application handholding.",
      icon: Globe,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      link: "/study-abroad"
    },
    {
      title: "Internship Support",
      description: "Bridge the campus-to-corporate gap with resume revamps, mock interviews, and industry-aligned internship guidance.",
      icon: Briefcase,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      link: "/internships-admissions"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative bg-slate-50 hover:bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/70 hover:border-orange-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl ${item.bgColor} ${item.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-200/60 flex items-center justify-between">
                  <Link
                    to={item.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-900 group-hover:text-orange-500 transition-colors"
                  >
                    <span>Learn More</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={onOpenEnquiry}
                    className="text-[11px] font-medium text-slate-500 hover:text-navy-900 transition-colors"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
