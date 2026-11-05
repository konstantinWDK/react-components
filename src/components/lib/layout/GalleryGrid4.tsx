'use client';

import type { ReactNode } from 'react';
import './GalleryGrid4.css';

/**
 * GalleryGrid4 — 4-Column aspect ratio grid for visual galleries and photos.
 */
export interface GalleryGrid4Props {
  className?: string;
  children?: ReactNode;
}

export function GalleryGrid4({ className = '',
  children
}: GalleryGrid4Props) {
  return (
    <>
      <div className={`gal-grid ${className}`} data-rk-fb6612="">
        {children ?? (<>
          <div className="gal-item" data-rk-fb6612=""><span data-rk-fb6612="">Photo 1</span></div>
          <div className="gal-item" data-rk-fb6612=""><span data-rk-fb6612="">Photo 2</span></div>
          <div className="gal-item" data-rk-fb6612=""><span data-rk-fb6612="">Photo 3</span></div>
          <div className="gal-item" data-rk-fb6612=""><span data-rk-fb6612="">Photo 4</span></div>
        </>)}
      </div>
    </>
  );
}

export default GalleryGrid4;
