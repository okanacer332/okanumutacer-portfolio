// src/components/SidebarContent.tsx

'use client';

import React from 'react';
import { usePathname } from 'next/navigation'; // Aktif linki belirlemek için
import { Box, Typography, Button, Stack, Avatar, IconButton } from '@mui/material';
import Link from 'next/link';
import { HomeOutlined, Code, ArticleOutlined, MailOutline } from '@mui/icons-material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


// Yeni menü yapımız
const menuItems = [
  { label: 'Hakkımda', path: '/', icon: <HomeOutlined /> }, 
  { label: 'Projelerim', path: '/projeler', icon: <Code /> },
  { label: 'Blog', path: '/blog', icon: <ArticleOutlined /> },
  { label: 'İletişim', path: '/iletisim', icon: <MailOutline /> },
];

export default function SidebarContent() {
  const pathname = usePathname(); // Mevcut URL yolunu alıyoruz

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',    // Yatayda ortala
        justifyContent: 'center', // DİKEYDE ORTALA
        height: '100%',
        p: 3,
      }}
    >
      {/* Profil ve Menü Tek Bir Kutuda */}
      <Box sx={{ textAlign: 'center' }}>
        <Avatar
          alt="Okan Umut Acer"
          src="/profil-fotografi.jpg"
          sx={{
            width: 120,
            height: 120,
            mb: 2,
            border: '3px solid',
            borderColor: 'primary.main',
          }}
        />
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Okan Umut Acer
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Bilgisayar Mühendisi
        </Typography>

        <Stack spacing={1} sx={{ width: '100%', mb: 4 }}>
          {menuItems.map((item) => (
            <Button
              key={item.label}
              component={Link}
              href={item.path}
              startIcon={item.icon}
              variant={pathname === item.path ? 'contained' : 'text'} // Aktif sayfa kontrolü
              disableElevation={pathname === item.path}
              sx={{
                justifyContent: 'flex-start',
                textTransform: 'none',
                fontWeight: pathname === item.path ? 'bold' : 'normal',
                borderRadius: '8px',
                px: 2,
              }}
            >
              {item.label}
            </Button>
          ))}
        </Stack>

        {/* Sosyal Medya İkonları */}
        <Stack direction="row" spacing={1} justifyContent="center">
            <IconButton href="https://github.com/okanumut" target="_blank" aria-label="github">
              <GitHubIcon />
            </IconButton>
            <IconButton href="https://linkedin.com/in/okan-umut-acer" target="_blank" aria-label="linkedin">
              <LinkedInIcon />
            </IconButton>
        </Stack>
      </Box>
    </Box>
  );
}