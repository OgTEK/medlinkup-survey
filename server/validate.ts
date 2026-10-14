import { PARAGRAPH_MAX, QUESTIONS, isVisible } from '../shared/questions';
import type { Answers } from '../shared/types';

export type Result = { ok: true; answers: Answers } | { ok: false; error: string };

/** Re-checks everything the browser enforced; never trust the client. */
export function sanitizeAnswers(raw: unknown): Result {
  if (!raw || typeof raw !== 'object') return { ok: false, error: 'Missing answers' };
  const input = raw as Record<string, unknown>;
  const answers: Answers = {};

  for (const q of QUESTIONS) {
    if (!isVisible(q, answers)) continue; // hidden by conditional logic: ignore whatever was sent
    const v = input[q.id];
    const options = q.options ?? [];

    if (q.type === 'single' || q.type === 'dropdown') {
      if (typeof v === 'string' && v !== '') {
        if (!options.includes(v)) return { ok: false, error: `Invalid answer for Q${q.n}` };
        answers[q.id] = v;
      }
    } else if (q.type === 'multi') {
      if (Array.isArray(v) && v.length) {
        const picked = [...new Set(v)];
        if (!picked.every((x) => typeof x === 'string' && options.includes(x))) {
          return { ok: false, error: `Invalid answer for Q${q.n}` };
        }
        const ex = picked.find((x) => q.exclusive?.includes(x));
        answers[q.id] = ex && picked.length > 1 ? [ex] : (picked as string[]);
      }
    } else if (typeof v === 'string' && v.trim()) {
      answers[q.id] = v.trim().slice(0, PARAGRAPH_MAX);
    }

    if (q.required && !answers[q.id]) return { ok: false, error: `Q${q.n} is required` };
  }

  if (answers.q1 !== 'Yes') return { ok: false, error: 'Only eligible respondents can submit' };
  return { ok: true, answers };
}
