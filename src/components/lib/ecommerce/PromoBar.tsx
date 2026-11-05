'use client';

import { useEffect, useRef } from 'react';
import './PromoBar.css';

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
 * PromoBar — Slim announcement bar for shipping offers, sales or codes,
 * with rotating messages and an optional dismiss button.
 *
 * @param {string[]} messages - One or more messages; several rotate every `interval` ms.
 * @param {string} href - Optional link for the whole bar.
 * @param {number} interval - Rotation interval in ms. Default 4500.
 * @param {boolean} dismissible - Show a close button (remembered per session). Default true.
 * @param {string} variant - Style (gold|glass|dark). Default 'gold'.
 * @param {string} size - Height (sm|md). Default 'sm'.
 * @param {string} storageKey - sessionStorage key for the dismissed state. Default 'ack-promo-closed'.
 * @param {string} className - Extra class.
 *
 * Accessibility: rotation pauses on hover/focus and is disabled with reduced motion;
 * messages live in a polite live region only after the user interacts, never on load.
 */
export interface PromoBarProps {
  messages?: string[];
  href?: string;
  interval?: number;
  dismissible?: boolean;
  variant?: 'gold' | 'glass' | 'dark';
  size?: 'sm' | 'md';
  storageKey?: string;
  className?: string;
}

export function PromoBar({
  messages = ['Free shipping on orders over $75', 'Use code REACT10 for 10% off your first order', '30-day free returns'],
  href,
  interval = 4500,
  dismissible = true,
  variant = 'gold',
  size = 'sm',
  storageKey = 'ack-promo-closed',
  className = '',
}: PromoBarProps) {
  const Tag: any = href ? 'a' : 'div';

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLElement>('[data-promo-bar]').forEach((bar) => {
        const key = bar.dataset.key || 'ack-promo-closed';
        try {
          if (window.sessionStorage.getItem(key)) { bar.hidden = true; return; }
        } catch { /* storage blocked */ }
    
        bar.querySelector('[data-promo-close]')?.addEventListener('click', () => {
          bar.hidden = true;
          try { window.sessionStorage.setItem(key, '1'); } catch { /* ignore */ }
        });
    
        const msgs = Array.from(bar.querySelectorAll<HTMLElement>('.promo-bar__msg'));
        if (msgs.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        let index = 0;
        let paused = false;
        bar.addEventListener('mouseenter', () => { paused = true; });
        bar.addEventListener('mouseleave', () => { paused = false; });
        bar.addEventListener('focusin', () => { paused = true; });
        bar.addEventListener('focusout', () => { paused = false; });
        window.setInterval(() => {
          if (paused || document.hidden) return;
          msgs[index].classList.remove('is-active');
          msgs[index].setAttribute('aria-hidden', 'true');
          index = (index + 1) % msgs.length;
          msgs[index].classList.add('is-active');
          msgs[index].removeAttribute('aria-hidden');
        }, Number(bar.dataset.interval) || 4500);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={cx(['promo-bar', `promo-bar--${variant}`, `promo-bar--${size}`, className])} data-promo-bar data-interval={interval} data-key={storageKey} data-rk-ca2577="">
        <Tag className="promo-bar__track" href={href} data-rk-ca2577="">
          {messages.map((m, i) => (
            <span key={i} className={cx(['promo-bar__msg', { 'is-active': i === 0 }])} aria-hidden={i === 0 ? undefined : 'true'} data-rk-ca2577="">{m}</span>
          ))}
        </Tag>
        {dismissible && (
          <button className="promo-bar__close" type="button" aria-label="Dismiss announcement" data-promo-close data-rk-ca2577="">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true" data-rk-ca2577=""><path d="M18 6 6 18M6 6l12 12" data-rk-ca2577="" /></svg>
          </button>
        )}
      </div>
    </>
  );
}

export default PromoBar;
