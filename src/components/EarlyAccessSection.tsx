import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Mail, Phone, MapPin, User } from 'lucide-react';
import { validateEarlyAccessForm, EarlyAccessFormData, ValidationErrors } from '../utils/validation.ts';
import { useScrollReveal } from '../utils/useScrollReveal';

export const EarlyAccessSection: React.FC = () => {
  const containerRef = useScrollReveal<HTMLDivElement>('.early-access-fade-up', 0.1);
  const [formData, setFormData] = useState<EarlyAccessFormData>({
    firstName: '',
    email: '',
    phoneNumber: '',
    city: '',
    agreeToUpdates: true,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [queueNumber, setQueueNumber] = useState<number>(0);

  useEffect(() => {
    // Check if user already joined previously
    const saved = localStorage.getItem('medlinkup_early_access');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.email) {
          setFormData(parsed);
          setSubmitted(true);
          setQueueNumber(parsed.queueNumber || 418);
        }
      } catch {
        // ignore parse error
      }
    }
  }, []);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateEarlyAccessForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    // Simulate reliable dispatch & persist to local storage
    setTimeout(() => {
      const assignedQueue = Math.floor(Math.random() * 80) + 420;
      const payload = {
        ...formData,
        queueNumber: assignedQueue,
        submittedAt: new Date().toISOString(),
      };
      localStorage.setItem('medlinkup_early_access', JSON.stringify(payload));
      setQueueNumber(assignedQueue);
      setIsSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  const handleReset = () => {
    localStorage.removeItem('medlinkup_early_access');
    setSubmitted(false);
    setFormData({
      firstName: '',
      email: '',
      phoneNumber: '',
      city: '',
      agreeToUpdates: true,
    });
  };

  const popularCities = ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Enugu', 'Kaduna', 'Benin City', 'Other'];

  return (
    <section
      id="early-access"
      ref={containerRef}
      className="py-24 sm:py-32 bg-stone-100/60 border-b border-stone-200/70"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Editorial Section Index */}
        <div className="flex items-center gap-3 mb-6 text-xs font-semibold tracking-widest text-teal-800 uppercase">
          <span>10. Get Early Access</span>
          <span className="w-8 h-px bg-stone-300"></span>
          <span className="text-stone-500 font-normal">Join Our Pilot Cohort</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Context & Invitation */}
          <div className="lg:col-span-5 early-access-fade-up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-stone-900 leading-tight mb-6">
              Be part of what's coming.
            </h2>
            <p className="text-lg text-stone-700 font-normal leading-relaxed mb-6">
              We're building a more connected healthcare experience, and we'd love to bring you along.
            </p>
            <p className="text-base text-stone-600 leading-relaxed mb-8">
              Join our early-access list to receive product updates, hear about research and testing opportunities, and be among the first to know when MedLinkup becomes available.
            </p>

            <div className="p-5 bg-white rounded-lg border border-stone-200/80 space-y-3 text-xs text-stone-600">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <span>Priority invitation to private platform preview trials</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <span>Direct opportunities to test clinic workflow prototypes</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <span>Regular dispatches on women's healthcare systems research in Nigeria</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Form / Success State */}
          <div className="lg:col-span-7 early-access-fade-up">
            <div className="bg-white rounded-lg border border-stone-200 shadow-xs p-8 sm:p-10">
              {submitted ? (
                <div className="py-6 space-y-6 text-center sm:text-left">
                  <div className="w-12 h-12 rounded-full bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center mx-auto sm:mx-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>

                  <div>
                    <span className="text-xs font-mono text-teal-700 uppercase tracking-wider block mb-1">
                      Early Access Confirmed · Queue #{queueNumber}
                    </span>
                    <h3 className="text-2xl font-light text-stone-900">
                      Welcome, {formData.firstName}. You're on the list.
                    </h3>
                  </div>

                  <p className="text-stone-600 text-sm leading-relaxed max-w-lg">
                    We've registered your interest for <strong className="text-stone-900">{formData.email}</strong>. As we finalize our clinical onboarding protocol and initial cohort in Nigeria, you'll be among the very first to receive updates.
                  </p>

                  <div className="p-4 bg-stone-50 rounded-md border border-stone-200/80 text-xs text-stone-500">
                    <p>
                      Need to update your details or register another address?{' '}
                      <button
                        onClick={handleReset}
                        className="text-teal-700 font-medium hover:underline cursor-pointer"
                      >
                        Reset form
                      </button>
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {/* First Name */}
                  <div>
                    <label htmlFor="firstName" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                      First Name <span className="text-teal-700">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="e.g. Zainab"
                        className={`w-full pl-10 pr-4 py-3 bg-stone-50 border rounded-md text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:bg-white transition-colors ${
                          errors.firstName
                            ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                            : 'border-stone-300 focus:border-teal-700 focus:ring-1 focus:ring-teal-700'
                        }`}
                        aria-invalid={!!errors.firstName}
                        aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                      />
                    </div>
                    {errors.firstName && (
                      <p id="firstName-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.firstName}
                      </p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                      Email Address <span className="text-teal-700">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. zainab@example.ng"
                        className={`w-full pl-10 pr-4 py-3 bg-stone-50 border rounded-md text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:bg-white transition-colors ${
                          errors.email
                            ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                            : 'border-stone-300 focus:border-teal-700 focus:ring-1 focus:ring-teal-700'
                        }`}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                    </div>
                    {errors.email && (
                      <p id="email-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone Number (optional) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phoneNumber" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                        Phone Number <span className="text-stone-400 font-normal lowercase">(optional)</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                          <Phone className="w-4 h-4" />
                        </div>
                        <input
                          type="tel"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={formData.phoneNumber || ''}
                          onChange={handleChange}
                          placeholder="e.g. 0803 123 4567"
                          className={`w-full pl-10 pr-4 py-3 bg-stone-50 border rounded-md text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:bg-white transition-colors ${
                            errors.phoneNumber
                              ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                              : 'border-stone-300 focus:border-teal-700 focus:ring-1 focus:ring-teal-700'
                          }`}
                        />
                      </div>
                      {errors.phoneNumber && (
                        <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.phoneNumber}
                        </p>
                      )}
                    </div>

                    {/* City (optional) */}
                    <div>
                      <label htmlFor="city" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                        City <span className="text-stone-400 font-normal lowercase">(optional)</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <select
                          id="city"
                          name="city"
                          value={formData.city || ''}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-300 rounded-md text-sm text-stone-900 focus:outline-none focus:border-teal-700 focus:bg-white focus:ring-1 focus:ring-teal-700 transition-colors"
                        >
                          <option value="">Select city in Nigeria...</option>
                          {popularCities.map((city) => (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-white bg-teal-700 hover:bg-teal-800 disabled:bg-teal-700/60 rounded-md transition-colors shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Joining list...</span>
                      ) : (
                        <>
                          <span>Join the Early-Access List</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Mandatory disclaimer from prompt */}
                  <p className="text-xs text-stone-500 leading-relaxed border-t border-stone-100 pt-4">
                    By joining, you agree to receive MedLinkup updates. You can unsubscribe at any time. Joining the list does not guarantee access to healthcare services or participation in a future pilot.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
