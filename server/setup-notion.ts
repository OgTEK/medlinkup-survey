import 'dotenv/config';
import { notionFetch, notionSchema } from './store';
import { config } from '../shared/config';

const token = process.env.NOTION_TOKEN;
const parent = process.env.NOTION_PARENT_PAGE_ID?.replace(/-/g, '');

if (!token || !parent) {
  console.error('Set NOTION_TOKEN and NOTION_PARENT_PAGE_ID in .env first (see .env.example).');
  process.exit(1);
}

try {
  const db = await notionFetch(token, '/databases', {
    method: 'POST',
    body: JSON.stringify({
      parent: { type: 'page_id', page_id: parent },
      title: [{ type: 'text', text: { content: `${config.org} survey responses` } }],
      properties: notionSchema(),
    }),
  });
  console.log('\nDatabase created: ' + db.url);
  console.log('\nAdd this line to your .env, then restart the server:\n');
  console.log(`NOTION_DATABASE_ID=${db.id}\n`);
} catch (e) {
  console.error(String(e));
  console.error('\nCheck that the integration is connected to the parent page (••• > Connections).');
  process.exit(1);
}
