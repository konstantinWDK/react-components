'use client';

import type { CSSProperties, ReactNode } from 'react';
import './GradientHeading.css';

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

/** GradientHeading */
export interface GradientHeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  from?: string;
  to?: string;
  children?: ReactNode;
}

export function GradientHeading({ level = 1, from = '#6366f1', to = '#c084fc',
  children
}: GradientHeadingProps) {
  const Tag: any = `h${level}` as any;
  return (
    <>
      <Tag className="grad-txt" style={st(`--from: ${from}; --to: ${to}`)} data-rk-3ff594="">{children}</Tag>
    </>
  );
}

export default GradientHeading;
