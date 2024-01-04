import { testingPasswordStrength } from '@/utils/passwordStrength';

describe('testing password strength', () => {
  it('it password', () => {
    expect(testingPasswordStrength()).toBe(0);
  });
  it('returns 0 for a password with insufficient strength', () => {
    expect(testingPasswordStrength('abc123')).toBe(0);
  });

  it('returns 5 for a password with moderate strength', () => {
    expect(testingPasswordStrength('Abc123')).toBe(5);
  });

  it('returns 10 for a strong password', () => {
    expect(testingPasswordStrength('StrongP@sword123')).toBe(10);
  });
});
