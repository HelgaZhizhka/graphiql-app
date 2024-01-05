import React from 'react';
import { Provider } from 'react-redux';

import store from '@/store';
import App from '@/App';

const mockRender = jest.fn();
jest.mock('react-dom/client', () => ({
  createRoot: jest.fn().mockImplementation(() => ({
    render: mockRender,
  })),
}));

jest.mock('@/services/firebase/firebase', () => ({
  auth: {
    onAuthStateChanged: jest.fn(),
  },
  logout: jest.fn(),
}));

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn(),
}));

describe('main.tsx', () => {
  it('renders App component', () => {
    document.body.innerHTML = '<div id="root"></div>';

    require('./main.tsx');

    expect(mockRender).toHaveBeenCalledWith(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    );
  });
});
