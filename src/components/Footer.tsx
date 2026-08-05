import imgVogueLogo from '../assets/vogue-logo 1.svg';
import Velaris from './ui/velaris';

export default function Footer() {
  const companyLinks = [
    { label: 'About', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Partners', href: '#' },
    { label: 'Newsroom', href: '#' },
    { label: 'Contact', href: '#' },
  ];

  const investmentLinks = [
    { label: 'Global Stocks', href: '#' },
    { label: 'ETFs', href: '#' },
    { label: 'Mutual Funds', href: '#' },
    { label: 'Bonds', href: '#' },
    { label: 'Structured Products', href: '#' },
  ];

  const resourceLinks = [
    { label: 'Help Center', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'FAQs', href: '#' },
  ];

  return (
    <footer className="relative bg-brand-dark text-white pt-24 pb-8 overflow-hidden">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/15">
          {/* Left panel: Newsletter signup & Social links */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-10">
            <div className="font-sans max-w-md">
              <h3 className="text-3xl sm:text-4xl font-display font-medium mb-4">
                Stay Updated with Global Market Insights
              </h3>
              <p className="text-gray-400 text-base leading-relaxed mb-6">
                Receive investment news, market trends, and expert insights directly in your inbox.
              </p>

              {/* Form Input */}
              <form onSubmit={(e) => e.preventDefault()} className="relative w-full max-w-sm flex items-center">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full bg-white text-brand-dark px-6 py-4 rounded-full text-sm font-medium border-0 focus:outline-none pr-32 placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-4 bg-brand-dark text-white rounded-full font-bold text-sm hover:bg-brand-blue hover:shadow-lg transition-all duration-200"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Social Links */}
            <div>
              <span className="heading-jost text-xl font-semibold tracking-wide block mb-4 uppercase">
                Follow us on
              </span>
              <div className="flex flex-wrap items-center gap-6 text-gray-400 font-sans text-sm">
                {/* Facebook */}
                <a href="#facebook" className="group flex items-center gap-2 hover:text-white transition duration-200">
                  <svg className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                  <span className="sr-only">Facebook</span>
                </a>

                {/* Instagram */}
                <a href="#instagram" className="group flex items-center gap-2 hover:text-white transition duration-200">
                  <svg className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span className="sr-only">Instagram</span>
                </a>

                {/* Twitter / X */}
                <a href="#twitter" className="group flex items-center gap-2 hover:text-white transition duration-200">
                  <svg className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span className="sr-only">Twitter</span>
                </a>

                {/* LinkedIn */}
                <a href="#linkedin" className="group flex items-center gap-2 hover:text-white transition duration-200">
                  <svg className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="sr-only">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right panel: Categorized links */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-base font-sans">
            {/* Company */}
            <div>
              <span className="font-display font-medium text-lg text-white block mb-6">Company</span>
              <ul className="space-y-4">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition duration-200">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Investments */}
            <div>
              <span className="font-display font-medium text-lg text-white block mb-6">Investments</span>
              <ul className="space-y-4">
                {investmentLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition duration-200">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <span className="font-display font-medium text-lg text-white block mb-6">Resources</span>
              <ul className="space-y-4">
                {resourceLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition duration-200">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 text-center text-gray-500 font-sans text-sm">
          <p>© 2026. All rights reserved.</p>
        </div>
      </div>

      {/* Huge Watermark Graphic — fully visible below copyright */}
      <div className="w-full flex justify-center select-none pointer-events-none mt-12 px-4 mb-[-40px] relative z-10">
        <img src={imgVogueLogo} className="w-full max-w-[1800px] h-auto" alt="Voguestock Watermark" />
      </div>
    </footer>
  );
}
