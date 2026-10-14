import type { Answers } from '../survey/questions';
import type { AdminPayload } from '../survey/types';

async function parse<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? `Request failed (${res.status})`);
  return data as T;
}

export const submitResponse = (body: {
  answers: Answers;
  ref: string;
  deviceId: string;
  durationSec: number;
  contact: string;
}) =>
  fetch('/api/responses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((r) => parse<{ id: string; refCode: string }>(r));

export const fetchAdmin = (password: string) =>
  fetch('/api/admin/responses', { headers: { 'x-admin-password': password } }).then((r) => parse<AdminPayload>(r));

export const disqualify = (password: string, id: string) =>
  fetch(`/api/admin/responses/${id}/disqualify`, { method: 'POST', headers: { 'x-admin-password': password } }).then((r) =>
    parse<{ ok: true }>(r),
  );
