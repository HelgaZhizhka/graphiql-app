import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';

import store from '@/store';
import { LocaleProvider } from '@/contexts/Locale/LocaleContext';
import { mockApiUrl } from '@/__tests__/mockData';
import { darkTheme } from '@/theme';
import Main from './Main';

jest.mock('@/store/api/apiService', () => ({
  ...jest.requireActual('@/store/api/apiService'),
  useSendQueryMutation: () => {
    const sendQueryMock = jest.fn();
    return [sendQueryMock, {}];
  },
}));

describe('Main page', () => {
  it('renders without crashing', async () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <LocaleProvider>
          <Provider store={store}>
            <MemoryRouter>
              <Main />
            </MemoryRouter>
          </Provider>
        </LocaleProvider>
      </ThemeProvider>
    );

    await waitFor(async () => {
      const editorElement = await screen.getByTestId('editor');
      expect(editorElement).toBeInTheDocument();
    });
  });

  it('handles api input', async () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <LocaleProvider>
          <Provider store={store}>
            <MemoryRouter>
              <Main />
            </MemoryRouter>
          </Provider>
        </LocaleProvider>
      </ThemeProvider>
    );

    const apiUrlInput = screen.getByLabelText(/Type API with Cors support/) as HTMLInputElement;

    await waitFor(async () => {
      fireEvent.change(apiUrlInput, { target: { value: mockApiUrl } });
      expect(apiUrlInput.value).toBe(mockApiUrl);
    });
  });
});
