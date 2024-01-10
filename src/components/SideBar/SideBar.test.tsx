import '@testing-library/jest-dom';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from '@/store';
import { LocaleProvider } from '@/contexts/Locale/LocaleContext';
import SideBar from './SideBar';

describe('Testing SideBar Component', () => {
  it('renders component with closed panel by default', () => {
    const { container } = render(
      <Provider store={store}>
        <LocaleProvider>
          <SideBar />
        </LocaleProvider>
      </Provider>
    );

    const panel = container.getElementsByClassName('panel');
    expect(panel).toHaveLength(1);
  });

  it('opens panel when "Schema" button is clicked', async () => {
    render(
      <Provider store={store}>
        <LocaleProvider>
          <SideBar />
        </LocaleProvider>
      </Provider>
    );

    const button = screen.getByText(/Open/i);
    fireEvent.click(button);

    await waitFor(() => {
      const panel = screen.getByText(/Documentation Explorer/i);
      expect(panel).toBeInTheDocument();
    });
  });

  it('closes panel when "Close" button is clicked', () => {
    render(
      <Provider store={store}>
        <LocaleProvider>
          <SideBar />
        </LocaleProvider>
      </Provider>
    );

    const button = screen.getByText(/Open/i);
    fireEvent.click(button);
    const closeButton = screen.getByLabelText('close');
    fireEvent.click(closeButton);
    const panel = screen.queryByText(/Documentation Explorer/i);
    expect(panel).not.toBeInTheDocument();
  });

  it('displays correct text in the panel', async () => {
    render(
      <Provider store={store}>
        <LocaleProvider>
          <SideBar />
        </LocaleProvider>
      </Provider>
    );

    const button = screen.getByText(/Open/i);
    fireEvent.click(button);

    await waitFor(() => {
      const textInPanel = screen.getByText(
        'A GraphQL schema provides a root type for each kind of operation.'
      );
      expect(textInPanel).toBeInTheDocument();
    });
  });
});
