// src/theme/theme.ts

import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { Inter, Poppins } from 'next/font/google'; // Poppins fontunu ekledik

// Fontları tanımlıyoruz
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
});

export const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['600', '700'], // Sadece kalın ağırlıkları alalım
});

// YENİ VE MODERN TEMA
let theme = createTheme({
  palette: {
    mode: 'dark', // Karanlık moda geçiyoruz
    primary: {
      main: '#64ffda', // Enerjik bir nane yeşili
    },
    secondary: {
      main: '#fdd835', // İkincil vurgu için canlı bir sarı (opsiyonel)
    },
    background: {
      default: '#0a1929', // Gece mavisi, derin ve profesyonel bir arka plan
      paper: '#112240',   // Kartlar için biraz daha açık bir mavi tonu
    },
    text: {
      primary: '#e6f1ff', // En açık ve okunabilir metin rengi
      secondary: '#a8b2d1', // Daha az önemli metinler için soluk gri
      disabled: '#8892b0',  // Vurgusu en az metin rengi
    }
  },
  typography: {
    // Ana başlıklar (H1, H2, H3) için daha karakteristik bir font olan Poppins'i kullanıyoruz.
    fontFamily: inter.style.fontFamily, // Gövde metinleri için Inter devam ediyor
    h1: { fontFamily: poppins.style.fontFamily, fontSize: '3rem', fontWeight: 700, color: '#ccd6f6' },
    h2: { fontFamily: poppins.style.fontFamily, fontSize: '2.5rem', fontWeight: 700, color: '#ccd6f6' },
    h3: { fontFamily: poppins.style.fontFamily, fontSize: '2rem', fontWeight: 600, color: '#ccd6f6' },
    h4: { fontFamily: poppins.style.fontFamily, fontSize: '1.5rem', fontWeight: 600, color: '#ccd6f6' },
    h5: { fontFamily: poppins.style.fontFamily, fontSize: '1.25rem', fontWeight: 600, color: '#ccd6f6' },
    h6: { fontFamily: poppins.style.fontFamily, fontWeight: 600, color: '#ccd6f6' }, // Sidebar'daki isim için
    subtitle1: { color: '#a8b2d1' },
    body1: {
        fontSize: '1rem',
        lineHeight: 1.6,
    },
    button: {
      textTransform: 'none', // Buton metinlerini düz yazı yapalım
      fontWeight: 500,
    }
  },
  components: {
    // Kartlara ve Kağıtlara hafif bir stil verelim
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none', // MUI'nin varsayılan gradient'ini kaldıralım
        },
      },
    },
    // Butonları daha modern hale getirelim
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: '#0a1929', // Ana butonların metin rengi koyu olsun
        },
      }
    },
    // Çipleri güncelleyelim
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

// Font boyutlarını ekran boyutuna göre otomatik ayarlar
theme = responsiveFontSizes(theme);

export default theme;