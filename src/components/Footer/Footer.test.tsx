import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LocaleContext } from '@/contexts/Locale/LocaleContext';
import { LOCALE_STRINGS, REGIONS } from '@/contexts/Locale/constants';
import Footer from './Footer';
import { JSX } from 'react/jsx-runtime';

const mockLocaleContextValue = {
  state: {
    strings: LOCALE_STRINGS[REGIONS.EN],
  },
  dispatch: jest.fn(),
};

const renderWithLocale = (ui: JSX.Element, locale: keyof typeof REGIONS) => {
  mockLocaleContextValue.state.strings = LOCALE_STRINGS[REGIONS[locale]];
  return render(
    <LocaleContext.Provider value={mockLocaleContextValue}>{ui}</LocaleContext.Provider>
  );
};

describe('Localization tests for Footer', () => {
  it('displays info in English', () => {
    renderWithLocale(<Footer />, 'EN');
    expect(screen.getByText(/Created in 2023/i)).toBeInTheDocument();
  });

  it('displays info in Russian', () => {
    renderWithLocale(<Footer />, 'RU');
    expect(screen.getByText(/Создано в 2023/i)).toBeInTheDocument();
  });
});
