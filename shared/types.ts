export type Answers = Record<string, string | string[]>;

export type QuestionType = 'single' | 'multi' | 'dropdown' | 'paragraph';

export interface Question {
  id: string; // e.g. "q7"
  n: number;
  section: string; // "A".."F"
  short: string; // short column label
  text: string;
  type: QuestionType;
  required?: boolean;
  options?: string[];
  /** Multi-choice options that clear all other selections when chosen. */
  exclusive?: string[];
  helper?: string;
  showIf?: (answers: Answers) => boolean;
}

export interface Section {
  id: string;
  title: string;
}

export interface StoredResponse {
  id: string;
  submittedAt: string; // ISO
  answers: Answers;
  referralCode: string; // this respondent's own code
  referredBy: string; // code of whoever referred them ('' if none)
  contact: string; // optional, for the gift
  deviceId: string;
  durationSeconds: number;
}

export interface ResponseView extends StoredResponse {
  /** null = nothing wrong. Otherwise why this response is flagged. */
  flag: string | null;
  /** true when referredBy is set and the referral counts. */
  validReferral: boolean;
}

export interface LeaderboardRow {
  code: string;
  contact: string;
  valid: number;
  total: number;
  reachedAt: string; // ISO time the latest valid referral came in (tie-break: earlier wins)
}

export interface AdminData {
  storage: 'notion' | 'file';
  generatedAt: string;
  responses: ResponseView[];
  leaderboard: LeaderboardRow[];
}

export interface SubmitPayload {
  answers: Answers;
  ref: string;
  contact: string;
  deviceId: string;
  durationSeconds: number;
  website?: string; // honeypot
}
