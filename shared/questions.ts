import { STATES } from './config';
import type { Answers, Question, Section } from './types';

export const SECTIONS: Section[] = [
  { id: 'A', title: 'About you' },
  { id: 'B', title: 'Your healthcare experiences' },
  { id: 'C', title: 'The impact of healthcare challenges' },
  { id: 'D', title: 'Navigating healthcare and consultations' },
  { id: 'E', title: 'Follow-up and continuity' },
  { id: 'F', title: 'Current solutions and unmet needs' },
];

const PNS = 'Prefer not to say';
const isYes = (a: Answers) => typeof a.q16 === 'string' && a.q16.startsWith('Yes');

export const QUESTIONS: Question[] = [
  // ---------- Section A ----------
  {
    id: 'q1', n: 1, section: 'A', short: 'Eligible', type: 'single', required: true,
    text: 'Are you a Nigerian woman aged 18 or above?',
    options: ['Yes', 'No'],
  },
  {
    id: 'q2', n: 2, section: 'A', short: 'Age range', type: 'single', required: true,
    text: 'What is your age range?',
    options: ['18–24', '25–34', '35–44', '45–54', '55–64', '65+', PNS],
  },
  {
    id: 'q3', n: 3, section: 'A', short: 'Location', type: 'dropdown', required: true,
    text: 'Where do you currently live?',
    options: [...STATES, 'Outside Nigeria', PNS],
  },
  {
    id: 'q4', n: 4, section: 'A', short: 'Area type', type: 'single',
    text: 'How would you describe the area where you live?',
    options: ['City/urban', 'Town/semi-urban', 'Rural community', 'Not sure'],
  },

  // ---------- Section B ----------
  {
    id: 'q5', n: 5, section: 'B', short: 'Last needed care', type: 'single',
    text: 'When was the last time you needed professional healthcare for yourself?',
    options: ['Within the past month', '1–3 months ago', '4–6 months ago', '7–12 months ago', 'More than 12 months ago', 'Never', PNS],
  },
  {
    id: 'q6', n: 6, section: 'B', short: 'Type of care', type: 'single',
    text: 'Thinking about that most recent health concern, what kind of care did you need?',
    options: [
      'General illness or symptoms', 'Routine checkup or preventive care', 'Reproductive or menstrual health',
      'Pregnancy or postpartum care', 'Chronic or ongoing condition', 'Mental or emotional health',
      'Injury or emergency', 'Other', PNS,
    ],
  },
  {
    id: 'q7', n: 7, section: 'B', short: 'First action', type: 'single',
    text: 'What did you do first when you needed care?',
    options: [
      'Visited a hospital or clinic', 'Contacted a healthcare professional I already knew',
      'Asked family or friends for recommendations', 'Searched online',
      'Used a healthcare app or telemedicine service', 'Went to a pharmacy',
      'Managed the concern myself', 'Did not take action', 'Other',
    ],
  },
  {
    id: 'q8', n: 8, section: 'B', short: 'Received care', type: 'single',
    text: 'Did you eventually receive professional healthcare for that concern?',
    options: ['Yes', 'No', 'Not yet', PNS],
  },
  {
    id: 'q9', n: 9, section: 'B', short: 'Barriers', type: 'multi',
    text: 'What, if anything, made getting the care you needed difficult?',
    helper: 'Select all that apply.',
    options: [
      'Nothing, the process was straightforward', 'Cost of consultation or treatment', 'Transportation or distance',
      'Long waiting times', 'Difficulty finding an appropriate provider', 'Difficulty getting an appointment',
      'Uncertainty about where to go', 'Lack of trust in available providers', 'Work or family responsibilities',
      'Fear, discomfort, or previous negative experiences', 'Other',
    ],
    exclusive: ['Nothing, the process was straightforward'],
  },

  // ---------- Section C ----------
  {
    id: 'q10', n: 10, section: 'C', short: 'Delayed care', type: 'single',
    text: 'In the past 12 months, have you delayed or avoided seeking healthcare when you felt you needed it?',
    options: ['Yes', 'No', 'Not sure', PNS],
  },
  {
    id: 'q11', n: 11, section: 'C', short: 'Main delay reason', type: 'single',
    text: 'If you delayed or avoided care, what was the main reason?',
    showIf: (a) => a.q10 === 'Yes',
    options: [
      "I couldn't afford it", "I wasn't sure where to go", "I couldn't find a suitable provider",
      'I was worried about the experience or outcome', "I couldn't make time",
      'I felt the symptoms might resolve', 'Other', PNS,
    ],
  },
  {
    id: 'q12', n: 12, section: 'C', short: 'Consequences', type: 'multi',
    text: 'What consequences, if any, have healthcare difficulties caused you in the past 12 months?',
    helper: 'Select all that apply.',
    options: [
      'Extra medical expenses', 'Delayed consultation or treatment', 'Missed work, school, or responsibilities',
      'Additional visits to different facilities', 'Stress, worry, or uncertainty',
      'Difficulty completing recommended care', 'No significant consequences', 'Other', PNS,
    ],
    exclusive: ['No significant consequences', PNS],
  },

  // ---------- Section D ----------
  {
    id: 'q13', n: 13, section: 'D', short: 'Ease finding provider', type: 'single',
    text: 'During your most recent healthcare experience, how easy was it to identify where or whom to go to for care?',
    options: ['Very easy', 'Somewhat easy', 'Neither easy nor difficult', 'Somewhat difficult', 'Very difficult', 'Not applicable'],
  },
  {
    id: 'q14', n: 14, section: 'D', short: 'Clarity of explanation', type: 'single',
    text: 'During your most recent professional consultation, how clearly did the provider explain your condition, treatment, or next steps?',
    options: ['Very clearly', 'Somewhat clearly', 'Neither clearly nor unclearly', 'Somewhat unclearly', 'Very unclearly', 'I have not had a consultation', PNS],
  },
  {
    id: 'q15', n: 15, section: 'D', short: 'Felt understood', type: 'single',
    text: 'Thinking about your most recent consultation, how well did you feel the healthcare professional understood your concerns and circumstances?',
    options: ['Very well', 'Somewhat well', 'Neither well nor poorly', 'Somewhat poorly', 'Very poorly', 'Not applicable', PNS],
  },

  // ---------- Section E ----------
  {
    id: 'q16', n: 16, section: 'E', short: 'Further steps recommended', type: 'single',
    text: 'After your most recent consultation, were any further steps recommended?',
    options: [
      'Yes, a follow-up appointment', 'Yes, additional tests or treatment', 'Yes, referral to another provider',
      'Yes, more than one of these', 'No', "I don't remember", 'Not applicable',
    ],
  },
  {
    id: 'q17', n: 17, section: 'E', short: 'What happened next', type: 'single',
    text: 'If further steps were recommended, what happened?',
    showIf: isYes,
    options: [
      'I completed all recommended steps', 'I completed some', "I haven't completed them yet",
      'I decided not to continue', 'I was unable to continue', PNS,
    ],
  },
  {
    id: 'q18', n: 18, section: 'E', short: 'Difficulty continuing', type: 'multi',
    text: 'What, if anything, made it difficult to continue with the recommended care?',
    helper: 'Select all that apply.',
    showIf: isYes,
    options: [
      'Nothing made it difficult', 'Cost', 'Time or scheduling', 'Transportation', 'Unclear instructions',
      'Difficulty contacting the provider', 'Difficulty obtaining records or results', 'Concern about the treatment', 'Other',
    ],
    exclusive: ['Nothing made it difficult'],
  },
  {
    id: 'q19', n: 19, section: 'E', short: 'Repeat history', type: 'single',
    text: 'When you visit a healthcare provider for an ongoing concern, how often do you need to repeat information about your medical history or previous treatment?',
    options: ['Always', 'Often', 'Sometimes', 'Rarely', 'Never', "I haven't received care for an ongoing concern", 'Not sure'],
  },

  // ---------- Section F ----------
  {
    id: 'q20', n: 20, section: 'F', short: 'Tracking health info', type: 'multi',
    text: 'How do you currently keep track of healthcare information, such as appointments, prescriptions, test results, or treatment instructions?',
    helper: 'Select all that apply.',
    options: [
      'Paper records', 'Photos or documents on my phone', 'Notes, calendar, or reminders',
      'Hospital or clinic patient portal', 'Healthcare or health tracking app',
      'I rely on the healthcare facility', "I don't actively keep track", 'Other',
    ],
    exclusive: ["I don't actively keep track"],
  },
  {
    id: 'q21', n: 21, section: 'F', short: 'Between appointments', type: 'single',
    text: 'When you need medical advice or support between appointments, what do you usually do first?',
    options: [
      'Contact the same healthcare provider', 'Contact another healthcare professional', 'Visit a pharmacy',
      'Search online', 'Ask family or friends', 'Use a healthcare app', 'Wait until my next appointment',
      "I haven't needed support between appointments", 'Other',
    ],
  },
  {
    id: 'q22', n: 22, section: 'F', short: 'Top improvement', type: 'single',
    text: 'Thinking about your healthcare experiences, which ONE area would you most like to see improved?',
    options: [
      'Affordability', 'Finding appropriate healthcare professionals', 'Waiting times and appointment availability',
      'Communication and explanations from providers', 'Follow-up care and ongoing support',
      'Access to medical records and information', 'Coordination between providers',
      'Respect, trust, and personalized attention', 'Access to mental healthcare', 'Something else', 'Nothing in particular',
    ],
  },
  {
    id: 'q23', n: 23, section: 'F', short: 'Biggest change', type: 'paragraph',
    text: 'In your own words, what is the most important thing you would change about your healthcare experiences, and why?',
    helper: 'Optional',
  },
];

export const PARAGRAPH_MAX = 2000;

export const columnName = (q: Question) => `Q${q.n} ${q.short}`;

export const isVisible = (q: Question, a: Answers) => !q.showIf || q.showIf(a);

export const isAnswered = (v: string | string[] | undefined) =>
  Array.isArray(v) ? v.length > 0 : typeof v === 'string' && v.trim() !== '';
