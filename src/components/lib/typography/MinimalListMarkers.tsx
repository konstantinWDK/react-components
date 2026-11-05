'use client';

import type { ReactNode } from 'react';
import './MinimalListMarkers.css';

/** MinimalListMarkers */
export interface MinimalListMarkersProps {
  children?: ReactNode;
}

export function MinimalListMarkers({ children }: MinimalListMarkersProps) {
  return (
    <>
      <ul className="custom-list" data-rk-100c10="">
        {children}
      </ul>
    </>
  );
}

export default MinimalListMarkers;
