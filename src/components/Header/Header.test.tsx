import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import { RoutePaths } from '@/routes/routes.enum';
import { LocaleProvider } from '@/contexts/Locale/LocaleContext';
import { darkTheme } from '@/theme';
import Header from './Header';

const mockNavigate = jest.fn();

jest.mock('@/services/firebase/firebase', () => ({
  auth: {
    onAuthStateChanged: jest.fn(),
  },
  logout: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn(),
}));

jest.mock('@/hooks', () => ({
  useStickyHeader: () => ({ isSticky: true, sentinelRef: { current: null } }),
}));

describe('Header when user is not authenticated', () => {
  beforeEach(() => {
    (require('react-firebase-hooks/auth').useAuthState as jest.Mock).mockReturnValue([null, false]);
  });

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

  it('renders sign in and sign up links when user is not authenticated', () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <LocaleProvider>
          <MemoryRouter>
            <Header />
          </MemoryRouter>
        </LocaleProvider>
      </ThemeProvider>
    );
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign up/i)).toBeInTheDocument();
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

describe('Header when user is authenticated', () => {
  beforeEach(() => {
    (require('react-firebase-hooks/auth').useAuthState as jest.Mock).mockReturnValue([{}, false]);
  });

  it('renders sign out link when user is authenticated', () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <LocaleProvider>
          <MemoryRouter>
            <Header />
          </MemoryRouter>
        </LocaleProvider>
      </ThemeProvider>
    );

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

  it('calls logout function when user clicks on sign out link', () => {
    const mockLogout = require('@/services/firebase/firebase').logout;
    mockLogout.mockClear();
    mockNavigate.mockClear();

    render(
      <ThemeProvider theme={darkTheme}>
        <LocaleProvider>
          <MemoryRouter>
            <Header />
          </MemoryRouter>
        </LocaleProvider>
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText(/Sign out/i));
    expect(mockLogout).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith(RoutePaths.WELCOME);
  });
});

describe('Header navigation', () => {
  beforeEach(() => {
    (require('react-firebase-hooks/auth').useAuthState as jest.Mock).mockReturnValue([null, false]);
  });

  it('navigates to the sign in page on click', async () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <LocaleProvider>
          <MemoryRouter initialEntries={['/']}>
            <Header />
            <Routes>
              <Route path={RoutePaths.SIGN_IN} element={<div>Sign In Page</div>} />
            </Routes>
          </MemoryRouter>
        </LocaleProvider>
      </ThemeProvider>
    );

    const signInLink = screen.getByText(/Sign in/i);
    fireEvent.click(signInLink);

    await waitFor(() => {
      expect(screen.getByText('Sign In Page')).toBeInTheDocument();
    });
  });
});

describe('Header while loading', () => {
  beforeEach(() => {
    jest.mock('react-firebase-hooks/auth', () => ({
      useAuthState: jest.fn(),
    }));

    (require('react-firebase-hooks/auth').useAuthState as jest.Mock).mockReturnValue([null, true]);
  });

  it('should return null when loading', () => {
    const { container } = render(
      <ThemeProvider theme={darkTheme}>
        <LocaleProvider>
          <MemoryRouter>
            <Header />
          </MemoryRouter>
        </LocaleProvider>
      </ThemeProvider>
    );

    expect(container.firstChild).toBeNull();
  });
});
