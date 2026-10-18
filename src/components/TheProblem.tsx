import { useScrollReveal } from '../utils/useScrollReveal';

export const TheProblem: React.FC = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>('.problem-fade-up, .problem-question-card', 0.08);

  const patientQuestions = [
    {
      q: 'Where should you get the scan?',
      detail: 'Finding an accredited imaging centre with reasonable rates and working equipment.',
    },
    {
      q: 'Who explains the results?',
      detail: 'Navigating dense radiology reports without clinical jargon leaving you anxious.',
    },
    {
      q: 'Which specialist do you see next?',
      detail: 'Choosing the right doctor whose expertise actually matches your diagnostic findings.',
    },
    {
      q: 'Will they know what your previous doctor recommended?',
      detail: 'Carrying manila folders of paper records and having to recount your history from scratch.',
    },
  ];

  return (
    <section
      id="why-medlinkup"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-stone-100/60 border-b border-stone-200/70"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Editorial Section Index */}
        <div className="flex items-center gap-3 mb-6 text-xs font-semibold tracking-widest text-teal-800 uppercase">
          <span>02. The Problem</span>
          <span className="w-8 h-px bg-stone-300"></span>
          <span className="text-stone-500 font-normal">Beyond The Initial Appointment</span>
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mb-14">
          <h2 className="problem-fade-up text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-stone-900 leading-tight mb-6">
            Finding care is only the beginning.
          </h2>
          <p className="problem-fade-up text-lg sm:text-xl text-stone-700 font-normal leading-relaxed">
            You leave a consultation with a scan request and a referral. Then the questions begin.
          </p>
        </div>

        {/* Four Questions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {patientQuestions.map((item, idx) => (
            <div
              key={idx}
              className="problem-question-card bg-white p-6 sm:p-7 rounded-lg border border-stone-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-mono font-medium text-teal-700 mb-3 tracking-wider">
                  QUESTION 0{idx + 1}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-stone-900 leading-snug mb-3">
                  {item.q}
                </h3>
              </div>
              <p className="text-xs text-stone-500 leading-relaxed pt-3 border-t border-stone-100">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        {/* The Core Insight */}
        <div className="problem-fade-up max-w-4xl bg-white p-8 sm:p-10 rounded-lg border border-stone-200 shadow-xs">
          <div className="space-y-4 text-base sm:text-lg text-stone-700 font-normal leading-relaxed">
            <p>
              And sometimes the challenge begins even earlier, when you're trying to find the right healthcare professional in the first place.
            </p>
            <p>
              Healthcare can involve different professionals, appointments, tests and decisions. Yet patients are often left to connect all those pieces themselves.
            </p>
            <p className="text-xl sm:text-2xl font-light text-stone-900 pt-2 leading-snug border-t border-stone-100">
              Getting the care you need shouldn't mean figuring everything out alone.
            </p>
            <p className="text-teal-800 font-medium text-base pt-1">
              That's the problem we're working to solve.
            </p>
          </div>

          {/* Clean Before / After Journey Comparison */}
          <div className="mt-8 pt-8 border-t border-stone-100 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-stone-50 p-5 rounded-md border border-stone-200/70">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-3">
                The Disconnected Reality Today
              </span>
              <ul className="space-y-2 text-xs text-stone-600">
                <li className="flex items-start gap-2">
                  <span className="text-stone-400 font-mono">1.</span> Isolated doctor consultation
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-stone-400 font-mono">2.</span> Patient left to hunt for labs & diagnostic scan centres
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-stone-400 font-mono">3.</span> Unexplained scan reports & guessing next steps
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-stone-400 font-mono">4.</span> Starting from zero with new specialist
                </li>
              </ul>
            </div>

            <div className="bg-teal-50/60 p-5 rounded-md border border-teal-200/70">
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-800 block mb-3">
                The MedLinkup Connected Continuity
              </span>
              <ul className="space-y-2 text-xs text-teal-900">
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-mono">1.</span> Matched with vetted healthcare professionals
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-mono">2.</span> Clear care programmes coordinating scans & specialist referrals
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-mono">3.</span> Shared clinical context with your permission
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-mono">4.</span> Proactive reminders, follow-ups & integrated mental health
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
