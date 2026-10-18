/**
 * Validation utilities for MedLinkup early access and contact forms.
 */

export interface EarlyAccessFormData {
  firstName: string;
  email: string;
  phoneNumber?: string;
  city?: string;
  agreeToUpdates: boolean;
}

export interface ValidationErrors {
  firstName?: string;
  email?: string;
  phoneNumber?: string;
  city?: string;
  agreeToUpdates?: string;
}

/**
 * Validates an email address using RFC-5322 inspired format.
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim();
  // Standard strict regex for valid email format
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(trimmed);
}

/**
 * Validates optional phone number, supporting Nigerian formats (+234, 080, 070, 090, 081, etc.)
 * or standard international numbers.
 */
export function isValidPhoneNumber(phone?: string): boolean {
  if (!phone || phone.trim() === '') return true; // optional
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  // Matches Nigerian mobile (070/080/081/090/091 followed by 8 digits) or international (+234 / +1 / etc)
  const phoneRegex = /^(\+?234|0)[789][01]\d{8}$|^(\+[1-9]\d{6,14})$/;
  return phoneRegex.test(cleaned);
}

/**
 * Normalizes phone number into clean display format (+234 80X XXX XXXX).
 */
export function normalizeNigerianPhone(phone?: string): string {
  if (!phone) return '';
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  if (cleaned.startsWith('0') && cleaned.length === 11) {
    return `+234 ${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }
  if (cleaned.startsWith('+234') && cleaned.length === 14) {
    return `+234 ${cleaned.slice(4, 7)} ${cleaned.slice(7, 10)} ${cleaned.slice(10)}`;
  }
  return cleaned;
}

/**
 * Validates entire Early Access form.
 */
export function validateEarlyAccessForm(data: EarlyAccessFormData): {
  isValid: boolean;
  errors: ValidationErrors;
} {
  const errors: ValidationErrors = {};

  if (!data.firstName || data.firstName.trim().length < 2) {
    errors.firstName = 'Please enter your first name.';
  }

  if (!data.email || !data.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (data.phoneNumber && data.phoneNumber.trim() !== '') {
    if (!isValidPhoneNumber(data.phoneNumber)) {
      errors.phoneNumber = 'Please enter a valid phone number (e.g. 0801 234 5678 or +234...).';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
