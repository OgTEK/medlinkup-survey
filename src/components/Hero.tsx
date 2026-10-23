// import React, { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import "../thirdway.css";
// import NigeriaWoman from "../assets/images/hero_care_nigerian_woman_1792157460231.jpg";
// import { EarlyAccessModal } from "../components/EarlyAccessModal";
// import { PillButton } from "./ui/PillButton";

// gsap.registerPlugin(ScrollTrigger);

// interface HeroProps {
//   onOpenEarlyAccess?: () => void;
//   onOpenResearch?: () => void;
// }

// const HEADLINE_LINES = ["Healthcare shouldn’t end", "at the appointment."];
// const SUBTITLE =
//   "Find the right doctor. Understand your next steps. Stay supported throughout your care.";
// const BODY =
//   "We’re building MedLinkup to help women in Nigeria find the right healthcare professionals, explore personalised care options, and stay connected to their care, with mental health support where needed.";

// const INLINE_BLOCK: React.CSSProperties = {
//   position: "relative",
//   display: "inline-block",
// };

// const Arrow: React.FC<{ className?: string }> = ({ className }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 11 8"
//     aria-hidden="true"
//     className={className}
//   >
//     <path
//       d="M0.5 4H9.5M6.5 1L9.7 4L6.5 7"
//       stroke="currentColor"
//       strokeWidth="1.4"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// type PillCtaProps =
//   | { label: string; to: string; onClick?: never }
//   | { label: string; onClick: () => void; to?: never };

// const PillCta: React.FC<PillCtaProps> = ({ label, to, onClick }) => {
//   const className =
//     "group inline-flex items-center gap-2.5 transition-colors duration-500 text-warm-white";

//   const inner = (
//     <>
//       <span className="flex items-center border-b pb-[3px] transition-colors duration-500 border-warm-white">
//         <span className="body [font-feature-settings:'ss04'] sm:whitespace-nowrap cap-trim text-warm-white transition-colors duration-500 text-left">
//           {label}
//         </span>
//       </span>
//       <span
//         className="relative flex h-[22px] w-[31px] shrink-0 items-center justify-center overflow-hidden rounded-full transition-colors duration-500 bg-warm-white text-warm-black"
//         aria-hidden="true"
//       >
//         <Arrow className="absolute inset-0 m-auto h-[8px] w-[11px] transition-[translate,scale,rotate,color] [transition-duration:400ms,400ms,400ms,500ms] [transition-timing-function:var(--ease-button),var(--ease-button),var(--ease-button),cubic-bezier(0.4,0,0.2,1)] text-warm-black group-hover:translate-x-[150%] group-hover:scale-0" />
//         <Arrow className="absolute inset-0 m-auto h-[8px] w-[11px] transition-[translate,scale,rotate,color] [transition-duration:400ms,400ms,400ms,500ms] [transition-timing-function:var(--ease-button),var(--ease-button),var(--ease-button),cubic-bezier(0.4,0,0.2,1)] text-warm-black -translate-x-[150%] scale-0 group-hover:translate-x-0 group-hover:scale-100" />
//       </span>
//     </>
//   );

//   if (to) {
//     return (
//       <Link to={to} className={className}>
//         {inner}
//       </Link>
//     );
//   }

//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className={`${className} cursor-pointer`}
//     >
//       {inner}
//     </button>
//   );
// };

// const WordSpace = () => (
//   <span aria-hidden="true" style={{ display: "inline", whiteSpace: "pre" }}>
//     {" "}
//   </span>
// );

// const ScrollFill: React.FC<{ text: string }> = ({ text }) => (
//   <>
//     <p className="sr-only">{text}</p>
//     <p
//       aria-hidden="true"
//       className="scroll-fill-notrim h6 text-warm-white leading-[1.45] max-w-[48ch]"
//     >
//       {text.split(" ").map((word, w, words) => (
//         <React.Fragment key={w}>
//           <span style={INLINE_BLOCK}>
//             {Array.from(word).map((ch, c) => (
//               <span
//                 key={c}
//                 className="scroll-fill-char"
//                 style={{ ...INLINE_BLOCK, opacity: 0.3 }}
//               >
//                 {ch}
//               </span>
//             ))}
//           </span>
//           {w < words.length - 1 && <WordSpace />}
//         </React.Fragment>
//       ))}
//     </p>
//   </>
// );

// export const Hero: React.FC<HeroProps> = ({ onOpenEarlyAccess }) => {
//   // ✅ hooks must be inside the component
//   const [earlyAccessOpen, setEarlyAccessOpen] = useState(false);

//   const sectionRef = useRef<HTMLElement>(null);
//   const mediaImgRef = useRef<HTMLImageElement>(null);
//   const fillRef = useRef<HTMLDivElement>(null);
//   const ctaRef = useRef<HTMLDivElement>(null);

//   const handleOpenEarlyAccess = () => {
//     setEarlyAccessOpen(true);
//     onOpenEarlyAccess?.();
//   };

//   useEffect(() => {
//     const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
//     let ctx: gsap.Context | null = null;

//     const build = () => {
//       ctx?.revert();

//       ctx = gsap.context(() => {
//         if (mql.matches) {
//           gsap.set(".scroll-fill-char", { opacity: 1 });
//           gsap.set(".split-line-inner", { yPercent: 0, opacity: 1 });
//           gsap.set(".hero-sub, .hero-cue, .hero-reveal", { opacity: 1, y: 0 });
//           return;
//         }

//         gsap.fromTo(
//           ".hero-pane .split-line-inner",
//           { yPercent: 110, opacity: 0 },
//           {
//             yPercent: 0,
//             opacity: 1,
//             duration: 1.1,
//             ease: "power4.out",
//             stagger: 0.12,
//             delay: 0.15,
//           },
//         );
//         gsap.from(".hero-sub", {
//           y: 16,
//           opacity: 0,
//           duration: 0.9,
//           ease: "power3.out",
//           delay: 0.55,
//         });
//         gsap.from(".hero-cue", {
//           opacity: 0,
//           duration: 0.8,
//           ease: "power2.out",
//           delay: 0.9,
//         });

//         if (mediaImgRef.current) {
//           gsap.fromTo(
//             mediaImgRef.current,
//             { scale: 1.08 },
//             {
//               scale: 1,
//               ease: "none",
//               scrollTrigger: {
//                 trigger: sectionRef.current,
//                 start: "top top",
//                 end: "bottom bottom",
//                 scrub: true,
//               },
//             },
//           );
//         }

//         if (fillRef.current) {
//           gsap.fromTo(
//             ".scroll-fill-char",
//             { opacity: 0.3 },
//             {
//               opacity: 1,
//               ease: "none",
//               stagger: 0.02,
//               duration: 0.4,
//               scrollTrigger: {
//                 trigger: fillRef.current,
//                 start: "top 90%",
//                 end: "bottom 60%",
//                 scrub: true,
//                 invalidateOnRefresh: true,
//               },
//             },
//           );
//         }

//         if (ctaRef.current) {
//           gsap.from(".hero-reveal", {
//             y: 24,
//             opacity: 0,
//             duration: 0.8,
//             ease: "power2.out",
//             stagger: 0.12,
//             scrollTrigger: {
//               trigger: ctaRef.current,
//               start: "top 95%",
//               once: true,
//             },
//           });
//         }
//       }, sectionRef);

//       ScrollTrigger.refresh();
//     };

//     build();
//     mql.addEventListener("change", build);

//     return () => {
//       mql.removeEventListener("change", build);
//       ctx?.revert();
//     };
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       data-header-scheme="light"
//       className="relative h-[155svh] w-full overflow-clip text-warm-white"
//     >
//       {/* Sticky photo + gradient */}
//       <div
//         data-hero-media="true"
//         className="hero-media-layer pointer-events-none sticky top-0 z-0 h-[100svh] w-full overflow-hidden bg-warm-black"
//       >
//         <img
//           ref={mediaImgRef}
//           src={NigeriaWoman}
//           alt="Contemporary Nigerian woman seated comfortably in a serene healthcare pavilion"
//           className="absolute inset-0 h-full w-full object-cover"
//           referrerPolicy="no-referrer"
//         />
//         <div
//           aria-hidden="true"
//           className="absolute inset-0"
//           style={{ background: "rgba(0,0,0,0.28)" }}
//         />
//         <div
//           aria-hidden="true"
//           className="absolute inset-x-0 bottom-0 h-[70svh]"
//           style={{
//             background:
//               "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.85) 100%)",
//           }}
//         />
//       </div>

//       {/* Headline pane */}
//       <div className="hero-pane pointer-events-none absolute inset-x-0 top-0 z-10 flex h-[55svh] items-end">
//         <div className="relative container w-full px-[clamp(16px,4vw,32px)] pb-[clamp(32px,6vh,72px)]">
//           <span
//             className="mb-6 inline-block cap-trim font-sans font-medium tracking-[-0.04em] whitespace-pre-line text-warm-white leading-[0.92] xl:leading-[0.9] [--split-sentence-gap:10px]"
//             style={{ fontSize: "clamp(44px, 24px + 5.4vw, 100px)" }}
//             aria-label="Healthcare shouldn’t end at the appointment."
//           >
//             {HEADLINE_LINES.map((line, i) => (
//               <h1
//                 key={line}
//                 className="split-line"
//                 aria-hidden="true"
//                 style={{
//                   position: "relative",
//                   display: "block",
//                   textAlign: "start",
//                   ...(i > 0
//                     ? {
//                       translate:
//                         "0 calc(1 * var(--split-sentence-gap, 0px))",
//                     }
//                     : {}),
//                 }}
//               >
//                 <span className="split-line-inner" style={{ display: "block" }}>
//                   {line.split(" ").map((word, w, words) => (
//                     <React.Fragment key={w}>
//                       <span className="split-word" style={INLINE_BLOCK}>
//                         {word}
//                       </span>
//                       {w < words.length - 1 && <WordSpace />}
//                     </React.Fragment>
//                   ))}
//                 </span>
//               </h1>
//             ))}
//           </span>

//           <div className="py-12">
//             <p className="hero-sub body cap-trim mt-6 max-w-[36ch] text-warm-white leading-relaxed">
//               {SUBTITLE}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Body / CTAs */}
//       <div className="py-20 lg:py-32" />

//       <div className="pointer-events-none z-10">
//         <div
//           className="
//             relative z-[1] container site-grid w-full
//             px-[clamp(16px,4vw,32px)]
//             pb-[max(clamp(72px,12vh,128px),calc(env(safe-area-inset-bottom)+56px))]
//           "
//         >
//           <div className="pointer-events-auto col-span-full flex flex-col gap-4 lg:col-span-6 lg:col-start-8 lg:gap-8 xl:col-span-12 xl:col-start-[13]">
//             <div ref={fillRef} className="max-w-[42ch] sm:max-w-[48ch]">
//               <ScrollFill text={BODY} />
//             </div>

//             <div
//               ref={ctaRef}
//               className="hero-reveal flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-10 py-12"
//             >

//               <div className="group inline-flex items-center gap-2.5 transition-colors duration-500 text-warm-white"> 
//               <PillButton
//                 label="Get Early Access"
//                 variant="primary"
//                 onClick={handleOpenEarlyAccess}
//               />

//               <PillButton
//                 label="Help shape MedLinkup. Join our research."
//                 variant="outline"
//                 to="/survey"
//               />
//               </div>
              
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modal must be rendered */}
//       <EarlyAccessModal
//         open={earlyAccessOpen}
//         onClose={() => setEarlyAccessOpen(false)}
//       />
//     </section>
//   );
// };





import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../thirdway.css";
import NigeriaWoman from "../assets/images/hero_care_nigerian_woman_1792157460231.jpg";
import { EarlyAccessModal } from "../components/EarlyAccessModal";
import { PillButton } from "./ui/PillButton";

gsap.registerPlugin(ScrollTrigger);

/* -------------------------------------------------------------------------- */
/*  CONTENT — edit this section only                                          */
/* -------------------------------------------------------------------------- */

/** One string per line of the big headline */
const HEADLINE_LINES = ["Healthcare shouldn’t end", "at the appointment."];
const HEADLINE_ARIA = HEADLINE_LINES.join(" ");

const SUBTITLE =
  "Find the right doctor. Understand your next steps. Stay supported throughout your care.";

/** Paragraph that "fills in" as you scroll */
const BODY =
  "We’re building MedLinkup to help women in Nigeria find the right healthcare professionals, explore personalised care options, and stay connected to their care, with mental health support where needed.";

const PRIMARY_CTA = { label: "Get Early Access" }; // opens the early-access modal
const SECONDARY_CTA = {
  label: "Join our research.",
  to: "/survey",
};

/** Background photo (swap for an Unsplash URL if you like) */
const HERO_IMAGE = NigeriaWoman;
const HERO_ALT =
  "Contemporary Nigerian woman seated comfortably in a serene healthcare pavilion";

/** Dark overlays so white text stays readable */
const OVERLAY_FLAT = "rgba(0,0,0,0.28)";
const OVERLAY_GRADIENT =
  "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.85) 100%)";

/** Opacity of not-yet-revealed characters in the scroll-fill paragraph */
const FILL_MIN_OPACITY = 0.3;

/* -------------------------------------------------------------------------- */
/*  HELPERS                                                                   */
/* -------------------------------------------------------------------------- */

interface HeroProps {
  onOpenEarlyAccess?: () => void;
  onOpenResearch?: () => void;
}

const INLINE_BLOCK: React.CSSProperties = {
  position: "relative",
  display: "inline-block",
};

const WordSpace = () => (
  <span aria-hidden="true" style={{ display: "inline", whiteSpace: "pre" }}>
    {" "}
  </span>
);

const ScrollFill: React.FC<{ text: string }> = ({ text }) => (
  <>
    <p className="sr-only">{text}</p>
    <p
      aria-hidden="true"
      className="scroll-fill-notrim h6 section-copy text-warm-white max-w-[48ch]"
    >
      {text.split(" ").map((word, w, words) => (
        <React.Fragment key={w}>
          <span style={INLINE_BLOCK}>
            {Array.from(word).map((ch, c) => (
              <span
                key={c}
                className="scroll-fill-char"
                style={{ ...INLINE_BLOCK, opacity: FILL_MIN_OPACITY }}
              >
                {ch}
              </span>
            ))}
          </span>
          {w < words.length - 1 && <WordSpace />}
        </React.Fragment>
      ))}
    </p>
  </>
);

/* -------------------------------------------------------------------------- */
/*  COMPONENT                                                                 */
/* -------------------------------------------------------------------------- */

export const Hero: React.FC<HeroProps> = () => {
  const [earlyAccessOpen, setEarlyAccessOpen] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const mediaImgRef = useRef<HTMLImageElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const handleOpenEarlyAccess = () => {
    setEarlyAccessOpen(true);
  };

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    let ctx: gsap.Context | null = null;

    const build = () => {
      ctx?.revert();

      ctx = gsap.context(() => {
        if (mql.matches) {
          gsap.set(".scroll-fill-char", { opacity: 1 });
          gsap.set(".split-line-inner", { yPercent: 0, opacity: 1 });
          gsap.set(".hero-sub, .hero-reveal", { opacity: 1, y: 0 });
          return;
        }

        gsap.fromTo(
          ".hero-headline .split-line-inner",
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power4.out",
            stagger: 0.12,
            delay: 0.15,
          },
        );
        gsap.from(".hero-sub", {
          y: 16,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.55,
        });

        if (mediaImgRef.current) {
          gsap.fromTo(
            mediaImgRef.current,
            { scale: 1.08 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
              },
            },
          );
        }

        if (fillRef.current) {
          gsap.fromTo(
            ".scroll-fill-char",
            { opacity: FILL_MIN_OPACITY },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.02,
              duration: 0.4,
              scrollTrigger: {
                trigger: fillRef.current,
                start: "top 90%",
                end: "bottom 60%",
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );
        }

        if (ctaRef.current) {
          gsap.from(".hero-reveal", {
            y: 24,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 95%",
              once: true,
            },
          });
        }
      }, sectionRef);

      ScrollTrigger.refresh();
    };

    build();
    mql.addEventListener("change", build);

    return () => {
      mql.removeEventListener("change", build);
      ctx?.revert();
    };
  }, []);

  return (
    /*
      MOBILE FIXES vs. the previous version
      1. min-height 155svh + overflow-x clip (was `h-[155svh] overflow-clip`):
         the body text + buttons are taller than 55svh on phones, so they were
         being clipped off the bottom.
      2. The classes `hero-media-layer` and `hero-pane` were renamed
         (`hero-media`, `hero-headline`). thirdway.css has an iOS-only rule
         (@supports -webkit-touch-callout) that forces `.hero-media-layer`
         to `height:auto` and `.hero-pane` to `height:100lvh` — that collapsed
         the photo and pushed the headline to the bottom on iPhones.
      3. Layout-critical sizes (svh heights) are inline styles on purpose:
         thirdway.css is a precompiled sheet and does not contain classes like
         `min-h-[155svh]` or `h-[100svh]`, so Tailwind classes for them did nothing.
      4. Headline is a single <h1> (was <h1> nested inside a <span>) and its
         font size is smaller on narrow screens so it doesn't overflow.
    */
    <section
      id="early-access"
      ref={sectionRef}
      data-header-scheme="light"
      className="relative w-full text-warm-white"
      style={{ minHeight: "155svh", overflowX: "clip" }}
    >
      {/* Sticky photo + gradient */}
      <div
        data-hero-media="true"
        className="hero-media pointer-events-none sticky top-0 z-0 w-full overflow-hidden bg-warm-black"
        style={{ height: "100svh" }}
      >
        <img
          ref={mediaImgRef}
          src={HERO_IMAGE}
          alt={HERO_ALT}
          className="absolute inset-0 h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: OVERLAY_FLAT }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0"
          style={{ height: "70svh", background: OVERLAY_GRADIENT }}
        />
      </div>

      {/* Headline pane (sits over the sticky photo) */}
      <div
        className="hero-headline pointer-events-none absolute inset-x-0 top-0 z-10 flex items-end"
        style={{ height: "100svh" }}
      >
        <div className="relative container w-full px-[clamp(16px,4vw,32px)] pb-[clamp(32px,6vh,72px)]">
          <h1
            className="mb-6 block cap-trim font-sans font-medium tracking-[-0.04em] text-warm-white leading-[0.92] xl:leading-[0.9] [--split-sentence-gap:10px]"
            style={{ fontSize: "clamp(36px, 20px + 5.4vw, 100px)" }}
            aria-label={HEADLINE_ARIA}
          >
            {HEADLINE_LINES.map((line, i) => (
              <span
                key={line}
                className="split-line"
                aria-hidden="true"
                style={
                  i > 0
                    ? { translate: "0 calc(1 * var(--split-sentence-gap, 0px))" }
                    : undefined
                }
              >
                <span className="split-line-inner" style={{ display: "block" }}>
                  {line.split(" ").map((word, w, words) => (
                    <React.Fragment key={w}>
                      <span className="split-word" style={INLINE_BLOCK}>
                        {word}
                      </span>
                      {w < words.length - 1 && <WordSpace />}
                    </React.Fragment>
                  ))}
                </span>
              </span>
            ))}
          </h1>

          <p className="hero-sub body section-copy max-w-[36ch] text-warm-white">
            {SUBTITLE}
          </p>
        </div>
      </div>

      {/* Spacer so the body text starts below the first screen */}
      <div style={{ height: "clamp(80px, 16svh, 200px)" }} />

      {/* Body / CTAs — scrolls up over the pinned photo */}
      <div className="relative z-10">
        <div className="relative container site-grid w-full px-[clamp(16px,4vw,32px)] pb-[max(clamp(72px,12vh,128px),calc(env(safe-area-inset-bottom)+56px))]">
          <div className="col-span-full flex flex-col gap-4 lg:col-span-6 lg:col-start-7 lg:gap-8 xl:col-span-12 xl:col-start-[13]">
            <div ref={fillRef} className="max-w-[42ch] sm:max-w-[48ch]">
              <ScrollFill text={BODY} />
            </div>

            <div
              ref={ctaRef}
              className="hero-reveal flex flex-row items-start gap-6 py-6 sm:flex-row sm:items-center sm:gap-10"
            >
              <PillButton
                label={PRIMARY_CTA.label}
                variant="primary"
                onClick={handleOpenEarlyAccess}
              />
              <PillButton
                label={SECONDARY_CTA.label}
                variant="outline"
                to={SECONDARY_CTA.to}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal must be rendered */}
      <EarlyAccessModal
        open={earlyAccessOpen}
        onClose={() => setEarlyAccessOpen(false)}
      />
    </section>
  );
};