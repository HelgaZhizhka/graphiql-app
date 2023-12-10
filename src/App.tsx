import { Routes } from '@/routes';
import { ThemeProvider } from '@mui/material/styles';

import { darkTheme, lightTheme } from '@/theme';

const App: React.FC = () => {
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = prefersDarkMode ? darkTheme : lightTheme;

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </div>
  );
};

export default App;
