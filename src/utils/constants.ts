import { darkTheme, lightTheme } from '@/theme';
export const TITLE = 'GraphiQL';
export const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
export const theme = prefersDarkMode ? darkTheme : lightTheme;
