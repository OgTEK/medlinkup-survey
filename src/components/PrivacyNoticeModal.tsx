import React from 'react';
import { X, ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';

interface PrivacyNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyNoticeModal: React.FC<PrivacyNoticeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-notice-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
    >
      <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-stone-50 border-b border-stone-200 flex items-center justify-between shrink-0">
          <div>
            <span className="text-xs font-mono font-medium text-teal-800 uppercase tracking-wider block mb-0.5">
              Statutory Governance · NDPA 2023
            </span>
            <h3 id="privacy-notice-title" className="text-xl font-semibold text-stone-900">
              MedLinkup Research & Health Data Privacy Notice
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Privacy Notice"
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Document Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-stone-700 leading-relaxed">
          <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-lg text-teal-950 text-xs flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block mb-0.5">Core Privacy Principle</strong>
              Nothing from your medical history is shared without your explicit permission. Participation in all MedLinkup research surveys is voluntary and does not require medical history submission.
            </div>
          </div>

          <section className="space-y-2">
            <h4 className="font-semibold text-stone-900 text-base">
              1. Regulatory Framework & Governance
            </h4>
            <p>
              MedLinkup is engineered with privacy by design, complying with the{' '}
              <strong>Nigeria Data Protection Act 2023 (NDPA 2023)</strong>, Nigeria Data Protection Commission (NDPC) guidelines, and international standards for handling patient-reported healthcare data.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-semibold text-stone-900 text-base">
              2. Research Survey Participation
            </h4>
            <p>
              Taking part in our user research survey is strictly voluntary:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-stone-600">
              <li>You do <strong>not</strong> need to provide your medical history or medical records to take part.</li>
              <li>Responses are aggregated and analyzed on an anonymized basis to understand healthcare pain points in Nigeria.</li>
              <li>Survey responses are never sold to advertisers or third-party pharmaceutical entities.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h4 className="font-semibold text-stone-900 text-base">
              3. Early-Access Waitlist Data
            </h4>
            <p>
              When joining our early-access list, we collect minimal contact markers (first name, email, optional phone number, optional city). This information is solely used to notify you about product development milestones, private beta pilot invitations, and research updates. You can unsubscribe at any time with one click.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-semibold text-stone-900 text-base">
              4. Future Clinical Health Records & Controlled Consent
            </h4>
            <p>
              When MedLinkup launches clinical services:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-stone-600">
              <li>You retain granular custody of your consultations, scans, and doctor referrals.</li>
              <li>Healthcare professionals can only view past consultation context after you grant explicit, revocable consent.</li>
              <li>Participating medical professionals undergo credential verification with the Medical and Dental Council of Nigeria (MDCN) or equivalent statutory licensing boards prior to access.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h4 className="font-semibold text-stone-900 text-base">
              5. Your Legal Rights Under NDPA 2023
            </h4>
            <p>
              As a data subject under Nigerian law, you maintain the right to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-stone-600">
              <li>Request confirmation of whether your personal data is processed.</li>
              <li>Rectify inaccurate records or request total deletion of your early-access record.</li>
              <li>Withdraw consent at any time without penalty.</li>
            </ul>
          </section>

          <section className="space-y-2 pt-2 border-t border-stone-200">
            <h4 className="font-semibold text-stone-900 text-base">
              6. Contact & Data Protection Officer
            </h4>
            <p className="text-xs text-stone-600">
              For privacy inquiries, rights requests, or feedback regarding data governance, contact our team at{' '}
              <a href="mailto:privacy@medlinkup.ng" className="text-teal-700 underline font-medium">
                privacy@medlinkup.ng
              </a>
              .
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors cursor-pointer"
          >
            I Understand & Close
          </button>
        </div>
      </div>
    </div>
  );
};
