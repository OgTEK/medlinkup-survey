import React from 'react';
import { ClipboardCheck, Clock, ShieldCheck, HeartHandshake, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useScrollReveal } from '../utils/useScrollReveal';
import { PillButton } from './ui/PillButton';

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
      className="py-24 sm:py-32 bg-stone-50 "
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 --color-warm-black">

        <div className="research-fade-up text-white rounded-xl p-8 sm:p-14"
          style={{
            backgroundColor: 'var(--color-warm-black, #0F1515)',
            color: 'var(--color-warm-white, #f6f3ee)',
          }}>
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
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-4">
            <PillButton
              label="Get Early Access"
              variant="primary"
              onClick={onOpenSurvey}
            />

            <div className="flex items-center gap-2 text-xs text-stone-400">
              <Clock className="w-4 h-4 text-teal-400 items-start" />
              <span>Takes about 7 to 10 minutes</span>
            </div>
          </div>

          {/* Survey Ethics & Privacy Disclaimer */}
          <div className="pt-6 border-t border-stone-800/80 text-xs text-stone-400 leading-relaxed max-w-2xl">
            <p>
              Participation is voluntary. You do not need to provide your medical history to participate.{' '}
              Please review our <button
                type="button"
                onClick={onOpenPrivacyNotice}
                className="text-teal-400 hover:text-teal-300 underline underline-offset-2 cursor-pointer"
              >
                research privacy notice
              </button>
              before submitting your responses.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
