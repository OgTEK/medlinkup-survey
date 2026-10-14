import fs from 'node:fs/promises';
import path from 'node:path';
import { QUESTIONS, columnName } from '../shared/questions';
import type { Answers, StoredResponse } from '../shared/types';

export interface Store {
  kind: 'notion' | 'file';
  add(r: StoredResponse): Promise<void>;
  list(): Promise<StoredResponse[]>;
}

/* ------------------------------------------------------------------ */
/* Local JSON file (default when Notion isn't configured)              */
/* ------------------------------------------------------------------ */
export function fileStore(file = path.resolve('data/responses.json')): Store {
  let queue: Promise<unknown> = Promise.resolve();
  const read = async (): Promise<StoredResponse[]> => {
    try {
      return JSON.parse(await fs.readFile(file, 'utf8'));
    } catch {
      return [];
    }
  };
  return {
    kind: 'file',
    list: read,
    add(r) {
      const job = queue.then(async () => {
        const all = await read();
        all.push(r);
        await fs.mkdir(path.dirname(file), { recursive: true });
        const tmp = `${file}.tmp`;
        await fs.writeFile(tmp, JSON.stringify(all, null, 2));
        await fs.rename(tmp, file);
      });
      queue = job.catch(() => undefined);
      return job;
    },
  };
}

/* ------------------------------------------------------------------ */
/* Notion                                                              */
/* ------------------------------------------------------------------ */
const NOTION = 'https://api.notion.com/v1';
const VERSION = '2022-06-28';

export const META_PROPS = {
  title: 'Response ID',
  submitted: 'Submitted',
  code: 'Referral Code',
  referredBy: 'Referred By',
  contact: 'Contact',
  device: 'Device ID',
  duration: 'Duration (s)',
} as const;

export async function notionFetch(token: string, route: string, init: RequestInit = {}) {
  const res = await fetch(`${NOTION}${route}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Notion-Version': VERSION,
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  });
  const body: any = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Notion ${res.status}: ${body.message ?? res.statusText}`);
  return body;
}

/** Property definitions used when creating the database. Everything is text so any answer fits. */
export function notionSchema() {
  const props: Record<string, unknown> = {
    [META_PROPS.title]: { title: {} },
    [META_PROPS.submitted]: { date: {} },
    [META_PROPS.code]: { rich_text: {} },
    [META_PROPS.referredBy]: { rich_text: {} },
    [META_PROPS.contact]: { rich_text: {} },
    [META_PROPS.device]: { rich_text: {} },
    [META_PROPS.duration]: { number: { format: 'number' } },
  };
  for (const q of QUESTIONS) props[columnName(q)] = { rich_text: {} };
  return props;
}

const text = (value: string) => {
  const chunks: { text: { content: string } }[] = [];
  for (let i = 0; i < value.length; i += 2000) chunks.push({ text: { content: value.slice(i, i + 2000) } });
  return { rich_text: chunks };
};

const plain = (p: any): string =>
  (p?.rich_text ?? p?.title ?? []).map((t: any) => t.plain_text ?? '').join('');

export function notionStore(token: string, databaseId: string): Store {
  return {
    kind: 'notion',
    async add(r) {
      const properties: Record<string, unknown> = {
        [META_PROPS.title]: { title: [{ text: { content: r.id } }] },
        [META_PROPS.submitted]: { date: { start: r.submittedAt } },
        [META_PROPS.code]: text(r.referralCode),
        [META_PROPS.referredBy]: text(r.referredBy),
        [META_PROPS.contact]: text(r.contact),
        [META_PROPS.device]: text(r.deviceId),
        [META_PROPS.duration]: { number: r.durationSeconds },
      };
      for (const q of QUESTIONS) {
        const v = r.answers[q.id];
        const s = Array.isArray(v) ? v.join('; ') : v ?? '';
        if (s) properties[columnName(q)] = text(s);
      }
      await notionFetch(token, '/pages', {
        method: 'POST',
        body: JSON.stringify({ parent: { database_id: databaseId }, properties }),
      });
    },
    async list() {
      const out: StoredResponse[] = [];
      let cursor: string | undefined;
      do {
        const page: any = await notionFetch(token, `/databases/${databaseId}/query`, {
          method: 'POST',
          body: JSON.stringify({ page_size: 100, ...(cursor ? { start_cursor: cursor } : {}) }),
        });
        for (const row of page.results) {
          const p = row.properties;
          const answers: Answers = {};
          for (const q of QUESTIONS) {
            const s = plain(p[columnName(q)]);
            if (!s) continue;
            answers[q.id] = q.type === 'multi' ? s.split('; ') : s;
          }
          out.push({
            id: plain(p[META_PROPS.title]) || row.id,
            submittedAt: p[META_PROPS.submitted]?.date?.start ?? row.created_time,
            answers,
            referralCode: plain(p[META_PROPS.code]),
            referredBy: plain(p[META_PROPS.referredBy]),
            contact: plain(p[META_PROPS.contact]),
            deviceId: plain(p[META_PROPS.device]),
            durationSeconds: p[META_PROPS.duration]?.number ?? 0,
          });
        }
        cursor = page.has_more ? page.next_cursor : undefined;
      } while (cursor);
      return out;
    },
  };
}

export function createStore(): Store {
  const { NOTION_TOKEN, NOTION_DATABASE_ID } = process.env;
  if (NOTION_TOKEN && NOTION_DATABASE_ID) return notionStore(NOTION_TOKEN, NOTION_DATABASE_ID);
  return fileStore();
}
