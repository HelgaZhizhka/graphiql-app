import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { LocaleProvider } from '@/contexts/Locale/LocaleContext';
import InputEndpoint from './InputEndpoint';
import { mockApiUrl } from '@/__tests__/mockData';

describe('InputEndpoint Component', () => {
  const mockOnSubmit = jest.fn();
  const mockOnClear = jest.fn();

  it('renders correctly', () => {
    render(
      <Router>
        <LocaleProvider>
          <InputEndpoint initialValue="" onSubmit={mockOnSubmit} onClear={mockOnClear} />
        </LocaleProvider>
      </Router>
    );
    expect(screen.getByLabelText(/Type API with Cors support/i)).toBeInTheDocument();
    expect(screen.getByText(/Connect/i)).toBeInTheDocument();
  });

  it('calls onSubmit with correct data', async () => {
    render(
      <Router>
        <LocaleProvider>
          <InputEndpoint initialValue={mockApiUrl} onSubmit={mockOnSubmit} onClear={mockOnClear} />
        </LocaleProvider>
      </Router>
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
      <Router>
        <LocaleProvider>
          <InputEndpoint
            initialValue="https://api.example.com"
            onSubmit={mockOnSubmit}
            onClear={mockOnClear}
          />
        </LocaleProvider>
      </Router>
    );

    const clearBtn = screen.getByTestId('Close');

    fireEvent.click(clearBtn);
    expect(mockOnClear).toHaveBeenCalled();
  });
});
