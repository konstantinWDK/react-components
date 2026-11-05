'use client';

import type { CSSProperties, ReactNode } from 'react';
import './ScrollSnapSection.css';

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
 * ScrollSnapSection — Layout wrapper that snaps sections to the full viewport height.
 */
export interface ScrollSnapSectionProps {
  height?: string;
  className?: string;
  children?: ReactNode;
}

export function ScrollSnapSection({ height = '300px', className = '',
  children
}: ScrollSnapSectionProps) {
  return (
    <>
      <div className={`snap-wrap ${className}`} style={st(`--snap-height: ${height};`)} data-rk-109259="">
        {children ?? (<>
          <section className="snap-panel panel-1" data-rk-109259=""><h4 data-rk-109259="">Slide 1 (Scroll to snap)</h4></section>
          <section className="snap-panel panel-2" data-rk-109259=""><h4 data-rk-109259="">Slide 2</h4></section>
          <section className="snap-panel panel-3" data-rk-109259=""><h4 data-rk-109259="">Slide 3</h4></section>
        </>)}
      </div>
    </>
  );
}

export default ScrollSnapSection;
