import React, { useState } from 'react';
import { Plus, Minus, Search, ArrowUpRight, HelpCircle } from 'lucide-react';
import { useScrollReveal } from '../utils/useScrollReveal';

interface FAQSectionProps {
  onOpenPrivacyNotice: () => void;
}

interface FAQItem {
  id: string;
  q: string;
  a: string;
  hasPrivacyLink?: boolean;
  category: 'Platform & Launch' | 'Clinical Care' | 'Privacy & Safety';
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenPrivacyNotice }) => {
  const containerRef = useScrollReveal<HTMLDivElement>('.faq-fade-up', 0.1);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs: FAQItem[] = [
    {
      id: 'faq-1',
      category: 'Platform & Launch',
      q: 'Is MedLinkup available now?',
      a: "Not yet. MedLinkup is in research and development. We're working on the experience and speaking with prospective users and healthcare professionals before launching services.",
    },
    {
      id: 'faq-2',
      category: 'Platform & Launch',
      q: 'Where will MedLinkup launch?',
      a: "We're starting with women in Nigeria. Our first launch locations haven't been decided yet. Join the early-access list and you'll hear first.",
    },
    {
      id: 'faq-3',
      category: 'Platform & Launch',
      q: 'Is MedLinkup free?',
      a: "Joining the early-access list and taking part in our research are free. Pricing for consultations, care programmes and other services hasn't been decided yet. We'll make costs clear before any booking or purchase becomes available.",
    },
    {
      id: 'faq-4',
      category: 'Clinical Care',
      q: 'Who are the healthcare professionals?',
      a: "We're in discussions with healthcare professionals as we develop MedLinkup. Every professional will go through a verification process before they're registered on the platform. We'll introduce the care team as services become available.",
    },
    {
      id: 'faq-5',
      category: 'Clinical Care',
      q: 'Will MedLinkup include mental health support?',
      a: "Yes. Where it's needed, mental health support is included in your care package. We'll share details as services become available.",
    },
    {
      id: 'faq-6',
      category: 'Privacy & Safety',
      q: 'Who can see my health information?',
      a: 'Nothing from your medical history is shared without your permission.',
      hasPrivacyLink: true,
    },
    {
      id: 'faq-7',
      category: 'Privacy & Safety',
      q: 'Do I need to share my medical history to take part in your research?',
      a: "No. You don't need to provide your medical history to take the survey.",
    },
    {
      id: 'faq-8',
      category: 'Privacy & Safety',
      q: 'Is MedLinkup for emergencies?',
      a: 'No. MedLinkup does not provide emergency care. In an emergency, go to the nearest hospital.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (item) =>
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleAccordion = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="faqs"
      ref={containerRef}
      className="py-24 sm:py-32 bg-stone-50 border-b border-stone-200/60"
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Editorial Section Index */}
        {/* <div className="flex items-center gap-3 mb-6 text-xs font-semibold tracking-widest text-teal-800 uppercase">
          <span>11. Frequently Asked Questions</span>
          <span className="w-8 h-px bg-stone-300"></span>
          <span className="text-stone-500 font-normal">Common Inquiries</span>
        </div> */}

        {/* Section Header */}
        <div className="faq-fade-up mb-10">
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-stone-900 leading-tight mb-4">
            Answers to your questions about MedLinkup.
          </h2>
          <p className="text-base sm:text-lg text-stone-600 font-normal leading-relaxed">
            Everything you need to know about our development stage, launch plans, data ethics, and clinical scope.
          </p>
        </div>

        {/* Search Input */}
        {/* <div className="faq-fade-up mb-10">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search frequently asked questions (e.g. emergency, launch, privacy)..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-stone-300 rounded-md text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700 transition-colors"
            />
          </div>
        </div> */}

        {/* Accordion List */}
<div className="faq-fade-up divide-y divide-stone-200 border-y border-stone-200">
  {filteredFaqs.length === 0 ? (
    <div className="py-12 text-center text-sm text-stone-500">
      No matching questions found for "{searchQuery}". Try searching for another topic or email our team.
    </div>
  ) : (
    filteredFaqs.map((faq, idx) => {
      const isOpen = openIndex === idx;
      return (
        <div key={faq.id} className="py-5 sm:py-6">
          <button
            onClick={() => toggleAccordion(idx)}
            className="group flex w-full cursor-pointer items-start justify-between gap-4 text-left focus:outline-none"
            aria-expanded={isOpen}
            aria-controls={`faq-answer-${faq.id}`}
            id={`faq-question-${faq.id}`}
          >
            <span className="text-base font-medium leading-snug text-stone-900 transition-colors group-hover:text-teal-800 sm:text-lg">
              {faq.q}
            </span>
            <span className="mt-0.5 shrink-0 rounded p-1 text-stone-400 group-hover:text-teal-700">
              {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </span>
          </button>

          {/* Animated answer — always mounted, animates grid-rows + opacity */}
          <div
            id={`faq-answer-${faq.id}`}
            role="region"
            aria-labelledby={`faq-question-${faq.id}`}
            className={`grid transition-all duration-300 ease-out ${
              isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="overflow-hidden">
              <div className="mt-3 pr-8 text-sm leading-relaxed text-stone-600 sm:text-base">
                <p>{faq.a}</p>
                {faq.hasPrivacyLink && (
                  <p className="mt-2">
                    <button
                      type="button"
                      onClick={onOpenPrivacyNotice}
                      className="inline-flex cursor-pointer items-center gap-1 font-medium text-teal-800 hover:underline"
                    >
                      <span>Review our complete research and health data privacy notice</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    })
  )}
</div>
      </div>
    </section>
  );
};
