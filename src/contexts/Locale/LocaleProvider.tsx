import { useContext } from 'react';

import { LocaleContext } from './LocaleContext';

export const useLocale = () => {
  const contextValue = useContext(LocaleContext);

  if (!contextValue) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }

  return contextValue;
};
