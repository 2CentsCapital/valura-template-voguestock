import imgImage1 from '../assets/Vid/voguestock.webp';
import OrbitingCirclesGlobeDemo from './ui/orbiting-circles-02';
import ScrollReveal from './ui/ScrollReveal';

export default function Workflow() {
  return (
    <section className="bg-white pt-12 sm:pt-24 pb-0 border-t border-gray-100" id="workflow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-3xl">
            <ScrollReveal
              as="h2"
              containerClassName="text-4xl sm:text-5xl font-display font-medium text-brand-dark leading-tight"
              enableBlur={true}
              baseOpacity={0.15}
              baseRotation={2}
              blurStrength={6}
            >
              Global Investing Made Simple
            </ScrollReveal>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left panel: Balance Chart visual */}
          <div className="lg:col-span-6 bg-brand-light rounded-3xl p-4 sm:p-8 border border-gray-200/50 shadow-inner relative flex justify-center items-center aspect-[4/3] overflow-hidden">
            {/* Main Showcase Image */}
            <img
              src={imgImage1}
              alt="Workflow Chart UI"
              className="w-full h-full object-cover rounded-2xl"
            />
            {/* Overlay card representing dashboard detail */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-white p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-100 flex items-center justify-between font-sans">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-orange/10 rounded-full flex items-center justify-center text-brand-orange flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] sm:text-xs font-semibold uppercase tracking-wider block">Balance</span>
                  <span className="text-brand-dark text-xl sm:text-2xl font-semibold font-display">$27,150</span>
                </div>
              </div>
              
              {/* Mini Doughnut Indicator */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 relative flex items-center justify-center flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="20" cy="20" r="15" className="sm:hidden" stroke="#f1f5f9" strokeWidth="3" fill="transparent" />
                  <circle cx="20" cy="20" r="15" className="sm:hidden" stroke="#e2562c" strokeWidth="3" fill="transparent" strokeDasharray="94" strokeDashoffset="28" />
                  <circle cx="24" cy="24" r="18" className="hidden sm:block" stroke="#f1f5f9" strokeWidth="4" fill="transparent" />
                  <circle cx="24" cy="24" r="18" className="hidden sm:block" stroke="#e2562c" strokeWidth="4" fill="transparent" strokeDasharray="113" strokeDashoffset="35" />
                </svg>
                <span className="absolute text-[9px] sm:text-[10px] font-bold text-brand-orange">70%</span>
              </div>
            </div>
          </div>

          {/* Right panel: Details stacked list */}
          <div className="lg:col-span-6 flex flex-col gap-6 font-sans">
            {/* Box A: One Account */}
            <div className="bg-brand-light rounded-3xl p-6 border border-gray-100 flex flex-col sm:flex-row items-start gap-6 hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 rounded-full bg-brand-purple/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[#584dc7]" viewBox="0 0 21 21" fill="none" stroke="currentColor" strokeWidth="1.5625" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.94792 15.3646H15.3646M5.98958 12.2396V9.11458M10.1563 12.2396V7.03125M14.3229 12.2396V4.94792M8.28125 19.5312H12.0313C15.156 19.5312 16.7184 19.5312 17.8137 18.7355C18.1674 18.4785 18.4785 18.1674 18.7355 17.8137C19.5312 16.7184 19.5312 15.156 19.5312 12.0313V8.28125C19.5312 5.15647 19.5312 3.59408 18.7355 2.49881C18.4785 2.14508 18.1674 1.83401 17.8137 1.57701C16.7184 0.78125 15.156 0.78125 12.0313 0.78125H8.28125C5.15647 0.78125 3.59408 0.78125 2.49881 1.57701C2.14508 1.83401 1.83401 2.14508 1.57701 2.49881C0.78125 3.59408 0.78125 5.15647 0.78125 8.28125V12.0313C0.78125 15.156 0.78125 16.7184 1.57701 17.8137C1.83401 18.1674 2.14508 18.4785 2.49881 18.7355C3.59408 19.5312 5.15647 19.5312 8.28125 19.5312Z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-display font-medium text-brand-dark mb-2">
                  One Account
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Access multiple global asset classes from one platform.
                </p>
              </div>
            </div>

            {/* Box B: Easy Funding */}
            <div className="bg-brand-light rounded-3xl p-6 border border-gray-100 flex flex-col sm:flex-row items-start gap-6 hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 rounded-full bg-brand-green/20 flex items-center justify-center flex-shrink-0 relative">
                <svg className="w-6 h-6 text-[#2b823b]" viewBox="0 0 21 20" fill="none" stroke="currentColor" strokeWidth="1.5625" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.86458 9.79004V14.9984M2.86458 9.79004C1.71399 9.79004 0.78125 10.7228 0.78125 11.8734V12.915C0.78125 14.0656 1.71399 14.9984 2.86458 14.9984M2.86458 9.79004C2.86458 8.82132 2.86458 8.33696 2.97106 7.93956C3.26002 6.86115 4.10236 6.01881 5.18077 5.72985C5.57817 5.62337 6.06253 5.62337 7.03125 5.62337H10.1562M2.86458 14.9984C2.86458 15.9671 2.86458 16.4515 2.97106 16.8488C3.26002 17.9273 4.10236 18.7696 5.18077 19.0586C5.57817 19.165 6.06253 19.165 7.03125 19.165H13.2813C14.25 19.165 14.7343 19.165 15.1317 19.0586C16.2101 18.7696 17.0525 17.9273 17.3414 16.8488C17.4479 16.4515 17.4479 15.9671 17.4479 14.9984M17.4479 9.79004V14.9984M17.4479 9.79004C18.5985 9.79004 19.5312 10.7228 19.5312 11.8734V12.915C19.5312 14.0656 18.5985 14.9984 17.4479 14.9984M17.4479 9.79004C17.4479 8.82132 17.4479 8.33696 17.3414 7.93956C17.0525 6.86115 16.2101 6.01881 15.1317 5.72985C14.7343 5.62337 14.25 5.62337 13.2813 5.62337H10.1562M13.2812 14.9984H7.03125M10.1562 5.62337V2.86458M10.1562 2.86458C10.7315 2.86458 11.1979 2.39821 11.1979 1.82292C11.1979 1.24762 10.7315 0.78125 10.1562 0.78125C9.58095 0.78125 9.11458 1.24762 9.11458 1.82292C9.11458 2.39821 9.58095 2.86458 10.1562 2.86458Z" />
                </svg>
                <svg className="w-3 h-3 absolute top-3 right-3 z-20 text-[#2b823b]" viewBox="0 0 8 3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.20833 1.30208C5.20833 0.582963 5.7913 0 6.51042 0C7.22954 0 7.8125 0.582963 7.8125 1.30208C7.8125 2.0212 7.22954 2.60417 6.51042 2.60417C5.7913 2.60417 5.20833 2.0212 5.20833 1.30208Z" />
                  <path d="M0 1.30208C0 0.582963 0.582963 0 1.30208 0C2.0212 0 2.60417 0.582963 2.60417 1.30208C2.60417 2.0212 2.0212 2.60417 1.30208 2.60417C0.582963 2.60417 0 2.0212 0 1.30208Z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-display font-medium text-brand-dark mb-2">
                  Easy Funding
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Fund your account securely through approved banking channels.
                </p>
              </div>
            </div>

            {/* Box C: Worldwide Access */}
            <div className="bg-brand-light rounded-3xl p-6 border border-gray-100 flex flex-col sm:flex-row items-start gap-6 hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 rounded-full bg-brand-blue/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-brand-blue" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-display font-medium text-brand-dark mb-2">
                  Worldwide Access
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Invest across international markets without leaving India.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Orbiting Integrations Globe */}
        <div className="mt-20 -mx-4 w-[calc(100%+2rem)] sm:mx-0 sm:w-full">
          <OrbitingCirclesGlobeDemo />
        </div>
      </div>
    </section>
  );
}
