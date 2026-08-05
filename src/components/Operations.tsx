import DomeGallery from './DomeGallery';

export default function Operations() {

  return (
    <section className="bg-white py-12 sm:py-24 border-t border-gray-100" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-display font-medium text-brand-dark leading-tight">
            Everything You Need to Invest Globally
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-8 sm:mb-16">
          {/* Box 1 (Left large: Integrations Showcase) */}
          <div className="lg:col-span-7 bg-brand-light rounded-3xl p-8 sm:p-12 flex flex-col items-start justify-center gap-8 border border-gray-100 overflow-hidden relative">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-purple/5 rounded-full blur-[80px] pointer-events-none" />

            {/* Left Content info */}
            <div className="w-full font-sans relative z-10">
              <p className="text-gray-500 text-lg sm:text-xl leading-relaxed mb-8">
                Invest smarter with a platform designed to simplify international investing while keeping your portfolio secure, transparent, and easy to manage.
              </p>
              <a
                href="#features"
                className="inline-block px-8 py-3.5 rounded-xl bg-brand-dark font-bold text-white hover:bg-brand-dark/95 transition duration-200"
              >
                Explore Features
              </a>
            </div>

            {/* Right Graphic: DomeGallery */}
            <div className="w-[calc(100%+62px)] -mx-[31px] lg:w-full lg:mx-0 relative h-[283px] overflow-hidden mt-4 bg-transparent">
              <DomeGallery 
                fit={0.8} 
                fitBasis="height" 
                minRadius={450}
                grayscale={false} 
                imageBorderRadius="12px" 
                openedImageBorderRadius="16px"
                overlayBlurColor="#f5f6f7"
              />
            </div>
          </div>

          {/* Right side boxes (Stacked on mobile, side-by-side or stacked on lg) */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            {/* Box 1: Simple Onboarding */}
            <div className="bg-brand-light rounded-3xl p-6 border border-gray-100 flex flex-col justify-center flex-1">
              <h4 className="text-xl font-display font-medium text-brand-dark mb-2">
                Simple Onboarding
              </h4>
              <p className="font-sans text-gray-500 font-medium text-sm">
                Open your account digitally with minimal paperwork.
              </p>
            </div>

            {/* Box 2: Portfolio Tracking */}
            <div className="bg-brand-blue rounded-3xl p-6 text-white relative overflow-hidden flex-1 flex flex-col justify-center">
              <h4 className="text-xl font-display font-medium mb-2">
                Portfolio Tracking
              </h4>
              <p className="font-sans text-white/80 font-medium text-sm">
                Monitor every investment from one unified dashboard.
              </p>
            </div>
            
            {/* Box 3: Smart Insights */}
            <div className="bg-brand-light rounded-3xl p-6 border border-gray-100 flex flex-col justify-center flex-1">
              <h4 className="text-xl font-display font-medium text-brand-dark mb-2">
                Smart Insights
              </h4>
              <p className="font-sans text-gray-500 font-medium text-sm">
                Receive actionable market updates and portfolio analytics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
