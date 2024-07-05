import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { LocaleProvider } from '@/contexts/Locale/LocaleContext';
import { mockApiUrl } from '@/__tests__/mockData';
import InputEndpoint from './InputEndpoint';

describe('InputEndpoint Component', () => {
  const mockOnSubmit = jest.fn();
  const mockOnClear = jest.fn();

  it('renders correctly', async () => {
    render(
      <Router>
        <LocaleProvider>
          <InputEndpoint
            initialValue=""
            onSubmit={mockOnSubmit}
            onClear={mockOnClear}
            onSchemaRequest={jest.fn()}
          />
        </LocaleProvider>
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/Type API with Cors support/i)).toBeInTheDocument();
      expect(screen.getByText(/Ok/i)).toBeInTheDocument();
    });
  });

  it('calls onSubmit with correct data', async () => {
    render(
      <Router>
        <LocaleProvider>
          <InputEndpoint
            initialValue={mockApiUrl}
            onSubmit={mockOnSubmit}
            onClear={mockOnClear}
            onSchemaRequest={jest.fn()}
          />
        </LocaleProvider>
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Type API with Cors support/i), {
      target: { value: mockApiUrl },
    });

    fireEvent.submit(screen.getByText(/Ok/i));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(mockApiUrl);
    });
  });

  it('calls onClear when clear button is clicked', async () => {
    render(
      <Router>
        <LocaleProvider>
          <InputEndpoint
            initialValue="https://api.example.com"
            onSubmit={mockOnSubmit}
            onClear={mockOnClear}
            onSchemaRequest={jest.fn()}
          />
        </LocaleProvider>
      </Router>
    );

    const clearBtn = screen.getByTestId('Close');

    fireEvent.click(clearBtn);

    await waitFor(() => {
      expect(mockOnClear).toHaveBeenCalled();
    });
  });
});
