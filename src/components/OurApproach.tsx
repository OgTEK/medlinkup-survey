import React from 'react';
import { Layers, FileText, Clock, CheckCircle2 } from 'lucide-react';
import { useScrollReveal } from '../utils/useScrollReveal';

export const OurApproach: React.FC = () => {
  const containerRef = useScrollReveal<HTMLDivElement>('.approach-header, .principle-card', 0.1);

  const principles = [
    {
      num: '01',
      title: 'Continuity: the who',
      subtitle: "Your care shouldn't start over at every appointment.",
      description:
        'When your care involves different professionals or several visits, it should stay connected. MedLinkup helps you coordinate appointments, referrals and ongoing care without losing track of what has happened before.',
      icon: Layers,
      highlight: 'Cross-specialist coordination without friction',
    },
    {
      num: '02',
      title: 'Context: the why and where',
      subtitle: 'Your health story matters.',
      description:
        'Your concerns, previous consultations and care decisions all add up to a bigger picture. MedLinkup brings relevant health information together, so you and your healthcare professionals can make better-informed decisions. Nothing from your medical history is shared without your permission.',
      icon: FileText,
      highlight: 'Explicit consent & unified history',
    },
    {
      num: '03',
      title: 'Care that follows you: the when',
      subtitle: "Support shouldn't disappear when the consultation ends.",
      description:
        'From tests and referrals to reminders and follow-up appointments, MedLinkup helps you understand what comes next and keep track of the care you need.',
      icon: Clock,
      highlight: 'Proactive scheduling & diagnostic guidance',
    },
  ];

  return (
    <section
      id="our-approach"
      ref={containerRef}
      className="py-24 sm:py-32 bg-stone-50 border-b border-stone-200/60"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Editorial Section Index */}
        <div className="flex items-center gap-3 mb-6 text-xs font-semibold tracking-widest text-teal-800 uppercase">
          <span>03. Our Approach</span>
          <span className="w-8 h-px bg-stone-300"></span>
          <span className="text-stone-500 font-normal">Three Guiding Principles</span>
        </div>

        {/* Header Block */}
        <div className="approach-header max-w-3xl mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-stone-900 leading-tight mb-6">
            Care that knows your needs and stays connected.
          </h2>
          <p className="text-lg sm:text-xl text-stone-600 font-normal leading-relaxed">
            We believe better healthcare isn't only about getting an appointment. It's about what happens before, during and after it.
          </p>
        </div>

        {/* Clinical Photo & Principles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
          {/* Left: Documentary Consultation Photograph */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="rounded-lg overflow-hidden border border-stone-200 shadow-[0_4px_20px_rgba(0,0,0,0.05)] bg-white sticky top-28">
              <img
                src="/src/assets/images/clinical_doctor_consultation_1792157460450.jpg"
                alt="Nigerian female physician providing attentive consultation in clinical office"
                className="w-full h-auto object-cover aspect-[4/3]"
                referrerPolicy="no-referrer"
              />
              <div className="p-5 border-t border-stone-100 bg-stone-50/50">
                <span className="text-xs font-semibold text-stone-900 block mb-1">
                  Continuity in Practice
                </span>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Building trust through unhurried clinical attention, shared medical context, and clear follow-through for every patient.
                </p>
              </div>
            </div>
          </div>

          {/* Right: The 3 Principles */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
              Three principles guide what we're building
            </div>

            {principles.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="principle-card bg-white p-7 sm:p-8 rounded-lg border border-stone-200/90 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all hover:border-teal-700/40"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="text-xs font-mono font-medium text-teal-700 tracking-wider mb-1">
                        PRINCIPLE {p.num}
                      </div>
                      <h3 className="text-xl font-semibold text-stone-900 tracking-tight">
                        {p.title}
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-md bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 text-teal-800">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h4 className="text-base sm:text-lg font-medium text-stone-800 mb-3 leading-snug">
                    {p.subtitle}
                  </h4>

                  <p className="text-sm sm:text-base text-stone-600 leading-relaxed mb-5">
                    {p.description}
                  </p>

                  <div className="pt-4 border-t border-stone-100 flex items-center gap-2 text-xs font-medium text-teal-800">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    <span>{p.highlight}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
