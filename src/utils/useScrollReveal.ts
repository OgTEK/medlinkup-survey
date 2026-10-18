import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Bulletproof GSAP scroll reveal hook.
 * Animates elements smoothly with GSAP when they scroll into view,
 * with guaranteed fail-safe cleanup so elements are never trapped with opacity: 0.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  childSelector?: string,
  stagger = 0.08
) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const targets = childSelector
      ? (Array.from(container.querySelectorAll(childSelector)) as HTMLElement[])
      : [container];

    if (targets.length === 0) return;

    let hasAnimated = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;

            // Trigger smooth GSAP reveal animation
            gsap.from(targets, {
              opacity: 0,
              y: 20,
              duration: 0.6,
              stagger,
              ease: 'power2.out',
              clearProps: 'all',
              overwrite: 'auto',
            });

            // Fail-safe cleanup: guarantee all targets are fully visible even if
            // animations are throttled when offscreen
            const totalDurationMs = Math.round((targets.length * stagger + 0.75) * 1000);
            setTimeout(() => {
              targets.forEach((t) => {
                if (t.style.opacity === '0') {
                  t.style.opacity = '1';
                  t.style.transform = 'none';
                }
              });
            }, totalDurationMs);

            observer.disconnect();
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -30px 0px',
        threshold: 0.05,
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [childSelector, stagger]);

  return containerRef;
}
