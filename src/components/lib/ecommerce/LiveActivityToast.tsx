'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { productIcon } from './product-icons';
import './LiveActivityToast.css';

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

interface Activity { name: string; city: string; product: string; href?: string; icon?: string; hue?: number; ago: string }

/**
 * LiveActivityToast — Rotating social-proof notice ("Lucía in Madrid bought Aurora Headphones
 * · 3 min ago") that slides in, waits and hides, cycling through `items`.
 *
 * @param {Array} items - `{ name, city, product, href?, icon?, hue?, ago }` entries to cycle through.
 * @param {string} verb - Action text between person and product. Default 'just bought'.
 * @param {number} interval - Time between notices in ms. Default 9000.
 * @param {number} visibleFor - How long each notice stays in ms. Default 5000.
 * @param {number} delay - Wait before the first notice in ms. Default 4000.
 * @param {string} position - Corner (bottom-left|bottom-right). Default 'bottom-left'.
 * @param {string} storageKey - sessionStorage key that remembers "stop showing". Default 'ack-activity-off'.
 * @param {boolean} demo - Render statically with the first item (docs/previews). Default false.
 * @param {string} variant - Style (glass|solid). Default 'glass'.
 * @param {string} className - Extra class.
 *
 * Accessibility: not announced by screen readers (it is promotional, aria-live="off"), never
 * steals focus, has a close button that stops it for the session, pauses on hover/focus and
 * when the tab is hidden; respects prefers-reduced-motion.
 */
export interface LiveActivityToastProps {
  items?: Activity[];
  verb?: string;
  interval?: number;
  visibleFor?: number;
  delay?: number;
  position?: 'bottom-left' | 'bottom-right';
  storageKey?: string;
  demo?: boolean;
  variant?: 'glass' | 'solid';
  className?: string;
}

export function LiveActivityToast({
  items = [
    { name: 'Lucía', city: 'Madrid', product: 'Aurora Wireless Headphones', icon: 'headphones', hue: 38, ago: '2 min ago' },
    { name: 'Tom', city: 'Berlin', product: 'Trail 24L Backpack', icon: 'backpack', hue: 150, ago: '6 min ago' },
    { name: 'Aiko', city: 'Osaka', product: 'Orbit Smart Watch', icon: 'watch', hue: 205, ago: '11 min ago' },
  ],
  verb = 'just bought',
  interval = 9000,
  visibleFor = 5000,
  delay = 4000,
  position = 'bottom-left',
  storageKey = 'ack-activity-off',
  demo = false,
  variant = 'glass',
  className = '',
}: LiveActivityToastProps) {
  const first = items[0];

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLElement>('[data-live-activity]:not([data-bound])').forEach((el) => {
        el.dataset.bound = '';
        const key = el.dataset.key || 'ack-activity-off';
        try { if (window.sessionStorage.getItem(key)) return; } catch { /* storage blocked */ }
        let items: Array<Record<string, any>> = [];
        try { items = JSON.parse(el.dataset.liveActivity || '[]'); } catch { return; }
        if (!items.length) return;
    
        const q = (s: string) => el.querySelector<HTMLElement>(s);
        const media = q('[data-media]');
        const link = q('[data-link]') as HTMLAnchorElement | null;
        const verb = el.dataset.verb || 'just bought';
        const interval = Number(el.dataset.interval) || 9000;
        const visibleFor = Number(el.dataset.visible) || 5000;
        let index = 0;
        let paused = false;
        let stopped = false;
        let hideTimer = 0;
    
        function fill(item: Record<string, any>) {
          q('[data-who]')!.textContent = item.name;
          q('[data-city]')!.textContent = `in ${item.city}`;
          q('[data-product]')!.textContent = item.product;
          q('[data-ago]')!.textContent = item.ago;
          if (link) link.href = item.href || '#';
          if (media) {
            media.style.setProperty('--h', String(item.hue ?? 40));
            media.innerHTML = `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">${productIcon(item.icon)}</svg>`;
          }
          const line = q('.live-activity__line');
          if (line && line.lastChild) line.lastChild.textContent = ` ${verb}`;
        }
    
        function cycle() {
          if (stopped) return;
          if (paused || document.hidden) { window.setTimeout(cycle, 1500); return; }
          fill(items[index % items.length]);
          index++;
          el.hidden = false;
          requestAnimationFrame(() => el.classList.add('is-visible'));
          hideTimer = window.setTimeout(hide, visibleFor);
        }
        function hide() {
          if (paused) { hideTimer = window.setTimeout(hide, 1000); return; }
          el.classList.remove('is-visible');
          window.setTimeout(() => { el.hidden = true; }, 300);
          window.setTimeout(cycle, Math.max(1000, interval - visibleFor));
        }
    
        el.addEventListener('mouseenter', () => { paused = true; });
        el.addEventListener('mouseleave', () => { paused = false; });
        el.addEventListener('focusin', () => { paused = true; });
        el.addEventListener('focusout', () => { paused = false; });
        q('[data-close]')?.addEventListener('click', () => {
          stopped = true;
          window.clearTimeout(hideTimer);
          el.classList.remove('is-visible');
          el.hidden = true;
          try { window.sessionStorage.setItem(key, '1'); } catch { /* ignore */ }
        });
    
        window.setTimeout(cycle, Number(el.dataset.delay) || 4000);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={cx(['live-activity', `live-activity--${position}`, `live-activity--${variant}`, { 'live-activity--demo is-visible': demo }, className])} aria-live="off" data-live-activity={demo ? undefined : JSON.stringify(items)} data-verb={verb} data-interval={interval} data-visible={visibleFor} data-delay={delay} data-key={storageKey} hidden={!demo} data-rk-3695c2="">
        {first && (
          <>
            <span className="live-activity__media" style={st(`--h: ${first.hue ?? 40}`)} aria-hidden="true" data-media data-rk-3695c2="">
              <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" data-rk-3695c2=""><g dangerouslySetInnerHTML={{ __html: productIcon(first.icon) }} data-rk-3695c2="" /></svg>
            </span>
            <a className="live-activity__body" href={first.href ?? '#'} data-link data-rk-3695c2="">
              <span className="live-activity__line" data-rk-3695c2=""><strong data-who data-rk-3695c2="">{first.name}</strong> <span data-city data-rk-3695c2="">in {first.city}</span> {verb}</span>
              <span className="live-activity__product" data-product data-rk-3695c2="">{first.product}</span>
              <span className="live-activity__ago" data-rk-3695c2=""><span className="live-activity__dot" aria-hidden="true" data-rk-3695c2=""></span><span data-ago data-rk-3695c2="">{first.ago}</span> · Verified</span>
            </a>
            <button className="live-activity__close" type="button" aria-label="Stop showing purchase notifications" data-close data-rk-3695c2="">×</button>
          </>
        )}
      </div>
    </>
  );
}

export default LiveActivityToast;
