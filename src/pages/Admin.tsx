import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';
import { QUESTIONS, qNumber, type Question } from '../survey/questions';
import type { AdminPayload } from '../survey/types';
import { disqualify, fetchAdmin } from '../lib/api';
import { tally } from '../lib/analysis';
import { exportExcel } from '../lib/exportExcel';
import '../styles/admin.css'; // adjust the path to where admin.css lives

const KEY = 'ml_admin_pw';
const read = () => {
  try {
    return sessionStorage.getItem(KEY) ?? '';
  } catch {
    return '';
  }
};

export default function Admin() {
  const [pw, setPw] = useState(read);
  const [input, setInput] = useState('');
  const [data, setData] = useState<AdminPayload | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<'overview' | 'referrals' | 'responses'>('overview');
  const [exporting, setExporting] = useState(false);

  const load = async (password: string) => {
    setLoading(true);
    setError('');
    try {
      setData(await fetchAdmin(password));
      setPw(password);
      try {
        sessionStorage.setItem(KEY, password);
      } catch {
        /* ignore */
      }
    } catch (e) {
      setError((e as Error).message);
      setData(null);
      setPw('');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (pw) void load(pw);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data)
    return (
      <div className="admin-app">
        <div className="shell narrow">
          <main className="card">
            <h1>Admin</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void load(input);
            }}
          >
            <label className="field">
              <span>Password</span>
              <input type="password" value={input} onChange={(e) => setInput(e.target.value)} autoFocus />
            </label>
            {error && <p className="error">{error}</p>}
            <button className="btn primary" disabled={loading || !input}>
              {loading ? 'Checking…' : 'Sign in'}
            </button>
          </form>
          </main>
        </div>
      </div>
    );

  const validTotal = data.responses.filter((r) => r.validReferral).length;

  const doExport = async () => {
    setExporting(true);
    try {
      await exportExcel(data.responses, data.leaderboard);
    } catch (e) {
      alert('Export failed: ' + (e as Error).message);
    }
    setExporting(false);
  };

  return (
    <div className="admin-app">
    <div className="shell wide">
      <header className="admin-head">
        <div>
          <h1>Survey results</h1>
          <p className="muted small">
            Stored in <b>{data.storage === 'notion' ? 'Notion' : 'a local file (data/responses.json)'}</b>
          </p>
        </div>
        <div className="row">
          <button className="btn" onClick={() => load(pw)} disabled={loading}>
            {loading ? 'Refreshing…' : 'Refresh'}
          </button>
          <button className="btn primary" onClick={doExport} disabled={exporting || !data.responses.length}>
            {exporting ? 'Building Excel…' : 'Download Excel + charts'}
          </button>
        </div>
      </header>

      <div className="kpis">
        <Stat label="Responses" value={data.responses.length} />
        <Stat label="Referred responses" value={data.responses.filter((r) => r.referredBy).length} />
        <Stat label="Valid referrals" value={validTotal} />
        <Stat label="Avg. time (min)" value={avgMinutes(data.responses.map((r) => r.durationSec))} />
      </div>

      <nav className="tabs">
        {(['overview', 'referrals', 'responses'] as const).map((t) => (
          <button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>
            {t[0].toUpperCase() + t.slice(1)}
          </button>
        ))}
      </nav>

      {tab === 'overview' && <Overview data={data} />}
      {tab === 'referrals' && <Referrals data={data} />}
      {tab === 'responses' && (
        <Responses
          data={data}
          onDisqualify={async (id) => {
            if (!confirm('Stop this response from counting toward its referrer?')) return;
            await disqualify(pw, id);
            await load(pw);
          }}
        />
      )}
    </div>
    </div>
  );
}

const avgMinutes = (secs: number[]) => (secs.length ? (secs.reduce((a, b) => a + b, 0) / secs.length / 60).toFixed(1) : '–');

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="kpi">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

/* ───────── Overview: a chart per question ───────── */

function BarChart({ q, data }: { q: Question; data: AdminPayload }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const t = useMemo(() => tally(data.responses, q), [data, q]);
  useEffect(() => {
    if (!ref.current) return;
    // use the theme colour from admin.css (--teal) instead of a hard-coded hex
    const color = getComputedStyle(ref.current).getPropertyValue('--teal').trim() || '#244A7C';
    const chart = new Chart(ref.current, {
      type: 'bar',
      data: {
        labels: t.rows.map((r) => r.option),
        datasets: [{ data: t.rows.map((r) => r.count), backgroundColor: color, borderRadius: 3 }],
      },
      options: {
        indexAxis: 'y',
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { x: { beginAtZero: true, ticks: { precision: 0 } } },
      },
    });
    return () => chart.destroy();
  }, [t]);
  return (
    <section className="card">
      <h3>
        Q{qNumber(q)}. {q.text}
      </h3>
      <p className="muted small">{t.n} answered</p>
      <div style={{ height: 40 + t.rows.length * 30 }}>
        <canvas ref={ref} />
      </div>
    </section>
  );
}

function Overview({ data }: { data: AdminPayload }) {
  const open = data.responses.filter((r) => typeof r.answers.q23 === 'string');
  if (!data.responses.length) return <p className="muted center">No responses yet.</p>;
  return (
    <>
      <div className="chart-grid">
        {QUESTIONS.filter((q) => q.type !== 'text' && q.id !== 'q1').map((q) => (
          <BarChart key={q.id} q={q} data={data} />
        ))}
      </div>
      <section className="card" style={{ marginTop: 16 }}>
        <h3>Q23. In their own words ({open.length})</h3>
        <ul className="comments">
          {open.map((r) => (
            <li key={r.id}>“{r.answers.q23 as string}”</li>
          ))}
        </ul>
      </section>
    </>
  );
}

/* ───────── Referrals ───────── */

function Referrals({ data }: { data: AdminPayload }) {
  if (!data.leaderboard.length) return <p className="muted center">No referrals yet.</p>;
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Code</th>
            <th>Contact</th>
            <th>Valid referrals</th>
            <th>All brought</th>
          </tr>
        </thead>
        <tbody>
          {data.leaderboard.map((l) => (
            <tr key={l.refCode} className={l.rank === 1 ? 'leader' : ''}>
              <td>{l.rank}</td>
              <td>
                <code>{l.refCode}</code>
              </td>
              <td>{l.contact || <span className="muted">none left</span>}</td>
              <td>
                <b>{l.validReferrals}</b>
              </td>
              <td>{l.totalReferrals}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ───────── Raw responses ───────── */

function Responses({ data, onDisqualify }: { data: AdminPayload; onDisqualify: (id: string) => void }) {
  const [open, setOpen] = useState<string | null>(null);
  const rows = [...data.responses].reverse();
  if (!rows.length) return <p className="muted center">No responses yet.</p>;
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Submitted</th>
            <th>Code</th>
            <th>Age</th>
            <th>Location</th>
            <th>Referred by</th>
            <th>Referral status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <Fragment key={r.id}>
              <tr>
                <td>{new Date(r.submittedAt).toLocaleString()}</td>
                <td>
                  <code>{r.refCode}</code>
                </td>
                <td>{(r.answers.q2 as string) ?? ''}</td>
                <td>{(r.answers.q3 as string) ?? ''}</td>
                <td>{r.referredBy ? <code>{r.referredBy}</code> : '–'}</td>
                <td>
                  {r.referredBy ? (
                    r.validReferral ? (
                      <span className="tag good">Valid</span>
                    ) : (
                      <span className="tag bad" title={r.referralNote}>
                        Not counted: {r.referralNote}
                      </span>
                    )
                  ) : (
                    '–'
                  )}
                </td>
                <td className="row-actions">
                  <div className="row">
                    <button className="link" onClick={() => setOpen(open === r.id ? null : r.id)}>
                      {open === r.id ? 'Hide' : 'View'}
                    </button>
                    {r.validReferral && (
                      <button className="link danger" onClick={() => onDisqualify(r.id)}>
                        Disqualify
                      </button>
                    )}
                  </div>
                </td>
              </tr>
              {open === r.id && (
                <tr key={r.id + 'd'} className="detail">
                  <td colSpan={7}>
                    <dl className="qa">
                      {QUESTIONS.filter((q) => r.answers[q.id] !== undefined).map((q) => (
                        <div key={q.id}>
                          <dt>
                            Q{qNumber(q)}. {q.text}
                          </dt>
                          <dd>{Array.isArray(r.answers[q.id]) ? (r.answers[q.id] as string[]).join(' · ') : (r.answers[q.id] as string)}</dd>
                        </div>
                      ))}
                    </dl>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}