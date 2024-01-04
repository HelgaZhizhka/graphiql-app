import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { IntrospectionQuery } from 'graphql';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import schemaReducer from '@/store/slices/schemaSlice';
import { Writable } from '@/utils/types';
import { LocaleProvider } from '@/contexts/Locale/LocaleContext';
import { darkTheme } from '@/theme';
import SchemaExplorer from './SchemaExplorer';

describe('SchemaExplorer', () => {
  it('renders "Schema is coming soon..." when printSchema is empty', () => {
    const store = configureStore({
      reducer: {
        schema: schemaReducer,
      },
      preloadedState: {
        schema: {
          schema: {} as Writable<IntrospectionQuery>,
          printSchema: '',
        },
      },
    });

    render(
      <ThemeProvider theme={darkTheme}>
        <Provider store={store}>
          <LocaleProvider>
            <SchemaExplorer />
          </LocaleProvider>
        </Provider>
      </ThemeProvider>
    );

    expect(screen.getByText(/Schema is coming soon/i)).toBeInTheDocument();
  });

  it('renders formatted schema when printSchema is not empty', async () => {
    const store = configureStore({
      reducer: {
        schema: schemaReducer,
      },
      preloadedState: {
        schema: {
          schema: {} as Writable<IntrospectionQuery>,
          printSchema: 'type Query {\n  allFilms: [Film]\n}',
        },
      },
    });

    render(
      <ThemeProvider theme={darkTheme}>
        <Provider store={store}>
          <LocaleProvider>
            <SchemaExplorer />
          </LocaleProvider>
        </Provider>
      </ThemeProvider>
    );

    const queryElement = await screen.findByText(/type Query/i);
    expect(queryElement).toBeInTheDocument();

    const allFilmsPattern = new RegExp('allFilms: \\[Film\\]', 'i');
    const allFilmsElement = await screen.findByText(allFilmsPattern);
    expect(allFilmsElement).toBeInTheDocument();
  });
});
