import { createContext } from 'react';

import { lang } from './Locale/constants';

type ContextType = {
  language: string;
};

const LanguageContext = createContext<ContextType>({
  language: lang,
});

export default LanguageContext;
