import React from 'react';
import { Sparkles, Globe, Heart, Shield } from 'lucide-react';
import { useScrollReveal } from '../utils/useScrollReveal';
import Pragmatic from '../assets/images/connected_care_journey_1792157460091.jpg';

export const WhereWeAreStarting: React.FC = () => {
  const containerRef = useScrollReveal<HTMLDivElement>('.starting-fade-up', 0.1);

  return (
    <section
      ref={containerRef}
      className="py-24 sm:py-32 bg-stone-50 border-b border-stone-200/60"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Editorial Section Index */}
        <div className="flex items-center gap-3 mb-6 text-xs font-semibold tracking-widest text-teal-800 uppercase">
          <span>05. Where We're Starting</span>
          <span className="w-8 h-px bg-stone-300"></span>
          <span className="text-stone-500 font-normal">Our Foundation & Vision</span>
        </div>

        {/* 2-Column Split: Narrative on Left, Still-life & Vision on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="starting-fade-up text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-stone-900 leading-tight">
              Starting with women. <br />
              <span className="font-normal text-stone-900">Thinking beyond one appointment.</span>
            </h2>

            <div className="starting-fade-up space-y-5 text-base sm:text-lg text-stone-700 font-normal leading-relaxed">
              <p>
                Women's healthcare needs change throughout life. Some concerns need a single consultation. Others call for investigations, specialist care, mental health support or ongoing attention.
              </p>
              <p>
                We're starting with women in Nigeria because we believe these experiences can be much easier to access and navigate. We're not building for one condition or one stage of life.
              </p>
              <p className="p-5 bg-teal-50/70 border border-teal-200/80 rounded-lg text-stone-900 text-base">
                Our long-term vision goes further: healthcare that is accessible, connected, personal and continuous, so people get the care and support they need throughout their health journeys.
              </p>
            </div>

            {/* Core Tenets */}
            <div className="starting-fade-up pt-6 border-t border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-3 bg-white rounded border border-stone-200">
                <span className="font-semibold text-stone-900 block mb-1">Accessible</span>
                <span className="text-stone-500">Care within reach</span>
              </div>
              <div className="p-3 bg-white rounded border border-stone-200">
                <span className="font-semibold text-stone-900 block mb-1">Connected</span>
                <span className="text-stone-500">Unbroken records</span>
              </div>
              <div className="p-3 bg-white rounded border border-stone-200">
                <span className="font-semibold text-stone-900 block mb-1">Personal</span>
                <span className="text-stone-500">Tailored care plans</span>
              </div>
              <div className="p-3 bg-white rounded border border-stone-200">
                <span className="font-semibold text-stone-900 block mb-1">Continuous</span>
                <span className="text-stone-500">Follow-up that lasts</span>
              </div>
            </div>
          </div>

          {/* Right Column: Still life & patient care journey */}
          <div className="lg:col-span-5 starting-fade-up">
            <div className="rounded-lg overflow-hidden border border-stone-200 shadow-[0_4px_24px_rgba(0,0,0,0.04)] bg-white">
              <img
                src={Pragmatic}
                alt="Pragmatic tools of connected care coordination and medical follow-up"
                className="w-full h-auto object-cover aspect-[4/3]"
                referrerPolicy="no-referrer"
              />
              <div className="p-5 bg-white border-t border-stone-100">
                <div className="text-xs font-mono text-teal-800 uppercase tracking-wider mb-1">
                  The Complete Picture
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Moving from isolated medical encounters to an intelligible continuum that honors your time, your records, and your agency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
