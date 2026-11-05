'use client';

import type { CSSProperties, ReactNode } from 'react';
import './ClusterHorizontal.css';

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
 * ClusterHorizontal — Auto-wrapping flex row for buttons, badges, or list items.
 */
export interface ClusterHorizontalProps {
  gap?: string;
  align?: 'flex-start' | 'center' | 'flex-end';
  className?: string;
  children?: ReactNode;
}

export function ClusterHorizontal({ gap = '0.75rem', align = 'center', className = '',
  children
}: ClusterHorizontalProps) {
  return (
    <>
      <div className={`cluster ${className}`} style={st(`--gap: ${gap}; --align: ${align};`)} data-rk-fff909="">
        {children ?? (<>
          <span className="cluster-tag" data-rk-fff909="">Tag 1</span>
          <span className="cluster-tag" data-rk-fff909="">Tag 2</span>
          <span className="cluster-tag" data-rk-fff909="">Tag 3</span>
          <span className="cluster-tag" data-rk-fff909="">Tag 4</span>
          <span className="cluster-tag" data-rk-fff909="">Tag 5</span>
        </>)}
      </div>
    </>
  );
}

export default ClusterHorizontal;
