import { useMemo, useRef, useState } from 'react';
import {
  SECTIONS,
  qNumber,
  validateAnswers,
  visibleQuestions,
  type Answers,
  type Question,
} from '../survey/questions';
import { submitResponse } from '../lib/api';
import { deviceId, store } from '../lib/storage';
import '../styles_.css'

interface Props {
  onIneligible: () => void;
  onDone: (refCode: string) => void;
}

export default function SurveyForm({ onIneligible, onDone }: Props) {
  const [answers, setAnswers] = useState<Answers>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState(0);
  const [contact, setContact] = useState('');
  const [busy, setBusy] = useState(false);
  const [serverError, setServerError] = useState('');
  const startedAt = useRef(Date.now());

  const section = SECTIONS[step];
  const isLast = step === SECTIONS.length - 1;
  const questions = useMemo(
    () => visibleQuestions(answers).filter((q) => q.section === section.key),
    [answers, section.key],
  );

  const setAnswer = (id: string, value: Answers[string]) => {
    setAnswers((a) => ({ ...a, [id]: value }));
    setErrors((e) => {
      if (!e[id]) return e;
      const { [id]: _drop, ...rest } = e;
      return rest;
    });
  };

  const focusFirstError = (errs: Record<string, string>) => {
    const first = Object.keys(errs)[0];
    if (first) document.getElementById(`field-${first}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  /** Validate only the questions on the current page. */
  const pageErrors = () => {
    const all = validateAnswers(answers).errors;
    const ids = new Set(questions.map((q) => q.id));
    return Object.fromEntries(Object.entries(all).filter(([id]) => ids.has(id)));
  };

  const next = () => {
    const errs = pageErrors();
    setErrors(errs);
    if (Object.keys(errs).length) return focusFirstError(errs);
    if (step === 0 && answers.q1 === 'No') return onIneligible();
    setStep(step + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submit = async () => {
    const all = validateAnswers(answers);
    if (Object.keys(all.errors).length) {
      setErrors(all.errors);
      // jump back to the first page that has a problem
      const firstId = Object.keys(all.errors)[0];
      const firstQ = visibleQuestions(answers).find((q) => q.id === firstId);
      const idx = SECTIONS.findIndex((s) => s.key === firstQ?.section);
      if (idx >= 0) setStep(idx);
      return;
    }
    setBusy(true);
    setServerError('');
    try {
      const res = await submitResponse({
        answers: all.clean,
        ref: store.get('ml_ref') ?? '',
        deviceId: deviceId(),
        durationSec: (Date.now() - startedAt.current) / 1000,
        contact,
      });
      onDone(res.refCode);
    } catch (e) {
      setServerError((e as Error).message);
      setBusy(false);
    }
  };

  return (
    <main className="card">
      <div className="progress" role="progressbar" aria-valuemin={1} aria-valuemax={SECTIONS.length} aria-valuenow={step + 1}>
        <div style={{ width: `${((step + 1) / SECTIONS.length) * 100}%` }} />
      </div>
      <p className="eyebrow">
        Section {section.key} of F · {step + 1}/{SECTIONS.length}
      </p>
      <h1 className="h2">{section.title}</h1>
      <p className="purpose">{section.purpose}</p>

      {questions.map((q) => (
        <QuestionField key={q.id} q={q} value={answers[q.id]} error={errors[q.id]} onChange={(v) => setAnswer(q.id, v)} />
      ))}

      {isLast && (
        <fieldset className="q contact">
          <legend>🎁 Want to be in the gift draw? (optional)</legend>
          <p className="hint">
            Leave a phone number or email so we can reach you if you win. It is stored separately from your answers.
          </p>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="WhatsApp number or email"
            maxLength={120}
            autoComplete="off"
          />
        </fieldset>
      )}

      {serverError && <p className="error banner">{serverError}</p>}

      <div className="nav">
        {step > 0 ? (
          <button className="btn" onClick={() => setStep(step - 1)} disabled={busy}>
            ← Back
          </button>
        ) : (
          <span />
        )}
        {isLast ? (
          <button className="btn primary big" onClick={submit} disabled={busy}>
            {busy ? 'Submitting…' : 'Submit my answers'}
          </button>
        ) : (
          <button className="btn primary big" onClick={next}>
            Next →
          </button>
        )}
      </div>
    </main>
  );
}

function QuestionField({
  q,
  value,
  error,
  onChange,
}: {
  q: Question;
  value: Answers[string] | undefined;
  error?: string;
  onChange: (v: Answers[string]) => void;
}) {
  const selected = Array.isArray(value) ? value : value ? [value] : [];

  const toggle = (opt: string) => {
    if (selected.includes(opt)) return onChange(selected.filter((x) => x !== opt));
    if (q.exclusive?.includes(opt)) return onChange([opt]);
    onChange([...selected.filter((x) => !q.exclusive?.includes(x)), opt]);
  };

  return (
    <fieldset className={'q' + (error ? ' invalid' : '')} id={`field-${q.id}`}>
      <legend>
        <span className="qn">Q{qNumber(q)}.</span> {q.text}
        {!q.required && <span className="opt"> (optional)</span>}
      </legend>
      {q.type === 'multi' && <p className="hint">Select all that apply.</p>}

      {q.type === 'single' &&
        q.options!.map((o) => (
          <label key={o} className={'choice' + (value === o ? ' on' : '')}>
            <input type="radio" name={q.id} checked={value === o} onChange={() => onChange(o)} />
            <span>{o}</span>
          </label>
        ))}

      {q.type === 'multi' &&
        q.options!.map((o) => (
          <label key={o} className={'choice' + (selected.includes(o) ? ' on' : '')}>
            <input type="checkbox" checked={selected.includes(o)} onChange={() => toggle(o)} />
            <span>{o}</span>
          </label>
        ))}

      {q.type === 'dropdown' && (
        <select value={typeof value === 'string' ? value : ''} onChange={(e) => onChange(e.target.value)}>
          <option value="">Select…</option>
          {q.options!.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      )}

      {q.type === 'text' && (
        <textarea
          rows={5}
          maxLength={3000}
          value={typeof value === 'string' ? value : ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type your answer here…"
        />
      )}

      {error && <p className="error">{error}</p>}
    </fieldset>
  );
}
