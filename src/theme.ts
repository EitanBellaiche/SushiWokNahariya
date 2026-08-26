import { createTheme } from '@mui/material';

export const COLORS = {
  bg: '#0a0908',
  bgElevated: '#141210',
  surface: '#18130f',
  surfaceBorder: 'rgba(245, 240, 233, 0.09)',
  red: '#b91c1f',
  redDark: '#6e1013',
  redSoft: 'rgba(185, 28, 31, 0.14)',
  white: '#f7f4ef',
  textSecondary: '#a79f95',
  textMuted: '#7d766c',
};

export const theme = createTheme({
  direction: 'rtl',
  palette: {
    mode: 'dark',
    primary: { main: COLORS.red, light: '#cf4245', dark: COLORS.redDark, contrastText: '#ffffff' },
    secondary: { main: '#e7c98a' },
    success: { main: '#25a35a' },
    background: { default: COLORS.bg, paper: COLORS.surface },
    text: { primary: COLORS.white, secondary: COLORS.textSecondary },
    divider: COLORS.surfaceBorder,
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: ['Heebo', 'Assistant', 'sans-serif'].join(','),
    h1: { fontWeight: 800 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 800 },
    h4: { fontWeight: 800 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: { fontWeight: 700, textTransform: 'none' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 999 },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: COLORS.bg,
        },
        '*:focus-visible': {
          outline: `2px solid ${COLORS.red}`,
          outlineOffset: '2px',
        },
      },
    },
    // MuiButtonBase's own base styles set `outline: 0` at the same cascade
    // priority as the generic `*:focus-visible` rule above, which silently wins
    // by source order and cancels it on every Button/IconButton/Radio/Checkbox/
    // ToggleButton (they all extend ButtonBase). Restating it here, through
    // MUI's own override slot for that exact class, guarantees it actually wins.
    MuiButtonBase: {
      styleOverrides: {
        root: {
          '&:focus-visible': {
            outline: `2px solid ${COLORS.red}`,
            outlineOffset: '2px',
          },
        },
      },
    },
  },
});
