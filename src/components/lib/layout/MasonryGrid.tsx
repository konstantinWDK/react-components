'use client';

import type { CSSProperties, ReactNode } from 'react';
import './MasonryGrid.css';

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
 * MasonryGrid — A CSS-based masonry layout for items of varying heights.
 */
export interface MasonryGridProps {
  columns?: number;
  gap?: string;
  className?: string;
  children?: ReactNode;
}

export function MasonryGrid({ columns = 3, gap = '1.5rem', className = '',
  children
}: MasonryGridProps) {
  return (
    <>
      <div className={`masonry ${className}`} style={st(`--cols: ${columns}; --gap: ${gap};`)} data-rk-741442="">
        {children ?? (<>
          <div className="masonry-demo-item" style={{ height: "120px" }} data-rk-741442="">Item 1 (Small)</div>
          <div className="masonry-demo-item" style={{ height: "200px" }} data-rk-741442="">Item 2 (Tall)</div>
          <div className="masonry-demo-item" style={{ height: "160px" }} data-rk-741442="">Item 3 (Medium)</div>
          <div className="masonry-demo-item" style={{ height: "140px" }} data-rk-741442="">Item 4 (Medium)</div>
          <div className="masonry-demo-item" style={{ height: "180px" }} data-rk-741442="">Item 5 (Tall)</div>
          <div className="masonry-demo-item" style={{ height: "110px" }} data-rk-741442="">Item 6 (Small)</div>
        </>)}
      </div>
    </>
  );
}

export default MasonryGrid;
