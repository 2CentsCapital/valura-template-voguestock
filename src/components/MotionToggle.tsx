import { Pause, Play } from 'lucide-react';
import { setMotionPaused, useMotionPaused } from '../lib/motion';

/**
 * Pauses or resumes the page's ambient motion (loops, marquee, dome, canvases, carousel auto-advance).
 * The choice is remembered for the next visit.
 */
export default function MotionToggle({ className = '' }: { className?: string }) {
  const paused = useMotionPaused();
  return (
    <button
      type="button"
      data-motion-toggle
      onClick={() => setMotionPaused(!paused)}
      className={`inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 font-sans text-sm font-semibold text-white transition-colors duration-300 hover:border-white/50 hover:bg-white/10 ${className}`}
    >
      {paused ? <Play aria-hidden="true" className="h-4 w-4" /> : <Pause aria-hidden="true" className="h-4 w-4" />}
      {paused ? 'Play animations' : 'Pause animations'}
    </button>
  );
}
