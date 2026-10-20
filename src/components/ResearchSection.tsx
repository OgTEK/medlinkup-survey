import React from "react";
import { Clock, ShieldCheck, HeartHandshake } from "lucide-react";
import { useScrollReveal } from "../utils/useScrollReveal";
import { PillButton } from "./ui/PillButton";

/* -------------------------------------------------------------------------- */
/*  CONTENT — edit this section only                                          */
/* -------------------------------------------------------------------------- */

const EYEBROW = "Help us build MedLinkup";
const HEADLINE = ["Your healthcare", "experience matters."];

const LEAD =
  "Have you struggled to find the right doctor, understand your options, manage referrals, or figure out what to do after an appointment?";
const BODY =
  "We want to hear from you. We’re speaking with women across Nigeria to understand how they access healthcare, what challenges they face, and what would genuinely make their experiences better.";
const HIGHLIGHT =
  "Your insights will help us decide what to prioritise as we build MedLinkup.";

/** Small reassurance chips under the text */
const FACTS = [
  { icon: Clock, label: "Takes about 7 to 10 minutes" },
  { icon: HeartHandshake, label: "Completely voluntary" },
  { icon: ShieldCheck, label: "No medical history needed" },
];

const CTA_LABEL = "Take Our Healthcare Survey";
const PRIVACY_INTRO = "Survey takes about 7 to 10 minutes | Participation is voluntary & You don't need to provide your medical history. Please review our ";
const PRIVACY_LINK = "research privacy notice";
const PRIVACY_OUTRO = "before submitting your responses.";

/* Colours come from your existing theme variables */
const PANEL_BG = "var(--color-warm-black, #022524)";
const PANEL_TEXT = "var(--color-warm-white, #f7f1e9)";
const ACCENT = "var(--color-yellow, #ffe7a6)"; // highlight line + icons
const LINE = "rgba(247, 241, 233, 0.18)"; // dividers and chip borders
const MUTED = "rgba(247, 241, 233, 0.7)";

/* -------------------------------------------------------------------------- */
/*  COMPONENT                                                                 */
/* -------------------------------------------------------------------------- */

interface ResearchSectionProps {
  onOpenSurvey: () => void;
  onOpenPrivacyNotice: () => void;
}

export const ResearchSection: React.FC<ResearchSectionProps> = ({
  onOpenSurvey,
  onOpenPrivacyNotice,
}) => {
  const containerRef = useScrollReveal<HTMLDivElement>(".research-fade-up", 0.1);

  return (
    <section
      id="research"
      ref={containerRef as React.RefObject<HTMLElement>}
      className="bg-warm-white block-padding research-fade-up "
      style={
        {
          "--block-pt-mob": "64px",
          "--block-pb-mob": "64px",
          "--block-pt-des": "124px",
          "--block-pb-des": "124px",
        } as React.CSSProperties
      }
    >
      <div className="container">
        {/*
          The dark panel itself is NOT animated. Only the content inside it
          fades up. Previously the panel carried `research-fade-up`, so if the
          scroll-reveal hook hadn't fired (common on mobile, where the panel is
          very tall) the whole dark background stayed invisible.
        */}
        <div
          className="overflow-hidden rounded-[4px]"
          style={{
            backgroundColor: PANEL_BG,
            color: PANEL_TEXT,
            padding: "clamp(24px, 5vw, 64px)",
          }}
        >
          <div
            className="site-grid"
            style={{ rowGap: "clamp(32px, 5vw, 56px)" }}
          >
            {/* Left: eyebrow + headline */}
            <div className="col-span-full lg:col-span-6 xl:col-span-11 flex flex-col gap-8">
              <span
                className="inline-flex w-fit items-center small-text"
                style={{
                  border: `2px solid ${LINE}`,
                  borderRadius: 9999,
                  height: 24,
                  padding: "0 12px",
                }}
              >
                {EYEBROW}
              </span>

              <h2
                className="font-sans font-medium text-warm-white"
                style={{
                  fontSize: "clamp(36px, 22px + 4.2vw, 80px)",
                  lineHeight: 0.98,
                  letterSpacing: "-0.06em",
                }}
              >
                {HEADLINE.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
            </div>

            {/* Right: copy + CTA */}
            <div className="col-span-full flex flex-col gap-6 lg:col-span-6 lg:col-start-7 xl:col-span-12 xl:col-start-[13]">
              <p className="body-large" style={{ color: PANEL_TEXT }}>
                {LEAD}
              </p>
              <p className="body" style={{ color: MUTED }}>
                {BODY}
              </p>
              <p className="body" style={{ color: ACCENT }}>
                {HIGHLIGHT}
              </p>

              {/* <ul
                className="flex flex-wrap"
                style={{ gap: 8, marginTop: 8 }}
                aria-label="About the survey"
              >
                {FACTS.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="inline-flex items-center body-small"
                    style={{
                      gap: 8,
                      border: `2px solid ${LINE}`,
                      borderRadius: 9999,
                      padding: "6px 14px",
                    }}
                  >
                    <Icon size={16} color={ACCENT} aria-hidden="true" />
                    <span>{label}</span>
                  </li>
                ))}
              </ul> */}

              <div style={{ marginTop: 16 }}>
                <PillButton
                  label={CTA_LABEL}
                  variant="primary"
                  onClick={onOpenSurvey}
                />
              </div>
            </div>
          </div>

          {/* Footer: ethics & privacy note */}
          <div
            className="body-small"
            style={{
              marginTop: "clamp(32px, 5vw, 56px)",
              paddingTop: 24,
              borderTop: `1px solid ${LINE}`,
              color: MUTED,
              maxWidth: 640,
            }}
          >
            <p>
              {PRIVACY_INTRO}{" "}
              <button
                type="button"
                onClick={onOpenPrivacyNotice}
                className="link-line inline"
                style={{ display: "inline", color: PANEL_TEXT }}
              >
                {PRIVACY_LINK}
              </button>{" "}
              {PRIVACY_OUTRO}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};