import { createContext } from 'react';

type ContextType = {
  language: string;
}

const LanguageContext = createContext<ContextType>({
  language: 'en',
});

export default LanguageContext;
