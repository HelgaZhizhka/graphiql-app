import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@mui/material/styles';

import AboutUs from './AboutUs';
import { LocaleProvider } from '@/contexts/Locale/LocaleContext';
import { darkTheme } from '@/theme';

describe('testing AboutUs component', () => {
  it('checks the name of the person', () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <LocaleProvider>
          <AboutUs />
        </LocaleProvider>
      </ThemeProvider>
    );

    expect(screen.getByText(/hard work/i)).toBeInTheDocument();
  });
});
