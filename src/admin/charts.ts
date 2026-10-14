import {
  BarController, BarElement, CategoryScale, Chart, LinearScale, Tooltip,
  type ChartConfiguration, type Plugin,
} from 'chart.js';
import { pct } from '../../shared/analysis';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip);

export const COLOR = '#0f766e';

/** Wrap long labels onto several lines so horizontal bars stay readable. */
export function wrap(text: string, width = 34): string[] {
  const lines: string[] = [];
  let line = '';
  for (const word of text.split(' ')) {
    if ((line + ' ' + word).trim().length > width) {
      if (line) lines.push(line);
      line = word;
    } else line = (line + ' ' + word).trim();
  }
  if (line) lines.push(line);
  return lines;
}

const valueLabels = (base: number): Plugin<'bar'> => ({
  id: 'valueLabels',
  afterDatasetsDraw(chart) {
    const { ctx } = chart;
    ctx.save();
    ctx.font = '12px system-ui, sans-serif';
    ctx.fillStyle = '#1f2937';
    ctx.textBaseline = 'middle';
    chart.getDatasetMeta(0).data.forEach((bar, i) => {
      const v = chart.data.datasets[0].data[i] as number;
      ctx.fillText(`${v} (${pct(v, base)}%)`, bar.x + 6, bar.y);
    });
    ctx.restore();
  },
});

const whiteBackground: Plugin<'bar'> = {
  id: 'whiteBackground',
  beforeDraw(chart) {
    const { ctx, width, height } = chart;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  },
};

export function barConfig(
  labels: string[], counts: number[], base: number, title?: string, forImage = false,
): ChartConfiguration<'bar'> {
  return {
    type: 'bar',
    data: {
      labels: labels.map((l) => wrap(l)),
      datasets: [{ data: counts, backgroundColor: COLOR, borderRadius: 3, barThickness: forImage ? 18 : undefined }],
    },
    options: {
      indexAxis: 'y',
      ...(forImage ? { responsive: false, animation: false, devicePixelRatio: 1 } : { maintainAspectRatio: false }),
      layout: { padding: { right: 16 } },
      scales: {
        x: { beginAtZero: true, grace: '28%', ticks: { precision: 0 }, grid: { color: '#eef0f2' } },
        y: { grid: { display: false }, ticks: { font: { size: 12 } } },
      },
      plugins: {
        legend: { display: false },
        title: { display: Boolean(title), text: title ? wrap(title, 80) : '', font: { size: 14, weight: 'bold' }, padding: { bottom: 12 } },
        tooltip: { callbacks: { label: (c) => ` ${c.parsed.x} respondents (${pct(c.parsed.x ?? 0, base)}%)` } },
      },
    },
    plugins: forImage ? [whiteBackground, valueLabels(base)] : [valueLabels(base)],
  } as ChartConfiguration<'bar'>;
}

/** Draw a chart off-screen and return it as a PNG (for embedding in Excel). */
export function renderPng(title: string, labels: string[], counts: number[], base: number) {
  const width = 900;
  const lineCount = labels.reduce((n, l) => n + Math.max(1, wrap(l).length), 0);
  const height = Math.round(90 + lineCount * 15 + labels.length * 16 + wrap(title, 80).length * 18);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const chart = new Chart(canvas, barConfig(labels, counts, base, title, true));
  const dataUrl = canvas.toDataURL('image/png');
  chart.destroy();
  return { dataUrl, width, height };
}
