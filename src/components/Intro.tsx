import { useState } from 'react';
import { config } from '../../shared/config';

export default function Intro({ referred, onContinue }: { referred: boolean; onContinue: () => void }) {
  const [accepted, setAccepted] = useState(false);
  const [typed, setTyped] = useState('');
  const ready = accepted && typed.trim().toLowerCase() === 'continue';

  return (
    <div className="stack">
      <section className="card hero">
        {referred && <p className="pill">👋 A friend invited you to take part</p>}
        <h1>{config.title}</h1>
        <p className="lead">
          Have you ever needed medical attention, whether for a routine checkup, an illness, or an ongoing health concern?
        </p>
        <p>
          We want to understand what seeking healthcare is really like for Nigerian women, including what works well, what
          makes it difficult, and what could be improved.
        </p>
        <p>This independent research is being conducted by <strong>{config.org}</strong> to better understand healthcare experiences and needs.</p>

        <dl className="facts">
          <div><dt>Who can take part</dt><dd>Nigerian women aged 18 and above</dd></div>
          <div><dt>How long</dt><dd>About 8–10 minutes</dd></div>
          <div><dt>Your choice</dt><dd>Voluntary. Skip optional questions or stop at any time</dd></div>
          <div><dt>Privacy</dt><dd>We don’t need your name or detailed medical history</dd></div>
        </dl>

        <p>
          Your responses will be used for research and may be reported in summarized form without identifying you.
          Thank you for sharing your experience.
        </p>
      </section>

      <section className="card gift">
        <h2>🎁 Refer other women and win</h2>
        <p>
          When you finish, you’ll get your own personal link. Share it with other Nigerian women, and when they complete the survey
          it counts as a referral. <strong>The person with the highest number of valid referrals wins {config.gift}.</strong>
        </p>
      </section>

      <section className="card">
        <h2>Terms</h2>
        <div className="terms" tabIndex={0}>
          <h3>About the survey</h3>
          <ul>
            <li>You must be a Nigerian woman aged 18 or above to take part.</li>
            <li>Participation is voluntary. You may skip optional questions or stop at any time.</li>
            <li>We do not ask for your name or detailed medical history. Please do not include identifying details in free-text answers.</li>
            <li>Responses are used for research and reported in summarized form, without identifying you. Data is handled in line with applicable Nigerian data protection law.</li>
            <li>The survey takes about 8–10 minutes. One response per person.</li>
          </ul>
          <h3>Referral gift</h3>
          <ul>
            <li>After you finish, you get a personal referral link. Anyone who completes the survey through your link is a referral.</li>
            <li>A referral is <strong>valid</strong> only if the person is an eligible Nigerian woman aged 18+, completes the survey honestly, and gives genuine answers in a reasonable amount of time.</li>
            <li>The following do <strong>not</strong> count: referring yourself, completing the survey more than once, several responses from the same device, rushed or automated responses, or responses that look fake.</li>
            <li>The person with the highest number of valid referrals wins {config.gift}. If two people tie, the one who reached that number first wins.</li>
            <li>The contest runs until {config.contestClosing}. Medlinkup’s decision on validity and the winner is final.</li>
            <li>To be contacted if you win, you must leave a phone number or email at the end of the survey (optional). It is used only for the gift and is kept separate from your survey answers in reporting.</li>
            <li>Medlinkup may disqualify anyone who breaks these terms. Taking part does not require any payment or purchase.</li>
          </ul>
        </div>

        <label className="check">
          <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
          <span>I have read and accept the terms above, and I am a Nigerian woman aged 18 or above.</span>
        </label>

        <label className="field">
          <span>To start, type the word <strong>continue</strong></span>
          <input
            type="text"
            value={typed}
            autoComplete="off"
            autoCapitalize="none"
            placeholder="continue"
            onChange={(e) => setTyped(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && ready && onContinue()}
          />
        </label>

        <button className="btn primary" disabled={!ready} onClick={onContinue}>Start the survey →</button>
      </section>
    </div>
  );
}
