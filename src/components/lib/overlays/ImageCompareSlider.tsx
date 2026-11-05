'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import './ImageCompareSlider.css';

/** "a: b; --c: d" → style object */
function st(css: string | undefined): CSSProperties {
  const o: Record<string, string> = {};
  for (const decl of String(css ?? '').split(';')) {
    const i = decl.indexOf(':');
    if (i < 0) continue;
    const k = decl.slice(0, i).trim();
    if (k) o[k.startsWith('--') ? k : k.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = decl.slice(i + 1).trim();
  }
  return o as CSSProperties;
}

/**
 * ImageCompareSlider — Interactive dual-image split compare slider with draggable separator bar.
 * 
 * @param {string} beforeImage - URL of original / before image.
 * @param {string} afterImage - URL of modified / after image.
 * @param {string} beforeLabel - Label tag. Default is 'Before'.
 * @param {string} afterLabel - Label tag. Default is 'After'.
 * @param {number} initialPosition - Starting separator position (0 to 100). Default is 50.
 */
export interface ImageCompareSliderProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
  initialPosition?: number;
}

export function ImageCompareSlider({
  beforeImage = 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
  afterImage = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
  beforeLabel = 'Before (Wireframe)',
  afterLabel = 'After (Production)',
  initialPosition = 50,
}: ImageCompareSliderProps) {

  // Ported from the Astro <script>: runs once after mount (DOM logic kept as in the Astro kit).
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    function setupImageCompare() {
        document.querySelectorAll('[data-img-compare]').forEach((comp) => {
          const range = comp.querySelector('[data-compare-range]') as HTMLInputElement;
          if (!range) return;
    
          range.addEventListener('input', () => {
            (comp as HTMLElement).style.setProperty('--pos', `${range.value}%`);
          });
        });
      }
    
      setupImageCompare();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="img-compare" data-img-compare style={st(`--pos: ${initialPosition}%;`)} data-rk-886e9f="">
        <div className="img-compare__layer img-compare__layer--after" data-rk-886e9f="">
          <img src={afterImage} alt={afterLabel} loading="lazy" data-rk-886e9f="" />
          <span className="img-compare__tag img-compare__tag--after" data-rk-886e9f="">{afterLabel}</span>
        </div>
      
        <div className="img-compare__layer img-compare__layer--before" data-compare-before data-rk-886e9f="">
          <img src={beforeImage} alt={beforeLabel} loading="lazy" data-rk-886e9f="" />
          <span className="img-compare__tag img-compare__tag--before" data-rk-886e9f="">{beforeLabel}</span>
        </div>
      
        <div className="img-compare__handle" data-compare-handle aria-hidden="true" data-rk-886e9f="">
          <div className="handle-line" data-rk-886e9f=""></div>
          <div className="handle-button" data-rk-886e9f="">
            <span data-rk-886e9f="">‹</span>
            <span data-rk-886e9f="">›</span>
          </div>
        </div>
      
        <input type="range" min="0" max="100" defaultValue={initialPosition} className="img-compare__range" aria-label="Drag to compare images" data-compare-range data-rk-886e9f="" />
      </div>
    </>
  );
}

export default ImageCompareSlider;
