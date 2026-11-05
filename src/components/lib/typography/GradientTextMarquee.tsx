'use client';

import type { CSSProperties } from 'react';
import './GradientTextMarquee.css';

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
 * GradientTextMarquee — Continuous kinetic typographic marquee banner with background-clip gold gradient.
 * 
 * @param {string[]} phrases - Array of words or slogans to scroll continuously.
 * @param {string} speed - Animation duration string (e.g. '25s'). Default is '20s'.
 * @param {boolean} reverse - Whether the marquee moves in reverse direction.
 */
export interface GradientTextMarqueeProps {
  phrases?: string[];
  speed?: string;
  reverse?: boolean;
}

export function GradientTextMarquee({
  phrases = [
    'PERFORMANCE FIRST',
    'ZERO DEPENDENCIES',
    'ACCESSIBLE WCAG AA',
    'ASTRO 5 READY',
    'DARK GLASS MORPHISM',
  ],
  speed = '20s',
  reverse = false,
}: GradientTextMarqueeProps) {
  return (
    <>
      <div className="grad-marquee" style={st(`--marquee-speed: ${speed};`)} aria-label="Animated slogan marquee" data-rk-48dfb7="">
        <div className={cx(['grad-marquee__track', { 'is-reverse': reverse }])} data-rk-48dfb7="">
          {phrases.map((phrase, __i: number) => (
            <span key={__i} className="grad-marquee__item" data-rk-48dfb7="">
              <span className="text" data-rk-48dfb7="">{phrase}</span>
              <span className="dot" aria-hidden="true" data-rk-48dfb7="">✦</span>
            </span>
          ))}
          {/* Duplicate loop */}
          {phrases.map((phrase, __i: number) => (
            <span key={__i} className="grad-marquee__item" aria-hidden="true" data-rk-48dfb7="">
              <span className="text" data-rk-48dfb7="">{phrase}</span>
              <span className="dot" aria-hidden="true" data-rk-48dfb7="">✦</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default GradientTextMarquee;
