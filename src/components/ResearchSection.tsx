import React from 'react';
import { ClipboardCheck, Clock, ShieldCheck, HeartHandshake, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useScrollReveal } from '../utils/useScrollReveal';

interface ResearchSectionProps {
  onOpenSurvey: () => void;
  onOpenPrivacyNotice: () => void;
}

export const ResearchSection: React.FC<ResearchSectionProps> = ({
  onOpenSurvey,
  onOpenPrivacyNotice,
}) => {
  const containerRef = useScrollReveal<HTMLDivElement>('.research-fade-up', 0.1);

  return (
    <section
      id="research"
      ref={containerRef}
      className="py-24 sm:py-32 bg-stone-50 border-b border-stone-200/60"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Editorial Section Index */}
        <div className="flex items-center gap-3 mb-6 text-xs font-semibold tracking-widest text-teal-800 uppercase">
          <span>09. Research & Insights</span>
          <span className="w-8 h-px bg-stone-300"></span>
          <span className="text-stone-500 font-normal">Shape The Future of Care</span>
        </div>

        {/* Highlight Card with Pentagram Balance */}
        <div className="research-fade-up bg-stone-900 text-white rounded-xl p-8 sm:p-14 border border-stone-800 shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
          <div className="max-w-3xl mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white leading-tight mb-6">
              Your healthcare experience matters.
            </h2>
            <p className="text-lg sm:text-xl text-stone-300 font-light leading-relaxed mb-6">
              Have you struggled to find the right doctor, understand your options, manage referrals, or figure out what to do after an appointment?
            </p>
            <p className="text-base sm:text-lg text-stone-300 font-normal leading-relaxed mb-4">
              We want to hear from you. We're speaking with women across Nigeria to understand how they access healthcare, what challenges they face, and what would genuinely make their experiences better.
            </p>
            <p className="text-teal-400 font-medium text-base">
              Your insights will help us decide what to prioritise as we build MedLinkup.
            </p>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-6 border-t border-stone-800 mb-8">
            <button
              onClick={onOpenSurvey}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-semibold text-stone-950 bg-teal-400 hover:bg-teal-300 rounded-md transition-colors shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-400 cursor-pointer"
            >
              <span>Take Our Healthcare Survey</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-xs text-stone-400">
              <Clock className="w-4 h-4 text-teal-400" />
              <span>Takes about 7 to 10 minutes</span>
            </div>
          </div>

          {/* Survey Ethics & Privacy Disclaimer */}
          <div className="pt-6 border-t border-stone-800/80 text-xs text-stone-400 leading-relaxed max-w-2xl">
            <p>
              Participation is voluntary. You do not need to provide your medical history to participate.{' '}
              Please review our{' '}
              <button
                type="button"
                onClick={onOpenPrivacyNotice}
                className="text-teal-400 hover:text-teal-300 underline underline-offset-2 cursor-pointer"
              >
                research privacy notice
              </button>{' '}
              before submitting your responses.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
