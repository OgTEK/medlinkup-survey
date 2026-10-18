import React from 'react';
import { ShieldCheck, Lock, FileKey, EyeOff, UserCheck, ArrowUpRight } from 'lucide-react';
import { useScrollReveal } from '../utils/useScrollReveal';

interface CareAndTrustProps {
  onOpenPrivacyNotice: () => void;
}

export const CareAndTrust: React.FC<CareAndTrustProps> = ({ onOpenPrivacyNotice }) => {
  const containerRef = useScrollReveal<HTMLDivElement>('.trust-fade-up', 0.1);

  return (
    <section
      ref={containerRef}
      className="py-24 sm:py-32 bg-stone-50 border-b border-stone-200/60"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Editorial Section Index */}
        <div className="flex items-center gap-3 mb-6 text-xs font-semibold tracking-widest text-teal-800 uppercase">
          <span>07. Care & Trust</span>
          <span className="w-8 h-px bg-stone-300"></span>
          <span className="text-stone-500 font-normal">Governance & Data Protection</span>
        </div>

        {/* Section Headline */}
        <div className="trust-fade-up max-w-3xl mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-stone-900 leading-tight mb-6">
            Your health deserves thoughtful care.
          </h2>
          <p className="text-lg sm:text-xl text-stone-600 font-normal leading-relaxed">
            Trust is not an afterthought in healthcare—it is the foundation upon which every consultation and diagnosis rests.
          </p>
        </div>

        {/* 2-Column Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Pillar 1: Professional Credentialing */}
          <div className="trust-fade-up bg-white p-8 sm:p-10 rounded-lg border border-stone-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-md bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-800 mb-6">
                <UserCheck className="w-5 h-5" />
              </div>

              <h3 className="text-2xl font-light text-stone-900 mb-4 tracking-tight">
                Verified Healthcare Professionals
              </h3>

              <div className="space-y-4 text-sm sm:text-base text-stone-600 leading-relaxed">
                <p>
                  Trust starts with knowing who is providing your care. We’re engaging healthcare professionals as we develop MedLinkup.
                </p>
                <p>
                  Before joining the platform, participating professionals will undergo thorough professional registration and credential checks, verifying their licenses with statutory medical bodies.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-100 text-xs text-stone-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              <span>Full registration & credential verification protocol</span>
            </div>
          </div>

          {/* Pillar 2: Data Protection & Controlled Consent */}
          <div className="trust-fade-up bg-white p-8 sm:p-10 rounded-lg border border-stone-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-md bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-800 mb-6">
                <Lock className="w-5 h-5" />
              </div>

              <h3 className="text-2xl font-light text-stone-900 mb-4 tracking-tight">
                Privacy Guided by Law & Consent
              </h3>

              <div className="space-y-4 text-sm sm:text-base text-stone-600 leading-relaxed">
                <p>
                  Your health information deserves the same level of care. We’re building MedLinkup with privacy and security in mind, guided by the <strong className="font-semibold text-stone-800">Nigeria Data Protection Act 2023 (NDPA 2023)</strong> and other applicable requirements.
                </p>
                <p>
                  You’ll be informed about how your information is collected, used and shared. Access to your medical history will be controlled, with your consent sought where required and any disclosures handled in accordance with applicable law.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs text-stone-500 flex items-center gap-2">
                <FileKey className="w-4 h-4 text-teal-700" />
                <span>Explicit Patient Consent Model</span>
              </span>
              <button
                type="button"
                onClick={onOpenPrivacyNotice}
                className="text-xs font-semibold text-teal-800 hover:text-teal-900 flex items-center gap-1 cursor-pointer"
              >
                <span>Read Research Privacy Notice</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
