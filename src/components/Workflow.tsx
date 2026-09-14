import { useRef, type CSSProperties } from 'react';
import { Info, Landmark, ReceiptText, Sparkles } from 'lucide-react';
import imgLaptop from '../assets/media/why-laptop.webp';
import OrbitingCirclesGlobeDemo from './ui/orbiting-circles-02';
import ScrollReveal from './ui/ScrollReveal';
import { useLoopZone } from '../lib/motion';

// The live landing's "Why" cards.
const WHY = [
  {
    icon: Landmark,
    title: 'Your money never leaves India',
    text: 'Held in GIFT City, inside the country: no offshore transfer, no foreign bank account, ever.',
    tint: 'bg-brand-peach text-brand-orange-strong',
  },
  {
    icon: ReceiptText,
    title: 'No US estate-tax shock',
    text: 'US estate tax can claim up to 40% of US holdings. The GIFT City structure shields residents & NRIs from it.',
    tint: 'bg-brand-dark text-brand-orange',
  },
  {
    icon: Sparkles,
    title: 'Set up in minutes',
    text: 'Paperless KYC, AI-assisted research and one clean dashboard for everything you own.',
    tint: 'bg-brand-peach text-brand-orange-strong',
  },
];

const revealDelay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as CSSProperties;

export default function Workflow() {
  const sectionRef = useRef<HTMLElement>(null);
  const loops = useLoopZone(sectionRef);

  return (
    <section ref={sectionRef} data-loops={loops} className="border-t border-gray-100 bg-white pt-16 pb-0 sm:pt-24" id="why">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl sm:mb-16">
          <ScrollReveal
            as="h2"
            containerClassName="font-display text-4xl leading-tight font-medium text-brand-dark sm:text-5xl"
          >
            Global investing, finally made simple.
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <figure
            data-reveal
            className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl border border-gray-200/60 bg-brand-light p-4 shadow-inner sm:p-8 lg:col-span-6"
          >
            <div data-reveal="zoom" style={revealDelay(100)} className="h-full w-full overflow-hidden rounded-2xl">
              <img
                src={imgLaptop}
                alt="Illustrative Voguestock powered by Valura.Ai dashboard on a laptop screen"
                width={800}
                height={450}
                loading="lazy"
                decoding="async"
                className="loop breathe h-full w-full object-cover"
              />
            </div>
            <figcaption
              data-reveal
              style={revealDelay(320)}
              className="absolute right-4 bottom-4 left-4 flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 font-sans shadow-xl sm:right-6 sm:bottom-6 sm:left-6 sm:gap-4 sm:p-5"
            >
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-peach text-brand-orange-strong sm:h-12 sm:w-12">
                <Info aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" />
              </span>
              <span>
                <span className="block text-[11px] font-semibold tracking-wider text-gray-600 uppercase sm:text-xs">
                  Illustrative only
                </span>
                <span className="block font-display text-base font-semibold text-brand-dark sm:text-xl">
                  Not investment advice.
                </span>
              </span>
            </figcaption>
          </figure>

          <ul className="flex flex-col gap-6 font-sans lg:col-span-6">
            {WHY.map(({ icon: Icon, title, text, tint }, index) => (
              <li key={title} data-reveal style={revealDelay(index * 110)}>
                <div className="lift flex flex-col items-start gap-5 rounded-3xl border border-gray-100 bg-brand-light p-6 sm:flex-row sm:gap-6">
                  <span className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${tint}`}>
                    <Icon aria-hidden="true" className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="mb-2 font-display text-xl font-medium text-brand-dark">{title}</h3>
                    <p className="text-sm leading-relaxed text-gray-600 sm:text-base">{text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div aria-hidden="true" data-reveal="fade" className="mt-20 -mx-4 w-[calc(100%+2rem)] sm:mx-0 sm:w-full">
          <OrbitingCirclesGlobeDemo />
        </div>
      </div>
    </section>
  );
}
