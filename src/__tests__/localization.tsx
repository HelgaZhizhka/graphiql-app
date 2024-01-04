import { render } from '@testing-library/react';
import { JSX } from 'react/jsx-runtime';

import { LocaleContext } from '@/contexts/Locale/LocaleContext';
import { LOCALE_STRINGS, REGIONS } from '@/contexts/Locale/constants';

const mockLocaleContextValue = {
  state: {
    strings: LOCALE_STRINGS[REGIONS.EN],
  },
  dispatch: jest.fn(),
};

export const renderWithLocale = (ui: JSX.Element, locale: keyof typeof REGIONS) => {
  mockLocaleContextValue.state.strings = LOCALE_STRINGS[REGIONS[locale]];
  return render(
    <LocaleContext.Provider value={mockLocaleContextValue}>{ui}</LocaleContext.Provider>
  );
};
