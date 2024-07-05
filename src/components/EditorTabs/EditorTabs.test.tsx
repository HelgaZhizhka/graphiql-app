import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';

import { LocaleProvider } from '@/contexts/Locale/LocaleContext';
import { darkTheme } from '@/theme';
import EditorTabs from './EditorTabs';

describe('EditorTabs', () => {
  it('renders CodeEditor for selected tab', () => {
    const initialVariables = '{"test": "test"}';
    const initialHeaders = '{"Content-Type": "application/json"}';
    const onChangeVariables = jest.fn();
    const onChangeHeaders = jest.fn();

    render(
      <ThemeProvider theme={darkTheme}>
        <LocaleProvider>
          <EditorTabs
            initialVariables={initialVariables}
            initialHeaders={initialHeaders}
            onChangeVariables={onChangeVariables}
            onChangeHeaders={onChangeHeaders}
          />
        </LocaleProvider>
      </ThemeProvider>
    );

    expect(screen.getByText(/Headers/i)).toBeInTheDocument();
  });
});
