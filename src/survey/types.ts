import type { Answers } from './questions';

export interface SurveyResponse {
  id: string;
  submittedAt: string; // ISO
  answers: Answers;
  refCode: string; // this respondent's own referral code
  referredBy: string | null; // referral code that brought them here (only if it was a real code)
  deviceHash: string; // salted hash of a random per-browser id, never shown in the admin UI
  durationSec: number;
  contact: string; // optional, kept apart from the answers; only used to deliver the gift
  validReferral: boolean; // does this response count toward its referrer's total?
  referralNote: string; // why a referral was not counted
}

export type AdminResponse = Omit<SurveyResponse, 'deviceHash'>;

export interface LeaderRow {
  rank: number;
  refCode: string;
  contact: string;
  validReferrals: number;
  totalReferrals: number;
}

export interface AdminPayload {
  storage: 'notion' | 'file';
  responses: AdminResponse[];
  leaderboard: LeaderRow[];
}
