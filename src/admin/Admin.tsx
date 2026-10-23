import { useCallback, useEffect, useMemo, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { formatAnswer, tally } from '../../shared/analysis';
import { QUESTIONS, columnName } from '../../shared/questions';
import type { AdminData, ResponseView } from '../../shared/types';
import { barConfig } from './charts';
import { exportExcel } from './exportExcel';
import '../app-pages.css';

const KEY = 'mlu_admin';
const getPw = () => { try { return sessionStorage.getItem(KEY) ?? ''; } catch { return ''; } };

type Tab = 'responses' | 'analysis' | 'referrals';

export default function Admin() {
  const [password, setPassword] = useState(getPw);
  const [input, setInput] = useState('');
  const [data, setData] = useState<AdminData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<Tab>('responses');
  const [exporting, setExporting] = useState(false);

  const load = useCallback(async (pw: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/data', { headers: { 'x-admin-password': pw } });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw Object.assign(new Error(body.error ?? 'Failed'), { status: res.status });
      setData(body);
      try { sessionStorage.setItem(KEY, pw); } catch { /* ignore */ }
      setPassword(pw);
    } catch (e) {
      const err = e as Error & { status?: number };
      if (err.status === 401) { try { sessionStorage.removeItem(KEY); } catch { /* ignore */ } setPassword(''); }
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { if (password) void load(password); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!password || !data) {
    return (
      <div className="app-page">
      <div className="shell narrow">
        <section className="card stack">
          <h1>Admin</h1>
          <p className="muted">Enter the admin password to view responses.</p>
          <form className="stack" onSubmit={(e) => { e.preventDefault(); void load(input); }}>
            <input type="password" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Password" autoFocus aria-label="Admin password" />
            <button className="btn primary" disabled={loading || !input}>{loading ? 'Checking…' : 'Sign in'}</button>
          </form>
          {error && <p className="error" role="alert">{error}</p>}
        </section>
      </div>
      </div>
    );
  }

  const doExport = async () => {
    setExporting(true);
    try { await exportExcel(data); } catch (e) { setError(`Export failed: ${(e as Error).message}`); } finally { setExporting(false); }
  };

  const valid = data.responses.filter((r) => r.validReferral).length;
  const flagged = data.responses.filter((r) => r.flag).length;

  return (
    <div className="app-page">
    <div className="shell wide">
      <header className="admin-head">
        <div>
          <h1>Survey dashboard</h1>
          <p className="muted small">
            Stored in <strong>{data.storage === 'notion' ? 'Notion' : 'local file (data/responses.json)'}</strong> · updated {new Date(data.generatedAt).toLocaleTimeString()}
          </p>
        </div>
        <div className="row">
          <button className="btn" onClick={() => load(password)} disabled={loading}>{loading ? 'Refreshing…' : 'Refresh'}</button>
          <button className="btn primary" onClick={doExport} disabled={exporting || !data.responses.length}>{exporting ? 'Building Excel…' : '⬇ Export to Excel'}</button>
          <button className="btn" onClick={() => { try { sessionStorage.removeItem(KEY); } catch { /* ignore */ } setPassword(''); setData(null); }}>Sign out</button>
        </div>
      </header>
      {error && <p className="error banner" role="alert">{error}</p>}

      <div className="kpis">
        <Kpi label="Responses" value={data.responses.length} />
        <Kpi label="Valid referrals" value={valid} />
        <Kpi label="Flagged" value={flagged} />
        <Kpi label="Referrers" value={data.leaderboard.length} />
      </div>

      <nav className="tabs">
        {(['responses', 'analysis', 'referrals'] as Tab[]).map((t) => (
          <button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{{ responses: 'Responses', analysis: 'Analysis', referrals: 'Referral leaderboard' }[t]}</button>
        ))}
      </nav>

      {tab === 'responses' && <Responses rows={data.responses} />}
      {tab === 'analysis' && <Analysis rows={data.responses} />}
      {tab === 'referrals' && <Leaderboard data={data} />}
    </div>
    </div>
  );
}

const Kpi = ({ label, value }: { label: string; value: number }) => (
  <div className="kpi"><strong>{value}</strong><span>{label}</span></div>
);

/* ------------------------------ Responses ------------------------------ */
function Responses({ rows }: { rows: ResponseView[] }) {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState<ResponseView | null>(null);
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return rows;
    return rows.filter((r) => JSON.stringify([r.answers, r.referralCode, r.referredBy, r.contact]).toLowerCase().includes(s));
  }, [rows, q]);

  return (
    <section className="card">
      <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search answers, codes, contacts…" aria-label="Search responses" />
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Submitted</th><th>Age</th><th>Location</th><th>Area</th><th>Last needed care</th><th>Referred by</th><th>Status</th><th /></tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id}>
                <td>{new Date(r.submittedAt).toLocaleString()}</td>
                <td>{formatAnswer(r.answers.q2)}</td>
                <td>{formatAnswer(r.answers.q3)}</td>
                <td>{formatAnswer(r.answers.q4)}</td>
                <td>{formatAnswer(r.answers.q5)}</td>
                <td>{r.referredBy || '—'}</td>
                <td>
                  {r.flag ? <span className="tag bad" title={r.flag}>Flagged</span> : r.validReferral ? <span className="tag good">Valid referral</span> : <span className="muted">—</span>}
                </td>
                <td><button className="link" onClick={() => setOpen(r)}>View</button></td>
              </tr>
            ))}
            {!filtered.length && <tr><td colSpan={8} className="muted center-text">No responses yet.</td></tr>}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="modal" role="dialog" aria-modal onClick={() => setOpen(null)}>
          <div className="modal-body" onClick={(e) => e.stopPropagation()}>
            <div className="row between">
              <h2>Response · {new Date(open.submittedAt).toLocaleString()}</h2>
              <button className="btn" onClick={() => setOpen(null)}>Close</button>
            </div>
            <p className="small muted">
              Own code <strong>{open.referralCode}</strong> · Referred by <strong>{open.referredBy || 'none'}</strong> · {open.durationSeconds}s · Contact: {open.contact || 'none'}
              {open.flag && <> · <span className="error">Flag: {open.flag}</span></>}
            </p>
            <dl className="qa">
              {QUESTIONS.filter((q) => open.answers[q.id]).map((q) => (
                <div key={q.id}><dt>{columnName(q)}</dt><dd>{formatAnswer(open.answers[q.id])}</dd></div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </section>
  );
}

/* ------------------------------- Analysis ------------------------------- */
function Analysis({ rows }: { rows: ResponseView[] }) {
  const usable = useMemo(() => rows.filter((r) => !r.flag?.startsWith('Duplicate')), [rows]);
  if (!usable.length) return <section className="card muted">Charts will appear once responses come in.</section>;
  const comments = usable.filter((r) => r.answers.q23);

  return (
    <div className="stack">
      <p className="muted small">Based on {usable.length} responses (duplicate-device submissions excluded). Percentages are of people who answered each question.</p>
      <div className="chart-grid">
        {QUESTIONS.filter((q) => q.type !== 'paragraph' && q.id !== 'q1').map((q) => {
          const t = tally(q, usable);
          return (
            <section className="card" key={q.id}>
              <h3>Q{q.n}. {q.text}</h3>
              <p className="muted small">n = {t.base}</p>
              <div style={{ height: 60 + t.labels.length * 38 }}>
                <Bar {...barConfig(t.labels, t.counts, t.base)} />
              </div>
            </section>
          );
        })}
      </div>
      <section className="card">
        <h3>Q23. In their own words ({comments.length})</h3>
        <ul className="comments">
          {comments.map((r) => (
            <li key={r.id}><span className="muted small">{formatAnswer(r.answers.q2)} · {formatAnswer(r.answers.q3)}</span><p>{formatAnswer(r.answers.q23)}</p></li>
          ))}
        </ul>
      </section>
    </div>
  );
}

/* ------------------------------ Leaderboard ------------------------------ */
function Leaderboard({ data }: { data: AdminData }) {
  return (
    <section className="card">
      <p className="muted small">
        Ranked by valid referrals; ties go to whoever reached the number first. Not counted = self-referral, duplicate device, or unknown code.
      </p>
      <div className="table-wrap">
        <table>
          <thead><tr><th>#</th><th>Referral code</th><th>Contact</th><th>Valid</th><th>Total</th><th>Not counted</th></tr></thead>
          <tbody>
            {data.leaderboard.map((l, i) => (
              <tr key={l.code} className={i === 0 && l.valid > 0 ? 'leader' : ''}>
                <td>{i + 1}{i === 0 && l.valid > 0 ? ' 🏆' : ''}</td>
                <td><strong>{l.code}</strong></td>
                <td>{l.contact || <span className="muted">none given</span>}</td>
                <td><strong>{l.valid}</strong></td>
                <td>{l.total}</td>
                <td>{l.total - l.valid}</td>
              </tr>
            ))}
            {!data.leaderboard.length && <tr><td colSpan={6} className="muted center-text">No referrals yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );
}
