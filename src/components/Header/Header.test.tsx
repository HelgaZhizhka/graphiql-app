import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import { LocaleProvider } from '@/contexts/Locale/LocaleContext';
import { darkTheme } from '@/theme';
import Header from './Header';

jest.mock('@/services/firebase/firebase', () => ({
  auth: {
    onAuthStateChanged: jest.fn(),
  },
  logout: jest.fn(),
}));

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: () => [null, false],
}));

jest.mock('@/hooks', () => ({
  useStickyHeader: () => ({ isSticky: true, sentinelRef: { current: null } }),
}));

describe('Header', () => {
  it('renders without crashing', () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <LocaleProvider>
          <MemoryRouter>
            <Header />
          </MemoryRouter>
        </LocaleProvider>
      </ThemeProvider>
    );

    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
  });

  it('adds the sticky class when isSticky is true', () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <LocaleProvider>
          <MemoryRouter>
            <Header />
          </MemoryRouter>
        </LocaleProvider>
      </ThemeProvider>
    );

    expect(screen.getByTestId('header')).toHaveClass('sticky');
  });
});
