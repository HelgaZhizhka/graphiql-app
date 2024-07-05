import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import ResizableDivider from './ResizableDivider';

describe('ResizableDivider component', () => {
  const mockOnResize = jest.fn();

  it('responds to mouse down and mouse move events', () => {
    render(<ResizableDivider onResize={mockOnResize} direction="horizontal" />);

    const divider = screen.getByTestId('separator');
    expect(divider).toBeInTheDocument();

    fireEvent.mouseDown(divider);
    fireEvent.mouseMove(divider);

    expect(mockOnResize).toHaveBeenCalled();
  });

  it('renders correctly', () => {
    render(<ResizableDivider onResize={() => {}} direction="horizontal" />);

    const divider = screen.getByTestId('separator');
    expect(divider).toBeInTheDocument();
  });
});
