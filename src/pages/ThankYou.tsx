import { useState } from 'react';

export default function ThankYou({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const link = `${window.location.origin}/survey?ref=${code}`;
  const message = `I just shared my healthcare experience in a short survey by Medlinkup for Nigerian women (8–10 mins). Please take part too: ${link}`;

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
    <main className="card narrow">
      <p className="eyebrow">Response received</p>
      <h1>Thank you for sharing your experience 💛</h1>
      <p>Your answers will help us understand what works, what doesn't, and what could be improved for Nigerian women.</p>

      <section className="gift">
        <h2>🎁 Invite women, win a gift</h2>
        <p>
          Share your personal link with other Nigerian women (18+). The person with the most <strong>valid</strong> referrals
          wins a gift.
        </p>
        <div className="linkbox">
          <input readOnly value={link} onFocus={(e) => e.currentTarget.select()} aria-label="Your referral link" />
          <button className="btn primary" onClick={copy}>
            {copied ? 'Copied ✓' : 'Copy'}
          </button>
        </div>
        <div className="share">
          <a className="btn" href={`https://wa.me/?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer">
            Share on WhatsApp
          </a>
          <a className="btn" href={`sms:?&body=${encodeURIComponent(message)}`}>
            Send by SMS
          </a>
        </div>
        <p className="hint">
          Your code: <b>{code}</b>. Keep it safe. Remember to leave your contact details if you haven't, so we can reach you if you
          win.
        </p>
      </section>
    </main>
  );
}
