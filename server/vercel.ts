// ROLLBACK: delete this file. It only exists so Vercel can call the Express app.
// Vercel skips api files whose names start with "_" and cannot import ".ts" paths at runtime.
import type { IncomingMessage, ServerResponse } from 'node:http';
import app from './index';

/** Points the request at an existing Express route, then lets that app handle it. */
export function handle(path: string) {
  return function vercelHandler(req: IncomingMessage, res: ServerResponse) {
    const query = req.url?.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
    req.url = path + query;
    return app(req, res);
  };
}
