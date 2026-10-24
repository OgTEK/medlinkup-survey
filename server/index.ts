import 'dotenv/config';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import express, { type NextFunction, type Request, type Response } from 'express';
import { evaluate } from './referrals';
import { createStore } from './store';
import { sanitizeAnswers } from './validate';
import type { AdminData, StoredResponse, SubmitPayload } from '../shared/types';

const app = express();
app.set('trust proxy', 1);
app.use(express.json({ limit: '64kb' }));

const store = createStore();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? '';

/* ---- tiny in-memory rate limiter: 8 submissions / 10 min / IP ---- */
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 8;
}

const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // no look-alike characters
const makeCode = () => Array.from({ length: 6 }, () => ALPHABET[crypto.randomInt(ALPHABET.length)]).join('');

app.post('/api/responses', async (req: Request, res: Response) => {
  if (limited(req.ip ?? 'unknown')) return res.status(429).json({ error: 'Too many submissions. Please try again later.' });

  const body = (req.body ?? {}) as Partial<SubmitPayload>;
  if (body.website) return res.json({ ok: true, referralCode: makeCode() }); // honeypot: pretend success

  const checked = sanitizeAnswers(body.answers);
  if (!checked.ok) return res.status(400).json({ error: checked.error });

  const deviceId = typeof body.deviceId === 'string' && /^[\w-]{8,64}$/.test(body.deviceId) ? body.deviceId : null;
  if (!deviceId) return res.status(400).json({ error: 'Invalid device id' });

  const ref = typeof body.ref === 'string' ? body.ref.toUpperCase().trim() : '';
  const record: StoredResponse = {
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    answers: checked.answers,
    referralCode: makeCode(),
    referredBy: /^[A-Z0-9]{4,12}$/.test(ref) ? ref : '',
    contact: typeof body.contact === 'string' ? body.contact.trim().slice(0, 120) : '',
    deviceId,
    durationSeconds: Math.max(0, Math.min(86_400, Math.round(Number(body.durationSeconds) || 0))),
  };

  try {
    await store.add(record);
    res.json({ ok: true, referralCode: record.referralCode });
  } catch (e) {
    console.error('Failed to save response:', e);
    res.status(502).json({ error: 'We could not save your response. Please try again.' });
  }
});

/* ---------------------------- admin ---------------------------- */
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!ADMIN_PASSWORD) return res.status(503).json({ error: 'Admin is disabled. Set ADMIN_PASSWORD in .env.' });
  const given = Buffer.from(String(req.header('x-admin-password') ?? ''));
  const want = Buffer.from(ADMIN_PASSWORD);
  if (given.length !== want.length || !crypto.timingSafeEqual(given, want)) {
    return res.status(401).json({ error: 'Wrong password' });
  }
  next();
}

app.get('/api/admin/data', requireAdmin, async (_req: Request, res: Response) => {
  try {
    const { views, leaderboard } = evaluate(await store.list());
    const data: AdminData = { storage: store.kind, generatedAt: new Date().toISOString(), responses: views, leaderboard };
    res.json(data);
  } catch (e) {
    console.error('Failed to load responses:', e);
    res.status(502).json({ error: `Could not load responses: ${(e as Error).message}` });
  }
});

/* ------------------- serve the built site in production ------------------- */
// ROLLBACK: remove `!process.env.VERCEL &&` so Express serves dist/ again on every host.
// On Vercel the static site is served separately, and this disk does not persist.
const dist = path.resolve('dist');
if (!process.env.VERCEL && fs.existsSync(dist)) {
  app.use(express.static(dist));
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) return res.sendFile(path.join(dist, 'index.html'));
    next();
  });
}

// ROLLBACK: delete this export and the `if (!process.env.VERCEL)` wrapper, then call
// app.listen unconditionally again (the original end of this file).
export default app;

// Vercel imports this file as a function and sets VERCEL=1. Listening there would crash.
if (!process.env.VERCEL) {
  const port = Number(process.env.PORT ?? 3001);
  app.listen(port, () => {
    console.log(`API on http://localhost:${port}  ·  storage: ${store.kind}${ADMIN_PASSWORD ? '' : '  ·  ADMIN DISABLED (no ADMIN_PASSWORD)'}`);
  });
}
