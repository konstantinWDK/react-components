'use client';

import type { CSSProperties } from 'react';
import './ShopValuesMarquee.css';

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
 * ShopValuesMarquee — Brand promise band: an oversized italic marquee followed by numbered
 * value columns (materials, making, after-care…).
 *
 * @param {string[]} words - Marquee words. Empty hides the marquee.
 * @param {Array<{title: string, text: string}>} values - 2–4 value columns.
 * @param {number} speed - Marquee loop duration in seconds. Default 36.
 * @param {string} variant - Style (plain|inverted). Default 'plain'.
 * @param {string} size - Marquee scale (sm|md|lg). Default 'md'.
 * @param {string} className - Extra class.
 *
 * Accessibility: the marquee is decorative (aria-hidden) and pauses on hover and with reduced
 * motion; values are a real list with headings.
 */
export interface ShopValuesMarqueeProps {
  words?: string[];
  values?: Array<{ title: string; text: string }>;
  speed?: number;
  variant?: 'plain' | 'inverted';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ShopValuesMarquee({
  words = ['Made slowly', 'Natural fibres', 'Small workshops', 'Repaired for life'],
  values = [
    { title: 'Honest materials', text: 'Linen, wool, organic cotton and stoneware — traceable to the mill and the kiln.' },
    { title: 'Made in small runs', text: 'Each piece is produced in batches of a few hundred, never mass-manufactured.' },
    { title: 'Kept for years', text: 'Free repairs on everything we make, and a buy-back for pieces you have outgrown.' },
  ],
  speed = 36,
  variant = 'plain',
  size = 'md',
  className = '',
}: ShopValuesMarqueeProps) {
  return (
    <>
      <section className={cx(['svm', `svm--${variant}`, `svm--${size}`, className])} style={st(`--svm-speed: ${speed}s`)} data-rk-6a922c="">
        {words.length > 0 && (
          <div className="svm__marquee" aria-hidden="true" data-rk-6a922c="">
            <div className="svm__track" data-rk-6a922c="">
              {[0, 1].map(() => words.map((w, __i: number) => <span key={__i} data-rk-6a922c="">{w}<i data-rk-6a922c="">✺</i></span>))}
            </div>
          </div>
        )}
        {values.length > 0 && (
          <ol className="svm__values" data-rk-6a922c="">
            {values.map((v, i) => (
              <li key={i} data-rk-6a922c="">
                <span className="svm__num" aria-hidden="true" data-rk-6a922c="">{String(i + 1).padStart(2, '0')}</span>
                <h3 data-rk-6a922c="">{v.title}</h3>
                <p data-rk-6a922c="">{v.text}</p>
              </li>
            ))}
          </ol>
        )}
      </section>
    </>
  );
}

export default ShopValuesMarquee;
