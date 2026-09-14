import { useId, useState, type CSSProperties } from 'react';
import { Plus } from 'lucide-react';
import ScrollReveal from './ui/ScrollReveal';

interface FaqItem {
  question: string;
  answer: string;
}

// The first five are the live landing's FAQs; the last four cover account opening, TCS, withdrawals and fees.
const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Does my money actually leave India?',
    answer:
      "No, and that's the point. Your funds move through India's GIFT City financial hub and are held there with regulated custodians. No offshore transfer, no foreign bank account, full Indian oversight.",
  },
  {
    question: 'What can I invest in?',
    answer:
      'Global stocks and ETFs across 90+ global markets, international mutual funds, global bonds, structured income notes and pre-IPO opportunities, all from one account.',
  },
  {
    question: 'How much do I need to start?',
    answer:
      "Less than you'd think. Stocks are fractional from $1, fixed income starts at $1,000 and pre-IPO from $10,000, a fraction of traditional private-wealth minimums.",
  },
  {
    question: 'What about tax and paperwork?',
    answer:
      "We do the heavy lifting. Your LRS usage, Schedule FA and capital-gains statements are generated for you, ready to hand to your CA. Investing abroad is under the RBI's Liberalised Remittance Scheme.",
  },
  {
    question: 'Who is Valura.Ai?',
    answer:
      'Valura.Ai is a global-investment platform, recognised at GITEX Global and Money 20/20. Valura India IFSC Limited is an IFSCA-regulated broker-dealer at GIFT City. Voguestock brings it to you, backed by 30 years of trust with Indian investors.',
  },
  {
    question: 'How do I open an account?',
    answer:
      'Tap Open an Account or download the Valura.Ai app, then complete the paperless KYC with your PAN and Aadhaar. Prefer to talk first? Leave your details below and a Voguestock specialist will call you.',
  },
  {
    question: 'Is TCS charged when I add funds?',
    answer:
      "Resident Indians can invest up to $250,000 abroad each financial year under the RBI's Liberalised Remittance Scheme (LRS). Tax collected at source (TCS) can apply to these remittances, depending on the amount and the tax rules in force. TCS is not a final tax: it can be claimed against your income-tax liability when you file your return. Speak to your tax adviser about your own situation.",
  },
  {
    question: 'How do withdrawals work?',
    answer:
      'Sell your holdings and request a withdrawal from your account. Money is paid out after the trade settles and the transfer is processed. Timelines and any charges are disclosed at onboarding.',
  },
  {
    question: 'What are the fees?',
    answer:
      'Brokerage, currency conversion and any other charges are disclosed at onboarding, before you invest. Statutory charges and taxes apply.',
  },
];

const revealDelay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as CSSProperties;

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section className="border-t border-gray-100 bg-white py-20 sm:py-24" id="faq">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center sm:mb-16">
          <p data-reveal className="eyebrow">
            Good to know
          </p>
          <ScrollReveal
            as="h2"
            delay={80}
            containerClassName="mt-4 font-display text-4xl leading-tight font-medium text-brand-dark sm:text-5xl"
          >
            Questions, answered simply.
          </ScrollReveal>
        </div>

        <div className="font-sans">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            const buttonId = `${baseId}-question-${index}`;
            const panelId = `${baseId}-answer-${index}`;
            return (
              <div
                key={item.question}
                data-reveal
                style={revealDelay(Math.min(index, 4) * 60)}
                className="border-b border-gray-200 py-5 sm:py-6"
              >
                <h3 className="font-sans">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="group flex w-full items-center justify-between gap-4 rounded-lg text-left"
                  >
                    <span className="text-lg font-bold text-brand-dark transition-colors duration-300 group-hover:text-brand-orange-strong sm:text-2xl">
                      {item.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border-2 transition-[rotate,background-color,border-color,color] duration-500 ${
                        isOpen
                          ? 'rotate-45 border-brand-orange bg-brand-orange text-brand-dark'
                          : 'border-gray-300 text-gray-600 group-hover:border-brand-orange'
                      }`}
                    >
                      <Plus className="h-5 w-5" />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows] duration-500 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <p
                      className={`max-w-3xl pt-4 text-base leading-relaxed text-gray-600 transition-[opacity,translate] duration-500 sm:text-lg ${
                        isOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
                      }`}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
