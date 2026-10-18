/**
 * Research Survey utilities for MedLinkup healthcare research study.
 */

export interface SurveyResponse {
  primaryChallenge: string;
  postConsultationExperience: string;
  continuityPriority: string;
  mentalHealthSupportInterest: string;
  feedbackOrStory?: string;
  locationState?: string;
  consentAgreed: boolean;
}

export const RESEARCH_QUESTIONS = [
  {
    id: 'primaryChallenge',
    question: 'When seeking healthcare for yourself, what has been your biggest hurdle?',
    options: [
      'Finding the right, qualified specialist for my specific concern',
      'Knowing where to get recommended diagnostic scans and blood work',
      'Understanding what the doctor diagnosed and what comes next',
      'Coordinating between different doctors who don’t talk to each other',
      'High and unpredictable out-of-pocket costs at each step',
    ],
  },
  {
    id: 'postConsultationExperience',
    question: 'After leaving an appointment with tests or referrals, how do you usually feel?',
    options: [
      'Left to figure out the next steps completely on my own',
      'Overwhelmed trying to find labs and specialists with good reputations',
      'Worried that my next doctor won’t know my medical history',
      'Reasonably supported, but wish there was a clear follow-up plan',
    ],
  },
  {
    id: 'continuityPriority',
    question: 'Which capability would make the most meaningful difference to your care?',
    options: [
      'A dedicated care plan that coordinates appointments, scans, and follow-ups',
      'A secure record of my consultations so doctors have context without repeating everything',
      'Direct guidance on expected costs before booking tests and visits',
      'Access to vetted female healthcare specialists and gynaecologists',
    ],
  },
  {
    id: 'mentalHealthSupportInterest',
    question: 'How valuable is having access to mental health support alongside medical care?',
    options: [
      'Extremely valuable — physical health concerns often cause emotional strain',
      'Valuable — would appreciate having it included when navigating serious diagnoses',
      'Somewhat valuable — depending on the condition',
      'Not a priority for me right now',
    ],
  },
];

/**
 * Calculates completion percentage of survey.
 */
export function calculateSurveyProgress(response: Partial<SurveyResponse>): number {
  const requiredKeys: (keyof SurveyResponse)[] = [
    'primaryChallenge',
    'postConsultationExperience',
    'continuityPriority',
    'mentalHealthSupportInterest',
    'consentAgreed',
  ];

  let completed = 0;
  for (const key of requiredKeys) {
    if (key === 'consentAgreed') {
      if (response[key] === true) completed++;
    } else if (response[key] && typeof response[key] === 'string' && response[key]!.trim().length > 0) {
      completed++;
    }
  }

  return Math.round((completed / requiredKeys.length) * 100);
}

/**
 * Summarizes the dominant theme from a survey response.
 */
export function summarizeResearchFocus(response: Partial<SurveyResponse>): string {
  if (response.continuityPriority?.includes('dedicated care plan')) {
    return 'Structured Care Coordination';
  }
  if (response.continuityPriority?.includes('secure record')) {
    return 'Health History Continuity';
  }
  if (response.continuityPriority?.includes('vetted female')) {
    return 'Specialist Verification & Access';
  }
  return 'Connected Patient Journey';
}
