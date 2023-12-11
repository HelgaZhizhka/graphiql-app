import { ThemeProvider } from '@mui/material/styles';

import { Routes } from '@/routes';
import { LocaleProvider } from '@/contexts/Locale/LocaleContext';
import { darkTheme, lightTheme } from '@/theme';

const App: React.FC = () => {
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = prefersDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <LocaleProvider>
        <Routes />
      </LocaleProvider>
    </ThemeProvider>
  );
};

export default App;
