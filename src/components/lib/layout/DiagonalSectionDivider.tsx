'use client';

import type { CSSProperties } from 'react';
import './DiagonalSectionDivider.css';

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
 * DiagonalSectionDivider — Angled SVG/clip-path section divider creating fluid diagonal page transitions.
 * 
 * @param {'top' | 'bottom'} position - Attachment position. Default is 'bottom'.
 * @param {'left-to-right' | 'right-to-left'} direction - Slant angle direction. Default is 'left-to-right'.
 * @param {string} height - Height of the diagonal incline in pixels. Default is '60px'.
 * @param {string} fillColor - Fill color for the divider polygon. Default is '#050505'.
 */
export interface DiagonalSectionDividerProps {
  position?: 'top' | 'bottom';
  direction?: 'left-to-right' | 'right-to-left';
  height?: string;
  fillColor?: string;
}

export function DiagonalSectionDivider({
  position = 'bottom',
  direction = 'left-to-right',
  height = '60px',
  fillColor = '#050505',
}: DiagonalSectionDividerProps) {
  const isLtr = direction === 'left-to-right';
  const points = isLtr
    ? position === 'bottom' ? '0,100 100,0 100,100' : '0,0 100,0 100,100'
    : position === 'bottom' ? '0,0 0,100 100,100' : '0,0 100,0 0,100';
  return (
    <>
      <div className={cx(['diagonal-divider', `diagonal-divider--${position}`])} style={st(`--div-height: ${height}; --div-color: ${fillColor};`)} aria-hidden="true" data-rk-9b90ea="">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="diagonal-divider__svg" data-rk-9b90ea="">
          <polygon points={points} fill={fillColor} data-rk-9b90ea="" />
        </svg>
      </div>
    </>
  );
}

export default DiagonalSectionDivider;
