import ExcelJS from 'exceljs';
import { Chart } from 'chart.js/auto';
import { QUESTIONS, qNumber } from '../survey/questions';
import type { AdminResponse, LeaderRow } from '../survey/types';
import { tally } from './analysis';

const TEAL = 'FF0F5F5A';
const wrap = (s: string, width = 34): string[] => {
  const lines: string[] = [];
  let cur = '';
  for (const w of s.split(' ')) {
    if ((cur + ' ' + w).trim().length > width) {
      lines.push(cur);
      cur = w;
    } else cur = (cur + ' ' + w).trim();
  }
  if (cur) lines.push(cur);
  return lines;
};

/** Draws a horizontal bar chart on an off-screen canvas and returns it as a PNG data URL. */
function chartPng(title: string, rows: { option: string; count: number }[]) {
  const width = 760;
  const height = Math.max(260, 70 + rows.length * 34);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const chart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: rows.map((r) => wrap(r.option)),
      datasets: [{ data: rows.map((r) => r.count), backgroundColor: '#0f766e', borderRadius: 3 }],
    },
    options: {
      indexAxis: 'y',
      responsive: false,
      animation: false,
      devicePixelRatio: 1,
      layout: { padding: 10 },
      plugins: {
        legend: { display: false },
        title: { display: true, text: wrap(title, 70), font: { size: 14, weight: 'bold' } },
      },
      scales: { x: { beginAtZero: true, ticks: { precision: 0 } }, y: { ticks: { font: { size: 11 } } } },
    },
    plugins: [
      {
        id: 'bg',
        beforeDraw(c) {
          const ctx = c.ctx;
          ctx.save();
          ctx.globalCompositeOperation = 'destination-over';
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, c.width, c.height);
          ctx.restore();
        },
      },
    ],
  });
  const url = canvas.toDataURL('image/png');
  chart.destroy();
  return { url, width, height };
}

function styleHeader(row: ExcelJS.Row) {
  row.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  row.alignment = { vertical: 'middle', wrapText: true };
  row.eachCell((c) => (c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: TEAL } }));
}

export async function exportExcel(responses: AdminResponse[], leaderboard: LeaderRow[]) {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Medlinkup Survey';
  wb.created = new Date();

  /* ── Sheet 1: Summary with a chart per question ── */
  const sum = wb.addWorksheet('Summary & Charts', { views: [{ showGridLines: false }] });
  sum.columns = [{ width: 52 }, { width: 10 }, { width: 12 }, { width: 3 }, { width: 3 }, { width: 14 }];
  sum.mergeCells('A1:C1');
  sum.getCell('A1').value = 'Healthcare Experiences Among Nigerian Women: results';
  sum.getCell('A1').font = { size: 16, bold: true, color: { argb: TEAL } };
  sum.getCell('A2').value = `Responses: ${responses.length}   ·   Exported: ${new Date().toLocaleString()}`;
  sum.getCell('A2').font = { italic: true, color: { argb: 'FF666666' } };

  let r = 4;
  for (const q of QUESTIONS) {
    if (q.type === 'text' || q.id === 'q1') continue;
    const t = tally(responses, q);
    sum.mergeCells(r, 1, r, 3);
    const title = sum.getCell(r, 1);
    title.value = `Q${qNumber(q)}. ${q.text}`;
    title.font = { bold: true, size: 11 };
    title.alignment = { wrapText: true, vertical: 'top' };
    sum.getRow(r).height = Math.max(18, Math.ceil(q.text.length / 55) * 15);
    r++;
    const head = sum.getRow(r);
    head.values = ['Answer', 'Count', `% of ${t.n}`];
    styleHeader(head);
    r++;
    for (const row of t.rows) {
      const pct = t.n ? row.count / t.n : 0;
      const x = sum.getRow(r);
      x.values = [row.option, row.count, pct];
      x.getCell(1).alignment = { wrapText: true, vertical: 'top' };
      x.getCell(3).numFmt = '0.0%';
      r++;
    }
    const tableEnd = r;
    if (t.n > 0 && t.rows.length) {
      const img = chartPng(`Q${qNumber(q)}. ${q.text}`, t.rows);
      const id = wb.addImage({ base64: img.url, extension: 'png' });
      const blockStart = tableEnd - t.rows.length - 2; // title row
      sum.addImage(id, { tl: { col: 5, row: blockStart - 1 }, ext: { width: img.width, height: img.height } });
      r = Math.max(tableEnd, blockStart + Math.ceil(img.height / 20)) ;
    }
    r += 2;
  }

  /* ── Sheet 2: raw responses (anonymous: no contact details) ── */
  const raw = wb.addWorksheet('Responses', { views: [{ state: 'frozen', ySplit: 1, xSplit: 1 }] });
  const fixed = ['Submitted', 'Referral code', 'Referred by', 'Counts as valid referral', 'Referral note', 'Seconds taken'];
  raw.addRow([...fixed, ...QUESTIONS.map((q) => `Q${qNumber(q)}. ${q.text}`)]);
  styleHeader(raw.getRow(1));
  raw.getRow(1).height = 60;
  for (const resp of responses) {
    raw.addRow([
      new Date(resp.submittedAt),
      resp.refCode,
      resp.referredBy ?? '',
      resp.validReferral ? 'Yes' : resp.referredBy ? 'No' : '',
      resp.referralNote,
      resp.durationSec,
      ...QUESTIONS.map((q) => {
        const v = resp.answers[q.id];
        return Array.isArray(v) ? v.join('; ') : v ?? '';
      }),
    ]);
  }
  raw.getColumn(1).numFmt = 'yyyy-mm-dd hh:mm';
  raw.columns.forEach((c, i) => (c.width = i === 0 ? 17 : i < 6 ? 16 : i === QUESTIONS.length + 5 ? 60 : 28));
  raw.eachRow((row, n) => n > 1 && row.eachCell((c) => (c.alignment = { wrapText: true, vertical: 'top' })));
  raw.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: fixed.length + QUESTIONS.length } };

  /* ── Sheet 3: referral leaderboard ── */
  const lb = wb.addWorksheet('Referral leaderboard');
  lb.addRow(['Rank', 'Referral code', 'Contact (for gift)', 'Valid referrals', 'All referrals brought']);
  styleHeader(lb.getRow(1));
  leaderboard.forEach((l) => lb.addRow([l.rank, l.refCode, l.contact, l.validReferrals, l.totalReferrals]));
  lb.columns = [{ width: 8 }, { width: 16 }, { width: 32 }, { width: 16 }, { width: 22 }];
  if (leaderboard.length) {
    const top = lb.getRow(2);
    top.font = { bold: true };
    top.eachCell((c) => (c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF3C4' } }));
  }

  const buf = await wb.xlsx.writeBuffer();
  const blob = new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `healthcare-survey-${new Date().toISOString().slice(0, 10)}.xlsx`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}
