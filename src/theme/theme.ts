// src/theme/theme.ts

import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { Inter, Poppins } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
});

export const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['600', '700'],
});

// Kendi özel ve daha belirgin gölgelerimizi tanımlıyoruz
// Material-UI'nin beklediği 25 elemanlı string dizisi tipini belirtiyoruz.
const customShadows: [
  'none', string, string, string, string, string, string, string, string, string,
  string, string, string, string, string, string, string, string, string, string,
  string, string, string, string, string
] = [
  'none',
  '0px 5px 10px rgba(2, 12, 27, 0.7)',
  '0px 8px 15px rgba(2, 12, 27, 0.7)',
  '0px 10px 20px rgba(2, 12, 27, 0.7)',
  // Geri kalan 21 gölgeyi MUI varsayılanı ile dolduruyoruz veya ihtiyaca göre tanımlıyoruz
  ...Array(21).fill('0px 10px 20px rgba(2, 12, 27, 0.7)')
] as [
  'none', string, string, string, string, string, string, string, string, string,
  string, string, string, string, string, string, string, string, string, string,
  string, string, string, string, string
];


let theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#64ffda',
    },
    secondary: {
      main: '#fdd835',
    },
    background: {
      default: '#0a1929',
      paper: '#112240',
    },
    text: {
      primary: '#e6f1ff',
      secondary: '#a8b2d1',
      disabled: '#8892b0',
    }
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: { fontFamily: poppins.style.fontFamily, fontSize: '3rem', fontWeight: 700, color: '#ccd6f6' },
    h2: { fontFamily: poppins.style.fontFamily, fontSize: '2.5rem', fontWeight: 700, color: '#ccd6f6' },
    h3: { fontFamily: poppins.style.fontFamily, fontSize: '2rem', fontWeight: 600, color: '#ccd6f6' },
    h4: { fontFamily: poppins.style.fontFamily, fontSize: '1.5rem', fontWeight: 600, color: '#ccd6f6' },
    h5: { fontFamily: poppins.style.fontFamily, fontSize: '1.25rem', fontWeight: 600, color: '#ccd6f6' },
    h6: { fontFamily: poppins.style.fontFamily, fontWeight: 600, color: '#ccd6f6' },
    subtitle1: { color: '#a8b2d1' },
    body1: {
        fontSize: '1rem',
        lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    }
  },
  // YENİ GÖLGELERİ TEMAYA ENTEGRE EDİYORUZ
  shadows: customShadows,
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          // Varsayılan gölgeyi daha belirgin hale getiriyoruz
          boxShadow: customShadows[2],
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
             // Kutuların üzerine gelindiğinde hafifçe büyümesini ve gölgenin artmasını sağlıyoruz
             transform: 'translateY(-5px)',
             boxShadow: customShadows[3],
          }
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: '#0a1929',
        },
      }
    },
    MuiChip: {
      styleOverrides: {
        outlinedPrimary: {
          borderColor: '#64ffda',
          color: '#64ffda',
          fontWeight: 'bold',
        }
      }
    }
  }
});

theme = responsiveFontSizes(theme);

export default theme;
