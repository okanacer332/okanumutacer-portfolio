// src/app/layout.tsx

'use client';

import * as React from 'react';
import { Inter } from 'next/font/google';
import ThemeRegistry from '@/components/ThemeRegistry';
import SidebarContent from '@/components/SidebarContent';
import { Box, Drawer } from '@mui/material';
import DynamicScrollButton from '@/components/DynamicScrollButton'; // Yeni bileşeni import ediyoruz

const inter = Inter({ subsets: ['latin'] });

const drawerWidth = 280;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <ThemeRegistry>
          <Box sx={{ display: 'flex' }}>
            <Drawer
              variant="permanent"
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
                  borderRight: '1px solid',
                  borderColor: 'rgba(255, 255, 255, 0.12)',
                  backgroundColor: 'background.default',
                },
              }}
            >
              <SidebarContent />
            </Drawer>

            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: { xs: 2, sm: 3, md: 4 },
                backgroundColor: 'background.paper',
                minHeight: '100vh',
              }}
            >
              {children}
            </Box>

            {/* Dinamik kaydırma butonu tüm sayfaların üzerinde burada yer alacak */}
            <DynamicScrollButton />
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}