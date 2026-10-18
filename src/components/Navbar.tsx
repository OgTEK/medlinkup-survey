import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { EarlyAccessModal } from "./EarlyAccessModal";

interface NavbarProps {
  onOpenEarlyAccess: () => void;
  onOpenResearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenEarlyAccess,
  onOpenResearch,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const [contactOpen, setContactOpen] = useState(false);
  const [earlyAccessOpen, setEarlyAccessOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300 h-48px">
      {/* Outer Dock Wrapper to handle width changes */}
      <div
        data-menu-panel="true"
        className={`h-[46px] pointer-events-auto overflow-hidden rounded-2xl bg-white text-stone-900 border border-stone-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out ${
          mobileMenuOpen
            ? "w-full max-w-sm h-auto"
            : "w-full max-w-[180px] lg:max-w-4xl h-11"
        }`}
      >
        {/* Main Nav Bar Content */}
        <div className="flex h-11 shrink-0 items-center justify-between pl-4 pr-2">
          {/* Zone 1: Logo Wordmark Match */}
          <a
            href="#"
            aria-label="MedLinkup — home"
            className="relative inline-flex shrink-0 items-center py-[2px] text-stone-900 font-semibold tracking-tight text-sm select-none group"
          >
            <span>MedLinkup</span>
            <span className="w-1 h-1 ml-0.5 rounded-full bg-teal-600 inline-block transition-transform duration-200 group-hover:scale-125"></span>
          </a>

          {/* Zone 2: Navigation Links (Desktop - Expanded Context) */}
          <nav className="hidden lg:flex items-center gap-6 text-[13px] font-medium text-stone-500">
            <button
              onClick={() => scrollToSection("why-medlinkup")}
              className="hover:text-stone-900 transition-colors py-1 cursor-pointer"
            >
              Why Us
            </button>
            <button
              onClick={() => scrollToSection("our-approach")}
              className="hover:text-stone-900 transition-colors py-1 cursor-pointer"
            >
              Approach
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="hover:text-stone-900 transition-colors py-1 cursor-pointer"
            >
              Process
            </button>
            <button
              onClick={() => scrollToSection("our-story")}
              className="hover:text-stone-900 transition-colors py-1 cursor-pointer"
            >
              Story
            </button>
            <button
              onClick={onOpenResearch}
              className="hover:text-teal-700 transition-colors py-1 flex items-center gap-0.5 text-teal-600 font-medium"
            >
              <span>Research</span>
              <ArrowUpRight className="w-3 h-3 opacity-80" />
            </button>
          </nav>

          {/* Zone 3: CTA & Mobile Trigger */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setEarlyAccessOpen(true)}
              // onClick={() => setContactOpen(true)}

              className=" lg:inline-flex items-center justify-center h-7 px-3 text-[11px] font-medium tracking-wide text-white bg-teal-700 hover:bg-teal-800 rounded-[3px] transition-colors shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600"
            >
              Get Early Access
            </button>
            {/* <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} /> */}
            <EarlyAccessModal
              open={earlyAccessOpen}
              onClose={() => setEarlyAccessOpen(false)}
            />

            {/* Mobile menu toggle action */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-stone-500 hover:text-stone-900 focus:outline-none transition-colors"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Internal Content */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-100 bg-white px-4 py-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-3 text-xs font-medium text-stone-600">
              <button
                onClick={() => scrollToSection("why-medlinkup")}
                className="text-left py-1.5 hover:text-stone-900 transition-colors"
              >
                Why MedLinkup
              </button>
              <button
                onClick={() => scrollToSection("our-approach")}
                className="text-left py-1.5 hover:text-stone-900 transition-colors"
              >
                Our Approach
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-left py-1.5 hover:text-stone-900 transition-colors"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("our-story")}
                className="text-left py-1.5 hover:text-stone-900 transition-colors"
              >
                Our Story
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResearch();
                }}
                className="text-left py-1.5 text-teal-600 font-semibold flex items-center justify-between"
              >
                <span>Research Survey</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEarlyAccess();
                }}
                className="mt-1 w-full h-9 flex items-center justify-center text-center text-xs font-medium text-white bg-teal-700 hover:bg-teal-800 rounded-[3px] shadow-sm transition-colors"
              >
                Get Early Access
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
