import { useRef, type CSSProperties } from 'react';
import { Archive, Award, BadgeCheck, Building2, Globe } from 'lucide-react';
import ScrollReveal from './ui/ScrollReveal';
import { useLoopZone } from '../lib/motion';

// The live landing's "Regulation & registrations" card.
const REGISTRATIONS = [
  { icon: BadgeCheck, label: 'Voguestock: SEBI (NSE, BSE)', value: 'INZ000277536' },
  { icon: Archive, label: 'NSDL Depository', value: 'IN-DP-119-2015' },
  { icon: Globe, label: 'Valura.Ai: platform', value: 'IFSCA / GIFT City' },
  { icon: Building2, label: 'Custody', value: 'GIFT City, India' },
  { icon: Award, label: 'Recognition', value: 'GITEX · Money 20/20' },
];

// Highlights strip: every line repeats a registration from the live landing or a canonical Valura.Ai fact.
const HIGHLIGHTS = [
  'Voguestock: SEBI-registered stock broker (NSE, BSE)',
  'Voguestock: NSDL depository participant',
  'Valura.Ai: IFSCA-regulated broker-dealer at GIFT City',
  'Funded in rupees under the RBI Liberalised Remittance Scheme',
  '90+ global markets',
  '100,000+ instruments',
  'Fractional investing from $1',
];

const revealDelay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as CSSProperties;

export default function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const loops = useLoopZone(sectionRef);

  return (
    <section
      ref={sectionRef}
      data-loops={loops}
      className="overflow-hidden border-y border-gray-100 bg-white pt-20 sm:pt-24"
      id="trust"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p data-reveal className="eyebrow">
            Trust, in specifics
          </p>
          <ScrollReveal
            as="h2"
            delay={80}
            containerClassName="mt-4 font-display text-4xl leading-tight font-medium text-brand-dark sm:text-5xl"
          >
            Backed by a name India already trusts.
          </ScrollReveal>
        </div>

        <div className="mt-12 grid grid-cols-1 items-center gap-10 sm:mt-16 lg:grid-cols-12 lg:gap-14">
          <div className="space-y-5 font-sans text-base leading-relaxed text-gray-600 sm:text-lg lg:col-span-6">
            <p data-reveal>
              For three decades, Voguestock has been a <strong className="font-semibold text-brand-dark">SEBI-registered broker</strong> on
              the NSE and BSE and an NSDL depository participant. It&apos;s led by{' '}
              <strong className="font-semibold text-brand-dark">Gopal Krishna Agarwal</strong>, a chartered accountant, former{' '}
              <strong className="font-semibold text-brand-dark">National President of ANMI</strong> and independent director of{' '}
              <strong className="font-semibold text-brand-dark">BPCL</strong>, alongside{' '}
              <strong className="font-semibold text-brand-dark">B. S. Bisht</strong>, former Executive Director (Finance) of{' '}
              <strong className="font-semibold text-brand-dark">Power Finance Corporation</strong>.
            </p>
            <p data-reveal style={revealDelay(100)}>
              Your global assets are held in <strong className="font-semibold text-brand-dark">GIFT City, inside India</strong>, on
              Valura.Ai&apos;s IFSCA-regulated platform: segregated, never on anyone&apos;s balance sheet. Your money never leaves
              the country, and your LRS &amp; Schedule FA reports are prepared for you.
            </p>
          </div>

          <div
            data-reveal
            style={revealDelay(120)}
            className="rounded-3xl border border-gray-100 bg-brand-light p-6 font-sans shadow-sm sm:p-8 lg:col-span-6"
          >
            <h3 className="font-display text-xl font-medium text-brand-dark sm:text-2xl">Regulation &amp; registrations</h3>
            <dl className="mt-4 divide-y divide-gray-200">
              {REGISTRATIONS.map(({ icon: Icon, label, value }, index) => (
                <div
                  key={label}
                  data-reveal="fade"
                  style={revealDelay(220 + index * 70)}
                  className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                >
                  <dt className="flex items-center gap-3 text-sm text-gray-600 sm:text-base">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white text-brand-orange-strong shadow-sm">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    {label}
                  </dt>
                  <dd className="pl-12 text-base font-bold text-brand-dark sm:pl-0 sm:text-right">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Slow highlights marquee: pauses on hover, off screen and with the Pause animations toggle */}
      <div data-reveal="fade" className="mt-16 border-t border-gray-100 bg-brand-light py-5 sm:mt-20">
        <div className="marquee">
          <ul aria-label="Highlights" className="marquee-track loop">
            {[...HIGHLIGHTS, ...HIGHLIGHTS].map((item, index) => (
              <li
                key={`${item}-${index}`}
                aria-hidden={index >= HIGHLIGHTS.length ? true : undefined}
                className="flex items-center gap-3 px-6 font-sans text-sm font-semibold whitespace-nowrap text-gray-700"
              >
                <span aria-hidden="true" className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-orange" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
