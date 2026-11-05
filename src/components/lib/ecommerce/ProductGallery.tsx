'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import ProductMedia from './ProductMedia';
import './ProductGallery.css';

/** class:list → className */
function cx(...args: unknown[]): string {
  const out: string[] = [];
  const walk = (v: unknown) => {
    if (!v) return;
    if (typeof v === 'string' || typeof v === 'number') out.push(String(v));
    else if (Array.isArray(v)) v.forEach(walk);
    else if (typeof v === 'object') for (const [k, on] of Object.entries(v as Record<string, unknown>)) if (on) out.push(k);
  };
  args.forEach(walk);
  return out.join(' ');
}

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
 * ProductGallery — Product image viewer with a large stage and thumbnail rail.
 * Works with real photos (`images`) or generates several illustrated "angles".
 *
 * @param {string[]} images - Photo URLs. When empty, illustrated views are generated.
 * @param {string} alt - Alt text base for photos. Default 'Product photo'.
 * @param {string} icon - Illustration for generated views. Default 'headphones'.
 * @param {number} hue - Backdrop hue for generated views. Default 38.
 * @param {number} views - Number of generated views (2–5). Default 4.
 * @param {string} layout - Thumbnail position (bottom|side). Default 'side'.
 * @param {string} size - Stage ratio preset (sm|md|lg). Default 'md'.
 * @param {string} className - Extra class.
 *
 * Accessibility: thumbnails are buttons with aria-pressed and labels; arrow keys move
 * between thumbnails; the stage announces the current view number.
 */
export interface ProductGalleryProps {
  images?: string[];
  alt?: string;
  icon?: string;
  hue?: number;
  views?: number;
  layout?: 'bottom' | 'side';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ProductGallery({
  images = [],
  alt = 'Product photo',
  icon = 'headphones',
  hue = 38,
  views = 4,
  layout = 'side',
  size = 'md',
  className = '',
}: ProductGalleryProps) {
  const generated = Array.from({ length: Math.min(5, Math.max(2, views)) }, (_, i) => ({
    hue: (hue + i * 18) % 360,
    variant: (i % 2 === 0 ? 'glow' : 'soft') as 'glow' | 'soft',
    turn: [0, -14, 12, -4, 20][i] ?? 0,
    zoom: [1, 1.18, 0.92, 1.3, 1.05][i] ?? 1,
  }));
  const slides = images.length
    ? images.map((src, i) => ({ src, label: `${alt} ${i + 1}` }))
    : generated.map((g, i) => ({ ...g, label: `View ${i + 1}` }));
  const ratio = size === 'sm' ? '1 / 1' : size === 'lg' ? '4 / 5' : '5 / 5.4';

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLElement>('[data-gallery]:not([data-bound])').forEach((g) => {
        g.dataset.bound = '';
        const slides = Array.from(g.querySelectorAll<HTMLElement>('[data-slide]'));
        const thumbs = Array.from(g.querySelectorAll<HTMLButtonElement>('[data-thumb]'));
        const show = (i: number, focus = false) => {
          slides.forEach((s, n) => { s.hidden = n !== i; s.classList.toggle('is-active', n === i); });
          thumbs.forEach((t, n) => t.setAttribute('aria-pressed', String(n === i)));
          if (focus) thumbs[i]?.focus();
        };
        thumbs.forEach((t, i) => {
          t.addEventListener('click', () => show(i));
          t.addEventListener('keydown', (e) => {
            const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
            if (!(e.key in keys)) return;
            e.preventDefault();
            show((i + keys[e.key] + thumbs.length) % thumbs.length, true);
          });
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="p-gallery-cq" data-rk-60f127="">
      <div className={cx(['p-gallery', `p-gallery--${layout}`, `p-gallery--${size}`, className])} data-gallery data-rk-60f127="">
        <div className="p-gallery__stage" aria-live="polite" data-rk-60f127="">
          {slides.map((s: any, i) => (
            <div key={i} className={cx(['p-gallery__slide', { 'is-active': i === 0 }])} data-slide hidden={i !== 0} style={st(s.turn !== undefined ? `--turn: ${s.turn}deg; --zoom: ${s.zoom}` : '')} data-rk-60f127="">
              {s.src
                ? <ProductMedia image={s.src} alt={s.label} ratio={ratio} />
                : <ProductMedia icon={icon} hue={s.hue} variant={s.variant} ratio={ratio} size="lg" />}
              <span className="sr-only" data-rk-60f127="">{s.label} of {slides.length}</span>
            </div>
          ))}
        </div>
        <div className="p-gallery__thumbs" role="group" aria-label="Product views" data-rk-60f127="">
          {slides.map((s: any, i) => (
            <button key={i} className={cx(['p-gallery__thumb'])} type="button" aria-pressed={i === 0 ? 'true' : 'false'} aria-label={`Show ${s.label}`} data-thumb={i} style={st(s.turn !== undefined ? `--turn: ${s.turn}deg; --zoom: ${s.zoom}` : '')} data-rk-60f127="">
              {s.src
                ? <ProductMedia image={s.src} alt="" ratio="1 / 1" />
                : <ProductMedia icon={icon} hue={s.hue} variant={s.variant} ratio="1 / 1" size="sm" />}
            </button>
          ))}
        </div>
      </div>
      </div>
    </>
  );
}

export default ProductGallery;
