// src/components/DynamicScrollButton.tsx - DÜZELTİLMİŞ VERSİYON

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

const pageSectionsConfig: { [key: string]: string[] } = {
  '/': ['hakkimda', 'deneyim', 'yetenekler'],
  '/projeler': ['projeler-sayfasi', 'one-cikan-proje', 'diger-calismalar'],
  '/blog': ['blog-sayfasi'],
  // Buraya blog detay sayfası gibi yeni sayfaları da ekleyebilirsiniz,
  // ama şimdilik boş bırakmak bu hatayı çözmek için yeterli.
};

export default function DynamicScrollButton() {
  // 1. TÜM HOOK ÇAĞRILARINI KOŞULSUZ OLARAK EN BAŞA ALIYORUZ
  const pathname = usePathname();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isAtPageBottom, setIsAtPageBottom] = useState(false);

  // Bu satır bir hook olmadığı için burada kalabilir.
  const activeSections = pageSectionsConfig[pathname] || [];

  const handleScroll = useCallback(() => {
    const scrollBottom = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
    setIsAtPageBottom(scrollBottom < 100); 

    let currentIdx = 0;
    // `activeSections` boş olsa bile döngünün hata vermemesi için
    // `length > 0` kontrolü eklemek iyi bir pratiktir.
    if (activeSections.length > 0) {
      for (let i = activeSections.length - 1; i >= 0; i--) {
        const section = document.getElementById(activeSections[i]);
        if (section && section.getBoundingClientRect().top <= window.innerHeight / 2) {
          currentIdx = i;
          break;
        }
      }
    }
    setCurrentSectionIndex(currentIdx);
  }, [activeSections]);

  useEffect(() => {
    // Listener'ları sadece ilgili bölümler varsa ekleyelim.
    if (activeSections.length > 0) {
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
    }
  }, [handleScroll, activeSections]); // `activeSections`'ı dependency array'e ekliyoruz.

  // 2. KOŞULLU RETURN İŞLEMİNİ TÜM HOOK'LAR ÇAĞRILDIKTAN SONRA YAPIYORUZ
  if (activeSections.length === 0) {
    return null;
  }
  
  // Fonksiyonun geri kalanı aynı...
  const scrollToTop = () => {
    const topSectionId = activeSections[0];
    document.getElementById(topSectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleClick = () => {
    if (isAtPageBottom) {
      scrollToTop();
    } else {
      const nextSectionId = activeSections[currentSectionIndex + 1] || activeSections[0];
      const nextElement = document.getElementById(nextSectionId);
      if(nextElement) {
        nextElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        scrollToTop();
      }
    }
  };
  
  const isOnlyOneSection = activeSections.length <= 1;
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