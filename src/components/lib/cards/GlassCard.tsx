'use client';

import type { ReactNode } from 'react';
import './GlassCard.css';

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

/**
 * GlassCard — A versatile glassmorphism card with hover lift effect and gradient border.
 * 
 * @param {string} title - Optional title for the glass card header.
 * @param {string} subtitle - Optional description below the title.
 * @param {boolean} hoverable - Whether the card lifts on hover. Default is true.
 * @param {'sm'|'md'|'lg'} padding - Internal padding control. Default is 'md'.
 */
export interface GlassCardProps {
  title?: string;
  subtitle?: string;
  hoverable?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  children?: ReactNode;
}

export function GlassCard({ title, subtitle, hoverable = true, padding = 'md',
  children
}: GlassCardProps) {
  return (
    <>
      <div className={cx(['glass-card', `glass-card--p${padding}`, { 'glass-card--hoverable': hoverable }])} data-rk-30e66c="">
        {title && (<div className="glass-card__header" data-rk-30e66c=""><h3 className="glass-card__title" data-rk-30e66c="">{title}</h3>{subtitle && <p className="glass-card__subtitle" data-rk-30e66c="">{subtitle}</p>}</div>)}
        <div className="glass-card__body" data-rk-30e66c="">{children}</div>
      </div>
    </>
  );
}

export default GlassCard;
