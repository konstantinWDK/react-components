'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import './StockIndicator.css';

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
 * StockIndicator — Urgency notice for product pages: low-stock bar ("Only 3 left") and a
 * live "N people are viewing this" counter that drifts gently.
 *
 * @param {number} stock - Units left. Default 3.
 * @param {number} threshold - At or below this value the low-stock style is used. Default 5.
 * @param {number} capacity - Value that fills the bar completely. Default 20.
 * @param {number} viewers - Starting number of viewers (0 hides the line). Default 14.
 * @param {boolean} live - Let the viewers count move every few seconds. Default true.
 * @param {string} variant - Style (card|inline). Default 'card'.
 * @param {string} size - Density (sm|md). Default 'md'.
 * @param {string} className - Extra class.
 *
 * Accessibility: stock text is real text (not colour alone); the moving viewers number is not
 * announced (aria-live off) to avoid noise; animation stops with prefers-reduced-motion.
 */
export interface StockIndicatorProps {
  stock?: number;
  threshold?: number;
  capacity?: number;
  viewers?: number;
  live?: boolean;
  variant?: 'card' | 'inline';
  size?: 'sm' | 'md';
  className?: string;
}

export function StockIndicator({
  stock = 3,
  threshold = 5,
  capacity = 20,
  viewers = 14,
  live = true,
  variant = 'card',
  size = 'md',
  className = '',
}: StockIndicatorProps) {
  const low = stock > 0 && stock <= threshold;
  const state = stock <= 0 ? 'out' : low ? 'low' : 'ok';
  const pct = Math.max(4, Math.min(100, (stock / capacity) * 100));
  const message = state === 'out' ? 'Sold out — join the waitlist' : low ? `Only ${stock} left — order soon` : 'In stock and ready to ship';

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLElement>('[data-stock-indicator][data-live]:not([data-bound])').forEach((el) => {
        el.dataset.bound = '';
        const out = el.querySelector<HTMLElement>('[data-viewers-count]');
        if (!out || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const base = Number(el.dataset.viewers) || 0;
        let value = base;
        window.setInterval(() => {
          if (document.hidden) return;
          const step = Math.random() < 0.5 ? -1 : 1;
          value = Math.max(Math.max(1, base - 4), Math.min(base + 6, value + step));
          out.textContent = String(value);
          out.classList.remove('is-bump');
          void out.offsetWidth;
          out.classList.add('is-bump');
        }, 6500);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={cx(['stock', `stock--${state}`, `stock--${variant}`, `stock--${size}`, className])} data-stock-indicator data-viewers={viewers} data-live={live ? '' : undefined} data-rk-83468c="">
        <p className="stock__msg" data-rk-83468c="">
          <span className="stock__icon" aria-hidden="true" data-rk-83468c="">
            {state === 'ok'
              ? <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" data-rk-83468c=""><path d="M20 6 9 17l-5-5" data-rk-83468c="" /></svg>
              : <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" data-rk-83468c=""><path d="M13 2 3 14h9l-1 8 10-12h-9z" data-rk-83468c="" /></svg>}
          </span>
          <strong data-rk-83468c="">{message}</strong>
        </p>
        {state !== 'out' && (
          <div className="stock__bar" aria-hidden="true" data-rk-83468c=""><span style={st(`width: ${pct}%`)} data-rk-83468c=""></span></div>
        )}
        {viewers > 0 && (
          <p className="stock__viewers" aria-live="off" data-rk-83468c="">
            <span className="stock__eye" aria-hidden="true" data-rk-83468c="">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" data-rk-83468c=""><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" data-rk-83468c="" /><circle cx="12" cy="12" r="3" data-rk-83468c="" /></svg>
            </span>
            <span data-rk-83468c=""><strong data-viewers-count data-rk-83468c="">{viewers}</strong> people are viewing this right now</span>
          </p>
        )}
      </div>
    </>
  );
}

export default StockIndicator;
