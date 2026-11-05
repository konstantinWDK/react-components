'use client';

import type { CSSProperties, ReactNode } from 'react';
import './SectionDividerText.css';

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
 * SectionDividerText — A text-based section divider with decorative lines on each side.
 *
 * Displays uppercase text centered between two horizontal lines. Ideal for separating
 * content sections on landing pages or documentation pages.
 *
 * @param {string} color - Text and line color using CSS color value. Default: 'var(--c-text-3)'.
 * @param {string} fontSize - Size of the divider text. Default: '0.75rem'.
 *
 * @example
 * ```astro
 * <SectionDividerText>Features</SectionDividerText>
 * ```
 */
export interface SectionDividerTextProps {
  color?: string;
  fontSize?: string;
  children?: ReactNode;
}

export function SectionDividerText({ color = 'var(--c-text-3)', fontSize = '0.75rem',
  children
}: SectionDividerTextProps) {
  return (
    <>
      <div className="section-divider" style={st(`--divider-color: ${color}; --divider-font-size: ${fontSize}`)} data-rk-48ae98="">
        <span data-rk-48ae98="">{children}</span>
      </div>
    </>
  );
}

export default SectionDividerText;
