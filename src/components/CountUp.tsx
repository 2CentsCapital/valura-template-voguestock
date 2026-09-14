import { useEffect, useRef } from 'react';
import { useMotionPaused } from '../lib/motion';

interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

const format = (n: number) => n.toLocaleString('en-US');

/**
 * Counts up to `value` once its closest `data-reveal` ancestor is revealed (src/lib/reveal.ts). The final value is
 * rendered invisibly for layout and for screen readers, so nothing shifts while the digits change. With animations
 * paused the final value shows straight away.
 */
export default function CountUp({ value, prefix = '', suffix = '', duration = 1300 }: CountUpProps) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const doneRef = useRef(false);
  const paused = useMotionPaused();
  const finalText = `${prefix}${format(value)}${suffix}`;

  useEffect(() => {
    const el = numberRef.current;
    const host = el?.closest('[data-reveal]');
    if (!el) return;
    const show = (n: number) => {
      el.textContent = `${prefix}${format(n)}${suffix}`;
    };
    if (doneRef.current || paused || !host) {
      doneRef.current = true;
      show(value);
      return;
    }

    let frame = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        show(Math.round(value * (1 - Math.pow(1 - t, 5))));
        if (t < 1) frame = requestAnimationFrame(tick);
        else doneRef.current = true;
      };
      frame = requestAnimationFrame(tick);
    };

    show(0);
    if (host.hasAttribute('data-revealed')) run();
    else host.addEventListener('reveal', run, { once: true });
    return () => {
      host.removeEventListener('reveal', run);
      cancelAnimationFrame(frame);
    };
  }, [value, prefix, suffix, duration, paused]);

  return (
    <span className="relative inline-grid justify-items-center">
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {finalText}
      </span>
      <span ref={numberRef} aria-hidden="true" className="col-start-1 row-start-1">
        {finalText}
      </span>
      <span className="sr-only">{finalText}</span>
    </span>
  );
}
