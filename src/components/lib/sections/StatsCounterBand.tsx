'use client';

import { useEffect, useRef, useId } from 'react';
import './StatsCounterBand.css';

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

interface Stat { value: number; prefix?: string; suffix?: string; label: string; decimals?: number }

/**
 * StatsCounterBand — Full-width band of headline numbers that count up when
 * scrolled into view. Final values are in the HTML, so no-JS and screen
 * readers always get the real number; motion respects reduced-motion.
 *
 * @param {string} title - Optional heading (visually hidden when `hideTitle`).
 * @param {boolean} hideTitle - Visually hide the heading.
 * @param {Array<{value: number, prefix?: string, suffix?: string, label: string, decimals?: number}>} stats - Numbers.
 * @param {string} variant - Band style (divided|cards|plain).
 * @param {string} size - Vertical rhythm (sm|md|lg).
 * @param {string} className - Extra CSS class.
 */
export interface StatsCounterBandProps {
  title?: string;
  hideTitle?: boolean;
  stats?: Stat[];
  variant?: 'divided' | 'cards' | 'plain';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function StatsCounterBand({
  title = 'Trusted at scale',
  hideTitle = false,
  stats = [
    { value: 12000, suffix: '+', label: 'Developers using the kit' },
    { value: 250, suffix: '+', label: 'Components & sections' },
    { value: 99.98, suffix: '%', label: 'CDN uptime last 12 months', decimals: 2 },
    { value: 48, prefix: '<', suffix: 'ms', label: 'Median time to first byte' },
  ],
  variant = 'divided',
  size = 'md',
  className = '',
}: StatsCounterBandProps) {
  const id = `scb-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const fmt = (s: Stat) => `${s.prefix ?? ''}${s.value.toLocaleString('en-US', { minimumFractionDigits: s.decimals ?? 0, maximumFractionDigits: s.decimals ?? 0 })}${s.suffix ?? ''}`;

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const els = document.querySelectorAll<HTMLElement>('.scb__value[data-count]');
      if (!reduce && 'IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target as HTMLElement;
            io.unobserve(el);
            const target = Number(el.dataset.count);
            const dec = Number(el.dataset.decimals);
            const pre = el.dataset.prefix || '';
            const suf = el.dataset.suffix || '';
            const final = el.textContent;
            el.setAttribute('aria-label', final || '');
            const start = performance.now();
            const dur = 1400;
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / dur);
              const eased = 1 - Math.pow(1 - t, 3);
              const v = target * eased;
              el.textContent = `${pre}${v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec })}${suf}`;
              if (t < 1) requestAnimationFrame(tick);
              else el.textContent = final;
            };
            requestAnimationFrame(tick);
          });
        }, { threshold: 0.4 });
        els.forEach((el) => io.observe(el));
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="cq-stats-counter-band-cq" data-rk-72cbca="">
      <section className={`scb scb--${variant} scb--${size} ${className}`} aria-labelledby={id} data-rk-72cbca="">
        <div className="scb__inner" data-rk-72cbca="">
          <h2 id={id} className={cx(['scb__title', { 'scb__sr': hideTitle }])} data-rk-72cbca="">{title}</h2>
          <dl className="scb__grid" data-rk-72cbca="">
            {stats.map((s, __i: number) => (
              <div key={__i} className="scb__item" data-rk-72cbca="">
                <dt className="scb__label" data-rk-72cbca="">{s.label}</dt>
                <dd className="scb__value" data-count={s.value} data-decimals={s.decimals ?? 0} data-prefix={s.prefix ?? ''} data-suffix={s.suffix ?? ''} data-rk-72cbca="">{fmt(s)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      </div>
    </>
  );
}

export default StatsCounterBand;
