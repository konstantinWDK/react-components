'use client';

import type { CSSProperties, ReactNode } from 'react';
import './GlassCardGrid.css';

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
 * GlassCardGrid — A responsive grid specifically designed for card layouts with auto-fill columns.
 * 
 * @param {string} minWidth - Minimum width of columns (default: '300px').
 * @param {string} gap - Gap between items (default: '2rem').
 */
export interface GlassCardGridProps {
  minWidth?: string;
  gap?: string;
  className?: string;
  children?: ReactNode;
}

export function GlassCardGrid({ minWidth = '300px', gap = '2rem', className = '',
  children
}: GlassCardGridProps) {
  return (
    <>
      <div className={`card-grid ${className}`} style={st(`--min-width: ${minWidth}; --gap: ${gap};`)} data-rk-bc83a7="">
        {children}
      </div>
    </>
  );
}

export default GlassCardGrid;
