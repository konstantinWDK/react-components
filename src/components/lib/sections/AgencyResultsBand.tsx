'use client';

import { useEffect, useRef } from 'react';
import './AgencyResultsBand.css';

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
 * AgencyResultsBand — Proof band of big results that count up when scrolled into view
 * (€42M, 4.8×, +212%…), each with a label and a fine-print detail.
 *
 * @param {string} eyebrow - Small label. Default 'Results, not reports'.
 * @param {string} title - Optional heading.
 * @param {Array<{value: string, label: string, detail?: string}>} stats - Figures. Numbers inside value animate; prefix/suffix are kept.
 * @param {string} variant - Style (accent|outline|dark). Default 'accent'.
 * @param {number} duration - Count-up duration in ms. Default 1400.
 * @param {string} className - Extra class.
 *
 * Accessibility: the final value is in the HTML (the animation only rewrites the visible text and
 * is skipped with prefers-reduced-motion); figures form a description list.
 */
export interface AgencyResultsBandProps {
  eyebrow?: string;
  title?: string;
  stats?: Array<{ value: string; label: string; detail?: string }>;
  variant?: 'accent' | 'outline' | 'dark';
  duration?: number;
  className?: string;
}

export function AgencyResultsBand({
  eyebrow = 'Results, not reports',
  title,
  stats = [
    { value: '€42M', label: 'ad spend managed', detail: 'across Google, Meta, TikTok and LinkedIn' },
    { value: '4.8×', label: 'average client ROAS', detail: 'last 12 months, e-commerce clients' },
    { value: '+212%', label: 'median organic growth', detail: 'after 12 months of SEO' },
    { value: '96%', label: 'client retention', detail: 'clients renewing after year one' },
  ],
  variant = 'accent',
  duration = 1400,
  className = '',
}: AgencyResultsBandProps) {

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    const animate = (el: HTMLElement, ms: number) => {
        const final = el.dataset.count ?? el.textContent ?? '';
        const m = final.match(/^(\D*?)([\d.,]+)(.*)$/);
        if (!m) return;
        const [, pre, num, post] = m;
        const decimals = (num.split('.')[1] ?? '').length;
        const target = parseFloat(num.replace(/,/g, ''));
        if (!isFinite(target)) return;
        const start = performance.now();
        const step = (t: number) => {
          const p = Math.min(1, (t - start) / ms);
          const eased = 1 - Math.pow(1 - p, 3);
          const v = (target * eased).toFixed(decimals);
          el.textContent = `${pre}${num.includes(',') ? Number(v).toLocaleString('en') : v}${post}`;
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = final;
        };
        requestAnimationFrame(step);
      };
    
      document.querySelectorAll<HTMLElement>('[data-results-band]:not([data-bound])').forEach((band) => {
        band.dataset.bound = '';
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
        const ms = Number(band.dataset.duration) || 1400;
        const io = new IntersectionObserver((entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            io.disconnect();
            band.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => animate(el, ms));
          });
        }, { threshold: 0.35 });
        io.observe(band);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="arb-cq" data-rk-8f49e4="">
      <section className={cx(['arb', `arb--${variant}`, className])} data-results-band data-duration={duration} data-rk-8f49e4="">
        <div className="arb__head" data-rk-8f49e4="">
          {eyebrow && <p className="arb__eyebrow" data-rk-8f49e4="">{eyebrow}</p>}
          {title && <h2 className="arb__title" data-rk-8f49e4="">{title}</h2>}
        </div>
        <dl className="arb__grid" data-rk-8f49e4="">
          {stats.map((s, __i: number) => (
            <div key={__i} className="arb__item" data-rk-8f49e4="">
              <dt className="arb__label" data-rk-8f49e4="">{s.label}{s.detail && <small data-rk-8f49e4="">{s.detail}</small>}</dt>
              <dd className="arb__value" data-count={s.value} data-rk-8f49e4="">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>
      </div>
    </>
  );
}

export default AgencyResultsBand;
