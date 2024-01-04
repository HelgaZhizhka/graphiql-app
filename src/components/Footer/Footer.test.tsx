import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';

import Footer from './Footer';
import { renderWithLocale } from '@/__tests__/localization';

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
