// src/app/layout.tsx

'use client'; // State kullanacağımız için bu satır zorunlu!

import * as React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ThemeRegistry from '@/components/ThemeRegistry';
import SidebarContent from '@/components/SidebarContent'; // Yeni bileşenimizi import ediyoruz
import { Box, Drawer, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const inter = Inter({ subsets: ['latin'] });

// Metadata'yı layout'un dışında tanımlıyoruz, çünkü layout artık bir client component
// export const metadata: Metadata = { ... }; Bu şekilde kullanamayız.
// SEO için her sayfada ayrı Head yönetimi yapacağız, şimdilik bu konuyu park edelim.

const drawerWidth = 240;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <html lang="tr">
      <body className={inter.className}>
        <ThemeRegistry>
          <Box sx={{ display: 'flex' }}>
            {/* MOBİL İÇİN ÜST BAR */}
            <AppBar
              position="fixed"
              sx={{
                width: { md: `calc(100% - ${drawerWidth}px)` },
                ml: { md: `${drawerWidth}px` },
                display: { xs: 'block', md: 'none' }, // Sadece mobilde görünür
              }}
            >
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { md: 'none' } }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                  Okan Umut Acer
                </Typography>
              </Toolbar>
            </AppBar>

            <Box
              component="nav"
              sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
              aria-label="mailbox folders"
            >
              {/* MOBİLDE AÇILIR GEÇİCİ DRAWER */}
              <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true, // Performans için
                }}
                sx={{
                  display: { xs: 'block', md: 'none' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
              >
                <SidebarContent />
              </Drawer>

              {/* MASAÜSTÜNDE SABİT DRAWER */}
              <Drawer
                variant="permanent"
                sx={{
                  display: { xs: 'none', md: 'block' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
              >
                <SidebarContent />
              </Drawer>
            </Box>

            {/* ANA İÇERİK ALANI */}
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                width: { md: `calc(100% - ${drawerWidth}px)` },
                mt: { xs: '64px', md: 0 } // Mobildeki üst barın yüksekliği kadar boşluk
              }}
            >
              {children}
            </Box>
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}