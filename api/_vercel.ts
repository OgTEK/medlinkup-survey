// ROLLBACK: delete this whole api/ folder to take the API off Vercel.
// Also restore vercel.json to:
//   { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
// The "(?!api/)" rewrite keeps /api/* from being replaced by the landing page.
import type { IncomingMessage, ServerResponse } from 'node:http';
import app from '../server/index.ts';

/** Points the request at an existing Express route, then lets that app handle it. */
export function handle(path: string) {
  return function vercelHandler(req: IncomingMessage, res: ServerResponse) {
    const query = req.url?.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
    req.url = path + query;
    return app(req, res);
  };
}
