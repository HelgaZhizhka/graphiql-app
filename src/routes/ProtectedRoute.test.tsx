import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { useAuthState } from 'react-firebase-hooks/auth';

import ProtectedRoute from './ProtectedRoute';

jest.mock('@/services/firebase/firebase', () => ({
  auth: {
    onAuthStateChanged: jest.fn(),
  },
  logout: jest.fn(),
}));

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn(),
}));

const DummyComponent = () => <div>Test Component</div>;

describe('ProtectedRoute', () => {
  it('renders children when user is authenticated', () => {
    (useAuthState as jest.Mock).mockReturnValue([{ uid: 'testUid' }, false]);

    render(
      <ProtectedRoute redirectTo="/login">
        <DummyComponent />
      </ProtectedRoute>
    );

    expect(screen.getByText(/Test Component/i)).toBeInTheDocument();
  });

  it('shows loader when loading', () => {
    (useAuthState as jest.Mock).mockReturnValue([null, true]);

    render(
      <ProtectedRoute redirectTo="/login">
        <DummyComponent />
      </ProtectedRoute>
    );

    const loader = screen.getByTestId('loader');

    expect(loader).toBeInTheDocument();
  });
});
