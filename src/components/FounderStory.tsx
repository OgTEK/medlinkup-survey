import React from 'react';
import { Quote } from 'lucide-react';
import { useScrollReveal } from '../utils/useScrollReveal';
import Founder from "../assets/images/founder_praise_portrait_1792157460184.png";


export const FounderStory: React.FC = () => {
  const containerRef = useScrollReveal<HTMLDivElement>('.founder-fade-up', 0.1);

  return (
    <section
      id="our-story"
      ref={containerRef}
      className="py-24 sm:py-32 bg-stone-100/50 border-b border-stone-200/70"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Editorial Section Index */}
        <div className="flex items-center gap-3 mb-6 text-xs font-semibold tracking-widest text-teal-800 uppercase">
          <span>Why I'm building MedLinkup.</span>
          <span className="w-8 h-px bg-stone-300"></span>
          {/* <span className="text-stone-500 font-normal">Origins & Conviction</span> */}
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Portrait & Pentagram Editorial Bio */}
          <div className="lg:col-span-5 founder-fade-up">
            <div className="rounded-lg overflow-hidden border border-stone-200 shadow-[0_4px_24px_rgba(0,0,0,0.04)] bg-white sticky top-28">
              <img
                src={Founder}
                alt="Praise David-Oku, Founder of MedLinkup"
                className="w-full h-auto object-cover aspect-[3/4]"
                referrerPolicy="no-referrer"
              />
              {/* <div className="p-6 border-t border-stone-100 bg-white">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-semibold text-stone-900">Praise David-Oku</h3>
                  <span className="text-xs font-mono text-teal-800">Founder</span>
                </div>
                <div className="text-xs text-stone-500 mb-4">
                  MedLinkup · Lagos, Nigeria
                </div>
                <div className="pt-4 border-t border-stone-100 text-xs text-stone-600 leading-relaxed space-y-1.5">
                  <p>
                    <strong className="text-stone-800 font-medium">Academic Background:</strong> Human Kinetics and Health Education
                  </p>
                  <p>
                    <strong className="text-stone-800 font-medium">Experience:</strong> 4+ years in digital product & user experience design
                  </p>
                </div>
              </div> */}
            </div>
          </div>

          {/* Right Column: Founder's Personal Essay */}
          <div className="lg:col-span-7 founder-fade-up space-y-6">
            {/* <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-stone-900 leading-tight mb-4">
                Why I'm building MedLinkup.
              </h2>
            </div> */}

            <div className="space-y-5 text-base sm:text-lg text-stone-700 font-normal leading-relaxed">
              {/* <p>
                One Sunday, a friend of mine developed severe leg pain and could barely walk. Finding an available orthopaedic specialist was far more difficult than I expected.
              </p>
              <p>
                I kept wondering: why should finding the right healthcare professional be this hard when someone needs help?
              </p>
              <p>
                My first idea was a platform that connected patients with doctors, hospitals, laboratories and pharmacies.
              </p>
              <p className="p-4 bg-white rounded-md border border-stone-200/80 text-stone-800 italic font-editorial">
                "But the more I explored healthcare experiences, the more I realised that finding a doctor was only part of the problem."
              </p> */}

              {/* The pivotal clinical questions */}
              {/* <div className="p-6 bg-white rounded-lg border border-stone-200 space-y-3">
                <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider block">
                  The Questions That Changed Everything
                </span>
                <ul className="space-y-2.5 text-sm sm:text-base text-stone-800">
                  <li className="flex items-start gap-2.5">
                    <span className="text-teal-600 font-bold">·</span>
                    <span>What happens after the consultation?</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-teal-600 font-bold">·</span>
                    <span>Who helps you navigate tests, referrals and follow-up appointments?</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-teal-600 font-bold">·</span>
                    <span>What happens when you need another specialist? How does your health history support the next professional you see?</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-teal-600 font-bold">·</span>
                    <span>And who helps you understand what comes next?</span>
                  </li>
                </ul>
              </div> */}
              <p>
                MedLinkup began with a simple question: why is finding the right healthcare professional so difficult when someone needs help?

                After experiencing the challenges of navigating healthcare, I realised that connecting patients with doctors is only the beginning. <br /> People also need support with tests, referrals, follow-up appointments, and understanding what comes next.

                With a background in Human Kinetics and Health Education and over four years of experience in digital product and UX design, I'm building MedLinkup to make healthcare easier to navigate.
                <br /> <br />
                We're starting with women's healthcare, with a broader vision of helping people access the right care, make informed decisions, and feel supported throughout their health journeys.
              </p>
              {/* 
              <p>
                These questions became even more meaningful as I reflected on my own experiences navigating healthcare.
              </p>
              <p>
                I studied Human Kinetics and Health Education, and I've spent more than four years working in digital product and user experience design.
              </p>
              <p>
                MedLinkup brings those two parts of my background together: an interest in people's health, and a belief that thoughtful design can make difficult experiences easier to navigate.
              </p>
              <p>
                We're starting with women's healthcare, but the vision is bigger.
              </p>
              <p>
                I want to help build a future where people can access appropriate healthcare, understand their options, and feel supported throughout their health journeys.
              </p> */}
              <p className="text-xl sm:text-2xl font-light text-stone-900 pt-3 leading-snug border-t border-stone-200">
                Because healthcare should be more than a series of disconnected appointments.
              </p>
            </div>

            <div className="pt-6 border-t border-stone-200 flex items-center justify-between">
              <div>
                <div className="text-base font-semibold text-stone-900">Praise David-Oku</div>
                <div className="text-xs text-stone-500">Founder, MedLinkup</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
