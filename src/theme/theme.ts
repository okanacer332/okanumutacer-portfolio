// src/theme/theme.ts

import { createTheme } from '@mui/material/styles';
import { Inter } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976D2', 
    },
    secondary: {
      main: '#FFC107',
    },
    background: {
      default: '#F8F9FA', // Ana arka plan -> Hafif kırık beyaz
      paper: '#FFFFFF',   // Kartlar, menü gibi bileşenlerin arka planı -> Saf beyaz
    },
    text: {
      primary: '#212529', // Daha yumuşak bir siyah
      secondary: '#6c757d', // İkincil metinler için gri
    }
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: { fontSize: '2.5rem', fontWeight: 600 },
    h2: { fontSize: '2rem', fontWeight: 600 },
  },
});

export default theme;