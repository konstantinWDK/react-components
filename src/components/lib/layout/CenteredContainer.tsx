'use client';

import type { CSSProperties, ReactNode } from 'react';
import './CenteredContainer.css';

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
 * CenteredContainer — A responsive centered container with configurable max-width.
 *
 * Provides consistent horizontal padding and centers content within a max-width constraint.
 * Uses the global container token for consistency across the library.
 *
 * @param {string} maxWidth - Maximum width of the container. Default: '1200px'.
 * @param {string} padding - Horizontal padding on each side. Default: '1.5rem'.
 * @param {string} className - Additional CSS class to apply.
 *
 * @example
 * ```react
 * <CenteredContainer maxWidth="900px">
 *   <p>Centered content</p>
 * </CenteredContainer>
 * ```
 */
export interface CenteredContainerProps {
  maxWidth?: string;
  padding?: string;
  className?: string;
  children?: ReactNode;
}

export function CenteredContainer({ maxWidth = '1200px', padding = '1.5rem', className = '',
  children
}: CenteredContainerProps) {
  return (
    <>
      <div className="cq-centered-container-cq" data-rk-7481a0="">
      <div className={cx(['centered-container', className])} style={st(`--container-max: ${maxWidth}; --container-pad: ${padding}`)} data-rk-7481a0="">
        {children}
      </div>
      </div>
    </>
  );
}

export default CenteredContainer;
