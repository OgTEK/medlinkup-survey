import { useEffect, useMemo, useRef, useState } from 'react';
import { PARAGRAPH_MAX, QUESTIONS, SECTIONS, isAnswered, isVisible } from '../../shared/questions';
import type { Answers, Question } from '../../shared/types';
import { getDeviceId, store } from '../storage';

const DRAFT_KEY = 'mlu_draft';

interface Props {
  refCode: string;
  onIneligible: () => void;
  onDone: (referralCode: string) => void;
}

export default function SurveyForm({ refCode, onIneligible, onDone }: Props) {
  const draft = useMemo(() => {
    try { return JSON.parse(store.get(DRAFT_KEY) ?? 'null') as { answers: Answers; step: number; startedAt: number } | null; }
    catch { return null; }
  }, []);

  const [answers, setAnswers] = useState<Answers>(draft?.answers ?? {});
  const [step, setStep] = useState(draft?.step ?? 0);
  const [startedAt] = useState(draft?.startedAt ?? Date.now());
  const [contact, setContact] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Set<string>>(new Set());
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const top = useRef<HTMLDivElement>(null);

  useEffect(() => {
    store.set(DRAFT_KEY, JSON.stringify({ answers, step, startedAt }));
  }, [answers, step, startedAt]);

  const section = SECTIONS[step];
  const isLast = step === SECTIONS.length - 1;
  const questions = QUESTIONS.filter((q) => q.section === section.id && isVisible(q, answers));

  const setAnswer = (q: Question, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [q.id]: value }));
    setErrors((prev) => { const n = new Set(prev); n.delete(q.id); return n; });
  };

  const toggleMulti = (q: Question, option: string) => {
    const current = (answers[q.id] as string[] | undefined) ?? [];
    let next: string[];
    if (current.includes(option)) next = current.filter((o) => o !== option);
    else if (q.exclusive?.includes(option)) next = [option];
    else next = [...current.filter((o) => !q.exclusive?.includes(o)), option];
    setAnswer(q, next);
  };

  const validate = () => {
    const missing = new Set(questions.filter((q) => q.required && !isAnswered(answers[q.id])).map((q) => q.id));
    setErrors(missing);
    if (missing.size) document.getElementById(`q-${[...missing][0]}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return missing.size === 0;
  };

  const scrollTop = () => top.current?.scrollIntoView({ behavior: 'smooth' });

  const next = async () => {
    // Q1 = No ends the survey straight away, before any other required question.
    if (answers.q1 === 'No') {
      store.remove(DRAFT_KEY);
      return onIneligible();
    }
    if (!validate()) return;
    if (!isLast) {
      setStep(step + 1);
      return scrollTop();
    }

    // Keep only answers to questions that are visible (conditional logic).
    const final: Answers = {};
    for (const q of QUESTIONS) {
      if (isVisible(q, final) && isAnswered(answers[q.id])) final[q.id] = answers[q.id];
    }

    setSubmitting(true);
    setServerError('');
    try {
      const res = await fetch('/api/responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: final,
          ref: refCode,
          contact,
          deviceId: getDeviceId(),
          durationSeconds: Math.round((Date.now() - startedAt) / 1000),
          website: honeypot,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong');
      store.remove(DRAFT_KEY);
      onDone(data.referralCode);
    } catch (e) {
      setServerError((e as Error).message || 'Network error. Please try again.');
      setSubmitting(false);
    }
  };

  const back = () => {
    setStep(step - 1);
    scrollTop();
  };

  return (
    <div className="stack" ref={top}>
      <div className="progress" role="progressbar" aria-valuemin={1} aria-valuemax={SECTIONS.length} aria-valuenow={step + 1}>
        <div className="bar" style={{ width: `${((step + 1) / SECTIONS.length) * 100}%` }} />
      </div>
      <p className="muted small">Section {section.id} of {SECTIONS[SECTIONS.length - 1].id}</p>
      <h1 className="section-title">{section.title}</h1>

      {questions.map((q) => (
        <fieldset key={q.id} id={`q-${q.id}`} className={`card q ${errors.has(q.id) ? 'has-error' : ''}`}>
          <legend>
            <span className="qn">Q{q.n}.</span> {q.text}
            {q.required && <span className="req" title="Required"> *</span>}
          </legend>
          {q.helper && <p className="muted small helper">{q.helper}</p>}

          {q.type === 'single' && (
            <div className="options">
              {q.options!.map((o) => (
                <label key={o} className={`opt ${answers[q.id] === o ? 'on' : ''}`}>
                  <input type="radio" name={q.id} checked={answers[q.id] === o} onChange={() => setAnswer(q, o)} />
                  <span>{o}</span>
                </label>
              ))}
            </div>
          )}

          {q.type === 'multi' && (
            <div className="options">
              {q.options!.map((o) => {
                const on = ((answers[q.id] as string[] | undefined) ?? []).includes(o);
                return (
                  <label key={o} className={`opt ${on ? 'on' : ''}`}>
                    <input type="checkbox" checked={on} onChange={() => toggleMulti(q, o)} />
                    <span>{o}</span>
                  </label>
                );
              })}
            </div>
          )}

          {q.type === 'dropdown' && (
            <select value={(answers[q.id] as string) ?? ''} onChange={(e) => setAnswer(q, e.target.value)} aria-label={q.text}>
              <option value="">Choose…</option>
              {q.options!.map((o) => <option key={o}>{o}</option>)}
            </select>
          )}

          {q.type === 'paragraph' && (
            <>
              <textarea
                rows={5}
                maxLength={PARAGRAPH_MAX}
                value={(answers[q.id] as string) ?? ''}
                onChange={(e) => setAnswer(q, e.target.value)}
                placeholder="Type your answer here (optional)"
                aria-label={q.text}
              />
              <p className="muted small right">{((answers[q.id] as string) ?? '').length}/{PARAGRAPH_MAX}</p>
            </>
          )}

          {errors.has(q.id) && <p className="error" role="alert">Please answer this question to continue.</p>}
        </fieldset>
      ))}

      {isLast && (
        <section className="card gift">
          <h2>🎁 Referral gift (optional)</h2>
          <p className="small">
            Want to be reached if you win the referral gift? Leave a phone number or email. It’s only used for the gift. You can leave this blank.
          </p>
          <input
            type="text"
            maxLength={120}
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Phone number or email (optional)"
            aria-label="Phone number or email for the referral gift"
          />
          {/* honeypot: real people never see or fill this */}
          <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden value={honeypot} onChange={(e) => setHoneypot(e.target.value)} name="website" />
        </section>
      )}

      {serverError && <p className="error banner" role="alert">{serverError}</p>}

      <div className="nav">
        {step > 0 ? <button className="btn" onClick={back} disabled={submitting}>← Back</button> : <span />}
        <button className="btn primary" onClick={next} disabled={submitting}>
          {submitting ? 'Submitting…' : isLast ? 'Submit my answers' : 'Next →'}
        </button>
      </div>
    </div>
  );
}
