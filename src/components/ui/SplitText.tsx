import { useEffect, useRef, useState, type JSX, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion } from '../../lib/motion';

interface SplitTextProps {
  text?: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words';
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  tag?: keyof JSX.IntrinsicElements;
  onLetterAnimationComplete?: () => void;
  children?: ReactNode;
}

/** Staggered character reveal for the hero headline. Renders static text for reduced motion. */
export default function SplitText({
  text = '',
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  textAlign = 'center',
  tag: Tag = 'h1',
  onLetterAnimationComplete,
  children,
}: SplitTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const animationCompletedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(true);

  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    if (document.fonts && document.fonts.status !== 'loaded') {
      setFontsLoaded(false);
      document.fonts.ready.then(() => setFontsLoaded(true));
    }
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !fontsLoaded || animationCompletedRef.current || prefersReducedMotion()) return;

      const targets = ref.current.querySelectorAll('.split-char, .split-word, .split-node');
      if (targets.length > 0) {
        gsap.fromTo(
          targets,
          { ...from },
          {
            ...to,
            duration,
            ease,
            stagger: delay / 1000,
            onComplete: () => {
              animationCompletedRef.current = true;
              onCompleteRef.current?.();
            },
            willChange: 'transform, opacity',
            force3D: true,
          }
        );
      }
    },
    {
      dependencies: [text, delay, duration, ease, splitType, JSON.stringify(from), JSON.stringify(to), fontsLoaded],
      scope: ref,
    }
  );

  const renderContent = () => {
    if (children) return children;
    if (splitType === 'words') {
      return text.split(' ').map((word, i) => (
        <span key={i} className="split-word mr-[0.25em] inline-block">
          {word}
        </span>
      ));
    }
    return text.split(' ').map((word, wIdx) => (
      <span key={wIdx} className="split-word mr-[0.25em] inline-block whitespace-nowrap">
        {word.split('').map((char, cIdx) => (
          <span key={cIdx} className="split-char inline-block">
            {char}
          </span>
        ))}
      </span>
    ));
  };

  const Component = Tag as unknown as React.ElementType;

  return (
    <Component ref={ref} style={{ textAlign, wordWrap: 'break-word' }} className={`split-parent ${className}`}>
      {renderContent()}
    </Component>
  );
}
