import React, { useState } from 'react';
import { UserCheck, Sparkles, RefreshCw, Check, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../utils/useScrollReveal';

export const CarePathways: React.FC = () => {
  const [activePathway, setActivePathway] = useState<number>(1);
  const containerRef = useScrollReveal<HTMLDivElement>('.pathway-fade-up', 0.1);

  const pathways = [
    {
      id: 0,
      title: 'Individual consultations',
      badge: 'Single Appointment Focus',
      summary: 'Find and book a healthcare professional for a specific concern, without signing up for a programme.',
      details: [
        'Direct connection to verified doctors across gynaecology, general practice, and specialist fields',
        'Transparent upfront fee structure before any appointment confirmation',
        'Secure post-consultation summary and diagnostic requests accessible in your private vault',
        'Option to transition smoothly into a care programme if further investigations are advised',
      ],
      idealFor: 'Acute concerns, second opinions, prescription renewals, or routine wellness checks.',
      icon: UserCheck,
    },
    {
      id: 1,
      title: 'Personalised care programmes',
      badge: 'Structured Multi-Step Care',
      summary:
        'Explore a more structured approach when your healthcare involves several steps. A personalised care programme brings clinically recommended services into one clear plan.',
      details: [
        'Comprehensive clinical assessment identifying root causes and necessary investigative markers',
        'Coordinated diagnostic scans, laboratory blood panels, and specialist referrals in logical order',
        'Integrated mental health support sessions woven into the care plan where emotional strain exists',
        'Transparent expected costs mapped out in advance so you face zero surprises along the way',
      ],
      idealFor: 'Recurring pelvic pain, reproductive endocrinology, chronic migraine, fertility journeys, and postpartum recovery.',
      icon: Sparkles,
    },
    {
      id: 2,
      title: 'Ongoing care support',
      badge: 'Continuous Long-Term Sync',
      summary:
        'Keep relevant health information, appointments, care plans and follow-up details connected as your needs change.',
      details: [
        'Continuous synchronization of records, test results, and notes between multiple attending doctors',
        'Proactive follow-up prompts and medication reminders timed around clinical milestone windows',
        'Granular privacy control: revoke or grant physician access to past records with a single tap',
        'Evolves with you across life stages—from youth and early adulthood to maternal health and menopause',
      ],
      idealFor: 'Long-term health monitoring, chronic management, lifestyle transitions, and preventive health.',
      icon: RefreshCw,
    },
  ];

  return (
    <section
      ref={containerRef}
      className="py-24 sm:py-32 bg-stone-100/50 border-b border-stone-200/70"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Editorial Section Index */}
        <div className="flex items-center gap-3 mb-6 text-xs font-semibold tracking-widest text-teal-800 uppercase">
          <span>04. Care Options</span>
          <span className="w-8 h-px bg-stone-300"></span>
          <span className="text-stone-500 font-normal">One Visit or Ongoing Support</span>
        </div>

        {/* Header Block */}
        <div className="pathway-fade-up max-w-3xl mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-stone-900 leading-tight mb-6">
            Healthcare that fits what you need.
          </h2>
          <p className="text-lg sm:text-xl text-stone-700 font-normal leading-relaxed">
            Sometimes one consultation is enough. Other times your healthcare needs more attention, more than one professional, or support over time. MedLinkup is being built for both.
          </p>
        </div>

        {/* 3 Pathway Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {pathways.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = activePathway === idx;
            return (
              <div
                key={idx}
                onClick={() => setActivePathway(idx)}
                className={`cursor-pointer rounded-lg p-7 transition-all duration-200 border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-teal-600 shadow-[0_4px_20px_rgba(13,148,136,0.08)] ring-1 ring-teal-600'
                    : 'bg-stone-50/80 border-stone-200 hover:border-stone-300 hover:bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-mono font-medium text-teal-700 uppercase tracking-wider">
                      Option 0{idx + 1}
                    </span>
                    <span className="text-xs text-stone-500 font-medium">{item.badge}</span>
                  </div>

                  <div className="w-10 h-10 rounded-md bg-stone-100 flex items-center justify-center text-stone-800 mb-4">
                    <Icon className="w-5 h-5 text-teal-700" />
                  </div>

                  <h3 className="text-xl font-semibold text-stone-900 mb-3 tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-sm text-stone-600 leading-relaxed mb-6">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold">
                  <span className={isSelected ? 'text-teal-800' : 'text-stone-500'}>
                    {isSelected ? 'Viewing Structure' : 'Click to inspect breakdown'}
                  </span>
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-teal-600' : 'bg-stone-300'}`}></span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Pathway Breakdown Box */}
        <div className="pathway-fade-up bg-white rounded-lg border border-stone-200 p-8 sm:p-10 shadow-xs">
          <div className="max-w-3xl mb-6">
            <span className="text-xs font-mono text-teal-700 tracking-wider uppercase block mb-1">
              In-Depth Exploration
            </span>
            <h4 className="text-2xl font-light text-stone-900 tracking-tight">
              {pathways[activePathway].title}
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-stone-100">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-4">
                What this involves
              </span>
              <ul className="space-y-3">
                {pathways[activePathway].details.map((detail, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-3 text-sm text-stone-700 leading-relaxed">
                    <Check className="w-4 h-4 text-teal-600 shrink-0 mt-1" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-between bg-stone-50 p-6 rounded-md border border-stone-200/60">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-2">
                  Clinical Context & Fit
                </span>
                <p className="text-sm text-stone-700 leading-relaxed mb-4">
                  <strong className="font-medium text-stone-900">Recommended for: </strong>
                  {pathways[activePathway].idealFor}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-200 text-xs text-stone-500">
                Mental health support is seamlessly integrated into care programmes whenever indicated by your clinical assessment.
              </div>
            </div>
          </div>

          {/* Concluding philosophy quote from brief */}
          <div className="mt-8 pt-6 border-t border-stone-100">
            <p className="text-sm sm:text-base font-editorial italic text-stone-700 leading-relaxed">
              "Your care should reflect your needs. You shouldn't have to fit into a fixed package."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
