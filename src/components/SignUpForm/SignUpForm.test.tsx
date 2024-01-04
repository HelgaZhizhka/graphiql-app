import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { registerEmail } from '@/services/firebase/firebase';
import { LocaleProvider } from '@/contexts/Locale/LocaleContext';
import SignUpForm from './SignUpForm';
import { renderWithLocale } from '@/__tests__/localization';
import { LOCALE_STRINGS } from '@/contexts/Locale/constants';

jest.mock('@/services/firebase/firebase', () => ({
  registerEmail: jest.fn(),
}));

describe('SignUpForm', () => {
  it('should render and submit form', async () => {
    render(
      <LocaleProvider>
        <SignUpForm />
      </LocaleProvider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInputs = screen.getAllByLabelText(/password/i);
    const confirmPassword = await screen.findByLabelText(/confirm Password/i);
    const submitButton = screen.getByText(/sign up/i);

    fireEvent.change(emailInput, { target: { value: 'asddsa@asdsa.com' } });

    passwordInputs.forEach((passwordInput) => {
      fireEvent.change(passwordInput, { target: { value: 'AsdsWe@1112236' } });
    });

    fireEvent.change(confirmPassword, { target: { value: 'AsdsWe@1112236' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(registerEmail).toHaveBeenCalledWith('asddsa', 'asddsa@asdsa.com', 'AsdsWe@1112236');
    });
  });
});

describe('validation errors check in EN Locale', () => {
  it('email validation error should correspond to the EN locale', async () => {
    renderWithLocale(<SignUpForm />, 'EN');
    const emailInput = screen.getByLabelText(/email/i);

    fireEvent.change(emailInput, { target: { value: 'aa' } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText(`${LOCALE_STRINGS.EN.emailValidation}`)).toBeInTheDocument();
    });
  });

  it('password validation error should correspond to the EN locale', async () => {
    renderWithLocale(<SignUpForm />, 'EN');
    const passwordInput = screen.getByLabelText(/^password$/i);

    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(
        screen.getByText(`${LOCALE_STRINGS.EN.passwordRequiredValidation}`)
      ).toBeInTheDocument();
    });
  });
});

describe('validation errors check in RU Locale', () => {
  it('validation error should correspond to the RU locale', async () => {
    renderWithLocale(<SignUpForm />, 'RU');
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'aa' } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText(`${LOCALE_STRINGS.RU.emailValidation}`)).toBeInTheDocument();
    });
  });

  it('password validation error should correspond to the RU locale', async () => {
    renderWithLocale(<SignUpForm />, 'RU');
    const passwordInput = screen.getByLabelText(/^пароль$/i);

    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(
        screen.getByText(`${LOCALE_STRINGS.RU.passwordRequiredValidation}`)
      ).toBeInTheDocument();
    });
  });
});
