import { useCallback, useEffect, useRef, useState, type CSSProperties, type FocusEvent, type KeyboardEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import imgStocks from '../assets/media/invest-stocks.webp';
import imgFunds from '../assets/media/invest-funds.webp';
import imgBonds from '../assets/media/invest-bonds.webp';
import imgStructured from '../assets/media/invest-structured.webp';
import imgPreIpo from '../assets/media/invest-preipo.webp';
import imgPortfolios from '../assets/media/invest-portfolios.webp';
import iconStocks from '../assets/icons/stocks.webp';
import iconFunds from '../assets/icons/funds.webp';
import iconBonds from '../assets/icons/bonds.webp';
import iconStructured from '../assets/icons/structured.webp';
import iconCoin from '../assets/icons/coin.webp';
import iconBarGraph from '../assets/icons/bar-graph.svg';
import ScrollReveal from './ui/ScrollReveal';
import { SIGNUP_URL } from '../config';
import { useInView, useLoopZone, useMotionPaused, useMotionSpeed, usePageVisible } from '../lib/motion';

interface Holding {
  id: string;
  title: string;
  desc: string;
  tag: string;
  image: string;
  width: number;
  height: number;
  icon: string;
  imagePos?: string;
}

// The live landing's six "What you can hold" cards.
const HOLDINGS: Holding[] = [
  {
    id: 'stocks',
    title: 'Global Stocks & ETFs',
    desc: 'Own Apple, Nvidia, Microsoft and thousands more across 90+ global markets, in fractions, from a few dollars.',
    tag: 'Fractional',
    image: imgStocks,
    width: 519,
    height: 548,
    icon: iconStocks,
  },
  {
    id: 'funds',
    title: 'Global Mutual Funds',
    desc: 'Funds from global fund managers, held in the same account.',
    tag: 'Diversified',
    image: imgFunds,
    width: 588,
    height: 573,
    icon: iconFunds,
  },
  {
    id: 'bonds',
    title: 'Bonds & Fixed Income',
    desc: 'Earn dollar income from global bonds, fractional, from just $1,000.',
    tag: 'From $1,000',
    image: imgBonds,
    width: 900,
    height: 711,
    icon: iconBonds,
  },
  {
    id: 'structured',
    title: 'Structured Income',
    desc: 'Notes issued by A-rated global banks. Coupons are indicative, disclosed per issue and not assured. Capital is at risk.',
    tag: 'Indicative coupons*',
    image: imgStructured,
    width: 590,
    height: 816,
    icon: iconStructured,
    imagePos: 'object-top',
  },
  {
    id: 'preipo',
    title: 'Pre-IPO & Unlisted',
    desc: 'Back private companies early, before they go public.',
    tag: 'From $10,000',
    image: imgPreIpo,
    width: 720,
    height: 640,
    icon: iconCoin,
  },
  {
    id: 'portfolios',
    title: 'Ready Portfolios',
    desc: 'Expert-built global baskets you buy in one tap, rebalanced for you, no stock-picking.',
    tag: 'One-tap',
    image: imgPortfolios,
    width: 720,
    height: 640,
    icon: iconBarGraph,
  },
];

const FOOTNOTE =
  "*Coupon rates are indicative, set at issuance and not guaranteed; structured products carry the issuer's credit risk. Availability and minimums vary by jurisdiction and suitability.";

const SLIDE_GAP = 24;
const DOT_SLOT = 22;
const AUTO_ADVANCE_MS = 4000;
const MANUAL_HOLD_MS = 6000;

const revealDelay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as CSSProperties;

export default function FeatureTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const holdUntilRef = useRef(0);
  const programmaticUntilRef = useRef(0);
  const loops = useLoopZone(sectionRef);
  const carouselInView = useInView(carouselRef, '0px');
  const pageVisible = usePageVisible();
  const motionPaused = useMotionPaused();
  const motionSpeed = useMotionSpeed();

  useEffect(() => {
    activeRef.current = activeTab;
  }, [activeTab]);

  const scrollCarouselTo = useCallback((index: number) => {
    const container = carouselRef.current;
    const slide = container?.children[index] as HTMLElement | undefined;
    const first = container?.children[0] as HTMLElement | undefined;
    if (!container || !slide || !first || container.offsetWidth === 0) return;
    programmaticUntilRef.current = Date.now() + 900;
    container.scrollTo({ left: slide.offsetLeft - first.offsetLeft, behavior: 'smooth' });
  }, []);

  // Auto-advance runs for every visitor. It waits while the carousel is off screen, the tab is hidden, animations are
  // paused, the visitor hovers or focuses the carousel, and for a few seconds after a manual swipe.
  const autoAdvance = carouselInView && pageVisible && !motionPaused && !hovered && !focused;
  useEffect(() => {
    if (!autoAdvance) return;
    const timer = window.setInterval(() => {
      if (Date.now() < holdUntilRef.current) return;
      const next = (activeRef.current + 1) % HOLDINGS.length;
      scrollCarouselTo(next);
      setActiveTab(next);
    }, Math.round(AUTO_ADVANCE_MS / motionSpeed));
    return () => window.clearInterval(timer);
  }, [autoAdvance, motionSpeed, scrollCarouselTo]);

  const handleCarouselScroll = () => {
    const container = carouselRef.current;
    const first = container?.children[0] as HTMLElement | undefined;
    if (!container || !first || first.offsetWidth === 0) return;
    if (Date.now() > programmaticUntilRef.current) holdUntilRef.current = Date.now() + MANUAL_HOLD_MS;
    const index = Math.round(container.scrollLeft / (first.offsetWidth + SLIDE_GAP));
    if (index !== activeRef.current && index >= 0 && index < HOLDINGS.length) setActiveTab(index);
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = HOLDINGS.length - 1;
    let next = index;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = index === last ? 0 : index + 1;
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = index === 0 ? last : index - 1;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = last;
    else return;
    event.preventDefault();
    setActiveTab(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section ref={sectionRef} data-loops={loops} className="border-t border-gray-100 bg-white py-20" id="invest">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end lg:mb-16">
          <div className="max-w-2xl">
            <p data-reveal className="eyebrow">
              What you can hold
            </p>
            <ScrollReveal
              as="h2"
              delay={80}
              containerClassName="mt-4 font-display text-4xl leading-tight font-medium text-brand-dark sm:text-5xl"
            >
              One account. The whole global market.
            </ScrollReveal>
          </div>
          <div data-reveal style={revealDelay(160)} className="flex-shrink-0">
            <a
              href={SIGNUP_URL}
              className="sheen group inline-flex items-center gap-2 rounded-xl bg-brand-dark px-8 py-3.5 font-sans text-sm font-bold text-white transition-colors duration-300 hover:bg-black"
            >
              Open an Account
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Desktop: vertical tabs with a crossfading panel */}
        <div data-reveal style={revealDelay(120)} className="hidden grid-cols-12 items-stretch gap-8 lg:grid">
          <div
            role="tablist"
            aria-label="What you can hold"
            aria-orientation="vertical"
            className="col-span-4 flex flex-col justify-center gap-3 font-sans"
          >
            {HOLDINGS.map((holding, index) => {
              const isActive = activeTab === index;
              return (
                <button
                  key={holding.id}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`holding-tab-${holding.id}`}
                  aria-selected={isActive}
                  aria-controls={`holding-panel-${holding.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveTab(index)}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                  className={`flex w-full items-center justify-between rounded-2xl px-6 py-4 text-left transition-colors duration-300 ${
                    isActive
                      ? 'bg-brand-orange text-brand-dark shadow-xl shadow-brand-orange/20'
                      : 'bg-brand-light text-brand-dark hover:bg-brand-peach'
                  }`}
                >
                  <span className="text-lg font-bold">{holding.title}</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-dark">
                    <ArrowRight
                      aria-hidden="true"
                      className={`h-5 w-5 transition-transform duration-500 ${isActive ? 'rotate-0' : '-rotate-45'}`}
                    />
                  </span>
                </button>
              );
            })}
          </div>

          <div className="col-span-8 grid">
            {HOLDINGS.map((holding, index) => {
              const isActive = activeTab === index;
              return (
                <div
                  key={holding.id}
                  role="tabpanel"
                  id={`holding-panel-${holding.id}`}
                  aria-labelledby={`holding-tab-${holding.id}`}
                  inert={!isActive}
                  tabIndex={isActive ? 0 : -1}
                  className={`col-start-1 row-start-1 flex flex-row items-center gap-8 rounded-3xl border border-gray-100 bg-brand-light p-10 transition-[opacity,translate] duration-500 ${
                    isActive ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
                  }`}
                >
                  <div className="h-[320px] w-[355px] flex-shrink-0 overflow-hidden rounded-2xl border border-gray-200/60 bg-white shadow-inner">
                    <div className={`h-full w-full ${isActive ? 'loop breathe' : ''}`}>
                      <img
                        src={holding.image}
                        alt=""
                        width={holding.width}
                        height={holding.height}
                        loading="lazy"
                        decoding="async"
                        className={`h-full w-full object-cover ${holding.imagePos ?? 'object-center'}`}
                      />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col items-start font-sans">
                    <img
                      src={holding.icon}
                      alt=""
                      width={48}
                      height={48}
                      loading="lazy"
                      decoding="async"
                      className={`mb-6 h-12 w-12 object-contain ${isActive ? 'loop bob' : ''}`}
                    />
                    <h3 className="mb-4 font-display text-3xl font-medium text-brand-dark">{holding.title}</h3>
                    <p className="mb-5 text-base leading-relaxed text-gray-600">{holding.desc}</p>
                    <span className="mb-8 inline-block rounded-full bg-brand-peach px-3.5 py-1 text-xs font-bold text-brand-orange-strong">
                      {holding.tag}
                    </span>
                    <a
                      href="#open"
                      className="sheen group inline-flex items-center gap-2 rounded-xl bg-brand-dark px-8 py-3 font-bold text-white transition-colors duration-300 hover:bg-black"
                    >
                      Contact us
                      <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile and tablet: swipe cards that advance on their own */}
        <div
          data-reveal
          style={revealDelay(120)}
          className="flex w-full flex-col items-center lg:hidden"
          onPointerEnter={(event) => {
            if (event.pointerType === 'mouse') setHovered(true);
          }}
          onPointerLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={handleBlur}
        >
          <div
            ref={carouselRef}
            onScroll={handleCarouselScroll}
            role="region"
            aria-roledescription="carousel"
            aria-label="What you can hold"
            tabIndex={0}
            className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {HOLDINGS.map((holding, index) => {
              const isActive = activeTab === index;
              return (
                <article
                  key={holding.id}
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${HOLDINGS.length}: ${holding.title}`}
                  className="w-full flex-shrink-0 snap-start"
                >
                  <div className="flex flex-col items-center gap-6 rounded-3xl border border-gray-100 bg-brand-light p-6">
                    <div className="h-[240px] w-full flex-shrink-0 overflow-hidden rounded-2xl border border-gray-200/60 bg-white shadow-inner">
                      <div className={`h-full w-full ${isActive ? 'loop breathe' : ''}`}>
                        <img
                          src={holding.image}
                          alt=""
                          width={holding.width}
                          height={holding.height}
                          loading="lazy"
                          decoding="async"
                          className={`h-full w-full object-cover ${holding.imagePos ?? 'object-center'}`}
                        />
                      </div>
                    </div>
                    <div className="flex w-full flex-col items-center text-center font-sans">
                      <img
                        src={holding.icon}
                        alt=""
                        width={48}
                        height={48}
                        loading="lazy"
                        decoding="async"
                        className={`mb-4 h-12 w-12 object-contain ${isActive ? 'loop bob' : ''}`}
                      />
                      <h3 className="mb-2 font-display text-2xl font-medium text-brand-dark">{holding.title}</h3>
                      <p className="mb-4 text-sm leading-relaxed text-gray-600">{holding.desc}</p>
                      <span className="mb-6 inline-block rounded-full bg-brand-peach px-3.5 py-1 text-xs font-bold text-brand-orange-strong">
                        {holding.tag}
                      </span>
                      <a
                        href="#open"
                        className="rounded-xl bg-brand-dark px-8 py-3 text-sm font-bold text-white transition-colors duration-300 hover:bg-black"
                      >
                        Contact us
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Dots with a pill that slides to the active card */}
          <div className="relative mt-4 flex">
            {HOLDINGS.map((holding, index) => (
              <button
                key={holding.id}
                type="button"
                onClick={() => {
                  holdUntilRef.current = Date.now() + MANUAL_HOLD_MS;
                  scrollCarouselTo(index);
                  setActiveTab(index);
                }}
                aria-label={`Show ${holding.title}`}
                aria-current={activeTab === index ? 'true' : undefined}
                className="flex h-8 items-center justify-center"
                style={{ width: DOT_SLOT }}
              >
                <span aria-hidden="true" className="block h-2.5 w-2.5 rounded-full bg-gray-300" />
              </button>
            ))}
            <span
              aria-hidden="true"
              data-carousel-pill
              className="pointer-events-none absolute top-1/2 left-[-1px] h-2.5 w-6 -translate-y-1/2 rounded-full bg-brand-orange transition-transform duration-500"
              style={{ transform: `translateX(${activeTab * DOT_SLOT}px)` }}
            />
          </div>
        </div>

        <p data-reveal="fade" className="mt-8 font-sans text-xs leading-relaxed text-gray-600 sm:text-[13px]">
          {FOOTNOTE}
        </p>
      </div>
    </section>
  );
}
