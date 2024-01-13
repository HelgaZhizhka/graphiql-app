import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { resetPassword } from '@/services/firebase/firebase';
import { LocaleProvider } from '@/contexts/Locale/LocaleContext';
import ForgotPasswordForm from './ForgotPasswordForm';

jest.mock('@/services/firebase/firebase', () => ({
  resetPassword: jest.fn(),
}));

describe('ForgotPasswordForm', () => {
  it('should render and submit form', async () => {
    render(
      <Router>
        <LocaleProvider>
          <ForgotPasswordForm />
        </LocaleProvider>
      </Router>
    );

    const emailInput = screen.getByLabelText(/email address/i);
    const submitButton = screen.getByText(/send/i);

    fireEvent.change(emailInput, { target: { value: 'asddsa@asdsa.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(resetPassword).toHaveBeenCalledWith('asddsa@asdsa.com');
    });
  });
});
