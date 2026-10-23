import { config } from '../shared/config';
import type { LeaderboardRow, ResponseView, StoredResponse } from '../shared/types';

/**
 * Decides which responses are flagged and which referrals count.
 *
 * A referral is VALID when the response:
 *  - used a referral code that belongs to an existing respondent,
 *  - came from a different device than the referrer,
 *  - is the first completed response from that device,
 *  - was not completed faster than `minDurationSeconds` (0 disables the speed check;
 *    a genuine survey can be finished in 30 seconds or less).
 */
export function evaluate(responses: StoredResponse[]): { views: ResponseView[]; leaderboard: LeaderboardRow[] } {
  const sorted = [...responses].sort((a, b) => a.submittedAt.localeCompare(b.submittedAt));
  const byCode = new Map(sorted.map((r) => [r.referralCode, r]));
  const seenDevices = new Set<string>();
  const views: ResponseView[] = [];

  for (const r of sorted) {
    const referrer = r.referredBy ? byCode.get(r.referredBy) : undefined;
    let flag: string | null = null;

    if (r.referredBy && !referrer) flag = 'Unknown referral code';
    else if (referrer && referrer.deviceId === r.deviceId) flag = 'Self-referral (same device as referrer)';
    else if (seenDevices.has(r.deviceId)) flag = 'Duplicate device';
    else if (r.durationSeconds < config.minDurationSeconds) flag = `Completed too quickly (${r.durationSeconds}s)`;

    seenDevices.add(r.deviceId);
    views.push({ ...r, flag, validReferral: Boolean(r.referredBy) && flag === null });
  }

  const board = new Map<string, LeaderboardRow>();
  for (const v of views) {
    if (!v.referredBy) continue;
    const referrer = byCode.get(v.referredBy);
    if (!referrer) continue;
    const row =
      board.get(referrer.referralCode) ??
      { code: referrer.referralCode, contact: referrer.contact, valid: 0, total: 0, reachedAt: '' };
    row.total++;
    if (v.validReferral) {
      row.valid++;
      row.reachedAt = v.submittedAt;
    }
    board.set(referrer.referralCode, row);
  }

  const leaderboard = [...board.values()].sort(
    (a, b) => b.valid - a.valid || (a.reachedAt || '~').localeCompare(b.reachedAt || '~'),
  );
  return { views: views.reverse(), leaderboard }; // newest first
}
