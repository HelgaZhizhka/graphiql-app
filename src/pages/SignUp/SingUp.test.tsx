import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';

import SignUp from './SignUp';

import { LOCALE_STRINGS } from '@/contexts/Locale/constants';

import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { LocaleProvider } from '@/contexts/Locale/LocaleContext';

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
