import { ThemeProvider } from '@mui/material/styles';

import { Routes } from '@/routes';
import { LocaleProvider } from '@/contexts/Locale/LocaleContext';
import { theme } from '@/utils/constants';

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <LocaleProvider>
      <Routes />
    </LocaleProvider>
  </ThemeProvider>
);

export default App;
