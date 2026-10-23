import { useState } from 'react';
import { config } from '../../shared/config';

export function Ineligible() {
  return (
    <section className="card center">
      <h1>Thank you for your interest</h1>
      <p>
        This survey is only for Nigerian women aged 18 and above, so we can’t include your answers this time.
        We really appreciate you stopping by.
      </p>
      <p className="muted">You’re welcome to share the survey with Nigerian women you know.</p>
    </section>
  );
}

export function ThankYou({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const link = `${window.location.origin}/survey?ref=${code}`;
  const message = `Hi! I just took part in a short, anonymous survey about women's healthcare experiences in Nigeria by ${config.org}. It takes about 8–10 minutes: ${link}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('Copy your link:', link);
    }
  };

  return (
    <div className="stack">
      <section className="card center">
        <div className="big">💚</div>
        <h1>Thank you for sharing your experience</h1>
        <p>Your response has been recorded. It will help make healthcare better for Nigerian women.</p>
      </section>
      <section className="card gift">
        <h2>🎁 Invite other women, win {config.gift}</h2>
        <p>
          Share your personal link with Nigerian women aged 18+. Each one who completes the survey is a valid referral.
          The person with the most valid referrals wins.
        </p>
        <div className="linkbox">
          <input readOnly value={link} onFocus={(e) => e.currentTarget.select()} aria-label="Your referral link" />
          <button className="btn primary" onClick={copy}>{copied ? 'Copied ✓' : 'Copy link'}</button>
        </div>
        <div className="row">
          <a className="btn" href={`https://wa.me/?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer">Share on WhatsApp</a>
          <a className="btn" href={`mailto:?subject=${encodeURIComponent('Healthcare experiences survey')}&body=${encodeURIComponent(message)}`}>Share by email</a>
        </div>
        <p className="muted small">Your referral code: <strong>{code}</strong>. Keep it safe. Your link stays available on this device.</p>
      </section>
    </div>
  );
}
