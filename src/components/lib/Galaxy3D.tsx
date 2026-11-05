'use client';

import { useEffect, useRef } from 'react';
import './Galaxy3D.css';

/**
 * Galaxy3D — Interactive 3D galaxy background with a fluid, mouse-reactive particle field.
 *
 * Renders a spiral galaxy with thousands of particles using Three.js (optional peer dependency,
 * loaded lazily on the client). Motion runs on the GPU; rendering pauses off-screen or when the tab
 * is hidden, and `prefers-reduced-motion` renders a static frame.
 *
 * @param className - Additional CSS class.
 */
export interface Galaxy3DProps {
  className?: string;
}

export function Galaxy3D({ className = '' }: Galaxy3DProps) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    Promise.all([import('three'), import('./galaxy-scene')]).then(([THREE, { mountGalaxy }]) => {
      if (!cancelled && canvas.current) cleanup = mountGalaxy(canvas.current, THREE);
    });
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);
  return (
    <div className={`galaxy-3d-container ${className}`.trim()} aria-hidden="true">
      <canvas id="galaxy-3d-canvas" ref={canvas} />
    </div>
  );
}

export default Galaxy3D;
