// src/components/DynamicScrollButton.tsx

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Fab } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { keyframes } from '@mui/system';

// Animasyon ve bölümlerimizi tanımlıyoruz
const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
`;

// Sitenizdeki ana bölümlerin ID'leri
const SECTION_IDS = ['hakkimda', 'deneyim', 'yetenekler'];

export default function DynamicScrollButton() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  // Scroll olayını dinleyerek hangi bölümde olduğumuzu tespit eden fonksiyon
  const handleScroll = useCallback(() => {
    let currentIdx = 0;
    // Sayfanın yarısını geçen son bölümü aktif bölüm olarak kabul edelim
    for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
      const section = document.getElementById(SECTION_IDS[i]);
      if (section && section.getBoundingClientRect().top <= window.innerHeight / 2) {
        currentIdx = i;
        break;
      }
    }
    setCurrentSectionIndex(currentIdx);
  }, []);

  useEffect(() => {
    // Scroll dinleyicisini ekle ve ilk durumu kontrol et
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // Belirtilen bölüme yumuşakça kaydıran fonksiyon
  const scrollToSection = (index: number) => {
    const sectionId = SECTION_IDS[index];
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // En üste yumuşakça kaydıran fonksiyon
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClick = () => {
    const isLastSection = currentSectionIndex === SECTION_IDS.length - 1;

    // Eğer son bölümde isek, en üste git
    if (isLastSection) {
      scrollToTop();
    } else {
      // Değilsek, bir sonraki bölüme git
      scrollToSection(currentSectionIndex + 1);
    }
  };

  const isLastSection = currentSectionIndex === SECTION_IDS.length - 1;

  return (
    <Fab
      color="primary"
      aria-label="scroll section"
      onClick={handleClick}
      sx={{
        position: 'fixed',
        bottom: { xs: 24, md: 32 },
        right: { xs: 24, md: 32 },
        // Son bölümde değilsek zıplama animasyonunu göster
        animation: !isLastSection ? `${bounce} 1.5s ease-in-out infinite` : 'none',
        backgroundColor: '#64ffda',
        color: '#0a1929',
        '&:hover': {
          backgroundColor: 'primary.light',
        },
      }}
    >
      {/* Son bölümde isek yukarı ok, değilsek aşağı ok göster */}
      {isLastSection ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
    </Fab>
  );
}