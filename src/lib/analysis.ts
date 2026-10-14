import type { Answers, Question } from '../survey/questions';

export interface Tally {
  n: number; // respondents who answered this question
  rows: { option: string; count: number }[];
}

export function tally(responses: { answers: Answers }[], q: Question): Tally {
  const counts = new Map<string, number>();
  q.options?.forEach((o) => counts.set(o, 0));
  let n = 0;
  for (const r of responses) {
    const v = r.answers[q.id];
    if (v === undefined) continue;
    n++;
    for (const x of Array.isArray(v) ? v : [v]) counts.set(x, (counts.get(x) ?? 0) + 1);
  }
  let rows = [...counts].map(([option, count]) => ({ option, count }));
  if (q.type === 'dropdown') rows = rows.filter((r) => r.count > 0).sort((a, b) => b.count - a.count);
  return { n, rows };
}
