'use client';

import { useEffect, useRef, useState } from 'react';

/** Hero background: rounded cubes assembling a voxel React atom (see cubes-scene.ts). */
export function CubesHero() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    Promise.all([
      import('three'),
      import('three/examples/jsm/geometries/RoundedBoxGeometry.js'),
      import('./cubes-scene'),
    ]).then(([THREE, { RoundedBoxGeometry }, { mountCubes }]) => {
      if (!cancelled && ref.current) cleanup = mountCubes(ref.current, THREE, RoundedBoxGeometry);
    });
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);
  return (
    <div className="hero__cubes" aria-hidden="true">
      <canvas ref={ref} />
    </div>
  );
}

/**
 * Page-level effects that the Astro page ran as inline scripts:
 * hero depth parallax and the interaction-lab pointer spotlight.
 */
export function HomeEffects() {
  useEffect(() => {
    const cleanups: (() => void)[] = [];

    const scene = document.querySelector<HTMLElement>('.hero__scene');
    if (scene && !matchMedia('(prefers-reduced-motion: reduce)').matches && matchMedia('(pointer: fine)').matches) {
      let raf = 0;
      let mx = 0;
      let my = 0;
      const onMove = (e: PointerEvent) => {
        mx = (e.clientX / innerWidth - 0.5) * 2;
        my = (e.clientY / innerHeight - 0.5) * 2;
        if (raf) return;
        raf = requestAnimationFrame(() => {
          scene.style.setProperty('--mx', mx.toFixed(3));
          scene.style.setProperty('--my', my.toFixed(3));
          raf = 0;
        });
      };
      addEventListener('pointermove', onMove, { passive: true });
      cleanups.push(() => removeEventListener('pointermove', onMove));
    }

    document.querySelectorAll<HTMLElement>('[data-lab] .lab-tile').forEach((tile) => {
      const onMove = (e: PointerEvent) => {
        const r = tile.getBoundingClientRect();
        tile.style.setProperty('--x', `${e.clientX - r.left}px`);
        tile.style.setProperty('--y', `${e.clientY - r.top}px`);
      };
      tile.addEventListener('pointermove', onMove, { passive: true });
      cleanups.push(() => tile.removeEventListener('pointermove', onMove));
    });

    return () => cleanups.forEach((c) => c());
  }, []);
  return null;
}

const CopyIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
);
const CheckIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
);

/** Copy button with a 2s "copied" state. */
export function CopyCommand({ text, label, className, size = 14 }: { text: string; label: string; className: string; size?: number }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className={className}
      aria-label={label}
      type="button"
      style={copied ? { borderColor: 'rgba(34, 197, 94, 0.6)', color: '#22c55e' } : undefined}
      onClick={() => {
        navigator.clipboard?.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      }}
    >
      {copied ? <CheckIcon size={size} /> : <CopyIcon size={size} />}
    </button>
  );
}

/** Prev / next buttons for the full-width sections carousel. */
export function SectionsCarouselNav({ prev, next }: { prev: string; next: string }) {
  const scroll = (dir: 1 | -1) => {
    const track = document.getElementById('sectionsTrack');
    const card = track?.querySelector<HTMLElement>('.sections-carousel__slide');
    track?.scrollBy({ left: dir * (card ? card.offsetWidth + 24 : 500), behavior: 'smooth' });
  };
  return (
    <div className="sections-carousel__nav-btns">
      <button type="button" className="carousel-nav-btn" aria-label={prev} onClick={() => scroll(-1)}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
      </button>
      <button type="button" className="carousel-nav-btn" aria-label={next} onClick={() => scroll(1)}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
}
