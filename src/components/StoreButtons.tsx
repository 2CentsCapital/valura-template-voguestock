import { APP_STORE_URL, PLAY_STORE_URL } from '../config';

function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-6 w-6 shrink-0">
      <path d="M16.37 1.43c0 1.13-.41 2.18-1.12 2.99-.78.9-2.05 1.6-3.08 1.51-.13-1.07.42-2.22 1.09-2.95.76-.86 2.08-1.5 3.11-1.55zM20.5 17.05c-.55 1.27-.81 1.83-1.52 2.95-.99 1.56-2.38 3.5-4.11 3.52-1.53.01-1.93-1-4.01-.99-2.09.01-2.52 1.01-4.06.99-1.72-.02-3.04-1.77-4.03-3.33C-.04 16.86-.32 12.06 1.3 9.51 2.42 7.69 4.2 6.62 5.88 6.62c1.71 0 2.79.99 4.21.99 1.37 0 2.21-.99 4.2-.99 1.49 0 3.07.81 4.2 2.22-3.69 2.02-3.09 7.3.91 8.21z" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-6 w-6 shrink-0">
      <path d="M4.1 2.3c-.3.17-.5.5-.5.92v17.56c0 .42.2.75.5.92l9.55-9.7L4.1 2.3zm10.83 8.3 2.6-2.66L6.05 1.04c-.27-.15-.55-.18-.79-.1l9.67 9.66zm0 2.8L5.26 23c.24.08.52.05.79-.1l11.48-6.52-2.6-2.68zm5.2-3.06-2.06-1.17-2.86 2.9 2.86 2.9 2.06-1.17c.84-.48.84-1.71 0-2.19z" />
    </svg>
  );
}

interface StoreButtonsProps {
  className?: string;
  /** Light buttons for dark sections. */
  onDark?: boolean;
}

/** App Store and Google Play download links for the Valura.Ai app. */
export default function StoreButtons({ className = '', onDark = false }: StoreButtonsProps) {
  const base =
    'inline-flex items-center gap-2.5 rounded-xl border px-4 py-2 transition-[translate,background-color,border-color] duration-300 hover:-translate-y-0.5';
  const tone = onDark
    ? 'border-white bg-white text-brand-dark hover:bg-brand-peach'
    : 'border-brand-dark bg-brand-dark text-white hover:bg-black';
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${tone}`}
        aria-label="Download the Valura.Ai app on the App Store (opens in a new tab)"
      >
        <AppleGlyph />
        <span className="flex flex-col text-left leading-tight">
          <span className="text-[10px] font-semibold uppercase tracking-wide opacity-80">Download on the</span>
          <span className="text-[15px] font-bold">App Store</span>
        </span>
      </a>
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${tone}`}
        aria-label="Get the Valura.Ai app on Google Play (opens in a new tab)"
      >
        <PlayGlyph />
        <span className="flex flex-col text-left leading-tight">
          <span className="text-[10px] font-semibold uppercase tracking-wide opacity-80">Get it on</span>
          <span className="text-[15px] font-bold">Google Play</span>
        </span>
      </a>
    </div>
  );
}
