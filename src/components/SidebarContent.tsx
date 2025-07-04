// src/components/SidebarContent.tsx

'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Box, Typography, Button, Stack, Avatar, IconButton, Divider } from '@mui/material';
import Link from 'next/link';
import { HomeOutlined, Code, ArticleOutlined, MailOutline } from '@mui/icons-material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const menuItems = [
  { label: 'Hakkımda', path: '/', icon: <HomeOutlined /> },
  { label: 'Projelerim', path: '/projeler', icon: <Code /> },
  // Blog linki buradan kaldırıldı
  { label: 'İletişim', path: '/iletisim', icon: <MailOutline /> },
];

// Bileşenin prop'larına onLinkClick fonksiyonunu ekliyoruz.
interface SidebarContentProps {
  onLinkClick?: () => void;
}

export default function SidebarContent({ onLinkClick }: SidebarContentProps) {
  const pathname = usePathname();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        p: 3,
        backgroundColor: 'background.default',
      }}
    >
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Avatar
            alt="Okan Umut Acer"
            src="/profil-fotografi.jpg"
            sx={{
              width: 100,
              height: 100,
              margin: '0 auto',
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

          <Stack component="nav" spacing={1}>
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Button
                  key={item.label}
                  component={Link}
                  href={item.path}
                  startIcon={item.icon}
                  // Her butona tıklandığında onLinkClick fonksiyonunu çağırıyoruz.
                  onClick={onLinkClick}
                  sx={{
                    justifyContent: 'flex-start',
                    px: 2,
                    py: 1.2,
                    borderRadius: '8px',
                    position: 'relative',
                    color: isActive ? 'primary.main' : 'text.secondary',
                    backgroundColor: 'transparent',
                    fontWeight: isActive ? 'bold' : 'normal',
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: 'action.hover',
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '4px',
                      height: isActive ? '60%' : '0%',
                      backgroundColor: 'primary.main',
                      borderRadius: '0 4px 4px 0',
                      transition: 'height 0.2s ease-in-out',
                    },
                  }}
                >
                  <Typography sx={{ ml: 1, fontWeight: 'inherit' }}>
                    {item.label}
                  </Typography>
                </Button>
              );
            })}
          </Stack>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.12)' }} />

          <Stack direction="row" spacing={1.5} justifyContent="center">
            <IconButton
              href="https://github.com/okanumut"
              target="_blank"
              aria-label="github"
              sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              href="https://linkedin.com/in/okan-umut-acer"
              target="_blank"
              aria-label="linkedin"
              sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
            >
              <LinkedInIcon />
            </IconButton>
          </Stack>
        </Box>
      </Box>

      <Box sx={{ textAlign: 'center', pb: 1 }}>
        <Typography variant="caption" color="text.disabled">
          © {new Date().getFullYear()} Made by Okan
        </Typography>
      </Box>
    </Box>
  );
}