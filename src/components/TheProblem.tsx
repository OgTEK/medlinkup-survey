import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollReveal } from '../utils/useScrollReveal';
import "../thirdway.css"

gsap.registerPlugin(ScrollTrigger);

interface PatientQuestion {
  q: string;
  detail: string;
  /** Short label shown under the question (edit freely) */
  tag: string;
  /** Optional photo for the slide, e.g. '/src/assets/images/problem-scan.jpg' */
  image?: string;
  /** Fallback background when there is no photo */
  bg: string;
}

const patientQuestions: PatientQuestion[] = [
  {
    q: "Our approach",
    detail: "Care that knows your needs and stays connected. We believe better healthcare isn't only about getting an appointment. It's about what happens before, during and after it.",
    tag: 'Diagnostics',
    bg: 'radial-gradient(120% 120% at 20% 10%, #1b5e57 0%, #0f3b37 45%, #0a1f1e 100%)',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=3253&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
  },
  {
    q: "Your care shouldn't start over at every appointment.",
    detail: "When your care involves different professionals or several visits, it should stay connected. MedLinkup helps you coordinate appointments, referrals and ongoing care without losing track of what has happened before.",
    tag: 'Understanding',
    bg: 'radial-gradient(120% 120% at 80% 20%, #2a6f66 0%, #123c3a 50%, #0b1c1b 100%)',
    image: 'https://images.unsplash.com/photo-1758691461990-03b49d969495?q=80&w=3840&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
  },
  {
    q: 'Your health story matters',
    detail: "Your concerns, previous consultations and care decisions all add up to a bigger picture. MedLinkup brings relevant health information together, so you and your healthcare professionals can make better-informed decisions. Nothing from your medical history is shared without your permission.",
    tag: 'Understanding',
    bg: 'radial-gradient(120% 120% at 80% 20%, #2a6f66 0%, #123c3a 50%, #0b1c1b 100%)',
    image: 'https://images.unsplash.com/photo-1758691461990-03b49d969495?q=80&w=3840&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
  },
  {
    q: "Support shouldn't disappear when the consultation ends",
    detail: "From tests and referrals to reminders and follow-up appointments, MedLinkup helps you understand what comes next and keep track of the care you need.",
    tag: 'Records',
    bg: 'radial-gradient(120% 120% at 70% 70%, #1f5c52 0%, #0f3431 50%, #091a19 100%)',
    image: 'https://images.unsplash.com/photo-1530288782965-fbad40327074?q=80&w=3072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
  },
];

const COUNT = patientQuestions.length;

export const TheProblem: React.FC = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>('.problem-fade-up, .problem-question-card', 0.08);
  const stageRef = useRef<HTMLDivElement>(null);

  const [reduceMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const stage = stageRef.current;
    if (reduceMotion || !stage) return;

    const total = COUNT - 1;
    const qa = (sel: string) => Array.from(stage.querySelectorAll<HTMLElement>(sel));

    const ctx = gsap.context(() => {
      const slides = qa('.problem-slide');
      const backgrounds = qa('.problem-slide-bg');
      const texts = qa('.problem-text');
      const counter = stage.querySelector<HTMLElement>('.current-project-number span');
      const bar = stage.querySelector<HTMLElement>('.progress-amount');

      gsap.set(slides, { clipPath: 'inset(0% 0% 0% 0%)' });

      // Cross-fade the question + detail text and update the counter
      let current = 0;
      const setActive = (idx: number) => {
        if (idx === current) return;
        current = idx;
        if (counter) counter.textContent = `0${idx + 1}`;
        texts.forEach((el) => {
          const on = Number(el.dataset.index) === idx;
          el.setAttribute('aria-hidden', String(!on));
          gsap.to(el, { opacity: on ? 1 : 0, duration: 0.25, overwrite: true });
        });
      };

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: () => `+=${window.innerHeight * total}`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 1, // measure this pin before triggers further down the page
          onUpdate: (self) => setActive(Math.min(total, Math.round(self.progress * total))),
        },
      });

      slides.forEach((slide, i) => {
        // Wipe the current slide upward to reveal the one beneath
        if (i < total) tl.to(slide, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1 }, i);
        // Gentle parallax on each background while it is on screen
        tl.fromTo(backgrounds[i], { yPercent: -5 }, { yPercent: 5, duration: 1 }, Math.max(0, i - 1));
      });

      if (bar) tl.fromTo(bar, { scaleX: 1 / COUNT }, { scaleX: 1, duration: total }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, [reduceMotion, sectionRef]);

  return (
    <section id="why-medlinkup" ref={sectionRef} className="border-b border-stone-200/70">
      {/* ---------- Intro (light) ---------- */}

      {/* ---------- The four questions ---------- */}
      {reduceMotion ? (
        /* Reduced-motion fallback: your original card grid */
        <div className="bg-stone-100/60 pb-16 ">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {patientQuestions.map((item, idx) => (
              <div
                key={idx}
                className="problem-question-card bg-white p-6 sm:p-7 rounded-lg border border-stone-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono font-medium text-teal-700 mb-3 tracking-wider">
                    QUESTION 0{idx + 1}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-stone-900 leading-snug mb-3">
                    {item.q}
                  </h3>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed pt-3 border-t border-stone-100">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Pinned full-bleed stage */
        <div
          ref={stageRef}
          data-header-scheme="light"
          className="featured-projects-full-bleed relative overflow-hidden"
          style={{ height: '100svh', backgroundColor: '#0a1f1e' }}
        >
          {/* Slides (first one on top, wiped away in turn) */}
          {patientQuestions.map((item, i) => (
            <div
              key={item.q}
              className="problem-slide project-item absolute inset-0 h-full w-full overflow-hidden bg-black"
              style={{ zIndex: COUNT - i }}
            >
              <div
                className="problem-slide-bg project-item--background-image-container absolute inset-x-0"
                style={{ top: '-20%', height: '140%', background: item.bg }}
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-[5%] top-[22%] select-none font-medium leading-none tracking-[-0.06em]"
                    style={{ fontSize: '34vw', color: 'rgba(247,241,233,0.06)' }}
                  >
                    0{i + 1}
                  </span>
                )}
              </div>
            </div>
          ))}

          {/* Legibility gradient */}
          <div
            aria-hidden="true"
            className="projects-gradient-overlay pointer-events-none absolute inset-0"
            style={{ zIndex: 50 }}
          >
            <div
              className="absolute inset-x-0 bottom-0"
              style={{
                height: '80%',
                background: 'linear-gradient(180deg, rgba(32,34,26,0) 0%, rgba(32,34,26,0.8) 75%)',
              }}
            />
          </div>

          {/* Text layer */}
          {/* Text layer: vertically centred, with room above and below */}
          <div
            className="all-text-items-outer-container absolute inset-0 flex items-center text-warm-white"
            style={{
              zIndex: 100,
              color: 'var(--color-warm-white, #f7f1e9)',
              paddingTop: 'clamp(96px, 14vh, 160px)',
              paddingBottom: 'clamp(96px, 14vh, 160px)',
            }}
          >
            <div className="all-top-text-items-inner-container container mx-auto w-full">
              {/* Thin white progress bar, above the questions */}
              <span
                className="scroll-progress-bar mb-6 block w-full overflow-hidden lg:mb-8"
                style={{ height: 1, backgroundColor: 'rgba(247,241,233,0.24)' }}
              >
                <span
                  className="progress-amount block h-full w-full will-change-transform"
                  style={{
                    backgroundColor: '#F7F1E9',
                    transform: `scaleX(${1 / COUNT})`,
                    transformOrigin: 'left center',
                  }}
                />
              </span>

              <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-12 lg:gap-x-6">
                {/* Counter 01 / 04 */}
                <div className="lg:col-span-2">
                  <div className="progress-steps-container">
                    <span className="number-pill h-[19px] w-[28px] body-small lg:h-[21px] lg:w-[32px] standard current-project-number text-warm-white">
                      <span>01</span>
                    </span>
                    <span className="divider mr-1 ml-1">/</span>
                    <span className="number-pill h-[19px] w-[28px] body-small lg:h-[21px] lg:w-[32px] standard number-of-projects">
                      <span>0{COUNT}</span>
                    </span>
                  </div>
                </div>

                {/* Question + tag */}
                <div className="name-and-specs-col relative lg:col-span-5">
                  <div className="grid">
                    {patientQuestions.map((item, i) => (
                      <div
                        key={item.q}
                        data-index={i}
                        aria-hidden={i !== 0}
                        className="problem-text col-start-1 row-start-1"
                        style={{ opacity: i === 0 ? 1 : 0 }}
                      >
                        {/* <h3 className="project-name relative mb-[18px] block h3 text-[28px] leading-[1.05] font-medium tracking-[-0.04em] text-warm-white cap-trim lg:mb-[42px] lg:text-[44px]">
                          {item.q}
                        </h3> */}
                        <div className="project-specs-container flex items-center text-warm-white cap-trim lg:flex-col lg:items-start">
                          {/* <span className="body-small lg:mb-2">Question 0{i + 1}</span> */}
                          <span className="dot mr-2 ml-2 inline-block h-[4px] w-[4px] rounded-full bg-warm-white lg:hidden" />
                          <span className="project-name relative mb-4.5 block h3 text-warm-white cap-trim lg:mb-10.5 transition-opacity ease-in-out opacity-100">{item.q}</span>
                          {/* <span className="body-small">{item.tag}</span> */}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detail */}
                <div className="lg:col-span-5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="10" fill="none" className="quote-marks mb-3.5 block h-[10px] w-[15px]"><path fill="#F7F1E9" d="M5.653 10H0L3.732 0h3.435zm7.832 0H7.833l3.731-10H15z"></path></svg>

                  <div className="grid">
                    {patientQuestions.map((item, i) => (
                      <div
                        key={item.detail}
                        data-index={i}
                        aria-hidden={i !== 0}
                        className="problem-text project-quote-container col-start-1 row-start-1"
                        style={{ opacity: i === 0 ? 1 : 0 }}
                      >
                        <p className="quote-contents text-warm-white lg:body xl:body-large">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------- The core insight (light) ---------- */}
    </section>
  );
};