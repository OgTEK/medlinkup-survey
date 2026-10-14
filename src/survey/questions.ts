export type Answer = string | string[];
export type Answers = Record<string, Answer>;
export type QType = 'single' | 'multi' | 'dropdown' | 'text';

export interface Question {
  id: string; // q1 … q23
  section: string; // A … F
  type: QType;
  text: string;
  options?: string[];
  required: boolean;
  /** Options that clear every other selection when picked (multi only). */
  exclusive?: string[];
  /** Question is only shown (and validated) when this returns true. */
  showIf?: (a: Answers) => boolean;
}

export const SECTIONS = [
  { key: 'A', title: 'About you', purpose: 'Helps us compare experiences across different groups of women.' },
  { key: 'B', title: 'Your healthcare experiences', purpose: 'Grounded in what actually happened to you, not hypothetical opinions.' },
  { key: 'C', title: 'The impact of healthcare challenges', purpose: 'Helps us see which problems are genuinely disruptive.' },
  { key: 'D', title: 'Navigating healthcare and consultations', purpose: 'How women find providers, understand care and make decisions.' },
  { key: 'E', title: 'Follow-up and continuity', purpose: 'We want to test our assumptions about continuity of care, not presume it is absent.' },
  { key: 'F', title: 'Current solutions and unmet needs', purpose: 'Where could improvements matter most?' },
] as const;

const PNS = 'Prefer not to say';

export const NG_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta',
  'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi',
  'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto',
  'Taraba', 'Yobe', 'Zamfara',
];
export const LOCATIONS = [...NG_STATES, 'Federal Capital Territory (FCT)', 'Outside Nigeria', PNS];

const mk = (
  n: number,
  section: string,
  type: QType,
  text: string,
  options?: string[],
  extra: Partial<Question> = {},
): Question => ({ id: `q${n}`, section, type, text, options, required: true, ...extra });

const asString = (v: Answer | undefined) => (typeof v === 'string' ? v : '');

export const QUESTIONS: Question[] = [
  // ── Section A
  mk(1, 'A', 'single', 'Are you a Nigerian woman aged 18 or above?', ['Yes', 'No']),
  mk(2, 'A', 'single', 'What is your age range?', ['18–24', '25–34', '35–44', '45–54', '55–64', '65+', PNS]),
  mk(3, 'A', 'dropdown', 'Where do you currently live?', LOCATIONS),
  mk(4, 'A', 'single', 'How would you describe the area where you live?', ['City/urban', 'Town/semi-urban', 'Rural community', 'Not sure']),

  // ── Section B
  mk(5, 'B', 'single', 'When was the last time you needed professional healthcare for yourself?', [
    'Within the past month', '1–3 months ago', '4–6 months ago', '7–12 months ago', 'More than 12 months ago', 'Never', PNS,
  ]),
  mk(6, 'B', 'single', 'Thinking about that most recent health concern, what kind of care did you need?', [
    'General illness or symptoms', 'Routine checkup or preventive care', 'Reproductive or menstrual health',
    'Pregnancy or postpartum care', 'Chronic or ongoing condition', 'Mental or emotional health',
    'Injury or emergency', 'Other', PNS,
  ]),
  mk(7, 'B', 'single', 'What did you do first when you needed care?', [
    'Visited a hospital or clinic', 'Contacted a healthcare professional I already knew',
    'Asked family or friends for recommendations', 'Searched online', 'Used a healthcare app or telemedicine service',
    'Went to a pharmacy', 'Managed the concern myself', 'Did not take action', 'Other',
  ]),
  mk(8, 'B', 'single', 'Did you eventually receive professional healthcare for that concern?', ['Yes', 'No', 'Not yet', PNS]),
  mk(9, 'B', 'multi', 'What, if anything, made getting the care you needed difficult?', [
    'Nothing, the process was straightforward', 'Cost of consultation or treatment', 'Transportation or distance',
    'Long waiting times', 'Difficulty finding an appropriate provider', 'Difficulty getting an appointment',
    'Uncertainty about where to go', 'Lack of trust in available providers', 'Work or family responsibilities',
    'Fear, discomfort, or previous negative experiences', 'Other',
  ], { exclusive: ['Nothing, the process was straightforward'] }),

  // ── Section C
  mk(10, 'C', 'single', 'In the past 12 months, have you delayed or avoided seeking healthcare when you felt you needed it?', ['Yes', 'No', 'Not sure', PNS]),
  mk(11, 'C', 'single', 'If you delayed or avoided care, what was the main reason?', [
    "I couldn't afford it", "I wasn't sure where to go", "I couldn't find a suitable provider",
    'I was worried about the experience or outcome', "I couldn't make time", 'I felt the symptoms might resolve', 'Other', PNS,
  ], { showIf: (a) => asString(a.q10) === 'Yes' }),
  mk(12, 'C', 'multi', 'What consequences, if any, have healthcare difficulties caused you in the past 12 months?', [
    'Extra medical expenses', 'Delayed consultation or treatment', 'Missed work, school, or responsibilities',
    'Additional visits to different facilities', 'Stress, worry, or uncertainty', 'Difficulty completing recommended care',
    'No significant consequences', 'Other', PNS,
  ], { exclusive: ['No significant consequences', PNS] }),

  // ── Section D
  mk(13, 'D', 'single', 'During your most recent healthcare experience, how easy was it to identify where or whom to go to for care?', [
    'Very easy', 'Somewhat easy', 'Neither easy nor difficult', 'Somewhat difficult', 'Very difficult', 'Not applicable',
  ]),
  mk(14, 'D', 'single', 'During your most recent professional consultation, how clearly did the provider explain your condition, treatment, or next steps?', [
    'Very clearly', 'Somewhat clearly', 'Neither clearly nor unclearly', 'Somewhat unclearly', 'Very unclearly',
    'I have not had a consultation', PNS,
  ]),
  mk(15, 'D', 'single', 'Thinking about your most recent consultation, how well did you feel the healthcare professional understood your concerns and circumstances?', [
    'Very well', 'Somewhat well', 'Neither well nor poorly', 'Somewhat poorly', 'Very poorly', 'Not applicable', PNS,
  ]),

  // ── Section E
  mk(16, 'E', 'single', 'After your most recent consultation, were any further steps recommended?', [
    'Yes, a follow-up appointment', 'Yes, additional tests or treatment', 'Yes, referral to another provider',
    'Yes, more than one of these', 'No', "I don't remember", 'Not applicable',
  ]),
  mk(17, 'E', 'single', 'If further steps were recommended, what happened?', [
    'I completed all recommended steps', 'I completed some', "I haven't completed them yet",
    'I decided not to continue', 'I was unable to continue', PNS,
  ], { showIf: (a) => asString(a.q16).startsWith('Yes') }),
  mk(18, 'E', 'multi', 'What, if anything, made it difficult to continue with the recommended care?', [
    'Nothing made it difficult', 'Cost', 'Time or scheduling', 'Transportation', 'Unclear instructions',
    'Difficulty contacting the provider', 'Difficulty obtaining records or results', 'Concern about the treatment', 'Other',
  ], {
    exclusive: ['Nothing made it difficult'],
    showIf: (a) =>
      ['I completed some', "I haven't completed them yet", 'I decided not to continue', 'I was unable to continue'].includes(asString(a.q17)),
  }),
  mk(19, 'E', 'single', 'When you visit a healthcare provider for an ongoing concern, how often do you need to repeat information about your medical history or previous treatment?', [
    'Always', 'Often', 'Sometimes', 'Rarely', 'Never', "I haven't received care for an ongoing concern", 'Not sure',
  ]),

  // ── Section F
  mk(20, 'F', 'multi', 'How do you currently keep track of healthcare information, such as appointments, prescriptions, test results, or treatment instructions?', [
    'Paper records', 'Photos or documents on my phone', 'Notes, calendar, or reminders', 'Hospital or clinic patient portal',
    'Healthcare or health tracking app', 'I rely on the healthcare facility', "I don't actively keep track", 'Other',
  ], { exclusive: ["I don't actively keep track"] }),
  mk(21, 'F', 'single', 'When you need medical advice or support between appointments, what do you usually do first?', [
    'Contact the same healthcare provider', 'Contact another healthcare professional', 'Visit a pharmacy', 'Search online',
    'Ask family or friends', 'Use a healthcare app', 'Wait until my next appointment',
    "I haven't needed support between appointments", 'Other',
  ]),
  mk(22, 'F', 'single', 'Thinking about your healthcare experiences, which ONE area would you most like to see improved?', [
    'Affordability', 'Finding appropriate healthcare professionals', 'Waiting times and appointment availability',
    'Communication and explanations from providers', 'Follow-up care and ongoing support',
    'Access to medical records and information', 'Coordination between providers',
    'Respect, trust, and personalized attention', 'Access to mental healthcare', 'Something else', 'Nothing in particular',
  ]),
  mk(23, 'F', 'text', 'In your own words, what is the most important thing you would change about your healthcare experiences, and why?', undefined, { required: false }),
];

export const qNumber = (q: Question) => q.id.slice(1);

export function visibleQuestions(a: Answers): Question[] {
  return QUESTIONS.filter((q) => !q.showIf || q.showIf(a));
}

/** Shared by the browser (UX) and the server (trust boundary). */
export function validateAnswers(a: Answers): { errors: Record<string, string>; clean: Answers } {
  const errors: Record<string, string> = {};
  const clean: Answers = {};
  for (const q of visibleQuestions(a)) {
    const v = a[q.id];
    if (q.type === 'text') {
      const s = typeof v === 'string' ? v.trim() : '';
      if (s.length > 3000) errors[q.id] = 'Please keep this under 3000 characters.';
      else if (s) clean[q.id] = s;
      else if (q.required) errors[q.id] = 'This question is required.';
    } else if (q.type === 'multi') {
      const arr = Array.isArray(v) ? v : [];
      if (!arr.every((x) => typeof x === 'string' && q.options!.includes(x))) errors[q.id] = 'Invalid selection.';
      else if (arr.length) clean[q.id] = [...new Set(arr)];
      else if (q.required) errors[q.id] = 'Please select at least one answer.';
    } else {
      if (typeof v === 'string' && v) {
        if (q.options!.includes(v)) clean[q.id] = v;
        else errors[q.id] = 'Invalid selection.';
      } else if (q.required) errors[q.id] = 'Please choose an answer.';
    }
  }
  return { errors, clean };
}
