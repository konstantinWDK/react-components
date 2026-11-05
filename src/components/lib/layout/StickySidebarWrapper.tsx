'use client';

import type { CSSProperties, ReactNode } from 'react';
import './StickySidebarWrapper.css';

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
 * StickySidebarWrapper — A two-column layout where the sidebar content stays visible while scrolling.
 *
 * Creates a main + sidebar layout where the sidebar column uses CSS sticky positioning
 * to remain visible as the user scrolls through the main content. Stacks vertically on mobile.
 *
 * @param {string} sidebarWidth - Width of the sidebar. Default: '280px'.
 * @param {string} stickyTop - Distance from the top when sticky. Default: '100px'.
 * @param {string} gap - Gap between main and sidebar columns. Default: '2rem'.
 * @param {string} className - Additional CSS class to apply.
 *
 * @example
 * ```react
 * <StickySidebarWrapper sidebarWidth="260px" stickyTop="120px">
 *   <div slot="main">
 *     <p>Long scrolling content...</p>
 *   </div>
 *   <div slot="sidebar">
 *     <TableOfContents />
 *   </div>
 * </StickySidebarWrapper>
 * ```
 */
export interface StickySidebarWrapperProps {
  sidebarWidth?: string;
  stickyTop?: string;
  gap?: string;
  className?: string;
  main?: ReactNode;
  sidebar?: ReactNode;
}

export function StickySidebarWrapper({ sidebarWidth = '280px', stickyTop = '100px', gap = '2rem', className = '',
  main,
  sidebar
}: StickySidebarWrapperProps) {
  return (
    <>
      <div className="cq-sticky-sidebar-wrapper-cq" data-rk-0549ef="">
      <div className={cx(['sticky-sidebar', className])} style={st(`--sidebar-w: ${sidebarWidth}; --sticky-top: ${stickyTop}; --col-gap: ${gap}`)} data-rk-0549ef="">
        <main className="sticky-sidebar__main" data-rk-0549ef="">
          {main}
        </main>
        <aside className="sticky-sidebar__aside" data-rk-0549ef="">
          <div className="sticky-sidebar__inner" data-rk-0549ef="">
            {sidebar}
          </div>
        </aside>
      </div>
      </div>
    </>
  );
}

export default StickySidebarWrapper;
