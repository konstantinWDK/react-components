'use client';

import type { CSSProperties, ReactNode } from 'react';
import './SidebarLayoutWrapper.css';

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
 * SidebarLayoutWrapper — A two-column layout with a sidebar and main content area.
 *
 * Creates a full-height page layout with a fixed-width sidebar column and a flexible main column.
 * Stacks vertically on mobile screens (below 768px). Uses named slots for sidebar and main content.
 *
 * @param {string} sidebarWidth - Width of the sidebar column. Default: '280px'.
 * @param {string} breakpoint - Screen width at which the layout stacks vertically. Default: '768px'.
 * @param {string} className - Additional CSS class to apply.
 *
 * @example
 * ```react
 * <SidebarLayoutWrapper sidebarWidth="260px">
 *   <div slot="sidebar">
 *     <nav>Navigation links</nav>
 *   </div>
 *   <div slot="main">
 *     <h1>Main content</h1>
 *   </div>
 * </SidebarLayoutWrapper>
 * ```
 */
export interface SidebarLayoutWrapperProps {
  sidebarWidth?: string;
  breakpoint?: string;
  className?: string;
  sidebar?: ReactNode;
  main?: ReactNode;
}

export function SidebarLayoutWrapper({ sidebarWidth = '280px', breakpoint = '768px', className = '',
  sidebar,
  main
}: SidebarLayoutWrapperProps) {
  return (
    <>
      <div className="cq-sidebar-layout-wrapper-cq" data-rk-8aeea2="">
      <div className={cx(['sidebar-layout', className])} style={st(`--sidebar-w: ${sidebarWidth}; --breakpoint: ${breakpoint}`)} data-rk-8aeea2="">
        <aside className="sidebar-layout__sidebar" data-rk-8aeea2="">
          {sidebar}
        </aside>
        <main className="sidebar-layout__main" data-rk-8aeea2="">
          {main}
        </main>
      </div>
      </div>
    </>
  );
}

export default SidebarLayoutWrapper;
