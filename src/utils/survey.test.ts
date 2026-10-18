import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateSurveyProgress,
  summarizeResearchFocus,
  RESEARCH_QUESTIONS,
} from './survey.ts';

test('RESEARCH_QUESTIONS has valid structure and 4 questions', () => {
  assert.equal(RESEARCH_QUESTIONS.length, 4);
  RESEARCH_QUESTIONS.forEach((q) => {
    assert.ok(q.id);
    assert.ok(q.question);
    assert.ok(q.options.length >= 3);
  });
});

test('calculateSurveyProgress correctly evaluates completion percentage', () => {
  assert.equal(calculateSurveyProgress({}), 0);

  const partial = calculateSurveyProgress({
    primaryChallenge: 'Finding the right doctor',
    postConsultationExperience: 'Left to figure out',
  });
  assert.equal(partial, 40);

  const full = calculateSurveyProgress({
    primaryChallenge: 'Finding the right doctor',
    postConsultationExperience: 'Left to figure out',
    continuityPriority: 'A dedicated care plan that coordinates appointments',
    mentalHealthSupportInterest: 'Extremely valuable',
    consentAgreed: true,
  });
  assert.equal(full, 100);
});

test('summarizeResearchFocus identifies correct focus', () => {
  assert.equal(
    summarizeResearchFocus({
      continuityPriority: 'A dedicated care plan that coordinates appointments',
    }),
    'Structured Care Coordination'
  );
  assert.equal(
    summarizeResearchFocus({
      continuityPriority: 'A secure record of my consultations',
    }),
    'Health History Continuity'
  );
});
