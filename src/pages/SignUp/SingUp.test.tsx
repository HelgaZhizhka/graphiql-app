import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { LOCALE_STRINGS } from '@/contexts/Locale/constants';
import { LocaleProvider } from '@/contexts/Locale/LocaleContext';
import SignUp from './SignUp';

jest.mock('@/services/firebase/firebase', () => ({
  resetPassword: jest.fn(),
}));

describe('Tests for signUp page', () => {
  it('signUp page render', async () => {
    render(
      <Router>
        <LocaleProvider>
          <SignUp />
        </LocaleProvider>
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(`${LOCALE_STRINGS.EN.haveAnAccount}`)).toBeInTheDocument();
    });
  });
});
