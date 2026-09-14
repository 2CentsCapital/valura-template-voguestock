import { useEffect, useRef, useState } from 'react';
import jointLogo from '../assets/brand/joint-logo.webp';
import { LOGIN_URL, NAV_LINKS, SIGNUP_URL } from '../config';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Escape closes the menu and returns focus to the toggle; widening to desktop closes it too.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          <a href="#top" className="flex flex-shrink-0 items-center rounded-lg">
            <img
              src={jointLogo}
              alt="Voguestock powered by Valura.Ai"
              width={359}
              height={88}
              className="h-10 w-auto sm:h-11"
            />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-8 font-sans text-sm font-semibold lg:flex">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-600 transition-colors duration-200 hover:text-brand-dark"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={SIGNUP_URL}
              className="rounded-xl border border-gray-200 px-6 py-2.5 font-sans text-sm font-bold text-brand-dark transition-all duration-200 hover:bg-brand-light"
            >
              Sign Up
            </a>
            <a
              href={LOGIN_URL}
              className="rounded-xl bg-brand-orange px-6 py-2.5 font-sans text-sm font-bold text-brand-dark transition-all duration-200 hover:bg-brand-orange-soft hover:shadow-lg hover:shadow-brand-orange/20"
            >
              Sign In
            </a>
          </div>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 text-brand-dark transition-colors hover:bg-brand-light lg:hidden"
          >
            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div id="mobile-menu" hidden={!menuOpen} className="border-b border-gray-100 bg-white lg:hidden">
        <nav aria-label="Mobile" className="space-y-1 px-2 pt-2 pb-4 font-sans font-semibold sm:px-3">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="block rounded-md px-3 py-2.5 text-base text-gray-700 transition hover:bg-brand-light hover:text-brand-dark"
            >
              {item.label}
            </a>
          ))}
          <div className="flex flex-col space-y-2 border-t border-gray-100 px-3 pt-4 pb-2">
            <a
              href={SIGNUP_URL}
              onClick={closeMenu}
              className="w-full rounded-xl border border-gray-200 py-3 text-center font-sans font-bold text-brand-dark transition hover:bg-brand-light"
            >
              Sign Up
            </a>
            <a
              href={LOGIN_URL}
              onClick={closeMenu}
              className="w-full rounded-xl bg-brand-orange py-3 text-center font-sans font-bold text-brand-dark transition hover:bg-brand-orange-soft"
            >
              Sign In
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
