import {
  emailValidationSchema,
  signInValidationSchema,
  signUpValidationSchema,
} from '@/utils/validation';

import { initialState } from '@/contexts/Locale/constants';

describe('Yup validation schemas', () => {
  describe('Email validation schema', () => {
    it('should pass with valid email', async () => {
      const validEmail = 'asddsa@asdsa.com';
      await expect(
        emailValidationSchema(initialState.strings).validate({ email: validEmail })
      ).resolves.toEqual({
        email: validEmail,
      });
    });

    it('should fail with invalid email', async () => {
      const invalidEmail = 'invalid-email';
      await expect(
        emailValidationSchema(initialState.strings).validate({ email: invalidEmail })
      ).rejects.toThrow();
    });
  });

  describe('Sign In Validation Schema', () => {
    it('should pass with valid email and password', async () => {
      const validData = { email: 'asddsa@asdsa.com', password: 'AsdsWe@1112236' };
      await expect(
        signInValidationSchema(initialState.strings).validate(validData)
      ).resolves.toEqual(validData);
    });

    it('should fail with invalid email or password', async () => {
      const invalidData = { email: 'invalid-email', password: 'invalid-password' };
      await expect(
        signInValidationSchema(initialState.strings).validate(invalidData)
      ).rejects.toThrow();
    });
  });

  describe('Sign Up Validation Schema', () => {
    it('should pass with valid email, password, and matching confirmation', async () => {
      const validData = {
        email: 'asddsa@asdsa.com',
        password: 'AsdsWe@1112236',
        confirmPassword: 'AsdsWe@1112236',
      };
      await expect(
        signUpValidationSchema(initialState.strings).validate(validData)
      ).resolves.toEqual(validData);
    });

    it('should fail with invalid email, password, or non-matching confirmation', async () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'invalid-password',
        confirmPassword: 'non-matching-password',
      };
      await expect(
        signUpValidationSchema(initialState.strings).validate(invalidData)
      ).rejects.toThrow();
    });
  });
});
