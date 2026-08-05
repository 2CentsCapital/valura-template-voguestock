import imgDecotration from '../assets/11b3731e16218062867e728585a431628fec35b0.svg';
import imgDollarOrange from '../assets/Dollar orange.png';
import imgImage1 from '../assets/Extras/Voguestock Dashboard.png';
import imgBarGraph from '../assets/Bar Graph 3D.svg';
import imgVector63 from '../assets/7476de50d99289ae76d8adfa82c6b36fe0873abe.svg';
import Velaris from './ui/velaris';
import SplitText from './ui/SplitText';

export default function Hero() {
  const bulletPoints = [
    { text: 'RBI & FEMA Compliant' },
    { text: 'Secure Global Investing' },
    { text: 'Start from $5,000' },
  ];

  const stats = [
    {
      value: 'Since 1995',
      title: 'Trusted Financial Expertise',
    },
    {
      value: '100,000+',
      title: 'Investors Served',
    },
    {
      value: '90+ Markets',
      title: 'Global Investment Access',
    },
    {
      value: 'From $5,000',
      title: 'Minimum Investment',
    },
  ];

  const renderSplitPhrase = (phrase: string) => {
    return phrase.split(' ').map((word, wIdx) => (
      <span key={wIdx} className="split-word inline-block whitespace-nowrap mr-[0.22em]">
        {word.split('').map((char, cIdx) => (
          <span key={cIdx} className="split-char inline-block">
            {char}
          </span>
        ))}
      </span>
    ));
  };

  return (
    <section id="hero" className="relative flex flex-col">
      {/* 1) UPPER LAYER: White Background Area */}
      <div className="bg-white pt-10 pb-32 sm:pb-48 relative z-10 overflow-hidden">
        {/* Background Graphic Lines */}
        <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[1800px] h-[700px] pointer-events-none opacity-80">
          <img src={imgDecotration} className="w-full h-full object-contain" alt="" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Title Content */}
          <div className="text-center max-w-4xl mx-auto mt-8">
            <SplitText
              tag="h1"
              className="text-4xl sm:text-6xl md:text-7xl font-display font-medium tracking-tight text-brand-dark leading-[1.1] relative"
              delay={18}
              duration={0.45}
              ease="power2.out"
              from={{ opacity: 0, y: 24 }}
              to={{ opacity: 1, y: 0 }}
            >
              {renderSplitPhrase("Invest Beyond Borders.")}

              <span className="split-node relative inline-block align-middle mx-2 w-[80px] sm:w-[140px] h-[1em] sm:h-[140px] sm:-my-6 sm:-ml-1 sm:mr-5">
                <img
                  src={imgBarGraph}
                  className="absolute sm:relative left-0 top-1/2 sm:top-0 -translate-y-1/2 sm:translate-y-0 w-[80px] sm:w-full h-[80px] sm:h-full object-contain transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:rotate-3 cursor-pointer drop-shadow-sm hover:drop-shadow-lg"
                  alt="Bar graph icon"
                />
              </span>

              {renderSplitPhrase("Build Global Wealth")}

              <span className="split-node relative inline-block align-middle mx-2 w-[54px] sm:w-[96px] h-[1em] sm:h-[96px] sm:-my-4 sm:mx-3">
                <img
                  src={imgDollarOrange}
                  className="absolute sm:relative left-0 top-1/2 sm:top-0 -translate-y-1/2 sm:translate-y-0 w-[54px] sm:w-full h-[54px] sm:h-full object-contain transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:-rotate-3 cursor-pointer drop-shadow-sm hover:drop-shadow-lg"
                  alt="Dollar orange icon"
                />
              </span>
              <br className="block sm:hidden" />
              {renderSplitPhrase("with Confidence.")}
            </SplitText>
          </div>

          <div className="text-center max-w-3xl mx-auto mt-6 text-gray-600 text-lg sm:text-xl font-sans">
            Access US stocks, ETFs, mutual funds, bonds, and more—all from a single account built for Indian investors. Fast onboarding, secure investing, and global opportunities in minutes.
          </div>

          {/* Button Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 font-sans">
            <a
              href="#open-account"
              className="w-full sm:w-auto px-10 py-4 text-center rounded-xl bg-brand-blue font-bold text-white hover:bg-brand-blue/95 hover:shadow-lg hover:shadow-brand-blue/15 transition-all duration-200"
            >
              Open Global Account
            </a>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto px-10 py-4 text-center rounded-xl bg-brand-light font-bold text-brand-dark hover:bg-brand-light/80 transition-all duration-200"
            >
              See How It Works
            </a>
          </div>

          {/* Feature List */}
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 mt-8 font-sans">
            {bulletPoints.map((point, index) => (
              <div key={index} className="flex items-center gap-2">
                <img src={imgVector63} className="w-5 h-5" alt="Check circle icon" />
                <span className="text-gray-600 font-medium text-base">{point.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2) MIDDLE LAYER: Popping Out Mockup Image */}
      <div className="relative z-30 -mt-16 sm:-mt-24 pointer-events-none flex justify-center">
        <div className="w-full flex justify-center px-4 overflow-hidden">
          <img
            src={imgImage1}
            className="w-full max-w-[1100px] h-auto block pointer-events-auto mx-auto"
            alt="Product Dashboard Mockup"
          />
        </div>
      </div>

      {/* 3) LOWER LAYER: Full-Width Dark Background */}
      <div className="bg-brand-dark w-full pt-44 sm:pt-72 pb-24 relative z-20 -mt-36 sm:-mt-64 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <Velaris 
            height="100%" 
            className="w-full h-full opacity-70" 
            bg="#0f172a" 
            colors={["#3b82f6", "#2563eb", "#0f172a", "#f97316"]}
            speed={3.5}
            grain={0.15}
          />
        </div>

        {/* Stats Bar Container */}
        <div className="max-w-[1088px] mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
          <div className="border border-white/10 rounded-2xl py-6 px-0 bg-white/[0.02] backdrop-blur-sm">
            <div className="grid grid-cols-2 lg:grid-cols-4 w-full mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`text-center flex flex-col items-center justify-center px-4 py-6 min-w-0 border-white/15
                    ${index % 2 === 0 ? 'border-r' : ''}
                    ${index < 2 ? 'border-b' : ''}
                    lg:border-b-0
                    ${index === 3 ? 'lg:border-r-0' : 'lg:border-r'}
                  `}
                >
                  <p className="font-display text-xl sm:text-2xl lg:text-[30px] font-semibold text-brand-orange tracking-tight mb-3 leading-tight text-center w-full whitespace-nowrap">
                    {stat.value}
                  </p>
                  <p className="font-sans text-white font-bold text-sm tracking-wide text-center w-full">
                    {stat.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
