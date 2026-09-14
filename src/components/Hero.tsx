import { CircleCheck } from 'lucide-react';
import imgDecoration from '../assets/decor/hero-blobs.svg';
import imgBarGraph from '../assets/icons/bar-graph.svg';
import imgCoin from '../assets/icons/coin.webp';
import dashboard1100 from '../assets/media/dashboard-1100.webp';
import dashboard1650 from '../assets/media/dashboard-1650.webp';
import dashboard2200 from '../assets/media/dashboard-2200.webp';
import Velaris from './ui/velaris';
import SplitText from './ui/SplitText';
import StoreButtons from './StoreButtons';
import { ILLUSTRATIVE_CAPTION, SIGNUP_URL } from '../config';

const CHIPS = ['SEBI-regulated since 1995', 'Your money stays in India', 'Fractional investing from $1'];

const STATS = [
  { value: 'Since 1995', label: 'Trusted by Indian investors' },
  { value: '100,000+', label: 'Stocks, funds & bonds to own' },
  { value: '90+ markets', label: 'Across global exchanges' },
  { value: 'From $1', label: 'No crore-sized minimums' },
];

const BAND_COLORS = ['#7a3510', '#a34d0e', '#1a120b', '#ef7e2e'];

function splitPhrase(phrase: string, extraClass = '') {
  return phrase.split(' ').map((word, wIdx) => (
    <span key={`${phrase}-${wIdx}`} className={`split-word mr-[0.22em] inline-block whitespace-nowrap ${extraClass}`}>
      {word.split('').map((char, cIdx) => (
        <span key={cIdx} className="split-char inline-block">
          {char}
        </span>
      ))}
    </span>
  ));
}

export default function Hero() {
  return (
    <section id="top" className="relative flex flex-col">
      {/* Upper layer: headline, CTAs and chips on white */}
      <div className="relative z-10 overflow-hidden bg-white pt-10 pb-32 sm:pb-48">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[80px] left-1/2 h-[700px] w-[1800px] -translate-x-1/2 opacity-80"
        >
          <img src={imgDecoration} className="h-full w-full object-contain" alt="" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mt-8 max-w-5xl text-center">
            <SplitText
              tag="h1"
              className="relative font-display text-4xl leading-[1.1] font-medium tracking-tight text-brand-dark sm:text-6xl lg:text-7xl"
              delay={18}
              duration={0.45}
              ease="power2.out"
              from={{ opacity: 0, y: 24 }}
              to={{ opacity: 1, y: 0 }}
            >
              <span className="sr-only">Invest in the whole world, without leaving India.</span>
              <span aria-hidden="true">
                {splitPhrase('Invest in the')}
                <span className="split-node relative mx-1 inline-block h-[1em] w-[60px] align-middle sm:-my-6 sm:mx-2 sm:h-[120px] sm:w-[132px]">
                  <img
                    src={imgBarGraph}
                    alt=""
                    width={132}
                    height={99}
                    className="absolute top-1/2 left-0 h-[60px] w-[60px] -translate-y-1/2 object-contain drop-shadow-sm transition-transform duration-300 hover:scale-110 sm:relative sm:top-0 sm:h-full sm:w-full sm:translate-y-0 sm:hover:-translate-y-2 sm:hover:rotate-3"
                  />
                </span>
                <br className="hidden sm:block" />
                {splitPhrase('whole world,', 'text-brand-orange-deep')}
                <span className="split-node relative mx-1 inline-block h-[1em] w-[46px] align-middle sm:-my-4 sm:mx-3 sm:h-[92px] sm:w-[92px]">
                  <img
                    src={imgCoin}
                    alt=""
                    width={92}
                    height={92}
                    className="absolute top-1/2 left-0 h-[46px] w-[46px] -translate-y-1/2 object-contain drop-shadow-sm transition-transform duration-300 hover:scale-110 sm:relative sm:top-0 sm:h-full sm:w-full sm:translate-y-0 sm:hover:-translate-y-2 sm:hover:-rotate-3"
                  />
                </span>
                <br className="hidden sm:block" />
                {splitPhrase('without leaving India.')}
              </span>
            </SplitText>
          </div>

          <p className="mx-auto mt-6 max-w-3xl text-center font-sans text-lg text-gray-600 sm:text-xl">
            From Apple and Nvidia to global funds, bonds and pre-IPO opportunities, all in one account. Regulated in
            India, your money held in GIFT City, open in minutes.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 font-sans sm:flex-row">
            <a
              href={SIGNUP_URL}
              className="w-full rounded-xl bg-brand-orange px-10 py-4 text-center font-bold text-brand-dark transition-all duration-200 hover:bg-brand-orange-soft hover:shadow-lg hover:shadow-brand-orange/20 sm:w-auto"
            >
              Open an Account
            </a>
            <a
              href="#how"
              className="w-full rounded-xl border border-gray-200 bg-brand-light px-10 py-4 text-center font-bold text-brand-dark transition-all duration-200 hover:bg-brand-peach sm:w-auto"
            >
              See how it works
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 font-sans">
            {CHIPS.map((chip) => (
              <li key={chip} className="flex items-center gap-2">
                <CircleCheck aria-hidden="true" className="h-5 w-5 text-brand-orange-strong" />
                <span className="text-base font-medium text-gray-700">{chip}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col items-center gap-3 font-sans">
            <p className="text-sm font-semibold text-gray-600">Prefer mobile? Get the Valura.Ai app</p>
            <StoreButtons className="justify-center" />
          </div>
        </div>
      </div>

      {/* Middle layer: dashboard mockup popping over the dark band */}
      <figure className="relative z-30 -mt-16 flex flex-col items-center px-4 sm:-mt-24">
        <img
          src={dashboard1100}
          srcSet={`${dashboard1100} 1100w, ${dashboard1650} 1650w, ${dashboard2200} 2200w`}
          sizes="(min-width: 1132px) 1100px, calc(100vw - 32px)"
          width={2200}
          height={1190}
          fetchPriority="high"
          decoding="async"
          alt="Illustrative Voguestock powered by Valura.Ai dashboard showing portfolio, marketplace, calendar and watchlist panels"
          className="mx-auto block h-auto w-full max-w-[1100px]"
        />
        {/* The mockup artwork has built-in shadow padding, so the caption is pulled up to sit under the visible edge */}
        <figcaption className="-mt-1 font-sans text-xs font-medium text-white/85 sm:-mt-8 sm:text-sm lg:-mt-12">
          {ILLUSTRATIVE_CAPTION}
        </figcaption>
      </figure>

      {/* Lower layer: dark band with stats */}
      <div className="on-dark relative z-20 -mt-36 w-full overflow-hidden bg-brand-night pt-44 pb-24 sm:-mt-64 sm:pt-72">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
          <Velaris height="100%" className="h-full w-full opacity-70" bg="#1a120b" colors={BAND_COLORS} speed={3.5} grain={0.15} />
        </div>

        <div className="relative z-30 mx-auto max-w-[1088px] px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-0 py-6 backdrop-blur-sm">
            <ul className="mx-auto grid w-full grid-cols-2 lg:grid-cols-4">
              {STATS.map((stat, index) => (
                <li
                  key={stat.label}
                  className={`flex min-w-0 flex-col items-center justify-center border-white/15 px-4 py-6 text-center ${
                    index % 2 === 0 ? 'border-r' : ''
                  } ${index < 2 ? 'border-b' : ''} lg:border-b-0 ${index === 3 ? 'lg:border-r-0' : 'lg:border-r'}`}
                >
                  <p className="mb-3 w-full font-display text-xl leading-tight font-semibold tracking-tight whitespace-nowrap text-brand-orange sm:text-2xl lg:text-[30px]">
                    {stat.value}
                  </p>
                  <p className="w-full font-sans text-sm font-bold tracking-wide text-white">{stat.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
