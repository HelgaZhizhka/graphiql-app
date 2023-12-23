import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Logo from './Logo';

describe('Logo component', () => {
  it('renders without crashing', () => {
    render(<Logo title="Test Logo" />);
  });

  it('displays the title correctly', () => {
    const { getByText } = render(<Logo title="Test Logo" />);
    const titleElement = getByText('Test Logo');
    expect(titleElement).toBeInTheDocument();
  });

  it('applies additional className correctly', () => {
    const { container } = render(<Logo title="Test Logo" className="customClass" />);
    const logoElement = container.firstChild;
    expect(logoElement).toHaveClass('customClass');
  });
});
