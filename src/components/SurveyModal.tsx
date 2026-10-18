import React, { useState } from 'react';
import { X, CheckCircle2, ChevronRight, ChevronLeft, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';
import { RESEARCH_QUESTIONS, SurveyResponse, calculateSurveyProgress, summarizeResearchFocus } from '../utils/survey.ts';

interface SurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPrivacyNotice: () => void;
}

export const SurveyModal: React.FC<SurveyModalProps> = ({ isOpen, onClose, onOpenPrivacyNotice }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [surveyData, setSurveyData] = useState<Partial<SurveyResponse>>({
    primaryChallenge: '',
    postConsultationExperience: '',
    continuityPriority: '',
    mentalHealthSupportInterest: '',
    feedbackOrStory: '',
    locationState: 'Lagos',
    consentAgreed: true,
  });

  if (!isOpen) return null;

  const totalSteps = RESEARCH_QUESTIONS.length + 1; // 4 questions + 1 story/consent step
  const progress = calculateSurveyProgress(surveyData);

  const handleSelectOption = (fieldId: keyof SurveyResponse, value: string) => {
    setSurveyData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!surveyData.consentAgreed) return;

    localStorage.setItem('medlinkup_research_survey', JSON.stringify({
      ...surveyData,
      submittedAt: new Date().toISOString(),
    }));
    setSubmitted(true);
  };

  const currentQ = currentStep < RESEARCH_QUESTIONS.length ? RESEARCH_QUESTIONS[currentStep] : null;

  const nigerianStates = [
    'Lagos', 'Abuja (FCT)', 'Rivers', 'Oyo', 'Enugu', 'Kaduna', 'Kano', 'Delta', 'Edo', 'Ogun', 'Anambra', 'Other State'
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="survey-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-6 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono font-medium text-teal-800 uppercase tracking-wider block mb-0.5">
              MedLinkup Healthcare Research
            </span>
            <h3 id="survey-modal-title" className="text-lg font-semibold text-stone-900">
              Women's Healthcare Survey
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Research Survey"
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-stone-100 h-1.5">
          <div
            className="bg-teal-600 h-1.5 transition-all duration-300"
            style={{ width: `${Math.max(10, progress)}%` }}
          ></div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="py-6 text-center space-y-5">
              <div className="w-14 h-14 bg-teal-50 border border-teal-200 text-teal-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono text-teal-800 uppercase tracking-wider block mb-1">
                  Responses Recorded
                </span>
                <h4 className="text-2xl font-light text-stone-900">
                  Thank you for helping shape MedLinkup.
                </h4>
              </div>
              <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                Your lived experience directly informs our clinical care pathways and continuity tooling for women across Nigeria.
              </p>
              <div className="p-4 bg-stone-50 rounded-md border border-stone-200 text-xs text-stone-600 max-w-md mx-auto">
                <span className="font-semibold text-stone-900 block mb-1">Identified Priority Area:</span>
                <span className="text-teal-800 font-medium">{summarizeResearchFocus(surveyData)}</span>
              </div>
              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors cursor-pointer"
                >
                  Return to MedLinkup
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Question View */}
              {currentQ ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between text-xs text-stone-500 pb-2 border-b border-stone-100">
                    <span>Question {currentStep + 1} of {RESEARCH_QUESTIONS.length}</span>
                    <span>Takes ~7 to 10 minutes</span>
                  </div>

                  <h4 className="text-xl font-light text-stone-900 leading-snug">
                    {currentQ.question}
                  </h4>

                  <div className="space-y-3">
                    {currentQ.options.map((option, optIdx) => {
                      const fieldKey = currentQ.id as keyof SurveyResponse;
                      const isSelected = surveyData[fieldKey] === option;
                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectOption(fieldKey, option)}
                          className={`w-full text-left p-4 rounded-lg border text-sm transition-all duration-150 flex items-start gap-3.5 cursor-pointer ${
                            isSelected
                              ? 'bg-teal-50/70 border-teal-600 text-stone-900 ring-1 ring-teal-600'
                              : 'bg-stone-50/60 border-stone-200 text-stone-700 hover:bg-stone-100/70 hover:border-stone-300'
                          }`}
                        >
                          <span
                            className={`w-4 h-4 rounded-full border mt-0.5 shrink-0 flex items-center justify-center ${
                              isSelected ? 'border-teal-700 bg-teal-700' : 'border-stone-400'
                            }`}
                          >
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                          </span>
                          <span className="leading-relaxed">{option}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* Final Step: Voluntary Story, Location & Consent */
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <span className="text-xs font-mono text-teal-800 uppercase tracking-wider block mb-1">
                      Final Step · Context & Consent
                    </span>
                    <h4 className="text-xl font-light text-stone-900 mb-2">
                      Would you like to share anything else about your experience?
                    </h4>
                    <p className="text-xs text-stone-500 leading-relaxed mb-4">
                      Participation is voluntary. You do not need to provide your medical history to participate.
                    </p>
                    <textarea
                      rows={3}
                      value={surveyData.feedbackOrStory || ''}
                      onChange={(e) => setSurveyData({ ...surveyData, feedbackOrStory: e.target.value })}
                      placeholder="Optional: share a brief experience about navigating referrals, scans, or doctors in Nigeria..."
                      className="w-full p-3.5 bg-stone-50 border border-stone-300 rounded-md text-sm text-stone-900 focus:outline-none focus:border-teal-700 focus:bg-white focus:ring-1 focus:ring-teal-700 transition-colors"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                      Primary Location in Nigeria
                    </label>
                    <select
                      value={surveyData.locationState || 'Lagos'}
                      onChange={(e) => setSurveyData({ ...surveyData, locationState: e.target.value })}
                      className="w-full p-3 bg-stone-50 border border-stone-300 rounded-md text-sm text-stone-900 focus:outline-none focus:border-teal-700 focus:bg-white"
                    >
                      {nigerianStates.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Consent Checkbox */}
                  <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 space-y-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={surveyData.consentAgreed ?? false}
                        onChange={(e) => setSurveyData({ ...surveyData, consentAgreed: e.target.checked })}
                        className="mt-1 h-4 w-4 text-teal-700 border-stone-300 rounded focus:ring-teal-700"
                        required
                      />
                      <span className="text-xs text-stone-600 leading-relaxed">
                        I confirm my participation is voluntary and consent to MedLinkup using anonymized insights for product development in compliance with the Nigeria Data Protection Act 2023.{' '}
                        <button
                          type="button"
                          onClick={onOpenPrivacyNotice}
                          className="text-teal-700 underline underline-offset-2"
                        >
                          Review research privacy notice
                        </button>
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={!surveyData.consentAgreed}
                    className="w-full py-3.5 bg-teal-700 hover:bg-teal-800 disabled:bg-stone-300 text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors cursor-pointer"
                  >
                    Submit Research Responses
                  </button>
                </form>
              )}

              {/* Navigation Controls */}
              {currentStep < RESEARCH_QUESTIONS.length && (
                <div className="mt-8 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className="inline-flex items-center gap-1 text-xs font-medium text-stone-500 hover:text-stone-900 disabled:opacity-30 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors cursor-pointer"
                  >
                    <span>{currentStep === RESEARCH_QUESTIONS.length - 1 ? 'Next: Final Notes' : 'Next Question'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
