import { useState } from 'react';
import imgVector20 from '../assets/fcaead313fe4a72535b991c71fc7bca7930932ad.svg';
import imgVector21 from '../assets/e0aa74652f11e37baaecc060096fd1148cce88c9.svg';
import imgVector63 from '../assets/7476de50d99289ae76d8adfa82c6b36fe0873abe.svg';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export default function Faq() {
  const [openItem, setOpenItem] = useState<number | null>(0); // First item open by default

  const faqItems: FaqItem[] = [
    {
      id: 0,
      question: 'Is my money invested outside India legally?',
      answer: 'Yes. Investments are facilitated through compliant channels under applicable RBI and FEMA guidelines.',
    },
    {
      id: 1,
      question: 'What can I invest in?',
      answer: 'You can access global stocks, ETFs, mutual funds, bonds, structured products, and more.',
    },
    {
      id: 2,
      question: 'How much do I need to start?',
      answer: 'You can begin your global investment journey with investments starting from $5,000.',
    },
    {
      id: 3,
      question: 'Is the onboarding process online?',
      answer: 'Yes. Complete your application digitally with a simple and secure verification process.',
    },
    {
      id: 4,
      question: 'How do I track my investments?',
      answer: 'Monitor your complete portfolio, performance, and holdings from a single dashboard.',
    },
  ];

  const ctaBenefits = [
    'Access Global Markets',
    'Secure & Compliant Platform',
    'Expert Investment Support',
    'Unified Portfolio Dashboard',
  ];

  const handleToggle = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section className="bg-white py-24 border-t border-gray-100" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-display font-medium text-brand-dark leading-tight">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-6 font-sans">
          {faqItems.map((item) => {
            const isOpen = openItem === item.id;
            return (
              <div
                key={item.id}
                className="border-b border-gray-200 pb-6 transition-all duration-300"
              >
                <button
                  onClick={() => handleToggle(item.id)}
                  className="w-full flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className="text-xl sm:text-2xl font-bold text-brand-dark group-hover:text-brand-blue transition-colors duration-200">
                    {item.question}
                  </span>
                  <div className="flex-shrink-0 ml-4">
                    {isOpen ? (
                      <img src={imgVector20} className="w-8 h-8 object-contain" alt="Close" />
                    ) : (
                      <img src={imgVector21} className="w-8 h-8 object-contain" alt="Open" />
                    )}
                  </div>
                </button>

                {/* Answer Content */}
                <div
                  className={`mt-4 overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  <p className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-3xl">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-brand-light rounded-3xl p-8 sm:p-16 flex flex-col md:flex-row items-center justify-between gap-12 border border-gray-100 shadow-sm relative overflow-hidden">
          {/* Subtle glow decoration */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/5 rounded-full blur-[80px] pointer-events-none" />

          {/* Left Text */}
          <div className="w-full md:w-1/2 font-sans relative z-10 text-left">
            <span className="text-brand-orange font-bold text-sm tracking-wider uppercase mb-4 block">
              Start Investing Today
            </span>
            <h4 className="text-3xl sm:text-4xl font-display font-medium text-brand-dark leading-tight mb-4">
              Your Gateway to Global Markets Starts Here
            </h4>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              Join thousands of investors accessing international opportunities through a secure, transparent, and easy-to-use investment platform.
            </p>
            <a
              href="#open-account"
              className="inline-block w-full sm:w-auto px-8 py-4 text-center rounded-xl bg-brand-orange font-bold text-white hover:bg-brand-orange/95 hover:shadow-lg transition-all duration-200"
            >
              Open Global Account
            </a>
          </div>

          {/* Right Benefits List */}
          <div className="w-full md:w-1/2 flex flex-col gap-4 font-sans relative z-10">
            {ctaBenefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <img src={imgVector63} className="w-5 h-5 flex-shrink-0" alt="Check circle icon" />
                <span className="text-brand-dark font-medium text-base">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
