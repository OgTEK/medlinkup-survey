import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../thirdway.css';

gsap.registerPlugin(ScrollTrigger);

interface StatementProps {
  title?: string;
  subtitle?: string;
}

// Same spacing variables as the original, plus colour fallbacks in case the tokens aren't loaded
const sectionStyle = {
  '--block-pt-mob': '64px',
  '--block-pb-mob': '64px',
  '--block-pt-des': '98px',
  '--block-pb-des': '98px',
  backgroundColor: 'var(--color-warm-white, #f7f1e9)',
  color: 'var(--color-warm-black, #20221a)',
} as React.CSSProperties;

export const Statement: React.FC<StatementProps> = ({
  title = 'Care that follows you.',
  subtitle = 'Helping women in Nigeria find the right doctor, understand their next steps and stay supported throughout their care.',
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.from('.statement-reveal', {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-warm-white block-padding"
      style={sectionStyle}
    >
      <div className="container site-grid">
        <div className="col-span-full">
          <div className="flex flex-col items-center justify-center">
            <div className="statement-reveal visibility: inherit; translate: none; rotate: none; scale: none; transform: translate(0px, 0px); opacity: 1;">
              <h2 className="mb-5 w-full max-w-[1600px] text-center h3 lg:mb-6 xl:mb-10">{title}</h2>
            </div>
            <div className="statement-reveal" style={{ visibility: 'inherit', transform: 'translate(0px, 0px)', opacity: 1 }}>
              <h3 className="w-full max-w-[1200px] px-2 text-center marist-h4">{subtitle}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};