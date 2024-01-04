import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { logInWithEmail } from '@/services/firebase/firebase';
import { LocaleProvider } from '@/contexts/Locale/LocaleContext';
import SignInForm from './SignInForm';
import { renderWithLocale } from '@/__tests__/localization';

jest.mock('@/services/firebase/firebase', () => ({
  logInWithEmail: jest.fn(),
}));

describe('SignInForm', () => {
  it('should render and submit form', async () => {
    render(
      <LocaleProvider>
        <SignInForm />
      </LocaleProvider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByText(/sign in/i);

    fireEvent.change(emailInput, { target: { value: 'asddsa@asdsa.com' } });
    fireEvent.change(passwordInput, { target: { value: 'AsdsWe@1112236' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(logInWithEmail).toHaveBeenCalledWith('asddsa@asdsa.com', 'AsdsWe@1112236');
    });
  });
});

describe('validation errors check in EN Locale', () => {
  it('email validation error should correspond to the EN locale', async () => {
    renderWithLocale(<SignInForm />, 'EN');
    const emailInput = screen.getByLabelText(/email/i);

    fireEvent.change(emailInput, { target: { value: 'aa' } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
    });
  });

  it('password validation error should correspond to the EN locale', async () => {
    renderWithLocale(<SignInForm />, 'EN');
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(screen.getByText('Password is a required field')).toBeInTheDocument();
    });
  });
});

describe('validation errors check in RU Locale', () => {
  it('validation error should correspond to the RU locale', async () => {
    renderWithLocale(<SignInForm />, 'RU');
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'aa' } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText('Неверный адрес электронной почты')).toBeInTheDocument();
    });
  });

  it('password validation error should correspond to the RU locale', async () => {
    renderWithLocale(<SignInForm />, 'RU');
    const passwordInput = screen.getByLabelText(/пароль/i);

    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(screen.getByText('Пароль обязательное поле')).toBeInTheDocument();
    });
  });
});
