import { useState } from 'react';
import imgImageVogueValura from '../assets/8031102d74e861e4f467bdbc26bef475860e4231.png';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Invest Global', href: '#hero' },
    { label: 'Why Valura', href: '#why-valura' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Open Account', href: '#open-account' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#" className="flex items-center">
              <img
                src={imgImageVogueValura}
                alt="Valura Logo"
                className="h-9 w-auto object-contain"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 font-sans text-sm font-semibold">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-500 hover:text-brand-dark transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#signup"
              className="px-6 py-2.5 rounded-xl border border-gray-200 font-sans text-sm font-bold text-brand-dark hover:bg-gray-50 transition-all duration-200"
            >
              Sign Up
            </a>
            <a
              href="#signin"
              className="px-6 py-2.5 rounded-xl bg-brand-orange font-sans text-sm font-bold text-white hover:bg-brand-orange/95 hover:shadow-lg hover:shadow-brand-orange/10 transition-all duration-200"
            >
              Sign In
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-brand-dark hover:bg-gray-100 focus:outline-none transition-colors"
              aria-label="Toggle Menu"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-fadeIn">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 font-sans font-semibold">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base text-gray-500 hover:text-brand-dark hover:bg-gray-50 transition"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 pb-2 border-t border-gray-100 flex flex-col space-y-2 px-3">
              <a
                href="#signup"
                className="w-full text-center py-2.5 rounded-xl border border-gray-200 font-sans font-bold text-brand-dark hover:bg-gray-50 transition"
              >
                Sign Up
              </a>
              <a
                href="#signin"
                className="w-full text-center py-2.5 rounded-xl bg-brand-orange font-sans font-bold text-white hover:bg-brand-orange/95 transition"
              >
                Sign In
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
