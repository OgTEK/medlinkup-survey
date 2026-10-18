import React, { useState } from 'react';
import { ClipboardList, Stethoscope, HeartPulse, CheckCircle2, ChevronRight, Calendar, UserCheck, Shield } from 'lucide-react';
import { useScrollReveal } from '../utils/useScrollReveal';

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const sectionRef = useScrollReveal<HTMLDivElement>('.step-item', 0.12);

  const steps = [
    {
      num: '01',
      title: 'Tell us what you need',
      lead: 'Start with a guided check-in about your health concerns and goals, or go straight to requesting an individual consultation.',
      icon: ClipboardList,
      preview: {
        title: 'Guided Clinical Check-In',
        subtitle: 'Confidential symptom and care preference review',
        tags: ['Primary Concern', 'Health Goals', 'Prior Consultations'],
        details: [
          'No rigid algorithms: share your symptoms in plain language',
          'Option to bypass check-in and book a specific specialist directly',
          'Strict zero-disclosure privacy standard before confirmation',
        ],
      },
    },
    {
      num: '02',
      title: 'Explore your care options',
      lead: 'Connect with qualified healthcare professionals and understand the services available to you, from a single appointment to a personalised care programme, including mental health support where needed.',
      icon: Stethoscope,
      preview: {
        title: 'Matched Healthcare Options',
        subtitle: 'Vetted physicians and structured care plans',
        tags: ['Verified Specialists', 'Diagnostic Pathways', 'Clear Pricing'],
        details: [
          'Review credentials, medical council registration, and clinical scope',
          'Transparent breakdown of consultation and recommended diagnostic costs',
          'Integrated mental health support automatically matched if desired',
        ],
      },
    },
    {
      num: '03',
      title: 'Stay connected to your care',
      lead: 'Keep track of appointments, relevant records, recommended next steps and follow-up, with ongoing support when your needs call for it.',
      icon: HeartPulse,
      preview: {
        title: 'Continuous Patient Portal',
        subtitle: 'Unified follow-up, records, and reminders',
        tags: ['Diagnostic Tracking', 'Follow-up Schedule', 'Controlled Consent'],
        details: [
          'Consolidated timeline of prescriptions, scan reports, and physician notes',
          'Proactive reminders for upcoming reviews and diagnostic lab appointments',
          'Revocable physician record access: your health history remains in your hands',
        ],
      },
    },
  ];

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-stone-100/60 border-b border-stone-200/70"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Editorial Section Index */}
        <div className="flex items-center gap-3 mb-6 text-xs font-semibold tracking-widest text-teal-800 uppercase">
          <span>06. How It Works</span>
          <span className="w-8 h-px bg-stone-300"></span>
          <span className="text-stone-500 font-normal">Patient Experience Architecture</span>
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-stone-900 leading-tight mb-6">
            Three steps. One connected journey.
          </h2>
          <p className="text-lg sm:text-xl text-stone-600 font-normal leading-relaxed">
            Healthcare navigation structured with clinical clarity, removing friction at every transition.
          </p>
        </div>

        {/* 3 Steps Process Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: 3 Step Cards */}
          <div className="lg:col-span-7 space-y-6">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`step-item p-7 sm:p-8 rounded-lg cursor-pointer transition-all duration-200 border ${
                    isActive
                      ? 'bg-white border-teal-600 shadow-[0_4px_16px_rgba(13,148,136,0.08)] ring-1 ring-teal-600'
                      : 'bg-white/60 border-stone-200/80 hover:bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-start gap-5">
                    <span className="text-sm font-mono font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded border border-teal-100 shrink-0">
                      STEP {step.num}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <h3 className="text-xl font-semibold text-stone-900 tracking-tight">
                          {step.title}
                        </h3>
                        <Icon className={`w-5 h-5 ${isActive ? 'text-teal-700' : 'text-stone-400'}`} />
                      </div>
                      <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                        {step.lead}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Live Step Inspection Console */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="bg-white rounded-lg border border-stone-200 shadow-[0_6px_24px_rgba(0,0,0,0.04)] overflow-hidden">
              {/* Header Bar */}
              <div className="p-4 bg-stone-900 text-white flex items-center justify-between text-xs">
                <span className="font-mono text-stone-300">MedLinkup System Flow</span>
                <span className="text-teal-400 font-medium">Step 0{activeStep + 1} of 03</span>
              </div>

              {/* Step Simulation Body */}
              <div className="p-6 sm:p-7 space-y-5">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-teal-700 block mb-1">
                    Interface Preview
                  </span>
                  <h4 className="text-lg font-semibold text-stone-900">
                    {steps[activeStep].preview.title}
                  </h4>
                  <p className="text-xs text-stone-500">
                    {steps[activeStep].preview.subtitle}
                  </p>
                </div>

                {/* Unboxed Metadata Disciplined Tags */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600 py-2 border-y border-stone-100">
                  {steps[activeStep].preview.tags.map((tag, tIdx) => (
                    <React.Fragment key={tIdx}>
                      <span className="font-medium text-stone-800">{tag}</span>
                      {tIdx < steps[activeStep].preview.tags.length - 1 && (
                        <span className="text-stone-300" aria-hidden="true">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Key Attributes */}
                <div className="space-y-3 pt-1">
                  {steps[activeStep].preview.details.map((item, iIdx) => (
                    <div key={iIdx} className="flex items-start gap-2.5 text-xs text-stone-700">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Clinical Guarantee Footer */}
                <div className="pt-4 border-t border-stone-100 bg-stone-50 -mx-6 -mb-7 p-4 px-6 text-xs text-stone-500 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-medium text-stone-700">
                    <Shield className="w-3.5 h-3.5 text-teal-700" /> Vetted Process
                  </span>
                  <span>Full Patient Agency</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
