import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';

import { renderWithLocale } from '@/__tests__/localization';
import Footer from './Footer';

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
