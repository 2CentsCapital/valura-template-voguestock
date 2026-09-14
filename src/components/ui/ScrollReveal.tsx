import { useEffect, useMemo, useRef, type ElementType, type ReactNode, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../../lib/motion';

import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  as?: ElementType;
}

/** Reveals a heading word by word, or a whole block, as it scrolls into view. Static for reduced motion. */
export default function ScrollReveal({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 0,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  as: Component = 'div',
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    if (!text) return children;
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || prefersReducedMotion()) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    const ctx = gsap.context(() => {
      const wordElements = el.querySelectorAll('.word');

      if (wordElements.length > 0) {
        if (baseRotation !== 0) {
          gsap.fromTo(
            el,
            { transformOrigin: '0% 50%', rotate: baseRotation },
            {
              ease: 'power2.out',
              rotate: 0,
              duration: 0.8,
              scrollTrigger: { trigger: el, scroller, start: 'top 85%', once: true },
            }
          );
        }

        gsap.fromTo(
          wordElements,
          {
            opacity: baseOpacity,
            filter: enableBlur ? `blur(${blurStrength}px)` : 'none',
            willChange: 'opacity, filter',
          },
          {
            ease: 'power2.out',
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.7,
            stagger: 0.04,
            clearProps: 'filter,opacity,willChange',
            scrollTrigger: { trigger: el, scroller, start: 'top 85%', once: true },
          }
        );
      } else {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 35,
            filter: enableBlur ? `blur(${blurStrength}px)` : 'none',
            willChange: 'opacity, transform',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.85,
            ease: 'power3.out',
            clearProps: 'filter,opacity,transform,willChange',
            scrollTrigger: { trigger: el, scroller, start: 'top 88%', once: true },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, blurStrength]);

  return (
    <Component ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      {typeof children === 'string' ? <span className={`scroll-reveal-text ${textClassName}`}>{splitText}</span> : children}
    </Component>
  );
}
