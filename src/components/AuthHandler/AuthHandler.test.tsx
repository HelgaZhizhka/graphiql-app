import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';

import AuthHandler from './AuthHandler';

const mockNavigate = jest.fn();

jest.mock('@/services/firebase/firebase', () => ({
  auth: {
    onAuthStateChanged: jest.fn(),
  },
  logout: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn(),
}));

describe('AuthHandler', () => {
  it('renders Loader while loading and children after loading', async () => {
    (require('react-firebase-hooks/auth').useAuthState as jest.Mock).mockReturnValue([null, true]);

    const { rerender } = render(<AuthHandler>Test</AuthHandler>);

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    (require('react-firebase-hooks/auth').useAuthState as jest.Mock).mockReturnValue([null, false]);

    rerender(<AuthHandler>Test</AuthHandler>);

    await waitFor(() => expect(screen.getByText('Test')).toBeInTheDocument());
  });
});
