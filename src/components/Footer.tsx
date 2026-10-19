import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import "../thirdway.css"; /* adjust the path to where the file actually is */
import NigeriaWoman from "../assets/images/hero_care_nigerian_woman_1792157460231.jpg";

/* ------------------------------------------------------------------ */
/* EDIT THESE: use the same labels/destinations as your header         */
/* ------------------------------------------------------------------ */
const NAV_LINKS: { label: string; to: string }[] = [
  { label: 'Home', to: '/' },
  { label: 'Research', to: '/survey' },
  { label: 'Early Access', to: '/#early-access' },
  { label: 'Why MedLinkup', to: '/#why-medlinkup' },
  { label: 'Our Approach', to: '/#our-approach' },
  { label: 'How It Works', to: '/#how-it-works' },
  { label: 'Our Story', to: '/#our-story' },
  // { label: 'About', to: '/#about' },   // <- paste the rest of your header links here
];

const EMAIL = 'hello@medlinkup.com'; // TODO: replace with your real address
const SOCIALS: { label: string; href: string }[] = [
  { label: 'Instagram', href: 'https://www.instagram.com/' }, // TODO: your profile URLs
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
];
const LEGAL_LINKS: { label: string; to: string }[] = [
  { label: 'Privacy Policy', to: '/privacy-policy' }, // TODO: make sure these routes exist,
  { label: 'Terms of Use', to: '/terms' },            //       or remove them
];

const DEFAULT_IMAGE = NigeriaWoman;
/* ------------------------------------------------------------------ */

const RULER_VARS =
  '[--rul-step-major:40px] [--rul-step-minor:4px] [--rul-tick-major:10.9688px] [--rul-tick-minor:5.48438px] lg:[--rul-step-major:80px] lg:[--rul-step-minor:8px] lg:[--rul-tick-major:20px] lg:[--rul-tick-minor:10px]';

const TICKS = Array.from({ length: 96 }, (_, i) => i);

const Ticks: React.FC<{ color: string }> = ({ color }) => (
  <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
    <div className="absolute inset-y-0 right-0" style={{ width: 1, backgroundColor: color }} />
    {TICKS.map((i) => (
      <div
        key={i}
        className="absolute right-0"
        style={{
          top: `calc(${i} * var(--rul-step-minor))`,
          height: 1,
          width: i % 10 === 0 ? 'var(--rul-tick-major)' : 'var(--rul-tick-minor)',
          backgroundColor: color,
        }}
      />
    ))}
  </div>
);

/** Vertical ruler. The light overlay (.ruler-fill) grows with page scroll progress. */
const Ruler: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative shrink-0 ${RULER_VARS} ${className}`}>
    <Ticks color="#666763" />
    <div
      className="ruler-fill pointer-events-none absolute inset-x-0 top-0 overflow-hidden"
      style={{ height: '0%' }}
      aria-hidden="true"
    >
      <Ticks color="#f7f1e9" />
    </div>
  </div>
);

/** Rotated MedLinkup wordmark */
const Wordmark: React.FC = () => (
  <div className="flex h-[319px] w-[120px] shrink-0 items-center justify-center text-warm-white lg:h-[585px] lg:w-28">
    <div className="flex-none">
      <span className="block whitespace-nowrap font-sans text-[56px] leading-none font-medium tracking-[-0.06em] lg:text-[104px]">
        MedLinkup
      </span>
    </div>
  </div>
);

const Divider: React.FC = () => <span className="block h-px w-full bg-[#666763]" />;

/** Internal routes use <Link>; hash anchors and external URLs use a plain <a>. */
const FooterLink: React.FC<{
  to: string;
  className?: string;
  children: React.ReactNode;
}> = ({ to, className, children }) =>
  to.startsWith('/') && !to.includes('#') ? (
    <Link to={to} className={className}>
      {children}
    </Link>
  ) : (
    <a href={to} className={className}>
      {children}
    </a>
  );

const underline =
  'link-line group-hover:[background-size:100%_1px] group-hover:[background-position:0%_100%]';

interface FooterProps {
  /** Photo behind the call-to-action card */
  image?: string;
}

export const Footer: React.FC<FooterProps> = ({ image = DEFAULT_IMAGE }) => {
  const footerRef = useRef<HTMLElement>(null);

  // Ruler highlight follows overall page scroll progress
  useEffect(() => {
    const root = footerRef.current;
    if (!root) return;
    const fills = root.querySelectorAll<HTMLElement>('.ruler-fill');

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      fills.forEach((el) => {
        el.style.height = `${p * 100}%`;
      });
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <footer ref={footerRef} id="footer" className="relative" data-header-scheme="light">
      {/* Call-to-action photo + card */}
      <div className="relative">
        <div className="relative h-[480px] w-full overflow-hidden md:h-[400px] lg:h-[606px]">
          <img
            src={NigeriaWoman}
            alt=""
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-1/2 w-full max-w-[1920px] -translate-x-1/2">
          <Link
            to="/survey"
            className="group pointer-events-auto absolute inset-x-4 bottom-4 flex flex-col items-start justify-start rounded-[4px] bg-warm-white px-4 pt-6 pb-[72px] text-left text-warm-black transition-colors duration-[400ms] hover:bg-cream md:inset-x-auto md:right-6 md:bottom-6 md:w-[361px] lg:right-8 lg:bottom-8 lg:h-[248px] lg:w-[635px] lg:p-8 xl:right-6 xl:bottom-6 xl:w-[688px] 2xl:w-[928px]"
          >
            <p className="font-sans text-[32px] leading-[1.1] font-medium tracking-[-0.06em] cap-trim lg:text-[48px] lg:leading-[0.98]">
              Help us build care that follows you.{' '}
              <span className="relative">
                Join our research.
                <span className="group-heavy-link-line bottom-[2px] h-[3px] lg:bottom-[4px] lg:h-[4px]" />
              </span>
            </p>
          </Link>
        </div>
      </div>

      {/* Dark panel */}
      <div
        className="relative text-warm-white"
        style={{
          backgroundColor: 'var(--color-warm-black, #0F1515)',
          color: 'var(--color-warm-white, #f6f3ee)',
        }}
      >
        {/* Mobile wordmark band */}
        <div className="pb-[env(safe-area-inset-bottom,0px)] lg:hidden">
          <div className="pointer-events-none flex h-[351px] items-end gap-[8.77px] overflow-hidden pl-4 md:gap-[16.77px] md:pl-6">
            <div className="mb-4 shrink-0">
              <Wordmark />
            </div>
            <Ruler className="-mt-px h-full w-[9.32px]" />
          </div>
        </div>

        <Divider />

        <div className="relative lg:min-h-[693px]">
          {/* Desktop wordmark + ruler, pinned to the left edge */}
          <div className="pointer-events-none absolute inset-y-0 left-[24px] z-10 hidden items-end gap-[8.64px] lg:flex xl:gap-[8.71px] 2xl:left-8 2xl:gap-[38.64px]">
            <div className="mb-20 shrink-0">
              <Wordmark />
            </div>
            <Ruler className="-mt-0.5 h-[640px] w-[17px] self-start" />
          </div>

          <div className="flex min-h-[inherit] flex-col lg:min-h-[693px] lg:pl-[190px] 2xl:pl-[260px]">
            {/* Link columns */}
            <div className="container">
              <div className="site-grid pt-8 pb-[45px]">
                <div className="col-span-3">
                  <div className="flex flex-col gap-4">
                    <p className="font-display text-[16px] leading-[1.1] tracking-[-0.04em] not-italic cap-trim">
                      Explore
                    </p>
                    <ul className="flex flex-col gap-3">
                      {NAV_LINKS.map((link) => (
                        <li key={link.label}>
                          <FooterLink
                            to={link.to}
                            className="block w-fit font-sans text-[20px] leading-[1.1] font-medium tracking-[-0.04em] whitespace-nowrap transition-opacity cap-trim hover:opacity-70 lg:text-[32px] lg:tracking-[-0.06em]"
                          >
                            {link.label}
                          </FooterLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="col-span-4 col-start-5">
                  <div className="flex flex-col gap-9 lg:gap-11">
                    <div className="flex flex-col gap-3 lg:gap-4">
                      <p className="font-display text-[16px] leading-[1.1] tracking-[-0.04em] not-italic cap-trim">
                        Email
                      </p>
                      <a href={`mailto:${EMAIL}`} className="group -my-[7px] block self-start py-[7px]">
                        <span className={`small-text not-italic ${underline}`}>{EMAIL}</span>
                      </a>
                    </div>

                    <div className="flex flex-col gap-3 lg:gap-4">
                      <p className="font-display text-[16px] leading-[1.1] tracking-[-0.04em] not-italic cap-trim">
                        Follow us
                      </p>
                      <ul className="flex flex-col items-start gap-2.5 lg:gap-2">
                        {SOCIALS.map((s) => (
                          <li key={s.label}>
                            <a
                              className="group -my-[5px] block py-[8px]"
                              target="_blank"
                              rel="noreferrer"
                              href={s.href}
                            >
                              <span className={`small-text not-italic ${underline}`}>{s.label}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Divider />

            {/* Legal links */}
            <div className="container">
              <div className="pt-8 pb-8">
                <ul className="flex flex-col items-start gap-2.5 lg:gap-2">
                  {LEGAL_LINKS.map((link) => (
                    <li key={link.label}>
                      <FooterLink to={link.to} className="group -my-[5px] block py-[8px] lg:py-[6px]">
                        <span
                          className={`font-sans text-[12px] leading-[1.3] font-medium tracking-[-0.02em] lg:text-[14px] ${underline}`}
                        >
                          {link.label}
                        </span>
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Divider />

            {/* Copyright + development notice */}
            <div className="container mt-auto">
              <div className="label flex flex-row gap-3 pt-5 pb-6 text-warm-white lg:flex-row lg:items-baseline lg:justify-between">
                <p>© {new Date().getFullYear()} MedLinkup</p>
                <p className="max-w-[60ch] opacity-70 lg:text-right">
                  MedLinkup is currently in development. Healthcare services are not yet available
                  for booking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};