import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface SplitTextProps {
  text?: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words' | 'lines';
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  tag?: keyof React.JSX.IntrinsicElements;
  onLetterAnimationComplete?: () => void;
  children?: React.ReactNode;
}

const SplitText: React.FC<SplitTextProps> = ({
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
  children
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const animationCompletedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(true);

  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    if (document.fonts && document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else if (document.fonts) {
      document.fonts.ready.then(() => setFontsLoaded(true));
    } else {
      setFontsLoaded(true);
    }
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !fontsLoaded) return;
      if (animationCompletedRef.current) return;

      const el = ref.current;
      const targets = el.querySelectorAll('.split-char, .split-word, .split-node');

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
            force3D: true
          }
        );
      }
    },
    {
      dependencies: [text, delay, duration, ease, splitType, JSON.stringify(from), JSON.stringify(to), fontsLoaded],
      scope: ref
    }
  );

  const renderContent = () => {
    if (children) return children;

    if (splitType === 'words') {
      return text.split(' ').map((word, i) => (
        <span key={i} className="split-word inline-block mr-[0.25em]">
          {word}
        </span>
      ));
    }

    // Default chars split
    return text.split(' ').map((word, wIdx) => (
      <span key={wIdx} className="split-word inline-block whitespace-nowrap mr-[0.25em]">
        {word.split('').map((char, cIdx) => (
          <span key={cIdx} className="split-char inline-block">
            {char}
          </span>
        ))}
      </span>
    ));
  };

  const Component = (Tag || 'h1') as any;

  return (
    <Component
      ref={ref}
      style={{ textAlign, wordWrap: 'break-word' }}
      className={`split-parent ${className}`}
    >
      {renderContent()}
    </Component>
  );
};

export default SplitText;
