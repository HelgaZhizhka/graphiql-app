import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';

import ForgotPassword from './ForgotPassword';

import { LOCALE_STRINGS } from '@/contexts/Locale/constants';

import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { LocaleProvider } from '@/contexts/Locale/LocaleContext';

jest.mock('@/services/firebase/firebase', () => ({
  resetPassword: jest.fn(),
}));

describe('Localization tests for ForgotPassword', () => {
  it('page render', async () => {
    render(
      <Router>
        <LocaleProvider>
          <ForgotPassword />
        </LocaleProvider>
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(`${LOCALE_STRINGS.EN.resetPassword}`)).toBeInTheDocument();
    });
  });
});
