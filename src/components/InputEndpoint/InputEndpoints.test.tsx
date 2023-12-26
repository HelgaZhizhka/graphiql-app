import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import InputEndpoint from './InputEndpoint';
import { mockApiUrl } from '@/__tests__/mockData';

describe('InputEndpoint Component', () => {
  const mockOnSubmit = jest.fn();
  const mockOnClear = jest.fn();

  it('renders correctly', () => {
    render(<InputEndpoint initialValue="" onSubmit={mockOnSubmit} onClear={mockOnClear} />);
    expect(screen.getByLabelText(/Type API with Cors support/i)).toBeInTheDocument();
    expect(screen.getByText(/Connect/i)).toBeInTheDocument();
  });

  it('calls onSubmit with correct data', async () => {
    render(
      <InputEndpoint initialValue={mockApiUrl} onSubmit={mockOnSubmit} onClear={mockOnClear} />
    );

    fireEvent.change(screen.getByLabelText(/Type API with Cors support/i), {
      target: { value: mockApiUrl },
    });

    fireEvent.submit(screen.getByText(/Connect/i));
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(mockApiUrl);
    });
  });

  it('calls onClear when clear button is clicked', () => {
    render(
      <InputEndpoint
        initialValue="https://api.example.com"
        onSubmit={mockOnSubmit}
        onClear={mockOnClear}
      />
    );

    const clearBtn = screen.getByTestId('Close');

    fireEvent.click(clearBtn);
    expect(mockOnClear).toHaveBeenCalled();
  });
});
