'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import './AgencyHeroKinetic.css';

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
 * AgencyHeroKinetic — Agency hero with an oversized headline whose last word rotates through a
 * list (highlighted like a marker stroke), intro text, CTAs, client proof and rotating stickers.
 *
 * @param {string} before - Headline text before the rotating word. Default 'We build brands people'.
 * @param {string[]} words - Rotating words. Default ['remember', 'share', 'choose', 'love'].
 * @param {string} text - Intro paragraph.
 * @param {{label: string, href: string}} primary - Main CTA.
 * @param {{label: string, href: string}} secondary - Secondary CTA (optional).
 * @param {{count: string, label: string, people?: string[]}} proof - Client proof with avatar initials.
 * @param {string[]} stickers - Small rotated badges around the headline (max 3).
 * @param {number} interval - Rotation speed in ms. Default 2200.
 * @param {string} variant - Layout (left|centered). Default 'left'.
 * @param {string} size - Type scale (md|lg|xl). Default 'lg'.
 * @param {string} className - Extra class.
 *
 * Accessibility: the h1 contains the full sentence for screen readers (first word); the rotating
 * copy is aria-hidden; rotation stops with prefers-reduced-motion and pauses on hover/focus.
 */
export interface AgencyHeroKineticProps {
  before?: string;
  words?: string[];
  text?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  proof?: { count: string; label: string; people?: string[] };
  stickers?: string[];
  interval?: number;
  variant?: 'left' | 'centered';
  size?: 'md' | 'lg' | 'xl';
  className?: string;
}

export function AgencyHeroKinetic({
  before = 'We build brands people',
  words = ['remember', 'share', 'choose', 'love'],
  text = 'Volta is an independent studio for brand, web and growth. We turn ambitious companies into the obvious choice in their category.',
  primary = { label: 'Start a project', href: '#contact' },
  secondary = { label: 'See our work', href: '#work' },
  proof = { count: '120+', label: 'brands launched since 2016', people: ['Ana R', 'Ben K', 'Cleo M', 'Dev P'] },
  stickers = ['Brand', 'Web', 'Growth'],
  interval = 2200,
  variant = 'left',
  size = 'lg',
  className = '',
}: AgencyHeroKineticProps) {
  const hues = [80, 280, 20, 190];

  // Ported from the Astro <script>: runs once after mount (DOM logic kept as in the Astro kit).
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLElement>('[data-kinetic]:not([data-bound])').forEach((hero) => {
        hero.dataset.bound = '';
        const words = Array.from(hero.querySelectorAll<HTMLElement>('.ahk__word'));
        if (words.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        let i = 0;
        let paused = false;
        hero.addEventListener('mouseenter', () => { paused = true; });
        hero.addEventListener('mouseleave', () => { paused = false; });
        hero.addEventListener('focusin', () => { paused = true; });
        hero.addEventListener('focusout', () => { paused = false; });
        window.setInterval(() => {
          if (paused || document.hidden) return;
          words[i].classList.remove('is-active');
          words[i].classList.add('is-leaving');
          const prev = words[i];
          window.setTimeout(() => prev.classList.remove('is-leaving'), 500);
          i = (i + 1) % words.length;
          words[i].classList.add('is-active');
        }, Number(hero.dataset.interval) || 2200);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="cq-agency-hero" data-rk-10d698="">
      <section className={cx(['ahk', `ahk--${variant}`, `ahk--${size}`, className])} data-kinetic data-interval={interval} data-rk-10d698="">
        <div className="ahk__inner" data-rk-10d698="">
          <h1 className="ahk__title" data-rk-10d698="">
            <span data-rk-10d698="">{before} </span>
            <span className="sr-only" data-rk-10d698="">{words[0]}.</span>
            <span className="ahk__rotor" aria-hidden="true" data-rk-10d698="">
              {words.map((w, i) => <span key={i} className={cx(['ahk__word', { 'is-active': i === 0 }])} data-rk-10d698="">{w}</span>)}
            </span>
          </h1>
      
          {stickers.slice(0, 3).map((s, i) => <span key={i} className={cx(['ahk__sticker', `ahk__sticker--${i + 1}`])} aria-hidden="true" data-rk-10d698="">{s}</span>)}
      
          <div className="ahk__foot" data-rk-10d698="">
            {text && <p className="ahk__text" data-rk-10d698="">{text}</p>}
            <div className="ahk__ctas" data-rk-10d698="">
              {primary && <a className="ahk__btn ahk__btn--primary" href={primary.href} data-rk-10d698="">{primary.label}<span aria-hidden="true" data-rk-10d698="">↗</span></a>}
              {secondary && <a className="ahk__btn" href={secondary.href} data-rk-10d698="">{secondary.label}</a>}
            </div>
            {proof && (
              <p className="ahk__proof" data-rk-10d698="">
                {proof.people && (
                  <span className="ahk__faces" aria-hidden="true" data-rk-10d698="">
                    {proof.people.map((p, i) => <span key={i} style={st(`--h: ${hues[i % hues.length]}`)} data-rk-10d698="">{p.split(' ').map((x) => x[0]).join('')}</span>)}
                  </span>
                )}
                <span data-rk-10d698=""><strong data-rk-10d698="">{proof.count}</strong> {proof.label}</span>
              </p>
            )}
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

export default AgencyHeroKinetic;
