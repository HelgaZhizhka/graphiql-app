import { useContext } from 'react';
import { LocaleContext } from './constants';

export const useLocale = () => {
  const contextValue = useContext(LocaleContext);

  if (!contextValue) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }

  return contextValue;
};
