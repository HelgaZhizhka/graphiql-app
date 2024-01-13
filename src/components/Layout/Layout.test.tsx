import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '@/store';
import { LocaleProvider } from '@/contexts/Locale/LocaleContext';
import { darkTheme } from '@/theme';
import Layout from './Layout';

jest.mock('@/services/firebase/firebase', () => ({
  auth: {
    onAuthStateChanged: jest.fn(),
  },
  logout: jest.fn(),
}));

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn(),
}));

describe('Layout', () => {
  beforeEach(() => {
    (require('react-firebase-hooks/auth').useAuthState as jest.Mock).mockReturnValue([null, false]);
  });

  it('renders all components', async () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <Provider store={store}>
          <LocaleProvider>
            <MemoryRouter>
              <Layout />
            </MemoryRouter>
          </LocaleProvider>
        </Provider>
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
    });
  });
});
