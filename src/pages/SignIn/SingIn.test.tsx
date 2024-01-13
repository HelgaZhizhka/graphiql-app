import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { LOCALE_STRINGS } from '@/contexts/Locale/constants';
import { LocaleProvider } from '@/contexts/Locale/LocaleContext';
import SignIn from './SignIn';

jest.mock('@/services/firebase/firebase', () => ({
  resetPassword: jest.fn(),
}));

describe('Tests for signIn page', () => {
  it('page render', async () => {
    render(
      <Router>
        <LocaleProvider>
          <SignIn />
        </LocaleProvider>
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(`${LOCALE_STRINGS.EN.noAccount}`)).toBeInTheDocument();
    });
  });
});
