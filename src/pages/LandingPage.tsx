/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar.tsx';
import { Hero } from '../components/Hero.tsx';
import { TheProblem } from '../components/TheProblem.tsx';
import { OurApproach } from '../components/OurApproach.tsx';
import { CarePathways } from '../components/CarePathways.tsx';
import  WhereWeAreStarting  from '../components/WhereWeAreStarting.tsx';
import { CareAndTrust } from '../components/CareAndTrust.tsx';
import { FounderStory } from '../components/FounderStory.tsx';
import { ResearchSection } from '../components/ResearchSection.tsx';
import { EarlyAccessSection } from '../components/EarlyAccessSection.tsx';
import { FAQSection } from '../components/FAQSection.tsx';
import { Footer } from '../components/Footer.tsx';
import { PrivacyNoticeModal } from '../components/PrivacyNoticeModal.tsx';
// import { SurveyPage } from '../survey/SurveyPage.tsx';
import Admin from './Admin.tsx';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Import } from 'lucide-react';
import CardsTeamSection from '../components/CardsTeamSection.tsx';
import JournalSection from '../components/JournalSelection.tsx';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export type PageRoute = 'home' | 'survey' | 'admin';

function getInitialRoute(): PageRoute {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const search = window.location.search.toLowerCase();

  if (path.includes('../admin') || hash === '#admin' || search.includes('view=admin')) {
    return 'admin';
  }
  if (path.includes('/survey') || hash === '#survey' || search.includes('view=survey')) {
    return 'survey';
  }
  return 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>(getInitialRoute);
  const [isPrivacyNoticeOpen, setIsPrivacyNoticeOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getInitialRoute());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (page: PageRoute, openInNewTab = false) => {
    const targetUrl = page === 'home' ? '/' : `/${page}`;

    if (openInNewTab) {
      try {
        const win = window.open(targetUrl, '_blank');
        // If window.open is blocked by browser or restricted by iframe sandbox
        if (!win || win.closed || typeof win.closed === 'undefined') {
          window.history.pushState({}, '', targetUrl);
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      } catch {
        // Fallback to internal navigation
        window.history.pushState({}, '', targetUrl);
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }

    window.history.pushState({}, '', targetUrl);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (currentPage === 'home') {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  const handleOpenEarlyAccess = () => {
    if (currentPage !== 'home') {
      navigateTo('home');
      setTimeout(() => {
        const el = document.getElementById('early-access');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    const el = document.getElementById('early-access');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  // Render standalone Survey Page
//   if (currentPage === 'survey') {
//     return <SurveyPage onBackToHome={() => navigateTo('home')} />;
//   }

  // Render standalone Admin Dashboard
//   if (currentPage === 'admin') {
//     return <Admin onBackToSite={() => navigateTo('home')} />;
//   }

  // Render Main MedLinkup Landing Page
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 selection:bg-teal-700 selection:text-white">
      {/* 3-Zone Top Bar Contract */}
      <Navbar
        onOpenEarlyAccess={handleOpenEarlyAccess}
        onOpenResearch={() => navigateTo('survey', true)}
      />

      <main>
        {/* 01. Hero */}
        <Hero
          onOpenEarlyAccess={handleOpenEarlyAccess}
          onOpenResearch={() => navigateTo('survey', true)}
        />

        <CardsTeamSection />

        {/* 02. The Problem */}
        <TheProblem />

        {/* 03. Our Approach */}
        {/* <OurApproach /> */}

        {/* 04. One Visit or Ongoing Support */}
        {/* <CarePathways /> */}

        {/* 05. Where We're Starting */}
        <WhereWeAreStarting />

        {/* 06. How MedLinkup Will Work */}
        {/* <HowItWorks /> */}

        <JournalSection />

        {/* 07. Building With Care and Trust */}
        <CareAndTrust
          onOpenPrivacyNotice={() => setIsPrivacyNoticeOpen(true)}
        />

        {/* 08. From The Founder */}
        <FounderStory />

        {/* 09. Help Us Build MedLinkup */}
        <ResearchSection
          onOpenSurvey={() => navigateTo('survey', true)}
          onOpenPrivacyNotice={() => setIsPrivacyNoticeOpen(true)}
        />

        {/* 10. Get Early Access */}
        {/* <EarlyAccessSection /> */}

        {/* 11. Frequently Asked Questions */}
        <FAQSection
          onOpenPrivacyNotice={() => setIsPrivacyNoticeOpen(true)}
        />
      </main>

      {/* 12. Footer */}
      <Footer
        // onOpenPrivacyNotice={() => setIsPrivacyNoticeOpen(true)}
        // onOpenResearch={() => navigateTo('survey', true)}
        // onOpenEarlyAccess={handleOpenEarlyAccess}
        // onOpenAdmin={() => navigateTo('admin', true)}
      />

      {/* Statutory Privacy Notice Modal */}
      <PrivacyNoticeModal
        isOpen={isPrivacyNoticeOpen}
        onClose={() => setIsPrivacyNoticeOpen(false)}
      />
    </div>
  );
}
