'use client';

import type { CSSProperties, ReactNode } from 'react';
import './HolyGrailGrid.css';

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
 * HolyGrailGrid — Production-grade CSS grid layout container with sticky header, dual sidebars, fluid content, and footer.
 * 
 * @param {string} leftWidth - Left sidebar width. Default is '240px'.
 * @param {string} rightWidth - Right sidebar width. Default is '220px'.
 * @param {string} gap - Spacing gap between grid regions. Default is '1.5rem'.
 * @param {string} className - Optional CSS class.
 */
export interface HolyGrailGridProps {
  leftWidth?: string;
  rightWidth?: string;
  gap?: string;
  className?: string;
  children?: ReactNode;
  header?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  footer?: ReactNode;
}

export function HolyGrailGrid({
  leftWidth = '240px',
  rightWidth = '220px',
  gap = '1.5rem',
  className = '',
  children,
  header,
  left,
  right,
  footer
}: HolyGrailGridProps) {
  return (
    <>
      <div className="cq-holy-grail-grid-cq" data-rk-7590db="">
      <div className={cx(['holy-grail', className])} style={st(`--hg-left: ${leftWidth}; --hg-right: ${rightWidth}; --hg-gap: ${gap};`)} data-rk-7590db="">
        <header className="holy-grail__header" data-rk-7590db="">
          {header}
        </header>
      
        <div className="holy-grail__middle" data-rk-7590db="">
          <aside className="holy-grail__left" data-rk-7590db="">
            {left}
          </aside>
      
          <main className="holy-grail__main" data-rk-7590db="">
            {children}
          </main>
      
          <aside className="holy-grail__right" data-rk-7590db="">
            {right}
          </aside>
        </div>
      
        <footer className="holy-grail__footer" data-rk-7590db="">
          {footer}
        </footer>
      </div>
      </div>
    </>
  );
}

export default HolyGrailGrid;
