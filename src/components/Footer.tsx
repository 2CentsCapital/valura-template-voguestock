import type { CSSProperties } from 'react';
import jointLogoWhite from '../assets/brand/joint-logo-white.webp';
import wordmark from '../assets/brand/voguestock-wordmark.svg';
import Velaris from './ui/velaris';
import StoreButtons from './StoreButtons';
import MotionToggle from './MotionToggle';
import { CONTACT, RISK_LINE, SIGNUP_URL, VOGUESTOCK_LEGAL_LINKS } from '../config';

// The live landing's footer "Explore" list.
const EXPLORE_LINKS = [
  { label: 'What you can hold', href: '#invest' },
  { label: 'Why', href: '#why' },
  { label: 'How it works', href: '#how' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Open an account', href: SIGNUP_URL },
];

const FOOTER_COLORS = ['#6b2f0d', '#8f430c', '#1a120b', '#d9661a'];
const linkClass = 'text-gray-300 transition-colors duration-300 hover:text-white';

const revealDelay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as CSSProperties;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark relative overflow-hidden border-t border-white/10 bg-brand-night pt-20 pb-8 text-white sm:pt-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <Velaris height="100%" className="h-full w-full opacity-60" bg="#1a120b" colors={FOOTER_COLORS} speed={3.5} grain={0.15} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 font-sans sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 border-b border-white/15 pb-12 lg:grid-cols-12">
          <div data-reveal className="lg:col-span-5">
            <img
              src={jointLogoWhite}
              alt="Voguestock powered by Valura.Ai"
              width={392}
              height={96}
              loading="lazy"
              decoding="async"
              className="h-12 w-auto"
            />
            <p className="mt-6 max-w-md text-base leading-relaxed text-gray-300">
              Global investing for India: Voguestock&apos;s thirty-year track record, powered by Valura.Ai&apos;s
              IFSCA-regulated GIFT City platform. Your money, the world&apos;s markets, one simple place.
            </p>
            <div className="mt-8">
              <p className="mb-3 text-sm font-semibold text-gray-300">Get the app</p>
              <StoreButtons onDark />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 text-base sm:grid-cols-3 lg:col-span-7">
            <nav data-reveal style={revealDelay(90)} aria-label="Footer">
              <h2 className="mb-5 font-display text-lg font-medium text-white">Explore</h2>
              <ul className="space-y-3">
                {EXPLORE_LINKS.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={linkClass}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div data-reveal style={revealDelay(180)}>
              <h2 className="mb-5 font-display text-lg font-medium text-white">Contact</h2>
              <ul className="space-y-3">
                <li>
                  <a href={CONTACT.phoneHref} className={linkClass}>
                    {CONTACT.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {CONTACT.whatsappDisplay}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${CONTACT.email}`} className={`${linkClass} break-all`}>
                    {CONTACT.email}
                  </a>
                </li>
                <li>
                  <address className="text-gray-300 not-italic">{CONTACT.address}</address>
                </li>
              </ul>
            </div>

            <div data-reveal style={revealDelay(270)}>
              <h2 className="mb-5 font-display text-lg font-medium text-white">Voguestock policies</h2>
              <ul className="space-y-3">
                {VOGUESTOCK_LEGAL_LINKS.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div
          data-reveal="fade"
          className="grid grid-cols-1 gap-6 border-b border-white/15 py-8 text-sm leading-relaxed text-gray-300 md:grid-cols-2"
        >
          <p>
            <strong className="font-semibold text-white">Voguestock:</strong> Vogue Commercial Co. Ltd. · SEBI Reg.
            INZ000277536 (NSE, BSE) · NSDL IN-DP-119-2015 · MF ARN 166877 · IRDAI CA0190.
          </p>
          <p>
            <strong className="font-semibold text-white">Valura.Ai:</strong> Valura India IFSC Limited, an IFSCA-regulated
            broker-dealer at GIFT City · GIFT SEZ, GIFT City, Gandhinagar, Gujarat 382355, India · assets custodied in
            GIFT City, India.
          </p>
        </div>

        <div data-reveal="fade" className="space-y-3 py-8 text-xs leading-relaxed text-gray-400 sm:text-[13px]">
          <p className="text-sm font-semibold text-white">{RISK_LINE}</p>
          <p>
            Global investing carries additional currency, country and regulatory risks. Structured products carry the
            credit risk of the issuing bank. Coupon and return figures are indicative and not guaranteed. Overseas
            investments are made under the RBI Liberalised Remittance Scheme (LRS), subject to limits and tax. Voguestock
            powered by Valura.Ai is a distribution partnership; this page is informational and not investment advice.
            Brokerage and statutory charges apply.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 border-t border-white/15 pt-6 text-sm text-gray-400 sm:flex-row sm:justify-between">
          <p className="text-center sm:text-left">© {year} Vogue Commercial Co. Ltd., in partnership with Valura.Ai.</p>
          <MotionToggle />
        </div>
      </div>

      <div
        aria-hidden="true"
        data-reveal="rise"
        className="pointer-events-none relative z-10 mt-12 mb-[-40px] flex w-full justify-center px-4 select-none"
      >
        <img src={wordmark} alt="" width={1713} height={181} loading="lazy" decoding="async" className="h-auto w-full max-w-[1800px]" />
      </div>
    </footer>
  );
}
