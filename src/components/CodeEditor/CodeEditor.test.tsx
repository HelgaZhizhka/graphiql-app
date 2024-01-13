import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import { LocaleProvider } from '@/contexts/Locale/LocaleContext';
import { darkTheme } from '@/theme';
import CodeEditor from './CodeEditor';

jest.mock('@monaco-editor/react', () => ({
  Editor: ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
    <textarea data-testid="editor" value={value} onChange={(e) => onChange(e.target.value)} />
  ),
}));

describe('CodeEditor', () => {
  it('renders without crashing', async () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <LocaleProvider>
          <MemoryRouter>
            <CodeEditor initialValue="" />
          </MemoryRouter>
        </LocaleProvider>
      </ThemeProvider>
    );

    await waitFor(() => {
      const editorElement = screen.getByTestId('editor');
      expect(editorElement).toBeInTheDocument();
    });
  });

  it('calls onChange prop when editor value changes', async () => {
    const mockOnChange = jest.fn();

    render(
      <ThemeProvider theme={darkTheme}>
        <LocaleProvider>
          <MemoryRouter>
            <CodeEditor initialValue="query {}" onChange={mockOnChange} />
          </MemoryRouter>
        </LocaleProvider>
      </ThemeProvider>
    );

    await waitFor(() => {
      const editorElement = screen.getByTestId('editor');
      fireEvent.change(editorElement, { target: { value: 'query { allFilms }' } });

      expect(mockOnChange).toHaveBeenCalledWith('query { allFilms }');
    });
  });
});
