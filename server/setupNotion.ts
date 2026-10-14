import 'dotenv/config';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { QUESTIONS, qNumber } from '../src/survey/questions';

const { NOTION_TOKEN, NOTION_PARENT_PAGE_ID } = process.env;
if (!NOTION_TOKEN || !NOTION_PARENT_PAGE_ID) {
  console.error('Set NOTION_TOKEN and NOTION_PARENT_PAGE_ID in .env first (see .env.example).');
  process.exit(1);
}

const text = { rich_text: {} };
const properties: Record<string, unknown> = {
  'Referral Code': { title: {} },
  'Submitted At': { date: {} },
  'Referred By': text,
  'Valid Referral': { checkbox: {} },
  'Referral Note': text,
  Contact: text,
  'Duration (s)': { number: {} },
  'Device Hash': text,
};
for (const q of QUESTIONS) properties[`Q${qNumber(q)}`] = text;

const res = await fetch('https://api.notion.com/v1/databases', {
  method: 'POST',
  headers: { Authorization: `Bearer ${NOTION_TOKEN}`, 'Notion-Version': '2022-06-28', 'Content-Type': 'application/json' },
  body: JSON.stringify({
    parent: { type: 'page_id', page_id: NOTION_PARENT_PAGE_ID },
    title: [{ type: 'text', text: { content: 'Healthcare Survey Responses' } }],
    properties,
  }),
});
const json: any = await res.json();
if (!res.ok) {
  console.error('Notion refused:', json.message ?? json);
  console.error('Make sure the parent page is shared with your integration (… menu → Connections).');
  process.exit(1);
}

// write the id into .env
let env = existsSync('.env') ? readFileSync('.env', 'utf8') : '';
if (/^NOTION_DATABASE_ID=.*$/m.test(env)) env = env.replace(/^NOTION_DATABASE_ID=.*$/m, `NOTION_DATABASE_ID=${json.id}`);
else env += `\nNOTION_DATABASE_ID=${json.id}\n`;
writeFileSync('.env', env);
console.log(`Created Notion database ${json.id}\nSaved NOTION_DATABASE_ID to .env — restart the server.`);
