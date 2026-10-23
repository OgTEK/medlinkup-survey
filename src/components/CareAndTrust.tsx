import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";

interface Team {
  id: string;
  name: string;
  leader: string;
  href: string;
  image: string;
  signatureLight: string;
  signatureDark: string;
  signatureWidthDesktop: string;
  signatureWidthMobile: string;
  description: string;
  mobileDescription: string;
}

// EDIT YOUR TEAM CONTENT HERE
const teams: Team[] = [
  {
    id: "studio",
    name: "Studio",
    leader: "Abi Munslow",
    href: "/people#studio",
    image:
      "https://www.datocms-assets.com/219766/1788270813-abi_munslow_05.jpg?auto=format&w=400",
    signatureLight:
      "https://www.datocms-assets.com/219766/1787847963-abimunslow-w.svg",
    signatureDark:
      "https://www.datocms-assets.com/219766/1787847942-abimunslow.svg",
    signatureWidthDesktop: "60px",
    signatureWidthMobile: "74px",
    description:
      "Abi Munslow leads the Studio team with a people-first view of design, creating dynamic, collaborative places made to bring out the best in people.",
    mobileDescription:
      "Studio prides itself on vibrant, culture-led spaces that are shaped around the people who own and occupy them. Abi Munslow leads the team with a people-first view of design, creating dynamic, collaborative places made to bring out the best in people.",
  },
  {
    id: "tailored",
    name: "Tailored",
    leader: "Duncan Taylor",
    href: "/people#tailored",
    image:
      "https://www.datocms-assets.com/219766/1788270814-duncan_taylor_02.jpg?auto=format&w=400",
    signatureLight:
      "https://www.datocms-assets.com/219766/1788271586-duncantaylor-w.svg",
    signatureDark:
      "https://www.datocms-assets.com/219766/1788271616-duncantaylor.svg",
    signatureWidthDesktop: "100px",
    signatureWidthMobile: "124px",
    description:
      "Duncan Taylor leads the Tailored team with a focus on creating high-quality, flexible environments that hold their appeal and their value, over time.",
    mobileDescription:
      "Tailored consistently delivers skilful and precise design, at pace, on large-scale, complex projects. Duncan Taylor leads the Tailored team with a focus on creating high-quality, flexible environments that hold their appeal, and their value, over time.",
  },
  {
    id: "curate",
    name: "Curate",
    leader: "Liam Spencer",
    href: "/people#curate",
    image:
      "https://www.datocms-assets.com/219766/1788270575-liam_spencer_05.jpg?auto=format&w=400",
    signatureLight:
      "https://www.datocms-assets.com/219766/1787847842-liamspencer-w.svg",
    signatureDark:
      "https://www.datocms-assets.com/219766/1787847826-liamspencer.svg",
    signatureWidthDesktop: "175px",
    signatureWidthMobile: "217px",
    description:
      "Liam Spencer leads Curate, a team of designers, architects and furniture consultants drawn from globally renowned practices.",
    mobileDescription:
      "Curate sits between the strategic rigour of traditional architecture and the cost, pace, and certainty of modern D&B solutions. Not a compromise between the two. A position that draws on both. Liam Spencer leads his team of designers, architects and furniture consultants drawn from globally renowned practices.",
  },
  {
    id: "boutique",
    name: "Boutique",
    leader: "Trish Watson",
    href: "/people#boutique",
    image:
      "https://www.datocms-assets.com/219766/1788270578-trish_watson_03.jpg?auto=format&w=400",
    signatureLight:
      "https://www.datocms-assets.com/219766/1787761282-trishwatson-w.svg",
    signatureDark:
      "https://www.datocms-assets.com/219766/1787761297-trishwatson.svg",
    signatureWidthDesktop: "100px",
    signatureWidthMobile: "124px",
    description:
      "Trish Watson leads the Boutique team on the highest shared standards: thoughtful, polished and highly ambitious.",
    mobileDescription:
      "Boutique is known for creating high-end spaces that balance elegance with timeless craft. Refined environments in some of London's most distinctive buildings. Trish Watson leads the team on the highest shared standards: thoughtful, polished and highly ambitious.",
  },
  {
    id: "anomaly",
    name: "Anomaly",
    leader: "Petr Esposito",
    href: "/people#anomaly",
    image:
      "https://www.datocms-assets.com/219766/1788270578-petr_esposito_06.jpg?auto=format&w=400",
    signatureLight:
      "https://www.datocms-assets.com/219766/1787761317-petrespacito-w.svg",
    signatureDark:
      "https://www.datocms-assets.com/219766/1787761322-petrespacito.svg",
    signatureWidthDesktop: "100px",
    signatureWidthMobile: "124px",
    description:
      "Petr Esposito leads the Anomaly team with a human-centred approach, creating places that balance heritage, user experience and long-term value.",
    mobileDescription:
      "Anomaly challenges traditional architecture, taking a holistic view that interconnects interiors and architecture processes. Petr Esposito leads the team with a human-centred approach, creating places that balance heritage, user experience and long-term value.",
  },
  {
    id: "inspire",
    name: "Inspire",
    leader: "Paul Gaffney",
    href: "/people#inspire",
    image:
      "https://www.datocms-assets.com/219766/1788270575-paul_gaffney_04.jpg?auto=format&w=400",
    signatureLight:
      "https://www.datocms-assets.com/219766/1787761356-paulgaffney-w.svg",
    signatureDark:
      "https://www.datocms-assets.com/219766/1787761361-paulgaffney.svg",
    signatureWidthDesktop: "100px",
    signatureWidthMobile: "124px",
    description:
      "Paul Gaffney leads the Inspire team with a focus on getting the fundamentals right: programme, cost, compliance and communication.",
    mobileDescription:
      "Inspire brings decades of experience leading complex schemes, offering clarity and control where it matters most. Paul Gaffney leads the team with a focus on getting the fundamentals right: programme, cost, compliance and communication.",
  },
];

const ArrowIcon = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 11 8"
    aria-hidden="true"
    className={className}
  >
    <path
      fill="currentColor"
      d="M11 4.007 6.887 8H4.545l3.482-3.2H0V3.215h8.027L4.529 0h2.342z"
    />
  </svg>
);

function TeamCard({ team }: { team: Team }) {
  return (
    <a href={team.href} className="block h-full">
      <div className="h-full">
        {/* Desktop card */}
        <div className="team-card team-card--desktop group/team-card relative hidden aspect-332/442 overflow-hidden rounded-[2px] bg-warm-black lg:block">
          <picture className="absolute inset-0 h-full w-full object-cover site-image cover">
            <img
              src={team.image}
              alt={`${team.name} team led by ${team.leader}`}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </picture>

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0) 100%)",
            }}
          />

          <div className="absolute inset-0 bg-warm-black/20 opacity-0 transition-opacity duration-300 ease-[cubic-bezier(0.54,0.01,0.31,0.99)] group-hover/team-card:opacity-100" />

          <div className="absolute inset-x-0 bottom-[24px] z-10 px-[24px]">
            <h3 className="max-w-[198px] marist-h8 text-warm-white">
              <span>{team.name}</span>
              <span className="h8 text-warm-white">
                {" "}by
                <br />
                <span className="whitespace-nowrap">{team.leader}</span>
              </span>
            </h3>

            <div className="signature-container mt-[13px]">
              <div className="site-image normal">
                <img
                  src={team.signatureLight}
                  alt=""
                  loading="lazy"
                  className="h-auto max-w-full brightness-0 invert"
                  style={{ width: team.signatureWidthDesktop }}
                />
              </div>
            </div>

            <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.54,0.01,0.31,0.99)] group-hover/team-card:grid-rows-[1fr]">
              <div className="overflow-hidden">
                <div className="translate-y-full pt-[13px] pb-[0.3em] opacity-0 transition-all duration-300 ease-[cubic-bezier(0.54,0.01,0.31,0.99)] group-hover/team-card:translate-y-0 group-hover/team-card:opacity-100">
                  <div className="wysiwyg wysiwyg-module__b8MwUq__wysiwyg body-small text-warm-white">
                    <p>{team.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile card */}
        <div className="team-card team-card--mobile relative h-full rounded-[2px] bg-cream/40 pt-[16px] pr-[16px] pb-[24px] pl-[17px] lg:hidden">
          <div className="small-arrow-container absolute top-[30px] right-[16px] h-[8px] w-[11px] text-warm-black">
            <ArrowIcon className="h-full w-full" />
          </div>

          <div className="top mb-4 flex gap-[17px]">
            <div className="image-container relative aspect-70/101 min-h-[101px] w-[30%] min-w-[70px] shrink-0 overflow-hidden rounded-[2px]">
              <picture className="absolute inset-0 h-full w-full object-cover site-image cover">
                <img
                  src={team.image}
                  alt={`${team.name} team`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </picture>
            </div>

            <div className="titles-container mt-2">
              <h3 className="max-w-[198px] marist-h8 text-warm-black">
                <span className="text-[23px]">{team.name} </span>
                <span className="h8 text-warm-black">
                  by
                  <br />
                  <span className="whitespace-nowrap">{team.leader}</span>
                </span>
              </h3>

              <div className="signature-container mt-[13px]">
                <div className="site-image normal">
                  <img
                    src={team.signatureDark}
                    alt=""
                    loading="lazy"
                    className="h-auto max-w-full"
                    style={{ width: team.signatureWidthMobile }}
                  />
                </div>
              </div>
            </div>
          </div>

          <span className="divider-line mb-4 block h-px w-full bg-[rgb(32_34_26/10%)]" />

          <div className="bottom body-small tracking-[-0.0175rem]">
            <div className="wysiwyg wysiwyg-module__b8MwUq__wysiwyg">
              <p>{team.mobileDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

export const CardsTeamSection: React.FC = () => {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const updateControls = (instance: SwiperInstance) => {
    setIsBeginning(instance.isBeginning);
    setIsEnd(instance.isEnd);
  };

  return (
    <section
      className="bg-warm-white block-padding cards-team-block"
      style={{
        "--block-pt-mob": "98px",
        "--block-pb-mob": "64px",
        "--block-pt-des": "124px",
        "--block-pb-des": "124px",
      } as React.CSSProperties}
    >
      {/* Section heading and introduction */}
      <div className="title-and-description-container mb-[40px] lg:mb-[52px]">
        <div className="container site-grid">
          <div className="col-span-full lg:col-span-6 xl:col-span-15">
            <div className="title-container mb-8">
              <span className="inline-block h3 whitespace-pre-line cap-trim split-up">
                Your health deserves 
                <br />
                thoughtful care.
              </span>
            </div>
          </div>

          <div className="col-span-full lg:col-span-6 xl:col-span-9">
            <div className="description-container mb-4">
              <div className="wysiwyg wysiwyg-module__b8MwUq__wysiwyg body section-copy">
                <p>
                  Trust starts with knowing who is providing your care. We’re engaging healthcare professionals as we develop MedLinkup. Before joining the platform, participating professionals will undergo professional registration and credential checks.
                  <br /><br />Your health information deserves the same level of care. We’re building MedLinkup with privacy and security in mind, guided by the Nigeria Data Protection Act 2023 and other applicable requirements.
                  <br /><br />You’ll be informed about how your information is collected, used and shared. Access to your medical history will be controlled, with your consent sought where required and any disclosures handled in accordance with applicable law.

                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section >
  );
};

export default CardsTeamSection;