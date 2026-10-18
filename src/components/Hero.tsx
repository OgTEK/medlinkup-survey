import React, { useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { ArrowRight, ShieldCheck, HeartHandshake, Compass } from 'lucide-react';
import { gsap } from 'gsap';

interface HeroProps {
  onOpenEarlyAccess: () => void;
  onOpenResearch: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEarlyAccess, onOpenResearch }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();


  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.8 } });

      tl.from(titleRef.current, {
        y: 28,
        opacity: 0,
        delay: 0.1,
      })
        .from(
          subtitleRef.current,
          {
            y: 20,
            opacity: 0,
          },
          '-=0.5'
        )
        .from(
          bodyRef.current,
          {
            y: 16,
            opacity: 0,
          },
          '-=0.5'
        )
        .from(
          ctaRef.current,
          {
            y: 14,
            opacity: 0,
          },
          '-=0.4'
        )
        .from(
          imageFrameRef.current,
          {
            scale: 0.98,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.7'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-stone-50 border-b border-stone-200/60"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Editorial Section Index */}
        <div className="flex items-center gap-3 mb-6 text-xs font-semibold tracking-widest text-teal-800 uppercase">
          <span>01. Hero</span>
          <span className="w-8 h-px bg-stone-300"></span>
          <span className="text-stone-500 font-normal">Care That Follows You</span>
        </div>

        {/* 2-Column Balanced Pentagram Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Typographic Value Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-stone-900 leading-[1.12] mb-6 text-balance"
            >
              Healthcare shouldn't end at the <span className="font-normal text-stone-900 underline decoration-teal-600/40 underline-offset-8">appointment.</span>
            </h1>

            <p
              ref={subtitleRef}
              className="text-xl sm:text-2xl text-stone-700 font-normal leading-snug mb-6 max-w-2xl text-balance"
            >
              Find the right doctor. Understand your next steps. Stay supported throughout your care.
            </p>

            <p
              ref={bodyRef}
              className="text-base sm:text-lg text-stone-600 font-normal leading-relaxed mb-8 max-w-2xl"
            >
              We’re building MedLinkup to help women in Nigeria find the right healthcare professionals, explore personalised care options, and stay connected to their care, with mental health support where needed.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
              <button
                onClick={onOpenEarlyAccess}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-md transition-colors shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600 cursor-pointer"
              >
                <span>Get Early Access</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate("/landing#research")}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-stone-700 hover:text-teal-800 transition-colors underline decoration-stone-300 hover:decoration-teal-600 underline-offset-4 cursor-pointer"
              >
                <span>Help shape MedLinkup. Join our research.</span>
              </button>
            </div>

            {/* In-development clinical disclaimer notice */}
            <div className="p-4 bg-stone-100/80 border border-stone-200 rounded-md max-w-xl">
              <p className="text-xs text-stone-600 leading-normal">
                <strong className="font-semibold text-stone-800">Notice:</strong> MedLinkup is currently in development. Healthcare services are not yet available for booking.
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Visual Asset & Framing */}
          <div ref={imageFrameRef} className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden border border-stone-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.06)] bg-stone-100">
              <img
                src="/src/assets/images/hero_care_nigerian_woman_1792157460231.jpg"
                alt="Contemporary Nigerian woman seated comfortably in a serene healthcare pavilion"
                className="w-full h-auto object-cover aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]"
                referrerPolicy="no-referrer"
              />
              <div className="p-4 bg-white/95 border-t border-stone-200/60 backdrop-blur-xs flex items-center justify-between text-xs text-stone-600">
                <span className="font-medium text-stone-800">Lagos, Nigeria</span>
                <span className="text-stone-400">·</span>
                <span>Centering continuous patient care</span>
              </div>
            </div>

            {/* Clean contextual anchors */}
            <div className="mt-6 grid grid-cols-3 gap-3 text-xs text-stone-600 border-t border-stone-200 pt-5">
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-stone-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-700" /> Vetted Care
                </span>
                <span className="text-stone-500">Verified doctors</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-stone-900 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-teal-700" /> Next Steps
                </span>
                <span className="text-stone-500">Clear guidance</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-stone-900 flex items-center gap-1.5">
                  <HeartHandshake className="w-3.5 h-3.5 text-teal-700" /> Mind & Body
                </span>
                <span className="text-stone-500">Integrated support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
