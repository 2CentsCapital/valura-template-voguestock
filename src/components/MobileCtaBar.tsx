import { ArrowRight } from 'lucide-react';
import { LOGIN_URL } from '../config';

/** Sticky "Sign In" bar on small screens, as on the live landing. */
export default function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 px-4 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] shadow-[0_-6px_22px_rgba(36,22,9,0.08)] backdrop-blur-md sm:hidden">
      <a
        href={LOGIN_URL}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange py-3.5 font-sans font-bold text-brand-dark transition-colors duration-200 hover:bg-brand-orange-soft"
      >
        Sign In
        <ArrowRight aria-hidden="true" className="h-5 w-5" />
      </a>
    </div>
  );
}
