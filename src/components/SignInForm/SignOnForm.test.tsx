import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { logInWithEmail } from '@/services/firebase/firebase';
import { LocaleProvider } from '@/contexts/Locale/LocaleContext';
import SignInForm from './SignInForm';

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
