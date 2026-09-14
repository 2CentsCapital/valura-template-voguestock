import type { CSSProperties } from 'react';
import { ArrowRight } from 'lucide-react';
import DomeGallery from './DomeGallery';
import StoreButtons from './StoreButtons';
import ScrollReveal from './ui/ScrollReveal';
import { LOGIN_URL } from '../config';

// The live landing's "How it works" steps.
const STEPS = [
  {
    title: 'Open your account',
    text: 'Finish a paperless KYC in minutes: residents, NRIs and foreign nationals welcome. No branch visit, no overseas forms.',
  },
  {
    title: 'Add funds',
    text: "Transfer through the regulated GIFT City route under the RBI's LRS. Your money stays custodied in India the whole way.",
  },
  {
    title: 'Start investing',
    text: 'Buy global stocks, funds, bonds, income notes and pre-IPO, and track it all in one place.',
  },
];

const revealDelay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as CSSProperties;

export default function Operations() {
  return (
    <section className="border-t border-gray-100 bg-white py-16 sm:py-24" id="how">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <p data-reveal className="eyebrow">
            How it works
          </p>
          <ScrollReveal
            as="h2"
            delay={80}
            containerClassName="mt-4 font-display text-4xl leading-tight font-medium text-brand-dark sm:text-5xl"
          >
            Go global in three steps.
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Ready when you are: the live landing's mid-page call to action */}
          <div
            data-reveal
            className="relative flex flex-col items-start justify-center gap-6 overflow-hidden rounded-3xl border border-gray-100 bg-brand-light p-8 sm:p-12 lg:col-span-7"
          >
            <div aria-hidden="true" className="pointer-events-none absolute top-0 right-0 h-80 w-80 rounded-full bg-brand-orange/10 blur-[80px]" />
            <div className="relative z-10 w-full font-sans">
              <p className="eyebrow">Ready when you are</p>
              <h3 className="mt-4 font-display text-3xl leading-tight font-medium text-brand-dark sm:text-4xl">
                Your global portfolio is minutes away.
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                Open a free account online, or download the app. Start from $1 in fractions, with your money held in
                India.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href={LOGIN_URL}
                  className="sheen group inline-flex items-center justify-center gap-2 rounded-xl bg-brand-dark px-8 py-3.5 font-bold text-white transition-colors duration-300 hover:bg-black"
                >
                  Sign In
                  <ArrowRight aria-hidden="true" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <StoreButtons />
              </div>
            </div>

            <div
              aria-hidden="true"
              className="relative -mx-8 mt-2 h-[260px] w-[calc(100%+4rem)] overflow-hidden sm:-mx-12 sm:w-[calc(100%+6rem)] lg:mx-0 lg:w-full"
            >
              <DomeGallery fit={0.8} fitBasis="height" minRadius={450} imageBorderRadius="16px" overlayBlurColor="#fff6ee" />
            </div>
          </div>

          <ol className="flex flex-col justify-between gap-6 lg:col-span-5">
            {STEPS.map((step, index) => {
              const highlighted = index === 1;
              return (
                <li key={step.title} data-reveal style={revealDelay(120 + index * 110)} className="flex flex-1">
                  <div
                    className={`lift flex flex-1 flex-col justify-center rounded-3xl border p-6 sm:p-8 ${
                      highlighted ? 'border-brand-orange bg-brand-orange' : 'border-gray-100 bg-brand-light'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`flex h-11 w-11 items-center justify-center rounded-xl font-display text-lg font-semibold ${
                        highlighted ? 'bg-brand-dark text-white' : 'bg-brand-orange text-brand-dark'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <h3 className="mt-4 mb-2 font-display text-xl font-medium text-brand-dark">
                      <span className="sr-only">Step {index + 1}: </span>
                      {step.title}
                    </h3>
                    <p
                      className={`font-sans text-sm leading-relaxed sm:text-base ${highlighted ? 'text-brand-dark' : 'text-gray-600'}`}
                    >
                      {step.text}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
