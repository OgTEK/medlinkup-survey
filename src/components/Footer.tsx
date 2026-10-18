import React from 'react';
import { ArrowUp, Heart } from 'lucide-react';

interface FooterProps {
  onOpenPrivacyNotice: () => void;
  onOpenResearch: () => void;
  onOpenEarlyAccess: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacyNotice,
  onOpenResearch,
  onOpenEarlyAccess,
  onOpenAdmin,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 py-16 sm:py-20 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-stone-800">
          {/* Brand Column */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2 text-white font-semibold text-xl tracking-tight">
              <span>MedLinkup</span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
              <span className="text-stone-400 font-normal text-sm ml-2">Care that follows you.</span>
            </div>
            <p className="text-sm text-stone-400 max-w-md leading-relaxed font-light">
              Building more accessible, connected and personalised healthcare, starting with women in Nigeria.
            </p>
          </div>

          {/* Navigation Mirror Column */}
          <div className="md:col-span-6 flex flex-col md:items-end justify-between">
            {/* Unboxed clean typography metadata links */}
            <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-stone-300 font-medium">
              <button
                onClick={() => scrollToSection('why-medlinkup')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                About
              </button>
              <span className="text-stone-600" aria-hidden="true">·</span>
              <button
                onClick={() => scrollToSection('our-approach')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Our Approach
              </button>
              <span className="text-stone-600" aria-hidden="true">·</span>
              <button
                onClick={onOpenResearch}
                className="hover:text-teal-400 transition-colors cursor-pointer"
              >
                Research
              </button>
              <span className="text-stone-600" aria-hidden="true">·</span>
              <button
                onClick={onOpenEarlyAccess}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Early Access
              </button>
              <span className="text-stone-600" aria-hidden="true">·</span>
              <button
                onClick={onOpenPrivacyNotice}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Privacy
              </button>
              <span className="text-stone-600" aria-hidden="true">·</span>
              {onOpenAdmin && (
                <>
                  <button
                    onClick={onOpenAdmin}
                    className="hover:text-teal-400 transition-colors cursor-pointer text-stone-400"
                  >
                    Admin
                  </button>
                  <span className="text-stone-600" aria-hidden="true">·</span>
                </>
              )}
              <a
                href="mailto:hello@medlinkup.ng"
                className="hover:text-white transition-colors"
              >
                Contact
              </a>
            </nav>

            <button
              onClick={scrollToTop}
              className="mt-6 md:mt-0 inline-flex items-center gap-2 text-xs text-stone-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Regulatory & Emergency Disclaimers */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-stone-500">
          <p className="max-w-2xl leading-relaxed">
            <strong className="text-stone-400 font-medium">Clinical Disclaimer:</strong> MedLinkup is currently in development and does not provide medical consultations or emergency healthcare services. In an emergency, please visit the nearest hospital or urgent care emergency room.
          </p>

          <div className="whitespace-nowrap shrink-0">
            © 2026 MedLinkup. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
