import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, ArrowRight, Mail, Phone, MapPin, User } from 'lucide-react';
import { validateEarlyAccessForm, EarlyAccessFormData, ValidationErrors } from '../utils/validation';
import { Modal } from './Modal';

interface EarlyAccessModalProps {
  open: boolean;
  onClose: () => void;
}

const popularCities = ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Enugu', 'Kaduna', 'Benin City', 'Other'];

export const EarlyAccessModal: React.FC<EarlyAccessModalProps> = ({ open, onClose }) => {
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

  // Restore saved submission when the modal opens
  useEffect(() => {
    if (!open) return;
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
  }, [open]);

  // Clear transient errors / submitting state when the modal closes
  useEffect(() => {
    if (!open) {
      setErrors({});
      setIsSubmitting(false);
    }
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
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

  return (
    <Modal open={open} onClose={onClose} title="Get Early Access">
      <div className="px-6 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        {/* Editorial index — kept, but inline inside the modal */}
        <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-teal-800">
          <span>10. Get Early Access</span>
          <span className="h-px w-8 bg-stone-300" />
          <span className="font-normal text-stone-500">Join Our Pilot Cohort</span>
        </div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Context & Invitation */}
          <div className="lg:col-span-5">
            <h2 className="mb-6 text-3xl font-light leading-tight tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">
              Be part of what's coming.
            </h2>
            <p className="mb-6 text-lg font-normal leading-relaxed text-stone-700">
              We're building a more connected healthcare experience, and we'd love to bring you along.
            </p>
            <p className="mb-8 text-base leading-relaxed text-stone-600">
              Join our early-access list to receive product updates, hear about research and testing opportunities, and be among the first to know when MedLinkup becomes available.
            </p>

            <div className="space-y-3 rounded-lg border border-stone-200/80 bg-white p-5 text-xs text-stone-600">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" />
                <span>Priority invitation to private platform preview trials</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" />
                <span>Direct opportunities to test clinic workflow prototypes</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" />
                <span>Regular dispatches on women's healthcare systems research in Nigeria</span>
              </div>
            </div>
          </div>

          {/* Right Column: Form / Success State */}
          <div className="lg:col-span-7">
            <div className="rounded-lg border border-stone-200 bg-white p-8 shadow-xs sm:p-10">
              {submitted ? (
                <div className="space-y-6 py-6 text-center sm:text-left">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-teal-200 bg-teal-50 text-teal-700 sm:mx-0">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>

                  <div>
                    <span className="mb-1 block font-mono text-xs uppercase tracking-wider text-teal-700">
                      Early Access Confirmed · Queue #{queueNumber}
                    </span>
                    <h3 className="text-2xl font-light text-stone-900">
                      Welcome, {formData.firstName}. You're on the list.
                    </h3>
                  </div>

                  <p className="max-w-lg text-sm leading-relaxed text-stone-600">
                    We've registered your interest for <strong className="text-stone-900">{formData.email}</strong>. As we finalize our clinical onboarding protocol and initial cohort in Nigeria, you'll be among the very first to receive updates.
                  </p>

                  <div className="rounded-md border border-stone-200/80 bg-stone-50 p-4 text-xs text-stone-500">
                    <p>
                      Need to update your details or register another address?{' '}
                      <button
                        onClick={handleReset}
                        className="cursor-pointer font-medium text-teal-700 hover:underline"
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
                    <label htmlFor="firstName" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      First Name <span className="text-teal-700">*</span>
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
                        <User className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="e.g. Zainab"
                        className={`w-full rounded-md border bg-stone-50 py-3 pl-10 pr-4 text-sm text-stone-900 placeholder:text-stone-400 transition-colors focus:bg-white focus:outline-none ${
                          errors.firstName
                            ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                            : 'border-stone-300 focus:border-teal-700 focus:ring-1 focus:ring-teal-700'
                        }`}
                        aria-invalid={!!errors.firstName}
                        aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                      />
                    </div>
                    {errors.firstName && (
                      <p id="firstName-error" className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                        <AlertCircle className="h-3.5 w-3.5" /> {errors.firstName}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Email Address <span className="text-teal-700">*</span>
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
                        <Mail className="h-4 w-4" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. zainab@example.ng"
                        className={`w-full rounded-md border bg-stone-50 py-3 pl-10 pr-4 text-sm text-stone-900 placeholder:text-stone-400 transition-colors focus:bg-white focus:outline-none ${
                          errors.email
                            ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                            : 'border-stone-300 focus:border-teal-700 focus:ring-1 focus:ring-teal-700'
                        }`}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                    </div>
                    {errors.email && (
                      <p id="email-error" className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                        <AlertCircle className="h-3.5 w-3.5" /> {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone + City */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="phoneNumber" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-700">
                        Phone Number <span className="font-normal lowercase text-stone-400">(optional)</span>
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
                          <Phone className="h-4 w-4" />
                        </div>
                        <input
                          type="tel"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={formData.phoneNumber || ''}
                          onChange={handleChange}
                          placeholder="e.g. 0803 123 4567"
                          className={`w-full rounded-md border bg-stone-50 py-3 pl-10 pr-4 text-sm text-stone-900 placeholder:text-stone-400 transition-colors focus:bg-white focus:outline-none ${
                            errors.phoneNumber
                              ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                              : 'border-stone-300 focus:border-teal-700 focus:ring-1 focus:ring-teal-700'
                          }`}
                        />
                      </div>
                      {errors.phoneNumber && (
                        <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                          <AlertCircle className="h-3.5 w-3.5" /> {errors.phoneNumber}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="city" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-700">
                        City <span className="font-normal lowercase text-stone-400">(optional)</span>
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <select
                          id="city"
                          name="city"
                          value={formData.city || ''}
                          onChange={handleChange}
                          className="w-full rounded-md border border-stone-300 bg-stone-50 py-3 pl-10 pr-4 text-sm text-stone-900 transition-colors focus:border-teal-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-700"
                        >
                          <option value="">Select city in Nigeria...</option>
                          {popularCities.map((city) => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-teal-700 px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-sm transition-colors hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600 disabled:bg-teal-700/60"
                    >
                      {isSubmitting ? (
                        <span>Joining list...</span>
                      ) : (
                        <>
                          <span>Join the Early-Access List</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="border-t border-stone-100 pt-4 text-xs leading-relaxed text-stone-500">
                    By joining, you agree to receive MedLinkup updates. You can unsubscribe at any time. Joining the list does not guarantee access to healthcare services or participation in a future pilot.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};