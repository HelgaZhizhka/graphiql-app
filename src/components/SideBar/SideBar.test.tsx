import { screen, render, fireEvent } from '@testing-library/react';
import SideBar from './SideBar';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '@/store';

describe('Testing SideBar Component', () => {
  it('renders component with closed panel by default', () => {
    const { asFragment, container } = render(
      <Provider store={store}>
        <SideBar />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
    const panel = container.getElementsByClassName('panel');
    expect(panel).toHaveLength(1);
  });

  it('opens panel when "Schema" button is clicked', () => {
    render(
      <Provider store={store}>
        <SideBar />
      </Provider>
    );
    const button = screen.getByText('Schema');
    fireEvent.click(button);
    const panel = screen.getByText('Documentation Explorer');
    expect(panel).toBeInTheDocument();
  });

  it('closes panel when "Close" button is clicked', () => {
    render(
      <Provider store={store}>
        <SideBar />
      </Provider>
    );
    const button = screen.getByText('Schema');
    fireEvent.click(button);
    const closeButton = screen.getByLabelText('close');
    fireEvent.click(closeButton);
    const panel = screen.queryByText('Documentation Explorer');
    expect(panel).not.toBeInTheDocument();
  });

  it('displays correct text in the panel', () => {
    render(
      <Provider store={store}>
        <SideBar />
      </Provider>
    );
    const button = screen.getByText('Schema');
    fireEvent.click(button);
    const textInPanel = screen.getByText(
      'A GraphQL schema provides a root type for each kind of operation.'
    );
    expect(textInPanel).toBeInTheDocument();
  });
});
