import { ThemeOptions, createTheme } from '@mui/material/styles';

const colorBrand = '#f6009c';
const colorHover = '#ba0678';
const colorWhite = '#fff';
const colorLight = '#f2f2f2';
const colorViolet = '#444054';
const stateDanger = '#b11b1b';
const stateSuccess = '#1bb12b';

const lightTheme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          textDecoration: 'underline',
          color: colorBrand,
          '&:hover': {
            textDecoration: 'none',
            color: colorHover,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
      defaultProps: {
        disableElevation: true,
      },
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            color: colorWhite,
            '&:hover': {
              backgroundColor: colorHover,
            },
          },
        },
        {
          props: { variant: 'outlined', color: 'primary' },
          style: {
            borderColor: colorBrand,
            color: colorBrand,
            '&:hover': {
              backgroundColor: colorBrand,
              borderColor: colorBrand,
              color: colorLight,
            },
            '&:active': {
              borderColor: colorBrand,
              color: colorLight,
              backgroundColor: colorBrand,
            },
          },
        },
      ],
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1024,
      lg: 1280,
      xl: 1440,
    },
  },
  typography: {
    fontFamily: "'Source Sans 3', Helvetica, Arial, sans-serif",
  },
  palette: {
    mode: 'light',
    primary: {
      main: colorBrand,
      dark: colorHover,
    },
    secondary: {
      main: colorViolet,
    },
    error: {
      main: stateDanger,
    },
    success: {
      main: stateSuccess,
    },
  },
} as ThemeOptions);

const darkTheme = createTheme({
  ...lightTheme,
  palette: {
    mode: 'dark',
  },
  components: {
    ...lightTheme.components,
    MuiButton: {
      ...lightTheme.components?.MuiButton,
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            color: colorWhite,
            backgroundColor: colorBrand,
            '&:hover': {
              backgroundColor: colorHover,
            },
          },
        },
        {
          props: { variant: 'outlined', color: 'primary' },
          style: {
            borderColor: colorBrand,
            color: colorBrand,
            '&:hover': {
              backgroundColor: colorBrand,
              borderColor: colorBrand,
              color: colorLight,
            },
            '&:active': {
              borderColor: colorBrand,
              color: colorLight,
              backgroundColor: colorBrand,
            },
          },
        },
      ],
    },
  },
});

export { lightTheme, darkTheme };
