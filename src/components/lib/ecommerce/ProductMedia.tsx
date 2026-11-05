'use client';

import type { CSSProperties, ReactNode } from 'react';
import { productIcon } from './product-icons';
import './ProductMedia.css';

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
 * ProductMedia — Product visual: a real photo, or a generated backdrop with a
 * line-art illustration so demo catalogs look finished without external images.
 *
 * @param {string} image - Product photo URL. When set, replaces the illustration.
 * @param {string} alt - Alternative text. Required for photos; illustrations are decorative.
 * @param {string} icon - Built-in illustration (headphones|watch|sneaker|backpack|camera|lamp|keyboard|sunglasses|bottle|speaker|jacket|mug|plant|shirt|bag|phone).
 * @param {number} hue - 0–360 hue of the generated backdrop. Default 40 (gold).
 * @param {string} ratio - CSS aspect-ratio. Default '1 / 1'.
 * @param {string} size - Illustration scale (sm|md|lg). Default 'md'.
 * @param {string} variant - Backdrop style (glow|soft|flat). Default 'glow'.
 * @param {string} className - Extra class.
 *
 * Accessibility: illustrations are aria-hidden; photos need `alt`.
 */
export interface ProductMediaProps {
  image?: string;
  alt?: string;
  icon?: string;
  hue?: number;
  ratio?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'glow' | 'soft' | 'flat';
  className?: string;
  children?: ReactNode;
}

export function ProductMedia({
  image,
  alt = '',
  icon = 'bag',
  hue = 40,
  ratio = '1 / 1',
  size = 'md',
  variant = 'glow',
  className = '',
  children
}: ProductMediaProps) {
  return (
    <>
      <div className={cx(['p-media', `p-media--${size}`, `p-media--${variant}`, className])} style={st(`--pm-hue: ${hue}; --pm-ratio: ${ratio};`)} data-rk-082ece="">
        {image ? (
          <img className="p-media__img" src={image} alt={alt} loading="lazy" decoding="async" data-rk-082ece="" />
        ) : (
          <svg className="p-media__art" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-rk-082ece=""><g dangerouslySetInnerHTML={{ __html: productIcon(icon) }} data-rk-082ece="" /></svg>
        )}
        {children}
      </div>
    </>
  );
}

export default ProductMedia;
