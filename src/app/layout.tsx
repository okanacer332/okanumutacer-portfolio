'use client';

import * as React from 'react';
import { Inter } from 'next/font/google';
import ThemeRegistry from '@/components/ThemeRegistry';
import SidebarContent from '@/components/SidebarContent';
import { AppBar, Box, Drawer, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DynamicScrollButton from '@/components/DynamicScrollButton';

const inter = Inter({ subsets: ['latin'] });
const drawerWidth = 280;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };
  
  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  return (
    <html lang="tr">
      <body className={inter.className}>
        <ThemeRegistry>
          <Box sx={{ display: 'flex' }}>
            <AppBar
              position="fixed"
              sx={{
                width: { md: `calc(100% - ${drawerWidth}px)` },
                ml: { md: `${drawerWidth}px` },
                display: { md: 'none' },
                backgroundColor: 'background.paper',
                color: 'text.primary'
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
            >
              <Drawer
                variant="temporary"
                open={mobileOpen}
                onTransitionEnd={handleDrawerTransitionEnd}
                onClose={handleDrawerClose}
                ModalProps={{ keepMounted: true }}
                sx={{
                  display: { xs: 'block', md: 'none' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
              >
                <SidebarContent onLinkClick={handleDrawerToggle} />
              </Drawer>

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

            <Box
              component="main"
              sx={{
                flexGrow: 1,
                mt: { xs: '64px', md: 0 },
                p: { xs: 2, sm: 3, md: 4 },
                // Genişliği tüm ekran boyutları için net bir şekilde tanımlıyoruz
                width: { 
                  xs: '100%', 
                  md: `calc(100% - ${drawerWidth}px)` 
                },
                minHeight: '100vh',
                // Bu bileşenin kendisinin taşmasını ve yatay scroll oluşturmasını engelliyoruz
                overflowX: 'hidden',
              }}
            >
              {children}
            </Box>
            
            <DynamicScrollButton />
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
