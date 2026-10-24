// ROLLBACK: delete this file. Live POST /api/responses is served by server/index.ts locally.
import { handle } from '../server/vercel';

export default handle('/api/responses');
