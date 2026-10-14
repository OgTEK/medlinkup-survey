import { useState } from 'react';

export default function Landing({ onContinue }: { onContinue: () => void }) {
  const [accepted, setAccepted] = useState(false);
  const [typed, setTyped] = useState('');
  const ready = accepted && typed.trim().toLowerCase() === 'continue';

  return (
    <main className="card">
      <p className="eyebrow">Research survey · 8–10 minutes</p>
      <h1>Understanding Healthcare Experiences Among Nigerian Women</h1>

      <p className="lead">
        Have you ever needed medical attention, whether for a routine checkup, an illness, or an ongoing health concern?
      </p>
      <p>
        We want to understand what seeking healthcare is really like for Nigerian women, including what works well, what makes
        it difficult, and what could be improved. This independent research is being conducted by <strong>Medlinkup</strong> to
        better understand healthcare experiences and needs.
      </p>

      <div className="facts">
        <div>
          <b>Who can take part?</b>
          <span>Nigerian women aged 18 and above.</span>
        </div>
        <div>
          <b>How long?</b>
          <span>About 8–10 minutes. Skip optional questions or stop at any time.</span>
        </div>
        <div>
          <b>What we collect</b>
          <span>No name and no detailed medical history.</span>
        </div>
      </div>

      <p>
        Your responses will be used for research and may be reported in summarised form without identifying you. Thank you for
        sharing your experience.
      </p>

      <section className="gift">
        <h2>🎁 Refer other women, win a gift</h2>
        <p>
          When you finish, you'll get your own personal link. Share it with other Nigerian women. <strong>The person with the
          highest number of valid referrals wins a gift.</strong>
        </p>
      </section>

      <section className="terms" aria-labelledby="terms-h">
        <h2 id="terms-h">Terms &amp; conditions</h2>
        <ol>
          <li>The survey is open to Nigerian women aged 18 and above. Participation is voluntary and you may stop at any time.</li>
          <li>
            Your answers are anonymous. You may optionally leave a phone number or email at the end; it is used only to contact
            you about the gift and is stored separately from your answers.
          </li>
          <li>Responses are used for research and reported only in summarised form that does not identify you.</li>
          <li>
            <strong>A valid referral</strong> is a different eligible woman who opens your personal link and fully completes the
            survey. A referral does <em>not</em> count if it is you referring yourself, a second submission from the same
            device, a response completed in under one minute, or one that Medlinkup reasonably believes is fake, duplicated or
            made in bad faith.
          </li>
          <li>
            The participant with the highest number of valid referrals when the survey closes wins the gift. If there is a tie,
            the person who reached that number first wins. To receive the gift you must have left contact details.
          </li>
          <li>Medlinkup may disqualify any participant for suspected abuse. Medlinkup's decision on winners is final.</li>
          <li>You must not offer money or other rewards to anyone in exchange for completing the survey.</li>
        </ol>
      </section>

      <section className="consent">
        <label className="check">
          <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
          <span>I am a Nigerian woman aged 18+, I have read and accept the terms above.</span>
        </label>
        <label className="field">
          <span>Type <b>continue</b> to confirm</span>
          <input
            type="text"
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            placeholder="continue"
            autoComplete="off"
            autoCapitalize="none"
            onKeyDown={(e) => e.key === 'Enter' && ready && onContinue()}
          />
        </label>
        <button className="btn primary big" disabled={!ready} onClick={onContinue}>
          Start the survey →
        </button>
      </section>
    </main>
  );
}
