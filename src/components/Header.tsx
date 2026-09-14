import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import jointLogo from '../assets/brand/joint-logo.webp';
import { LOGIN_URL, NAV_LINKS, SIGNUP_URL } from '../config';

// Sections in page order; the nav underline follows the one under the upper third of the viewport.
const SPY_SECTIONS = ['top', 'invest', 'why', 'how', 'trust', 'demo', 'faq', 'open'];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const [hoverHref, setHoverHref] = useState<string | null>(null);
  const [indicator, setIndicator] = useState({ x: 0, width: 0, visible: false });
  const [layoutVersion, setLayoutVersion] = useState(0);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

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

  // Scroll spy for the sliding nav underline.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const probe = window.innerHeight * 0.35;
      let current: string | null = null;
      for (const id of SPY_SECTIONS) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= probe) current = id;
      }
      const href = current ? `#${current}` : null;
      setActiveHref(NAV_LINKS.some((link) => link.href === href) ? href : null);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      onScroll();
      setLayoutVersion((version) => version + 1);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    document.fonts.ready.then(() => setLayoutVersion((version) => version + 1));
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const target = hoverHref ?? activeHref;
  useLayoutEffect(() => {
    const link = target ? linkRefs.current[target] : null;
    if (!link) {
      setIndicator((previous) => (previous.visible ? { ...previous, visible: false } : previous));
      return;
    }
    setIndicator({ x: link.offsetLeft, width: link.offsetWidth, visible: true });
  }, [target, layoutVersion]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md">
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

          <nav
            aria-label="Primary"
            className="relative hidden items-center gap-8 font-sans text-sm font-semibold lg:flex"
            onPointerLeave={() => setHoverHref(null)}
          >
            {NAV_LINKS.map((item) => {
              const isActive = activeHref === item.href;
              return (
                <a
                  key={item.href}
                  ref={(el) => {
                    linkRefs.current[item.href] = el;
                  }}
                  href={item.href}
                  aria-current={isActive ? 'true' : undefined}
                  onPointerEnter={() => setHoverHref(item.href)}
                  onFocus={() => setHoverHref(item.href)}
                  onBlur={() => setHoverHref(null)}
                  className={`py-2 transition-colors duration-300 ${
                    isActive ? 'text-brand-dark' : 'text-gray-600 hover:text-brand-dark'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <span
              aria-hidden="true"
              data-nav-indicator
              className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-[100px] origin-left rounded-full bg-brand-orange transition-[transform,opacity] duration-500"
              style={{
                transform: `translateX(${indicator.x}px) scaleX(${indicator.width / 100})`,
                opacity: indicator.visible ? 1 : 0,
              }}
            />
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={SIGNUP_URL}
              className="rounded-xl border border-gray-200 px-6 py-2.5 font-sans text-sm font-bold text-brand-dark transition-colors duration-300 hover:bg-brand-light"
            >
              Sign Up
            </a>
            <a
              href={LOGIN_URL}
              className="sheen rounded-xl bg-brand-orange px-6 py-2.5 font-sans text-sm font-bold text-brand-dark transition-colors duration-300 hover:bg-brand-orange-soft"
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
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 text-brand-dark transition-colors duration-300 hover:bg-brand-light lg:hidden"
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

      <div id="mobile-menu" hidden={!menuOpen} className="menu-in border-b border-gray-100 bg-white lg:hidden">
        <nav aria-label="Mobile" className="space-y-1 px-2 pt-2 pb-4 font-sans font-semibold sm:px-3">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="block rounded-md px-3 py-2.5 text-base text-gray-700 transition-colors duration-300 hover:bg-brand-light hover:text-brand-dark"
            >
              {item.label}
            </a>
          ))}
          <div className="flex flex-col space-y-2 border-t border-gray-100 px-3 pt-4 pb-2">
            <a
              href={SIGNUP_URL}
              onClick={closeMenu}
              className="w-full rounded-xl border border-gray-200 py-3 text-center font-sans font-bold text-brand-dark transition-colors duration-300 hover:bg-brand-light"
            >
              Sign Up
            </a>
            <a
              href={LOGIN_URL}
              onClick={closeMenu}
              className="w-full rounded-xl bg-brand-orange py-3 text-center font-sans font-bold text-brand-dark transition-colors duration-300 hover:bg-brand-orange-soft"
            >
              Sign In
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
