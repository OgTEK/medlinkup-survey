import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { EarlyAccessModal } from "./EarlyAccessModal";
import { PillButton } from "./ui/PillButton";

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
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300">
      <div
        data-menu-panel="true"
        className={`pointer-events-auto overflow-hidden border border-stone-200/80 bg-white text-stone-900 shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out ${
          mobileMenuOpen
            ? "h-auto w-full max-w-md rounded-2xl"
            : "h-14 w-full max-w-6xl rounded-full"
        }`}
      >
        {/* Main Navbar Content */}
        <div className="flex h-14 shrink-0 items-center justify-between gap-4 px-5">
          {/* Logo */}
          <a
            href="#"
            aria-label="MedLinkup home"
            className="group relative inline-flex shrink-0 select-none items-center text-sm font-semibold tracking-tight text-stone-900"
          >
            <span>MedLinkup</span>
            <span className="ml-0.5 inline-block h-1 w-1 rounded-full bg-teal-600 transition-transform duration-200 group-hover:scale-125" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-6 text-[13px] font-medium text-stone-500 lg:flex">
            <button
              type="button"
              onClick={() => scrollToSection("why-medlinkup")}
              className="cursor-pointer whitespace-nowrap py-1 transition-colors hover:text-stone-900"
            >
              Why Us
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("our-approach")}
              className="cursor-pointer whitespace-nowrap py-1 transition-colors hover:text-stone-900"
            >
              Approach
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("how-it-works")}
              className="cursor-pointer whitespace-nowrap py-1 transition-colors hover:text-stone-900"
            >
              Process
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("our-story")}
              className="cursor-pointer whitespace-nowrap py-1 transition-colors hover:text-stone-900"
            >
              Story
            </button>

            <button
              type="button"
              onClick={onOpenResearch}
              className="flex items-center gap-0.5 whitespace-nowrap py-1 font-medium text-teal-600 transition-colors hover:text-teal-700"
            >
              <span>Research</span>
              <ArrowUpRight className="h-3 w-3 opacity-80" />
            </button>
          </nav>

          {/* Desktop CTA and Mobile Menu Toggle */}
          <div className="flex shrink-0 items-center gap-3">
            <div className="hidden lg:block">
              <PillButton
                label="Get Early Access"
                variant="primary"
                onClick={() => setEarlyAccessOpen(true)}
              />
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-full p-2 text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 lg:hidden"
              aria-label={
                mobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="animate-in fade-in slide-in-from-top-2 border-t border-stone-100 bg-white px-5 py-5 duration-200 lg:hidden">
            <nav className="flex flex-col gap-3 text-sm font-medium text-stone-600">
              <button
                type="button"
                onClick={() => scrollToSection("why-medlinkup")}
                className="py-2 text-left transition-colors hover:text-stone-900"
              >
                Why MedLinkup
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("our-approach")}
                className="py-2 text-left transition-colors hover:text-stone-900"
              >
                Our Approach
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("how-it-works")}
                className="py-2 text-left transition-colors hover:text-stone-900"
              >
                How It Works
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("our-story")}
                className="py-2 text-left transition-colors hover:text-stone-900"
              >
                Our Story
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResearch();
                }}
                className="flex items-center justify-between py-2 font-semibold text-teal-600 transition-colors hover:text-teal-700"
              >
                <span>Research Survey</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>

              <div className="mt-2">
                <PillButton
                  label="Get Early Access"
                  variant="primary"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenEarlyAccess();
                  }}
                  className="w-full"
                />
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Early Access Modal */}
      <EarlyAccessModal
        open={earlyAccessOpen}
        onClose={() => setEarlyAccessOpen(false)}
      />
    </header>
  );
};
