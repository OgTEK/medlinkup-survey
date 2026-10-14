import ExcelJS from 'exceljs';
import { formatAnswer, pct, tally } from '../../shared/analysis';
import { QUESTIONS, columnName } from '../../shared/questions';
import type { AdminData } from '../../shared/types';
import { renderPng } from './charts';

const TEAL = 'FF0F766E';
const header = (row: ExcelJS.Row) => {
  row.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  row.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: TEAL } };
  row.alignment = { vertical: 'middle', wrapText: true };
};

export async function exportExcel(data: AdminData) {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Medlinkup survey';
  wb.created = new Date();

  const responses = [...data.responses].reverse(); // oldest first for the spreadsheet
  const analysable = responses.filter((r) => r.flag === null || !r.flag.startsWith('Duplicate'));

  /* ---------------- Summary + charts ---------------- */
  const sum = wb.addWorksheet('Summary & Charts', { views: [{ showGridLines: false }] });
  sum.columns = [{ width: 56 }, { width: 11 }, { width: 11 }, { width: 3 }];
  sum.getCell('A1').value = 'Understanding Healthcare Experiences Among Nigerian Women';
  sum.getCell('A1').font = { bold: true, size: 16, color: { argb: TEAL } };
  const stats: [string, string | number][] = [
    ['Total responses', responses.length],
    ['Responses used in charts (duplicates removed)', analysable.length],
    ['Valid referrals', responses.filter((r) => r.validReferral).length],
    ['Flagged responses', responses.filter((r) => r.flag).length],
    ['Exported', new Date().toLocaleString()],
  ];
  stats.forEach(([k, v], i) => {
    sum.getCell(`A${3 + i}`).value = k;
    sum.getCell(`B${3 + i}`).value = v;
    sum.getCell(`A${3 + i}`).font = { bold: true };
  });

  let row = 10;
  for (const q of QUESTIONS) {
    if (q.type === 'paragraph' || q.id === 'q1') continue;
    const t = tally(q, analysable);
    sum.getCell(`A${row}`).value = `Q${q.n}. ${q.text}`;
    sum.getCell(`A${row}`).font = { bold: true, size: 12 };
    sum.getCell(`A${row}`).alignment = { wrapText: true, vertical: 'top' };
    sum.getRow(row).height = q.text.length > 60 ? 34 : 20;
    row++;
    const h = sum.getRow(row);
    h.values = ['Answer', 'Count', '% of answered'];
    header(h);
    h.height = 20;
    row++;
    const first = row;
    t.labels.forEach((label, i) => {
      sum.getRow(row).values = [label, t.counts[i], pct(t.counts[i], t.base) / 100];
      sum.getCell(`C${row}`).numFmt = '0.0%';
      row++;
    });
    sum.getRow(row).values = [`Answered (n)`, t.base];
    sum.getRow(row).font = { italic: true, color: { argb: 'FF6B7280' } };
    row++;

    if (t.base > 0) {
      const img = renderPng(`Q${q.n}. ${q.text}`, t.labels, t.counts, t.base);
      const id = wb.addImage({ base64: img.dataUrl, extension: 'png' });
      sum.addImage(id, { tl: { col: 4, row: first - 3 }, ext: { width: img.width, height: img.height } });
      const rowsForImage = Math.ceil(img.height / 20) + 1;
      row = Math.max(row, first - 2 + rowsForImage);
    }
    row += 2;
  }

  /* ---------------- Responses ---------------- */
  const ws = wb.addWorksheet('Responses', { views: [{ state: 'frozen', ySplit: 1, xSplit: 2 }] });
  const cols = [
    'Submitted', 'Response ID', 'Referral Code', 'Referred By', 'Referral status', 'Flag', 'Duration (s)', 'Contact',
    ...QUESTIONS.map(columnName),
  ];
  ws.addRow(cols);
  header(ws.getRow(1));
  ws.getRow(1).height = 32;
  for (const r of responses) {
    ws.addRow([
      new Date(r.submittedAt), r.id, r.referralCode, r.referredBy,
      r.referredBy ? (r.validReferral ? 'Valid' : 'Not counted') : '',
      r.flag ?? '', r.durationSeconds, r.contact,
      ...QUESTIONS.map((q) => formatAnswer(r.answers[q.id])),
    ]);
  }
  ws.getColumn(1).numFmt = 'yyyy-mm-dd hh:mm';
  cols.forEach((c, i) => {
    const col = ws.getColumn(i + 1);
    col.width = i === 0 ? 17 : i === 1 ? 14 : c === 'Q23 Biggest change' ? 60 : c === 'Flag' ? 28 : i < 8 ? 16 : 26;
    col.alignment = { vertical: 'top', wrapText: true };
  });
  ws.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: cols.length } };

  /* ---------------- Referral leaderboard ---------------- */
  const lb = wb.addWorksheet('Referral leaderboard');
  lb.addRow(['Rank', 'Referral Code', 'Contact', 'Valid referrals', 'Total referrals', 'Not counted']);
  header(lb.getRow(1));
  data.leaderboard.forEach((l, i) => lb.addRow([i + 1, l.code, l.contact || '(none given)', l.valid, l.total, l.total - l.valid]));
  [8, 16, 30, 16, 16, 14].forEach((w, i) => (lb.getColumn(i + 1).width = w));

  /* ---------------- Open-ended ---------------- */
  const oe = wb.addWorksheet('Open-ended answers (Q23)');
  oe.addRow(['Submitted', 'Age range', 'Location', 'Answer']);
  header(oe.getRow(1));
  for (const r of responses) {
    const a = formatAnswer(r.answers.q23);
    if (a) oe.addRow([new Date(r.submittedAt), formatAnswer(r.answers.q2), formatAnswer(r.answers.q3), a]);
  }
  oe.getColumn(1).numFmt = 'yyyy-mm-dd hh:mm';
  [17, 12, 24, 100].forEach((w, i) => {
    oe.getColumn(i + 1).width = w;
    oe.getColumn(i + 1).alignment = { vertical: 'top', wrapText: true };
  });

  const buffer = await wb.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `medlinkup-survey-${new Date().toISOString().slice(0, 10)}.xlsx`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}
