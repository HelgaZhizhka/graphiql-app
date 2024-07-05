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

const sendQueryMock = jest.fn();

jest.mock('@/store/api/apiService', () => ({
  ...jest.requireActual('@/store/api/apiService'),
  useSendQueryMutation: () => {
    return [sendQueryMock, {}];
  },
}));

jest.mock('@monaco-editor/react', () => {
  return {
    Editor: () => <textarea data-testid="mockEditor" />,
  };
});

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

  it('renders without crashing code editor', async () => {
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

    await waitFor(() => {
      const mockEditor = screen.getAllByTestId('mockEditor');
      expect(mockEditor[0]).toBeInTheDocument();
    });
  });

  it('handles clear URL functionality', async () => {
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
      const clearButton = screen.getByRole('button', { name: /clear/i });
      fireEvent.click(clearButton);
      expect(apiUrlInput.value).toBe('');
    });
  });

  it('renders editor tabs', async () => {
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

    const variablesTab = screen.getByText(/Variables/i);
    const headersTab = screen.getByText(/Headers/i);
    await waitFor(() => {
      expect(variablesTab).toBeInTheDocument();
      expect(headersTab).toBeInTheDocument();
    });
  });
});
