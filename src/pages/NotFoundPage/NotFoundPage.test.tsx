import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { RoutePaths } from '@/routes/routes.enum';
import { MemoryRouter } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );
  });

  it('displays 404 and sorry message', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText("Sorry, there's nothing here 🥲")).toBeInTheDocument();
  });

  it('has a link to the welcome page', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    const linkElement = screen.getByText('Back');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.getAttribute('href')).toBe(RoutePaths.WELCOME);
  });
});
