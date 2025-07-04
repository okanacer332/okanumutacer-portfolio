// src/components/DynamicScrollButton.tsx

'use client';

import React, { useEffect, useState, useCallback } from 'react'; // useMemo kaldırıldı
import { Fab, Box, useScrollTrigger, Zoom } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// Bileşenin prop'ları
interface DynamicScrollButtonProps {
  threshold?: number;
}

export default function DynamicScrollButton({ threshold = 100 }: DynamicScrollButtonProps) {
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  // activeSections'ı başlangıçta boş bir dizi olarak tanımlıyoruz
  const [availableSections, setAvailableSections] = useState<string[]>([]);

  // Scroll tetikleyicisi
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: threshold,
  });

  // Bileşen yüklendiğinde (client-side) aktif bölümleri belirle
  useEffect(() => {
    // Sadece tarayıcı ortamında çalışmasını sağlıyoruz
    if (typeof document !== 'undefined') {
      const sections = ['hakkimda', 'projeler', 'iletisim']; // Sayfa ID'leri
      // document.getElementById(id) çağrısını bu useEffect içine taşıyoruz
      setAvailableSections(sections.filter(id => document.getElementById(id)));
    }
  }, []); // Sadece bir kez, bileşen yüklendiğinde çalışır

  // Scroll pozisyonunu dinle ve aktif bölümü güncelle
  const handleScroll = useCallback(() => {
    let newCurrentSection: string | null = null;
    for (const sectionId of availableSections) { // availableSections'ı kullanıyoruz
      const section = document.getElementById(sectionId);
      if (section) {
        const rect = section.getBoundingClientRect();
        // Eğer bölüm ekranın üst kısmına yakınsa veya içindeyse
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          newCurrentSection = sectionId;
          break;
        }
      }
    }
    setCurrentSection(newCurrentSection);
  }, [availableSections]); // availableSections artık bir bağımlılık olarak güvenli

  useEffect(() => {
    // Sadece tarayıcı ortamında event listener ekle
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      // Bileşen yüklendiğinde veya aktif bölümler değiştiğinde ilk kontrolü yap
      handleScroll();
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll]);

  // Butona tıklandığında ilgili bölüme veya en üste kaydır
  const handleClick = useCallback(() => {
    if (currentSection) {
      // Eğer aktif bir bölüm varsa, bir sonraki bölüme kaydır
      const currentIndex = availableSections.indexOf(currentSection);
      const nextIndex = (currentIndex + 1) % availableSections.length;
      const nextSectionId = availableSections[nextIndex];
      const nextSection = document.getElementById(nextSectionId);
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Aktif bölüm yoksa veya en alttaysa, en üste kaydır
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [currentSection, availableSections]); // currentSection ve availableSections bağımlılık olarak eklendi

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 999, // Diğer elementlerin üzerinde görünmesini sağlar
        }}
      >
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Zoom>
  );
}
