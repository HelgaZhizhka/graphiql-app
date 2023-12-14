import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { registerEmail } from '@/services/firebase/firebase';
import { LocaleProvider } from '@/contexts/Locale/LocaleContext';
import SignUpForm from './SignUpForm';

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
