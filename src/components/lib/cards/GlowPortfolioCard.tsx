'use client';

import type { CSSProperties, ReactNode } from 'react';
import './GlowPortfolioCard.css';

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
 * GlowPortfolioCard — Card with a hovering background glow that follows the card edges.
 * 
 * @param {string} title - Project title heading.
 * @param {string} subtitle - Project metadata (e.g. "Web design / 2024").
 * @param {string} glowColor - Optional. Hex color for the animated border glow. Default is '#6366f1'.
 */
export interface GlowPortfolioCardProps {
  title: string;
  subtitle: string;
  glowColor?: string;
  children?: ReactNode;
}

export function GlowPortfolioCard({ title, subtitle, glowColor = 'var(--c-primary, #6366f1)',
  children
}: GlowPortfolioCardProps) {
  return (
    <>
      <div className="glow-wrap" style={st(`--glow-color: ${glowColor};`)} data-rk-a93656="">
        <div className="glow-content" data-rk-a93656="">
          <h3 className="glow-content__title" data-rk-a93656="">{title}</h3>
          <p className="glow-content__subtitle" data-rk-a93656="">{subtitle}</p>
          {children}
        </div>
      </div>
    </>
  );
}

export default GlowPortfolioCard;
