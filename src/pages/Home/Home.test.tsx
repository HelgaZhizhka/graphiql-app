import '@testing-library/jest-dom';
import { render, waitFor, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import store from '@/store';
import { LocaleProvider } from '@/contexts/Locale/LocaleContext';
import { darkTheme } from '@/theme';
import Home from './Home';

jest.mock('@/services/firebase/firebase', () => ({
  auth: {
    onAuthStateChanged: jest.fn(),
  },
  logout: jest.fn(),
}));

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
}));

jest.mock('@/components/AuthLinks', () => ({
  AuthLinks: () => <div>Auth Links</div>,
}));

describe('Home page', () => {
  beforeEach(() => {
    (require('react-firebase-hooks/auth').useAuthState as jest.Mock).mockReturnValue([null, false]);
  });

  it('renders correctly', async () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <Provider store={store}>
          <LocaleProvider>
            <MemoryRouter>
              <Home />
            </MemoryRouter>
          </LocaleProvider>
        </Provider>
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/GRAPHIQL/i)).toBeInTheDocument();
    });
  });
});
