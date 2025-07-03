// src/components/CustomGrid.tsx

import React from 'react';
import { Grid as MuiGrid, GridProps } from '@mui/material';

// Özel prop'larımızı tanımlıyoruz: size nesnesi
interface CustomGridProps extends Omit<GridProps, 'xs' | 'sm' | 'md' | 'lg' | 'xl'> {
  size?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

// Yeni CustomGrid bileşenimiz
const CustomGrid: React.FC<CustomGridProps> = ({ size, children, ...props }) => {
  // Gelen size nesnesini ve diğer props'ları MUI Grid'ine doğru şekilde iletiyoruz
  return (
    <MuiGrid {...size} {...props}>
      {children}
    </MuiGrid>
  );
};

export default CustomGrid;