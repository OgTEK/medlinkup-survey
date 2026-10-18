import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenEarlyAccess: () => void;
  onOpenResearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEarlyAccess, onOpenResearch }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-stone-50/95 backdrop-blur-md border-b border-stone-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] py-3'
          : 'bg-transparent py-5 border-b border-stone-200/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark in clean display face */}
        <a
          href="#"
          className="group flex items-center gap-2 text-stone-900 tracking-tight font-semibold text-xl whitespace-nowrap shrink-0 select-none"
        >
          <span>MedLinkup</span>
          <span className="w-1.5 h-1.5 rounded-full bg-teal-600 inline-block transition-transform duration-200 group-hover:scale-125"></span>
        </a>

        {/* Zone 2: 4-5 single-line clean navigation links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-600">
          <button
            onClick={() => scrollToSection('why-medlinkup')}
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Why MedLinkup
          </button>
          <button
            onClick={() => scrollToSection('our-approach')}
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Our Approach
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('our-story')}
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Our Story
          </button>
          <button
            onClick={() => {
              onOpenResearch();
            }}
            className="hover:text-teal-700 transition-colors whitespace-nowrap shrink-0 py-1 flex items-center gap-1 text-teal-800"
          >
            <span>Research</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenEarlyAccess}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-teal-700 hover:bg-teal-800 rounded-md transition-colors shadow-sm whitespace-nowrap shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600"
          >
            Get Early Access
          </button>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-700 hover:text-stone-900 focus:outline-none"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-50 border-b border-stone-200 px-6 py-6 shadow-xl animate-in fade-in duration-200">
          <div className="flex flex-col gap-4 text-sm font-medium text-stone-800">
            <button
              onClick={() => scrollToSection('why-medlinkup')}
              className="text-left py-2 border-b border-stone-100 hover:text-teal-700"
            >
              Why MedLinkup
            </button>
            <button
              onClick={() => scrollToSection('our-approach')}
              className="text-left py-2 border-b border-stone-100 hover:text-teal-700"
            >
              Our Approach
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-left py-2 border-b border-stone-100 hover:text-teal-700"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('our-story')}
              className="text-left py-2 border-b border-stone-100 hover:text-teal-700"
            >
              Our Story
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResearch();
              }}
              className="text-left py-2 text-teal-700 font-semibold flex items-center justify-between"
            >
              <span>Take Healthcare Research Survey</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEarlyAccess();
              }}
              className="mt-2 w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-center text-white bg-teal-700 hover:bg-teal-800 rounded-md shadow-sm"
            >
              Get Early Access
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
