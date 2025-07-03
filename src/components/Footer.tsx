// src/components/Footer.tsx

'use client';

import React from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto', // En önemli kısım: Bu, footer'ı sayfanın en altına yapıştırır.
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: { xs: 2, sm: 0 } }}>
            © {new Date().getFullYear()} Okan Umut Acer. Tüm Hakları Saklıdır.
          </Typography>
          <Box>
            {/* Kendi linklerinizi eklemeyi unutmayın */}
            <IconButton href="https://github.com/okanumut" target="_blank" aria-label="github">
              <GitHubIcon />
            </IconButton>
            <IconButton href="https://linkedin.com/in/okan-umut-acer" target="_blank" aria-label="linkedin">
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}