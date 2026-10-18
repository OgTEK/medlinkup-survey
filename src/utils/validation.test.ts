import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isValidEmail,
  isValidPhoneNumber,
  normalizeNigerianPhone,
  validateEarlyAccessForm,
} from './validation.ts';

test('isValidEmail accepts valid email formats', () => {
  assert.equal(isValidEmail('patient@example.com'), true);
  assert.equal(isValidEmail('chidinma.okafor@gmail.com'), true);
  assert.equal(isValidEmail('doctor@medlinkup.ng'), true);
});

test('isValidEmail rejects malformed emails', () => {
  assert.equal(isValidEmail(''), false);
  assert.equal(isValidEmail('not-an-email'), false);
  assert.equal(isValidEmail('patient@'), false);
  assert.equal(isValidEmail('@example.com'), false);
});

test('isValidPhoneNumber handles Nigerian and international formats', () => {
  assert.equal(isValidPhoneNumber(''), true); // optional
  assert.equal(isValidPhoneNumber('08021234567'), true);
  assert.equal(isValidPhoneNumber('+2348031234567'), true);
  assert.equal(isValidPhoneNumber('07011223344'), true);
  assert.equal(isValidPhoneNumber('123'), false); // invalid
});

test('normalizeNigerianPhone formats correctly', () => {
  assert.equal(normalizeNigerianPhone('08021234567'), '+234 802 123 4567');
  assert.equal(normalizeNigerianPhone('+2348021234567'), '+234 802 123 4567');
});

test('validateEarlyAccessForm enforces required fields', () => {
  const resultInvalid = validateEarlyAccessForm({
    firstName: '',
    email: 'bad',
    agreeToUpdates: false,
  });
  assert.equal(resultInvalid.isValid, false);
  assert.ok(resultInvalid.errors.firstName);
  assert.ok(resultInvalid.errors.email);

  const resultValid = validateEarlyAccessForm({
    firstName: 'Amina',
    email: 'amina@example.ng',
    phoneNumber: '08031234567',
    city: 'Lagos',
    agreeToUpdates: true,
  });
  assert.equal(resultValid.isValid, true);
  assert.equal(Object.keys(resultValid.errors).length, 0);
});
