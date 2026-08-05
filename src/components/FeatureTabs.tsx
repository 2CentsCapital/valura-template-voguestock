import { useState, useRef, useEffect } from 'react';
import imgGlobalStocks from '../assets/Extras/Global Stocks.png';
import imgMutualFunds from '../assets/Extras/Mutual Funds.png';
import imgFixedIncome from '../assets/Extras/Fixed Income.jpg';
import imgStructuredProducts from '../assets/Extras/Stuctured Products.png';
import imgEllipse25 from '../assets/c0d5eda5ba281c2c9ad3dfb5e50bcfec2ba97bea.svg';
import imgGlobalStocksIcon from '../assets/global-stocks-icon.png';
import imgEtfIcon from '../assets/etf-icon.png';
import imgFixedIncomeIcon from '../assets/fixed-income-icon.png';
import imgStructuredProductsIcon from '../assets/structured-products-icon.png';
import ScrollReveal from './ui/ScrollReveal';

interface TabData {
  id: number;
  label: string;
  title: string;
  desc: string;
  image: string;
  iconBg: string;
  iconSrc: string;
  imagePos?: string;
}

export default function FeatureTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const tabs: TabData[] = [
    {
      id: 0,
      label: 'Global Stocks',
      title: 'Global Stocks',
      desc: 'Invest in leading companies listed across major global exchanges with seamless access.',
      image: imgGlobalStocks,
      iconBg: 'bg-[#405ae0]/15',
      iconSrc: imgGlobalStocksIcon,
      imagePos: 'object-center',
    },
    {
      id: 1,
      label: 'ETFs & Mutual Funds',
      title: 'ETFs & Mutual Funds',
      desc: 'Diversify your portfolio through professionally managed global investment funds.',
      image: imgMutualFunds,
      iconBg: 'bg-[#5cab6a]/15',
      iconSrc: imgEtfIcon,
      imagePos: 'object-center',
    },
    {
      id: 2,
      label: 'Fixed Income',
      title: 'Fixed Income',
      desc: 'Generate stable returns with international bonds and fixed-income opportunities.',
      image: imgFixedIncome,
      iconBg: 'bg-[#ffa97e]/15',
      iconSrc: imgFixedIncomeIcon,
      imagePos: 'object-center',
    },
    {
      id: 3,
      label: 'Structured Products',
      title: 'Structured Products',
      desc: 'Access professionally designed investment strategies tailored to different risk profiles.',
      image: imgStructuredProducts,
      iconBg: 'bg-[#b1a8ff]/15',
      iconSrc: imgStructuredProductsIcon,
      imagePos: 'object-top',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (containerRef.current && window.innerWidth < 1024) {
        setActiveTab((prev) => {
          const next = (prev + 1) % tabs.length;
          const width = containerRef.current!.offsetWidth;
          containerRef.current!.scrollTo({
            left: next * width,
            behavior: 'smooth',
          });
          return next;
        });
      }
    }, 3000); // 3 seconds delay

    return () => clearInterval(interval);
  }, [tabs.length]);

  const scrollToTab = (idx: number) => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      containerRef.current.scrollTo({
        left: idx * width,
        behavior: 'smooth',
      });
      setActiveTab(idx);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const width = container.offsetWidth;
    const newActive = Math.round(container.scrollLeft / width);
    if (newActive !== activeTab && newActive >= 0 && newActive < tabs.length) {
      setActiveTab(newActive);
    }
  };

  return (
    <section className="bg-white py-20 border-t border-gray-100" id="why-valura">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <ScrollReveal
              as="h2"
              containerClassName="text-4xl sm:text-5xl font-display font-medium text-brand-dark leading-tight"
              enableBlur={true}
              baseOpacity={0.15}
              baseRotation={2}
              blurStrength={6}
            >
              Access the World's Leading Investment Opportunities
            </ScrollReveal>
          </div>
          <div className="flex-shrink-0">
            <a
              href="#all-features"
              className="inline-block px-8 py-3.5 rounded-xl bg-brand-dark font-sans text-sm font-bold text-white hover:bg-brand-dark/95 transition duration-200"
            >
              View all features
            </a>
          </div>
        </div>

        {/* 1) Desktop View: Interactive Grid */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-stretch">
          {/* Tabs Navigation (Left) */}
          <div className="flex flex-col gap-4 font-sans justify-center col-span-4">
            {tabs.map((tab, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full text-left p-6 rounded-2xl flex items-center justify-between transition-all duration-300 ${
                    isActive
                      ? 'bg-brand-blue text-white shadow-xl shadow-brand-blue/15'
                      : 'bg-brand-light text-brand-dark hover:bg-brand-light/75'
                  }`}
                >
                  <span className="text-xl font-bold">{tab.label}</span>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      isActive ? 'bg-white text-brand-blue' : 'bg-white text-brand-dark'
                    }`}
                  >
                    <svg
                      className={`w-5 h-5 transition-transform duration-300 ${
                        isActive ? 'rotate-0' : '-rotate-45'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Tab Panel (Right) */}
          <div className="col-span-8 bg-brand-light rounded-3xl p-10 flex flex-row gap-8 items-center border border-gray-100">
            {/* Visual Graphic */}
            <div className="w-[355px] h-[320px] rounded-2xl overflow-hidden bg-white border border-gray-200/50 shadow-inner flex-shrink-0">
              <img
                src={tabs[activeTab].image}
                alt={tabs[activeTab].title}
                className={`w-full h-full object-cover ${tabs[activeTab].imagePos || 'object-center'} transition-all duration-500 hover:scale-105`}
              />
            </div>

            {/* Description Info */}
            <div className="w-1/2 flex flex-col items-start font-sans">
              {/* Icon Bubble */}
              <div className="mb-6 relative w-12 h-12 flex items-center justify-center">
                {tabs[activeTab].iconSrc.endsWith('.png') ? (
                  <img
                    src={tabs[activeTab].iconSrc}
                    className="w-12 h-12 relative z-10 object-contain"
                    alt=""
                  />
                ) : (
                  <>
                    <img src={imgEllipse25} className="absolute inset-0 w-full h-full" alt="" />
                    <img
                      src={tabs[activeTab].iconSrc}
                      className="w-5 h-5 relative z-10 brightness-0 text-brand-blue"
                      alt=""
                      style={{ filter: 'invert(31%) sepia(85%) saturate(1633%) hue-rotate(218deg) brightness(91%) contrast(92%)' }}
                    />
                  </>
                )}
              </div>

              {/* Title */}
              <h3 className="text-3xl font-display font-medium text-brand-dark mb-4">
                {tabs[activeTab].title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-base leading-relaxed mb-8">
                {tabs[activeTab].desc}
              </p>

              {/* CTA Button */}
              <a
                href="#get-started"
                className="px-8 py-3 rounded-xl bg-brand-dark font-bold text-white hover:bg-brand-dark/95 transition duration-200"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>

        {/* 2) Mobile View: Swipeable Carousel Card */}
        <div className="lg:hidden flex flex-col items-center w-full">
          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="w-full flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-6 pb-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {tabs.map((tab) => (
              <div key={tab.id} className="w-full flex-shrink-0 snap-start">
                <div className="bg-brand-light rounded-3xl p-6 flex flex-col gap-6 items-center border border-gray-100">
                  {/* Visual Graphic */}
                  <div className="w-full h-[240px] rounded-2xl overflow-hidden bg-white border border-gray-200/50 shadow-inner flex-shrink-0">
                    <img
                      src={tab.image}
                      alt={tab.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Description Info */}
                  <div className="w-full flex flex-col items-center text-center font-sans">
                    {/* Icon Bubble */}
                    <div className="mb-4 relative w-12 h-12 flex items-center justify-center">
                      <img
                        src={tab.iconSrc}
                        className="w-12 h-12 relative z-10 object-contain"
                        alt=""
                      />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-display font-medium text-brand-dark mb-2">
                      {tab.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                      {tab.desc}
                    </p>

                    {/* CTA Button */}
                    <a
                      href="#get-started"
                      className="px-8 py-3 rounded-xl bg-brand-dark font-bold text-white text-sm hover:bg-brand-dark/95 transition duration-200"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dot / Pill Indicators */}
          <div className="flex justify-center items-center gap-2.5 mt-6">
            {tabs.map((tab, idx) => (
              <button
                key={tab.id}
                onClick={() => scrollToTab(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeTab === idx ? 'w-8 bg-brand-blue' : 'w-2.5 bg-gray-200'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
