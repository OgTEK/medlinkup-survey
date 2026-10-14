import type { Answers, Question } from './types';
import { isAnswered } from './questions';

export interface Tally {
  labels: string[];
  counts: number[];
  /** Number of respondents who answered this question (denominator for %). */
  base: number;
}

export function tally(q: Question, responses: { answers: Answers }[]): Tally {
  const options = q.options ?? [];
  const counts = new Map<string, number>(options.map((o) => [o, 0]));
  let base = 0;
  for (const r of responses) {
    const v = r.answers[q.id];
    if (!isAnswered(v)) continue;
    base++;
    for (const item of Array.isArray(v) ? v : [v as string]) {
      if (counts.has(item)) counts.set(item, (counts.get(item) ?? 0) + 1);
    }
  }
  let labels = options;
  if (q.type === 'dropdown') {
    labels = options.filter((o) => (counts.get(o) ?? 0) > 0).sort((a, b) => (counts.get(b)! - counts.get(a)!));
  }
  return { labels, counts: labels.map((l) => counts.get(l) ?? 0), base };
}

export const pct = (n: number, base: number) => (base ? Math.round((n / base) * 1000) / 10 : 0);

export const formatAnswer = (v: string | string[] | undefined) =>
  Array.isArray(v) ? v.join('; ') : v ?? '';
