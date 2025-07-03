// src/components/ThemeRegistry.tsx

'use client'; // Bu bileşenin bir Client Component olduğunu belirtiyoruz.

import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme/theme'; // Az önce oluşturduğumuz özel temayı import ediyoruz

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline, tarayıcılar arası stil tutarlılığı sağlar */}
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}