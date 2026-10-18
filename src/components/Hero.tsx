// // import React, { useEffect, useRef } from 'react';
// // import { useNavigate } from "react-router-dom";
// // import { ArrowRight, ShieldCheck, HeartHandshake, Compass } from 'lucide-react';
// // import { gsap } from 'gsap';

// // interface HeroProps {
// //   onOpenEarlyAccess: () => void;
// //   onOpenResearch: () => void;
// // }

// // export const Hero: React.FC<HeroProps> = ({ onOpenEarlyAccess, onOpenResearch }) => {
// //   const containerRef = useRef<HTMLDivElement>(null);
// //   const titleRef = useRef<HTMLHeadingElement>(null);
// //   const subtitleRef = useRef<HTMLParagraphElement>(null);
// //   const bodyRef = useRef<HTMLParagraphElement>(null);
// //   const ctaRef = useRef<HTMLDivElement>(null);
// //   const imageFrameRef = useRef<HTMLDivElement>(null);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// //     if (prefersReducedMotion) return;

// //     const ctx = gsap.context(() => {
// //       const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.8 } });

// //       tl.from(titleRef.current, {
// //         y: 28,
// //         opacity: 0,
// //         delay: 0.1,
// //       })
// //         .from(
// //           subtitleRef.current,
// //           {
// //             y: 20,
// //             opacity: 0,
// //           },
// //           '-=0.5'
// //         )
// //         .from(
// //           bodyRef.current,
// //           {
// //             y: 16,
// //             opacity: 0,
// //           },
// //           '-=0.5'
// //         )
// //         .from(
// //           ctaRef.current,
// //           {
// //             y: 14,
// //             opacity: 0,
// //           },
// //           '-=0.4'
// //         )
// //         .from(
// //           imageFrameRef.current,
// //           {
// //             scale: 0.98,
// //             opacity: 0,
// //             duration: 1,
// //             ease: 'power3.out',
// //           },
// //           '-=0.7'
// //         );
// //     }, containerRef);

// //     return () => ctx.revert();
// //   }, []);

// //   return (
// //     <section
// //       ref={containerRef}
// //       className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-stone-50 border-b border-stone-200/60"
// //     >
// //       <div className="max-w-7xl mx-auto px-6 sm:px-8">
// //         {/* Editorial Section Index */}
// //         <div className="flex items-center gap-3 mb-6 text-xs font-semibold tracking-widest text-teal-800 uppercase">
// //           {/* <span>Care That Follows You</span> */}
// //           {/* <span className="w-8 h-px bg-stone-300"></span> */}
// //           {/* <span className="text-stone-500 font-normal">Care That Follows You</span> */}
// //         </div>

// //         {/* 2-Column Balanced Pentagram Layout */}
// //         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
// //           {/* Left Column: Typographic Value Proposition */}
// //           <div className="lg:col-span-7 flex flex-col justify-center">
// //             <h1
// //               ref={titleRef}
// //               className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-stone-900 leading-[1.12] mb-6 text-balance"
// //             >
// //               Healthcare shouldn't end at the <span className="font-normal text-stone-900 underline decoration-teal-600/40 underline-offset-8">appointment.</span>
// //             </h1>

// //             <p
// //               ref={subtitleRef}
// //               className="text-xl sm:text-2xl text-stone-700 font-normal leading-snug mb-6 max-w-2xl text-balance"
// //             >
// //               Find the right doctor. Understand your next steps. Stay supported throughout your care.
// //             </p>

// //             <p
// //               ref={bodyRef}
// //               className="text-base sm:text-lg text-stone-600 font-normal leading-relaxed mb-8 max-w-2xl"
// //             >
// //               We’re building MedLinkup to help women in Nigeria find the right healthcare professionals, explore personalised care options, and stay connected to their care, with mental health support where needed.
// //             </p>

// //             {/* CTAs */}
// //             <div ref={ctaRef} className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
// //               <button
// //                 onClick={onOpenEarlyAccess}
// //                 className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-md transition-colors shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600 cursor-pointer"
// //               >
// //                 <span>Get Early Access</span>
// //                 <ArrowRight className="w-4 h-4" />
// //               </button>

// //               <button
// //                 onClick={() => navigate("/survey")}
// //                 className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-stone-700 hover:text-teal-800 transition-colors underline decoration-stone-300 hover:decoration-teal-600 underline-offset-4 cursor-pointer"
// //               >
// //                 <span>Help shape MedLinkup. Join our research.</span>
// //               </button>
// //             </div>

// //             {/* In-development clinical disclaimer notice */}
// //             <div className="p-4 bg-stone-100/80 border border-stone-200 rounded-md max-w-xl">
// //               <p className="text-xs text-stone-600 leading-normal">
// //                 <strong className="font-semibold text-stone-800">Notice:</strong> MedLinkup is currently in development. Healthcare services are not yet available for booking.
// //               </p>
// //             </div>
// //           </div>

// //           {/* Right Column: Editorial Visual Asset & Framing */}
// //           <div ref={imageFrameRef} className="lg:col-span-5 relative">
// //             <div className="relative rounded-lg overflow-hidden border border-stone-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.06)] bg-stone-100">
// //               <img
// //                 src="/src/assets/images/hero_care_nigerian_woman_1792157460231.jpg"
// //                 alt="Contemporary Nigerian woman seated comfortably in a serene healthcare pavilion"
// //                 className="w-full h-auto object-cover aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]"
// //                 referrerPolicy="no-referrer"
// //               />
// //               {/* <div className="p-4 bg-white/95 border-t border-stone-200/60 backdrop-blur-xs flex items-center justify-between text-xs text-stone-600">
// //                 <span className="font-medium text-stone-800">Lagos, Nigeria</span>
// //                 <span className="text-stone-400">·</span>
// //                 <span>Centering continuous patient care</span>
// //               </div> */}
// //             </div>

// //             {/* Clean contextual anchors */}
// //             <div className="mt-6 grid grid-cols-3 gap-3 text-xs text-stone-600 border-t border-stone-200 pt-5">
// //               <div className="flex flex-col gap-1">
// //                 <span className="font-semibold text-stone-900 flex items-center gap-1.5">
// //                   <ShieldCheck className="w-3.5 h-3.5 text-teal-700" /> Vetted Care
// //                 </span>
// //                 <span className="text-stone-500">Verified doctors</span>
// //               </div>
// //               <div className="flex flex-col gap-1">
// //                 <span className="font-semibold text-stone-900 flex items-center gap-1.5">
// //                   <Compass className="w-3.5 h-3.5 text-teal-700" /> Next Steps
// //                 </span>
// //                 <span className="text-stone-500">Clear guidance</span>
// //               </div>
// //               <div className="flex flex-col gap-1">
// //                 <span className="font-semibold text-stone-900 flex items-center gap-1.5">
// //                   <HeartHandshake className="w-3.5 h-3.5 text-teal-700" /> Mind & Body
// //                 </span>
// //                 <span className="text-stone-500">Integrated support</span>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // import React, { useEffect, useRef } from 'react';
// // import { Link } from 'react-router-dom';
// // import { ArrowDown, ArrowRight, ShieldCheck, HeartHandshake, Compass } from 'lucide-react';
// // import { gsap } from 'gsap';
// // import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // import heroImg from '../assets/images/hero_care_nigerian_woman_1792157460231.jpg';

// // gsap.registerPlugin(ScrollTrigger);

// // interface HeroProps {
// //   onOpenEarlyAccess: () => void;
// //   onOpenResearch: () => void;
// // }

// // const HEADLINE = ['Healthcare shouldn’t end', 'at the appointment.'];
// // const BODY =
// //   'We’re building MedLinkup to help women in Nigeria find the right healthcare professionals, explore personalised care options, and stay connected to their care, with mental health support where needed.';

// // /** Text that fills from 30% to 100% opacity, character by character, as you scroll. */
// // const ScrollFill: React.FC<{ text: string; className?: string }> = ({ text, className }) => (
// //   <p className={className}>
// //     <span className="sr-only">{text}</span>
// //     <span aria-hidden="true">
// //       {text.split(' ').map((word, w, words) => (
// //         <React.Fragment key={w}>
// //           <span className="inline-block whitespace-nowrap">
// //             {Array.from(word).map((ch, c) => (
// //               <span key={c} className="fill-char inline-block opacity-30">
// //                 {ch}
// //               </span>
// //             ))}
// //           </span>
// //           {w < words.length - 1 && ' '}
// //         </React.Fragment>
// //       ))}
// //     </span>
// //   </p>
// // );

// // const ArrowPill: React.FC = () => (
// //   <span className="relative flex h-8 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-teal-700 text-white">
// //     <ArrowRight className="absolute h-3.5 w-3.5 transition-all duration-500 group-hover:translate-x-[150%] group-hover:scale-0" />
// //     <ArrowRight className="absolute h-3.5 w-3.5 -translate-x-[150%] scale-0 transition-all duration-500 group-hover:translate-x-0 group-hover:scale-100" />
// //   </span>
// // );

// // export const Hero: React.FC<HeroProps> = ({ onOpenEarlyAccess }) => {
// //   const sectionRef = useRef<HTMLElement>(null);
// //   const mediaRef = useRef<HTMLImageElement>(null);
// //   const cueRef = useRef<HTMLDivElement>(null);
// //   const arrowRef = useRef<HTMLSpanElement>(null);
// //   const fillRef = useRef<HTMLDivElement>(null);

// //   useEffect(() => {
// //     const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// //     const ctx = gsap.context(() => {
// //       if (reduceMotion) {
// //         gsap.set('.fill-char', { opacity: 1 });
// //         return;
// //       }

// //       // Headline lines rise into place on load
// //       gsap
// //         .timeline({ defaults: { ease: 'power4.out' } })
// //         .from('.hero-line', { yPercent: 110, duration: 1.1, stagger: 0.12, delay: 0.15 })
// //         .from(cueRef.current, { opacity: 0, y: 12, duration: 0.8, ease: 'power2.out' }, '-=0.6');

// //       // Looping arrow inside the scroll cue
// //       gsap.fromTo(
// //         arrowRef.current,
// //         { yPercent: -160 },
// //         { yPercent: 160, duration: 1.3, ease: 'power1.inOut', repeat: -1 }
// //       );

// //       // Slow zoom on the pinned photo while scrolling through the hero
// //       gsap.to(mediaRef.current, {
// //         scale: 1.12,
// //         ease: 'none',
// //         scrollTrigger: {
// //           trigger: sectionRef.current,
// //           start: 'top top',
// //           end: 'bottom bottom',
// //           scrub: true,
// //         },
// //       });

// //       // Scroll-driven text fill
// //       gsap.fromTo(
// //         '.fill-char',
// //         { opacity: 0.3 },
// //         {
// //           opacity: 1,
// //           ease: 'none',
// //           stagger: 0.5,
// //           duration: 1,
// //           scrollTrigger: {
// //             trigger: fillRef.current,
// //             start: 'top 85%',
// //             end: 'bottom 45%',
// //             scrub: true,
// //           },
// //         }
// //       );

// //       // CTAs, notice and anchors fade up once the paragraph is mostly in view
// //       gsap.from('.reveal', {
// //         y: 24,
// //         opacity: 0,
// //         duration: 0.8,
// //         ease: 'power2.out',
// //         stagger: 0.12,
// //         scrollTrigger: { trigger: fillRef.current, start: 'bottom 75%', once: true },
// //       });
// //     }, sectionRef);

// //     return () => ctx.revert();
// //   }, []);

// //   return (
// //     <section ref={sectionRef} className="bg-stone-950 text-white relative -mt-(--header-space) h-[155svh] w-full overflow-clip text-warm-white">
// //       {/* Pinned media stage: stays put while the content scrolls over it */}
// //       <div className="sticky top-0 z-0 h-[100svh] w-full overflow-hidden bg-stone-900">
// //         <img
// //           ref={mediaRef}
// //           src={heroImg}
// //           alt="Contemporary Nigerian woman seated comfortably in a serene healthcare pavilion"
// //           className="inset-0 h-full w-full object-cover will-change-transform"
// //           referrerPolicy="no-referrer"
// //         />
// //         <div
// //           aria-hidden="true"
// //           className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-stone-950/40"
// //         />
// //       </div>

// //       {/* Content layer, pulled up over the stage */}
// //       <div className="relative z-10 -mt-[100svh]">
// //         {/* Screen 1: giant headline + scroll cue */}
// //         <div className="flex h-[100svh] items-end">
// //           <div className="mx-auto w-full max-w-[50vw] px-6 pb-16 sm:px-8 lg:flex lg:items-end lg:justify-between lg:px-12">
// //             <h1
// //               className="font-medium leading-[0.95] tracking-[-0.05em] text-white w-[40vw]"
// //               style={{ fontSize: 'clamp(44px, 24px + 6vw, 112px)' }}
// //             >
// //               <span className="sr-only">Healthcare shouldn’t end at the appointment.</span>
// //               {/* {HEADLINE.map((line) => (
// //                 <span
// //                   key={line}
// //                   aria-hidden="true"
// //                   className="inline-block cap-trim font-sans font-medium tracking-tight whitespace-pre-line text-warm-white leading-[1.2] xl:leading-[0.9] transition-transform duration-500 ease-in-out-quart -translate-y-[90px] lg:-translate-y-[50px]"
// //                   style={{ fontSize: 'clamp(56px, 32px + 6.11vw, 100px)' }}
// //                 >
// //                   <span className="hero-line block will-change-transform">{line}</span>
// //                 </span>
// //               ))} */}
// //             </h1>
// //           </div>
// //         </div>

// //         {/* Screen 2: message, CTAs, notice */}
// //         <div className="lex min-h-[100svh] items-end bg-gradient-to-b from-transparent via-stone-950/39 to-stone-950/90 pb-16 pt-32 lg:pb-24">
// //           <div className="mx-auto w-full max-w-[300px] px-6 sm:px-8 lg:px-12">
// //             <div className="flex flex-col gap-8 lg:ml-auto lg:max-w-2xl lg:gap-10">
// //               {/* <p className="text-lg font-medium text-white/80 sm:text-xl">
// //                 Find the right doctor. Understand your next steps. Stay supported throughout your care.
// //               </p> */}

// //               <div ref={fillRef}>
// //                 <ScrollFill
// //                   text={BODY}
// //                   className="text-2xl font-normal leading-[1.25] tracking-tight text-white sm:text-3xl lg:text-[34px]"
// //                 />
// //               </div>

// //               {/* CTAs */}
// //               <div className="reveal flex flex-col gap-6 sm:flex-row sm:items-center">
// //                 <button
// //                   onClick={onOpenEarlyAccess}
// //                   className="group inline-flex cursor-pointer items-center gap-3 self-start rounded-full bg-white py-2 pl-6 pr-2 text-sm font-semibold text-stone-950 transition-colors hover:bg-teal-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
// //                 >
// //                   <span>Get Early Access</span>
// //                   <ArrowPill />
// //                 </button>

// //                 <Link
// //                   to="/survey"
// //                   className="self-start border-b border-white/60 pb-[3px] text-sm font-medium text-white transition-colors hover:border-teal-300 hover:text-teal-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
// //                 >
// //                   Help shape MedLinkup. Join our research.
// //                 </Link>
// //               </div>

// //               {/* In-development notice */}
// //               <div className="reveal max-w-xl rounded-md border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
// //                 <p className="text-xs leading-normal text-white/80">
// //                   <strong className="font-semibold text-white">Notice:</strong> MedLinkup is currently in
// //                   development. Healthcare services are not yet available for booking.
// //                 </p>
// //               </div>

// //               {/* Contextual anchors */}
// //               <div className="reveal grid grid-cols-3 gap-3 border-t border-white/20 pt-5 text-xs text-white/70">
// //                 <div className="flex flex-col gap-1">
// //                   <span className="flex items-center gap-1.5 font-semibold text-white">
// //                     <ShieldCheck className="h-3.5 w-3.5 text-teal-300" /> Vetted Care
// //                   </span>
// //                   <span>Verified doctors</span>
// //                 </div>
// //                 <div className="flex flex-col gap-1">
// //                   <span className="flex items-center gap-1.5 font-semibold text-white">
// //                     <Compass className="h-3.5 w-3.5 text-teal-300" /> Next Steps
// //                   </span>
// //                   <span>Clear guidance</span>
// //                 </div>
// //                 <div className="flex flex-col gap-1">
// //                   <span className="flex items-center gap-1.5 font-semibold text-white">
// //                     <HeartHandshake className="h-3.5 w-3.5 text-teal-300" /> Mind & Body
// //                   </span>
// //                   <span>Integrated support</span>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// import React, { useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import "../thirdway.css"; /* adjust the path to where the file actually is */

// gsap.registerPlugin(ScrollTrigger);

// interface HeroProps {
//   onOpenEarlyAccess: () => void;
//   onOpenResearch: () => void;
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

// /** Underlined label + circular arrow that swaps on hover. Renders a <Link> or a <button>. */
// const PillCta: React.FC<{
//   label: string;
//   to?: string;
//   onClick?: () => void;
// }> = ({ label, to, onClick }) => {
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

//   return to ? (
//     <Link to={to} className={className}>
//       {inner}
//     </Link>
//   ) : (
//     <button
//       type="button"
//       onClick={onClick}
//       className={`${className} cursor-pointer`}
//     >
//       {inner}
//     </button>
//   );
// };

// /** Paragraph whose characters fill from 30% to 100% opacity as you scroll. */
// const ScrollFill: React.FC<{ text: string }> = ({ text }) => (
//   <>
//     <div className="sr-only">
//       <p>{text}</p>
//     </div>
//     <div
//       aria-hidden="true"
//       className="scroll-fill-notrim h6 [&_p]:m-0 text-warm-white"
//     >
//       <p>
//         {text.split(" ").map((word, w, words) => (
//           <React.Fragment key={w}>
//             <span style={INLINE_BLOCK}>
//               {Array.from(word).map((ch, c) => (
//                 <span
//                   key={c}
//                   className="scroll-fill-char"
//                   style={{ ...INLINE_BLOCK, opacity: 0.3 }}
//                 >
//                   {ch}
//                 </span>
//               ))}
//             </span>
//             {w < words.length - 1 && " "}
//           </React.Fragment>
//         ))}
//       </p>
//     </div>
//   </>
// );

// export const Hero: React.FC<HeroProps> = ({ onOpenEarlyAccess }) => {
//   const sectionRef = useRef<HTMLElement>(null);
//   const mediaImgRef = useRef<HTMLImageElement>(null);
//   const fillRef = useRef<HTMLDivElement>(null);
//   const ctaRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const reduceMotion = window.matchMedia(
//       "(prefers-reduced-motion: reduce)",
//     ).matches;

//     const ctx = gsap.context(() => {
//       if (reduceMotion) {
//         gsap.set(".scroll-fill-char", { opacity: 1 });
//         return;
//       }

//       // Headline lines rise into place
//       gsap.fromTo(
//         ".hero-pane .split-line-inner",
//         { yPercent: 110, y: 0, opacity: 0 },
//         {
//           yPercent: 0,
//           y: 0,
//           opacity: 1,
//           duration: 1.1,
//           ease: "power4.out",
//           stagger: 0.12,
//           delay: 0.15,
//         },
//       );
//       gsap.from(".hero-sub", {
//         y: 16,
//         opacity: 0,
//         duration: 0.9,
//         ease: "power3.out",
//         delay: 0.55,
//       });
//       gsap.from(".hero-cue", {
//         opacity: 0,
//         duration: 0.8,
//         ease: "power2.out",
//         delay: 0.9,
//       });

//       // Photo eases from slightly zoomed to rest while you scroll through the hero
//       gsap.fromTo(
//         mediaImgRef.current,
//         { scale: 1.08 },
//         {
//           scale: 1,
//           ease: "none",
//           scrollTrigger: {
//             trigger: sectionRef.current,
//             start: "top top",
//             end: "bottom bottom",
//             scrub: true,
//           },
//         },
//       );

//       // Scroll-driven text fill
//       gsap.fromTo(
//         ".scroll-fill-char",
//         { opacity: 0.3 },
//         {
//           opacity: 1,
//           ease: "none",
//           stagger: 0.5,
//           duration: 1,
//           scrollTrigger: {
//             trigger: fillRef.current,
//             start: "top 88%",
//             end: "bottom 75%",
//             scrub: true,
//           },
//         },
//       );

//       // CTAs and notice fade up as they arrive
//       gsap.from(".hero-reveal", {
//         y: 24,
//         opacity: 0,
//         duration: 0.8,
//         ease: "power2.out",
//         stagger: 0.12,
//         scrollTrigger: {
//           trigger: ctaRef.current,
//           start: "top 95%",
//           once: true,
//         },
//       });
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       data-header-scheme="light"
//       className="relative h-[155svh] w-full overflow-clip text-warm-white"
//       style={{ clipPath: "inset(0)" }}
//     >
//       {/* Pinned photo (fixed to the viewport, clipped to this section) */}
//       <div
//         data-hero-media="true"
//         className="hero-media-layer pointer-events-none fixed inset-x-0 top-0 z-[-1] h-[100svh] overflow-hidden bg-warm-black will-change-transform"
//       >
//         <div className="relative h-full w-full">
//           <img
//             ref={mediaImgRef}
//             src="/src/assets/images/hero_care_nigerian_woman_1792157460231.jpg"
//             alt="Contemporary Nigerian woman seated comfortably in a serene healthcare pavilion"
//             className="pointer-events-none absolute inset-0 h-full w-full object-cover"
//             referrerPolicy="no-referrer"
//           />
//           {/* Base dim so white text stays readable on any photo */}
//           <div
//             aria-hidden="true"
//             className="absolute inset-0"
//             style={{ background: "rgba(0,0,0,0.28)" }}
//           />
//         </div>
//       </div>

//       {/* Screen 1: oversized headline + scroll cue */}
//       <div className="hero-pane pointer-events-none absolute inset-x-0 top-0 z-10 flex h-[100svh] items-end">
//         <div className="relative container w-full pb-[calc(48px+env(safe-area-inset-bottom,0px))]">
//           <h1
//             className="inline-block cap-trim font-sans font-medium tracking-[-0.06em] whitespace-pre-line text-warm-white leading-[0.92] xl:leading-[0.9] transition-transform duration-500 ease-in-out-quart [--split-sentence-gap:10px] split-up"
//             style={{
//               fontSize: "clamp(44px, 24px + 5.4vw, 124px)",
//               visibility: "visible",
//             }}
//             aria-label="Healthcare shouldn’t end at the appointment."
//           >
//             {HEADLINE_LINES.map((line, i) => (
//               <span
//                 key={line}
//                 className="split-line"
//                 aria-hidden="true"
//                 style={{
//                   position: "relative",
//                   display: "block",
//                   textAlign: "start",
//                   ...(i > 0
//                     ? {
//                         translate: "0 calc(1 * var(--split-sentence-gap, 0px))",
//                       }
//                     : {}),
//                 }}
//               >
//                 <span className="split-line-inner" style={{ display: "block" }}>
//                   {line.split(" ").map((word, w, words) => (
//                     <React.Fragment key={w}>
//                       <span className="split-word" style={INLINE_BLOCK}>
//                         {word}
//                       </span>
//                       {w < words.length - 1 && " "}
//                     </React.Fragment>
//                   ))}
//                 </span>
//               </span>
//             ))}
//           </h1>

//           <p className="hero-sub body cap-trim mt-8 max-w-[36ch] text-warm-white">
//             {SUBTITLE}
//           </p>

//           <div className="hero-cue mt-8 flex justify-end transition-transform duration-500 ease-in-out-quart lg:absolute lg:right-[32px] lg:bottom-[48px] lg:mt-0 2xl:right-[48px]">
//             <span className="inline-flex items-center gap-2 xl:gap-2.5 text-warm-white">
//               <span className="body cap-trim">Scroll</span>
//               <span className="relative h-[28px] w-[19px] shrink-0 overflow-hidden rounded-full border-2 border-current xl:h-[32px] xl:w-[21.333px]">
//                 <span
//                   className="scroll-arrow-loop pointer-events-none absolute inset-0 m-auto h-[8px] w-[11px]"
//                   style={{ transform: "rotate(90deg)" }}
//                 >
//                   <Arrow className="block h-full w-full" />
//                 </span>
//               </span>
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Screen 2: message, CTAs, notice */}
//       <div className="pointer-events-none absolute inset-x-0 top-[55svh] z-10 flex h-[100svh] items-end">
//         <div
//           aria-hidden="true"
//           className="absolute inset-x-0 bottom-0 h-[64svh]"
//           style={{
//             background:
//               "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.55))",
//           }}
//         />
//         <div className="relative z-[1] container site-grid w-full pb-[64px] lg:pb-[148px]">
//           <div className="pointer-events-auto col-span-full flex flex-col gap-[32px] lg:col-span-6 lg:col-start-7 lg:gap-[40px] xl:col-span-12 xl:col-start-[13]">
//             <div ref={fillRef}>
//               <ScrollFill text={BODY} />
//             </div>

//             <div
//               ref={ctaRef}
//               className="hero-reveal flex flex-col items-start gap-[24px] sm:flex-row sm:items-center sm:gap-[40px]"
//             >
//               <PillCta label="Get Early Access" onClick={onOpenEarlyAccess} />
//               <PillCta
//                 label="Help shape MedLinkup. Join our research."
//                 to="/survey"
//               />
//             </div>

//             <p className="hero-reveal max-w-[44ch] text-xs leading-snug opacity-70">
//               <strong className="font-semibold">Notice:</strong> MedLinkup is
//               currently in development. Healthcare services are not yet
//               available for booking.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };


import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../thirdway.css";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onOpenEarlyAccess: () => void;
  onOpenResearch: () => void;
}

const HEADLINE_LINES = ["Healthcare shouldn’t end", "at the appointment."];
const SUBTITLE =
  "Find the right doctor. Understand your next steps. Stay supported throughout your care.";
const BODY =
  "We’re building MedLinkup to help women in Nigeria find the right healthcare professionals, explore personalised care options, and stay connected to their care, with mental health support where needed.";

const INLINE_BLOCK: React.CSSProperties = {
  position: "relative",
  display: "inline-block",
};

const Arrow: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 11 8"
    aria-hidden="true"
    className={className}
  >
    <path
      d="M0.5 4H9.5M6.5 1L9.7 4L6.5 7"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type PillCtaProps =
  | { label: string; to: string; onClick?: never }
  | { label: string; onClick: () => void; to?: never };

const PillCta: React.FC<PillCtaProps> = ({ label, to, onClick }) => {
  const className =
    "group inline-flex items-center gap-2.5 transition-colors duration-500 text-warm-white";

  const inner = (
    <>
      <span className="flex items-center border-b pb-[3px] transition-colors duration-500 border-warm-white">
        <span className="body [font-feature-settings:'ss04'] sm:whitespace-nowrap cap-trim text-warm-white transition-colors duration-500 text-left">
          {label}
        </span>
      </span>
      <span
        className="relative flex h-[22px] w-[31px] shrink-0 items-center justify-center overflow-hidden rounded-full transition-colors duration-500 bg-warm-white text-warm-black"
        aria-hidden="true"
      >
        <Arrow className="absolute inset-0 m-auto h-[8px] w-[11px] transition-[translate,scale,rotate,color] [transition-duration:400ms,400ms,400ms,500ms] [transition-timing-function:var(--ease-button),var(--ease-button),var(--ease-button),cubic-bezier(0.4,0,0.2,1)] text-warm-black group-hover:translate-x-[150%] group-hover:scale-0" />
        <Arrow className="absolute inset-0 m-auto h-[8px] w-[11px] transition-[translate,scale,rotate,color] [transition-duration:400ms,400ms,400ms,500ms] [transition-timing-function:var(--ease-button),var(--ease-button),var(--ease-button),cubic-bezier(0.4,0,0.2,1)] text-warm-black -translate-x-[150%] scale-0 group-hover:translate-x-0 group-hover:scale-100" />
      </span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={className}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={`${className} cursor-pointer`}>
      {inner}
    </button>
  );
};

const ScrollFill: React.FC<{ text: string }> = ({ text }) => (
  <>
    <p className="sr-only">{text}</p>
    <p aria-hidden="true" className="scroll-fill-notrim h6 text-warm-white">
      {text.split(" ").map((word, w, words) => (
        <React.Fragment key={w}>
          <span style={INLINE_BLOCK}>
            {Array.from(word).map((ch, c) => (
              <span
                key={c}
                className="scroll-fill-char"
                style={{ ...INLINE_BLOCK, opacity: 0.3 }}
              >
                {ch}
              </span>
            ))}
          </span>
          {w < words.length - 1 && " "}
        </React.Fragment>
      ))}
    </p>
  </>
);

export const Hero: React.FC<HeroProps> = ({ onOpenEarlyAccess }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaImgRef = useRef<HTMLImageElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    let ctx: gsap.Context | null = null;

    const build = () => {
      ctx?.revert();

      ctx = gsap.context(() => {
        if (mql.matches) {
          gsap.set(".scroll-fill-char", { opacity: 1 });
          gsap.set(".split-line-inner", { yPercent: 0, opacity: 1 });
          gsap.set(".hero-sub, .hero-cue, .hero-reveal", { opacity: 1, y: 0 });
          return;
        }

        // === 1. Headline entrance ===
        gsap.fromTo(
          ".hero-pane .split-line-inner",
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
        gsap.from(".hero-cue", {
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.9,
        });

        // === 2. Photo parallax (zoom-out as you scroll) ===
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

        // === 3. Scroll-fill: start chars at 0.3, end at 1.0, spread evenly across scrub range ===
        if (fillRef.current) {
          gsap.fromTo(
            ".scroll-fill-char",
            { opacity: 0.3 },
            {
              opacity: 1,
              ease: "none",
              // ~300 chars × 0.02s each = 6s total; scrub maps to scroll range
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

        // === 4. CTA / notice fade up ===
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

      // Ensure correct positions after images/DOM settle
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
    <section
      ref={sectionRef}
      data-header-scheme="light"
      className="relative h-[155svh] w-full overflow-clip text-warm-white"
    >
      {/* ===== Layer 0: sticky photo + always-bottom gradient ===== */}
      <div
        data-hero-media="true"
        className="hero-media-layer pointer-events-none sticky top-0 z-0 h-[100svh] w-full overflow-hidden bg-warm-black"
      >
        <img
          ref={mediaImgRef}
          src="/src/assets/images/hero_care_nigerian_woman_1792157460231.jpg"
          alt="Contemporary Nigerian woman seated comfortably in a serene healthcare pavilion"
          className="absolute inset-0 h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
        {/* Base dim */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "rgba(0,0,0,0.28)" }}
        />
        {/* Bottom gradient — anchored to the sticky photo, so it always reaches the visible bottom */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[70svh]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.85) 100%)",
          }}
        />
      </div>

      {/* ===== Layer 1: headline pane (sits in the TOP 55svh) ===== */}
      <div className="hero-pane pointer-events-none absolute inset-x-0 top-0 z-10 flex h-[55svh] items-end">
        <div className="relative container w-full pb-[clamp(32px,6vh,72px)]">
          <h1
            className="inline-block cap-trim font-sans font-medium tracking-[-0.06em] whitespace-pre-line text-warm-white leading-[0.92] xl:leading-[0.9] [--split-sentence-gap:10px]"
            style={{ fontSize: "clamp(44px, 24px + 5.4vw, 124px)" }}
            aria-label="Healthcare shouldn’t end at the appointment."
          >
            {HEADLINE_LINES.map((line, i) => (
              <span
                key={line}
                className="split-line"
                aria-hidden="true"
                style={{
                  position: "relative",
                  display: "block",
                  textAlign: "start",
                  ...(i > 0
                    ? {
                        translate:
                          "0 calc(1 * var(--split-sentence-gap, 0px))",
                      }
                    : {}),
                }}
              >
                <span className="split-line-inner" style={{ display: "block" }}>
                  {line.split(" ").map((word, w, words) => (
                    <React.Fragment key={w}>
                      <span className="split-word" style={INLINE_BLOCK}>
                        {word}
                      </span>
                      {w < words.length - 1 && " "}
                    </React.Fragment>
                  ))}
                </span>
              </span>
            ))}
          </h1>

          <p className="hero-sub body cap-trim mt-8 max-w-[36ch] text-warm-white">
            {SUBTITLE}
          </p>

          {/* Scroll cue — bottom-right of screen 1 */}
          <div className="hero-cue mt-8 flex justify-end">
            <span className="inline-flex items-center gap-2 text-warm-white xl:gap-2.5">
              <span className="body cap-trim">Scroll</span>
              <span className="relative h-[28px] w-[19px] shrink-0 overflow-hidden rounded-full border-2 border-current xl:h-[32px] xl:w-[21.333px]">
                <span
                  className="scroll-arrow-loop pointer-events-none absolute inset-0 m-auto h-[8px] w-[11px]"
                  style={{ transform: "rotate(90deg)" }}
                >
                  <Arrow className="block h-full w-full" />
                </span>
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* ===== Layer 2: body copy / CTAs / notice (BOTTOM 45svh) ===== */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex h-[45svh] items-end">
        <div className="relative z-[1] container site-grid w-full pb-[clamp(40px,8vh,96px)]">
          <div className="pointer-events-auto col-span-full flex flex-col gap-[28px] lg:col-span-6 lg:col-start-7 lg:gap-[36px] xl:col-span-12 xl:col-start-[13]">
            <div ref={fillRef}>
              <ScrollFill text={BODY} />
            </div>

            <div
              ref={ctaRef}
              className="hero-reveal flex flex-col items-start gap-[24px] sm:flex-row sm:items-center sm:gap-[40px]"
            >
              <PillCta label="Get Early Access" onClick={onOpenEarlyAccess} />
              <PillCta
                label="Help shape MedLinkup. Join our research."
                to="/survey"
              />
            </div>

            <p className="hero-reveal max-w-[44ch] text-xs leading-snug opacity-70">
              <strong className="font-semibold">Notice:</strong> MedLinkup is
              currently in development. Healthcare services are not yet
              available for booking.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};