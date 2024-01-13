import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';

import { darkTheme } from '@/theme';
import { LocaleProvider } from '@/contexts/Locale/LocaleContext';
import AboutUs from './AboutUs';

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
