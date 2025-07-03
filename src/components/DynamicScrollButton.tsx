// src/components/DynamicScrollButton.tsx - SAYFA SONUNU DOĞRU ALGILAYAN FİNAL VERSİYON

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { Fab } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { keyframes } from '@mui/system';

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
`;

// Hangi sayfada hangi bölümlerin olduğunu tanımlayan konfigürasyon objesi
const pageSectionsConfig: { [key: string]: string[] } = {
  '/': ['hakkimda', 'deneyim', 'yetenekler'],
  '/projeler': ['projeler-sayfasi', 'one-cikan-proje', 'diger-calismalar'],
  '/blog': ['blog-sayfasi'],
};

export default function DynamicScrollButton() {
  const pathname = usePathname();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  // YENİ STATE: Sayfanın sonunda olup olmadığımızı takip eder
  const [isAtPageBottom, setIsAtPageBottom] = useState(false);

  const activeSections = pageSectionsConfig[pathname] || [];

  if (activeSections.length === 0) {
    return null;
  }

  const handleScroll = useCallback(() => {
    // === YENİ VE DAHA DOĞRU MANTIK ===
    // 1. Sayfanın sonuna ne kadar kaldığını hesapla
    const scrollBottom = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
    // Eğer sayfanın sonuna 100 pikselden az kalmışsa, "sayfa sonu" olarak kabul et.
    setIsAtPageBottom(scrollBottom < 100); 
    
    // === ESKİ MANTIK KORUNUYOR: Bölümler arası geçiş için ===
    let currentIdx = 0;
    for (let i = activeSections.length - 1; i >= 0; i--) {
      const section = document.getElementById(activeSections[i]);
      if (section && section.getBoundingClientRect().top <= window.innerHeight / 2) {
        currentIdx = i;
        break;
      }
    }
    setCurrentSectionIndex(currentIdx);
  }, [activeSections]);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const scrollToTop = () => {
    const topSectionId = activeSections[0];
    document.getElementById(topSectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleClick = () => {
    // ARTIK isAtPageBottom'u kontrol ediyoruz.
    if (isAtPageBottom) {
      scrollToTop();
    } else {
      const nextSectionId = activeSections[currentSectionIndex + 1] || activeSections[0];
      const nextElement = document.getElementById(nextSectionId);
      if(nextElement) {
        nextElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // Her ihtimale karşı, eğer bir sonraki bölüm bulunamazsa en üste gitsin
        scrollToTop();
      }
    }
  };
  
  const isOnlyOneSection = activeSections.length <= 1;

  // İkon ve animasyon artık isAtPageBottom'a göre belirleniyor
  const IconToShow = isAtPageBottom || isOnlyOneSection ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />;
  const animation = !isAtPageBottom && !isOnlyOneSection ? `${bounce} 1.5s ease-in-out infinite` : 'none';

  return (
    <Fab
      color="primary"
      aria-label="scroll section"
      onClick={handleClick}
      sx={{
        position: 'fixed',
        bottom: { xs: 24, md: 32 },
        right: { xs: 24, md: 32 },
        animation: animation,
        backgroundColor: '#64ffda',
        color: '#0a1929',
        '&:hover': {
          backgroundColor: 'primary.light',
        },
      }}
    >
      {IconToShow}
    </Fab>
  );
}