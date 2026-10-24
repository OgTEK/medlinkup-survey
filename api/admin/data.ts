// ROLLBACK: delete this file. Live GET /api/admin/data is served by server/index.ts locally.
import { handle } from '../../server/vercel';

export default handle('/api/admin/data');
