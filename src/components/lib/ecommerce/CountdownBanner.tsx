'use client';

import { useEffect, useRef } from 'react';
import './CountdownBanner.css';

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
 * CountdownBanner — Live sale countdown (days · hours · minutes · seconds) with title,
 * copy and CTA; switches to an "ended" message when the time runs out.
 *
 * @param {string} endsAt - ISO date the offer ends. When omitted, `hours` is used.
 * @param {number} hours - Rolling offer length in hours, counted from the visitor's first view (stored in localStorage). Default 48.
 * @param {string} eyebrow - Small label. Default 'Flash sale'.
 * @param {string} title - Headline. Default 'Up to 30% off the Storm collection'.
 * @param {string} text - Supporting copy.
 * @param {{label: string, href: string}} cta - Call to action.
 * @param {string} endedText - Message shown after the deadline. Default 'This offer has ended — new deals every Friday.'
 * @param {string} storageKey - localStorage key for the rolling deadline. Default 'ack-countdown'.
 * @param {string} variant - Style (glow|bar|card). Default 'glow'.
 * @param {string} size - Density (sm|md|lg). Default 'md'.
 * @param {string} className - Extra class.
 *
 * Accessibility: the ticking digits are aria-hidden; a visually hidden sentence with the remaining
 * time updates once a minute in a polite live region (no per-second announcements).
 */
export interface CountdownBannerProps {
  endsAt?: string;
  hours?: number;
  eyebrow?: string;
  title?: string;
  text?: string;
  cta?: { label: string; href: string };
  endedText?: string;
  storageKey?: string;
  variant?: 'glow' | 'bar' | 'card';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function CountdownBanner({
  endsAt,
  hours = 48,
  eyebrow = 'Flash sale',
  title = 'Up to 30% off the Storm collection',
  text = 'Waterproof shells, insulated layers and accessories. While stock lasts.',
  cta = { label: 'Shop the sale', href: '#' },
  endedText = 'This offer has ended — new deals every Friday.',
  storageKey = 'ack-countdown',
  variant = 'glow',
  size = 'md',
  className = '',
}: CountdownBannerProps) {
  const units = [
    { key: 'd', label: 'Days' },
    { key: 'h', label: 'Hours' },
    { key: 'm', label: 'Minutes' },
    { key: 's', label: 'Seconds' },
  ];

  // Ported from the Astro <script>: runs once after mount (DOM logic kept as in the Astro kit).
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLElement>('[data-countdown]:not([data-bound])').forEach((el) => {
        el.dataset.bound = '';
        let end = el.dataset.ends ? Date.parse(el.dataset.ends) : NaN;
        if (Number.isNaN(end)) {
          const key = el.dataset.key || 'ack-countdown';
          const ms = (Number(el.dataset.hours) || 48) * 3600_000;
          try {
            const saved = Number(window.localStorage.getItem(key));
            end = saved && saved > Date.now() ? saved : Date.now() + ms;
            window.localStorage.setItem(key, String(end));
          } catch {
            end = Date.now() + ms;
          }
        }
        const nums = Object.fromEntries(Array.from(el.querySelectorAll<HTMLElement>('[data-unit]')).map((n) => [n.dataset.unit, n]));
        const sr = el.querySelector<HTMLElement>('[data-sr]');
        const ended = el.querySelector<HTMLElement>('[data-ended]');
        const clock = el.querySelector<HTMLElement>('[data-clock]');
        let lastMinute = -1;
        let timer = 0;
    
        const pad = (n: number) => String(n).padStart(2, '0');
        function tick() {
          const left = Math.max(0, end - Date.now());
          const s = Math.floor(left / 1000);
          const parts = { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
          (Object.keys(parts) as Array<keyof typeof parts>).forEach((k) => {
            const node = nums[k];
            const value = pad(parts[k]);
            if (node && node.textContent !== value) {
              node.textContent = value;
              node.classList.remove('is-tick');
              void node.offsetWidth;
              node.classList.add('is-tick');
            }
          });
          const minute = Math.floor(s / 60);
          if (sr && minute !== lastMinute) {
            lastMinute = minute;
            sr.textContent = `Offer ends in ${parts.d} days, ${parts.h} hours and ${parts.m} minutes.`;
          }
          if (left === 0) {
            window.clearInterval(timer);
            el.classList.add('is-ended');
            if (ended) ended.hidden = false;
            if (clock) clock.hidden = true;
            if (sr) sr.textContent = ended?.textContent || 'Offer ended.';
          }
        }
        tick();
        timer = window.setInterval(tick, 1000);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className={cx(['countdown', `countdown--${variant}`, `countdown--${size}`, className])} data-countdown data-ends={endsAt} data-hours={hours} data-key={storageKey} aria-label={title} data-rk-a26cb5="">
        <div className="countdown__inner" data-rk-a26cb5="">
        <div className="countdown__copy" data-rk-a26cb5="">
          {eyebrow && <p className="countdown__eyebrow" data-rk-a26cb5=""><span aria-hidden="true" data-rk-a26cb5=""></span>{eyebrow}</p>}
          <h2 className="countdown__title" data-rk-a26cb5="">{title}</h2>
          {text && <p className="countdown__text" data-live-text data-rk-a26cb5="">{text}</p>}
          <p className="countdown__ended" data-ended hidden data-rk-a26cb5="">{endedText}</p>
        </div>
        <div className="countdown__side" data-rk-a26cb5="">
          <div className="countdown__clock" aria-hidden="true" data-clock data-rk-a26cb5="">
            {units.map((u, __i: number) => (
              <div key={__i} className="countdown__unit" data-rk-a26cb5="">
                <span className="countdown__num" data-unit={u.key} data-rk-a26cb5="">00</span>
                <span className="countdown__label" data-rk-a26cb5="">{u.label}</span>
              </div>
            ))}
          </div>
          <p className="sr-only" aria-live="polite" data-sr data-rk-a26cb5=""></p>
          {cta && <a className="countdown__cta" href={cta.href} data-rk-a26cb5="">{cta.label}</a>}
        </div>
        </div>
      </section>
    </>
  );
}

export default CountdownBanner;
