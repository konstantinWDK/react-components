'use client';

import type { CSSProperties } from 'react';
import './ProductRating.css';

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
 * ProductRating — Read-only star rating with value and review count.
 *
 * @param {number} value - Average rating, 0–5. Default 4.6.
 * @param {number} count - Number of reviews (optional).
 * @param {string} size - Visual size (sm|md|lg). Default 'sm'.
 * @param {boolean} showValue - Print the numeric value. Default true.
 * @param {string} label - Accessible label template; `{value}` and `{count}` are replaced.
 * @param {string} className - Extra class.
 *
 * Accessibility: exposed as one `role="img"` with a full text label; stars are decorative.
 */
export interface ProductRatingProps {
  value?: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  label?: string;
  className?: string;
}

export function ProductRating({
  value = 4.6,
  count,
  size = 'sm',
  showValue = true,
  label = 'Rated {value} out of 5{count}',
  className = '',
}: ProductRatingProps) {
  const clamped = Math.max(0, Math.min(5, value));
  const pct = `${(clamped / 5) * 100}%`;
  const aria = label
    .replace('{value}', clamped.toFixed(1))
    .replace('{count}', count !== undefined ? `, ${count} reviews` : '');
  const stars = '★★★★★';
  return (
    <>
      <span className={cx(['p-rating', `p-rating--${size}`, className])} role="img" aria-label={aria} data-rk-0ac791="">
        <span className="p-rating__stars" aria-hidden="true" style={st(`--p-rating-fill: ${pct}`)} data-rk-0ac791="">
          <span className="p-rating__base" data-rk-0ac791="">{stars}</span>
          <span className="p-rating__fill" data-rk-0ac791="">{stars}</span>
        </span>
        {showValue && <span className="p-rating__value" aria-hidden="true" data-rk-0ac791="">{clamped.toFixed(1)}</span>}
        {count !== undefined && <span className="p-rating__count" aria-hidden="true" data-rk-0ac791="">({count})</span>}
      </span>
    </>
  );
}

export default ProductRating;
