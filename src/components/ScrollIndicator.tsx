// src/components/ScrollIndicator.tsx

import React from 'react';
import { Box, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { keyframes } from '@mui/system';

// Zıplama animasyonunu tanımlıyoruz
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-15px);
  }
  60% {
    transform: translateY(-8px);
  }
`;

const ScrollIndicator = () => {
  const handleClick = () => {
    // Kullanıcıyı bir sonraki bölüm olan "Deneyimlerim"e yumuşakça kaydır
    const experienceSection = document.getElementById('deneyim');
    if (experienceSection) {
      experienceSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        position: 'absolute',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'text.secondary',
        cursor: 'pointer',
        zIndex: 10,
        transition: 'color 0.3s ease',
        '&:hover': {
          color: 'primary.main',
        },
      }}
    >
      <Typography variant="caption" sx={{ mb: 0.5 }}>
        Daha Fazlası
      </Typography>
      <KeyboardArrowDownIcon sx={{ fontSize: '2rem', animation: `${bounce} 2s infinite` }} />
    </Box>
  );
};

export default ScrollIndicator;