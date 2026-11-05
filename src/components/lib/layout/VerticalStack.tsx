'use client';

import type { CSSProperties, ReactNode } from 'react';
import './VerticalStack.css';

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
 * VerticalStack — A flexible vertical layout with configurable gap spacing.
 *
 * Stacks children vertically with consistent spacing between them.
 * Ideal for grouping related content like form fields, card lists, or text blocks.
 *
 * @param {string} gap - Space between children. Default: '1.5rem'.
 * @param {string} className - Additional CSS class to apply.
 *
 * @example
 * ```astro
 * <VerticalStack gap="2rem">
 *   <Card title="First" />
 *   <Card title="Second" />
 *   <Card title="Third" />
 * </VerticalStack>
 * ```
 */
export interface VerticalStackProps {
  gap?: string;
  className?: string;
  children?: ReactNode;
}

export function VerticalStack({ gap = '1.5rem', className = '',
  children
}: VerticalStackProps) {
  return (
    <>
      <div className={cx(['vertical-stack', className])} style={st(`--stack-gap: ${gap}`)} data-rk-5bc495="">
        {children}
      </div>
    </>
  );
}

export default VerticalStack;
