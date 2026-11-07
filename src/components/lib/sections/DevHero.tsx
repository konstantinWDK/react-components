'use client';

import { useEffect, useId, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import './DevHero.css';

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

interface Skill { name: string; description: string }

/**
 * DevHero — Developer portfolio hero ("Keycap" design): an oversized title that retypes itself
 * (Software Developer → Frontend Engineer…), the name dropping in with floating blocks, a status
 * pill and an endless vertical tape of skill cards with tooltips. Optional 3D dot-matrix background
 * that breathes and parts around the cursor (needs the optional `three` peer dependency).
 *
 * @param {Array<{base: string, ext: string, role: string}>} titles - Rotating titles. The `ext` part is revealed on hover.
 * @param {string} name - Name under the title (split into words).
 * @param {string} tagline - Mono line under the name.
 * @param {string} status - Status pill text. Empty hides it.
 * @param {Array<{category: string, skills: Array<{name: string, description: string}>}>} skills - Skill groups for the tape.
 * @param {string} tapeLabel - Label above the tape. Default 'Stack & skills'.
 * @param {string} background - Background (dots|none). Default 'dots'.
 * @param {number} interval - Milliseconds between titles. Default 4500.
 * @param {string} className - Extra class.
 *
 * Accessibility: the h1 exposes the first title as its accessible name while the animation is
 * aria-hidden; skill pills are buttons whose tooltip also opens on focus and is linked with
 * aria-describedby; the tape pauses on hover/focus and with prefers-reduced-motion.
 */
export interface DevHeroProps {
  titles?: Array<{ base: string; ext: string; role: string }>;
  name?: string;
  tagline?: string;
  status?: string;
  skills?: Array<{ category: string; skills: Skill[] }>;
  tapeLabel?: string;
  background?: 'dots' | 'none';
  interval?: number;
  className?: string;
}

export function DevHero({
  titles = [{ base: 'Soft', ext: 'ware', role: 'Developer' }],
  name = 'Noa Lindqvist',
  tagline = 'Full Stack · Backend · Frontend · Creative 3D',
  status = 'Available for freelance',
  skills = [
    { category: 'Frontend', skills: [{ name: 'React', description: 'Component architecture, hooks and design systems.' }, { name: 'Next.js', description: 'App Router sites, server components and static export.' }, { name: 'Three.js', description: 'Interactive 3D scenes that stay smooth on phones.' }] },
    { category: 'Backend', skills: [{ name: 'Node.js', description: 'APIs, queues and real-time services.' }, { name: 'PostgreSQL', description: 'Schema design, indexes and query tuning.' }] },
    { category: 'Infra', skills: [{ name: 'Docker', description: 'Reproducible builds and compose stacks.' }, { name: 'Linux', description: 'Hardened VPS, Nginx and zero-downtime deploys.' }] },
  ],
  tapeLabel = 'Stack & skills',
  background = 'dots',
  interval = 4500,
  className = '',
}: DevHeroProps) {
  const first = titles[0];
  const words = name.split(/\s+/).filter(Boolean);
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const tipId = `dvhr-tip-${uid}`;

  const rootRef = useRef<HTMLElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  // The tooltip is portalled to <body> so no transformed ancestor can clip or offset it.
  const [tipHost, setTipHost] = useState<HTMLElement | null>(null);
  // Touch screens cannot hover: reveal the title extension.
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    setTipHost(document.body);
    setRevealed(window.matchMedia('(hover: none)').matches);
  }, []);

  // Breathing dot matrix: three.js is loaded on demand (optional peer dependency).
  useEffect(() => {
    if (background !== 'dots') return;
    const bg = rootRef.current?.querySelector<HTMLElement>('[data-dots]');
    if (!bg) return;
    let cancelled = false;
    let dispose: (() => void) | undefined;
    Promise.all([import('three'), import('../three/dot-matrix-scene')])
      .then(([THREE, { mountDotMatrix }]) => {
        if (!cancelled) dispose = mountDotMatrix(bg, THREE);
      })
      .catch((err) => console.warn('[DevHero] the dot matrix needs the optional `three` peer dependency.', err));
    return () => {
      cancelled = true;
      dispose?.();
    };
  }, [background]);

  // Rotating, retyped title
  const titlesKey = JSON.stringify(titles);
  useEffect(() => {
    const hero = rootRef.current;
    const list = JSON.parse(titlesKey) as Array<{ base: string; ext: string; role: string }>;
    if (!hero || list.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const els = { base: hero.querySelector<HTMLElement>('[data-base]'), ext: hero.querySelector<HTMLElement>('[data-ext]'), role: hero.querySelector<HTMLElement>('[data-role]') };
    let alive = true;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const retype = async (el: HTMLElement | null, text: string, speed = 50) => {
      if (!el) return;
      const old = el.textContent ?? '';
      for (let i = old.length; i >= 0 && alive; i--) {
        el.textContent = old.slice(0, i);
        await sleep(speed / 2);
      }
      for (let i = 1; i <= text.length && alive; i++) {
        el.textContent = text.slice(0, i);
        await sleep(speed);
      }
    };
    let idx = 0;
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      idx = (idx + 1) % list.length;
      const t = list[idx];
      retype(els.base, t.base);
      retype(els.ext, t.ext);
      retype(els.role, t.role);
    }, interval || 4500);
    return () => {
      alive = false;
      window.clearInterval(timer);
    };
  }, [titlesKey, interval]);

  // Skill tooltips (pointer and keyboard)
  useEffect(() => {
    const hero = rootRef.current;
    const tip = tipRef.current;
    if (!hero || !tip) return;
    const ac = new AbortController();
    const opts = { signal: ac.signal };
    const fill = (pill: HTMLElement) => {
      tip.querySelector('[data-tip-cat]')!.textContent = pill.dataset.cat ?? '';
      tip.querySelector('[data-tip-name]')!.textContent = pill.dataset.name ?? '';
      tip.querySelector('[data-tip-desc]')!.textContent = pill.dataset.desc ?? '';
    };
    const place = (x: number, y: number) => {
      const r = tip.getBoundingClientRect();
      let px = x + 16;
      let py = y + 16;
      if (px + r.width > window.innerWidth - 12) px = x - r.width - 14;
      if (py + r.height > window.innerHeight - 12) py = y - r.height - 14;
      tip.style.transform = `translate3d(${Math.max(12, Math.round(px))}px, ${Math.max(12, Math.round(py))}px, 0)`;
    };
    const show = () => tip.classList.add('is-visible');
    const hide = () => tip.classList.remove('is-visible');
    hero.addEventListener('pointerover', (e) => {
      const pill = (e.target as HTMLElement).closest<HTMLElement>('.dvhr__pill');
      if (!pill) return;
      fill(pill);
      place(e.clientX, e.clientY);
      show();
    }, opts);
    hero.addEventListener('pointermove', (e) => {
      if ((e.target as HTMLElement).closest('.dvhr__pill')) place(e.clientX, e.clientY);
      else hide();
    }, opts);
    hero.addEventListener('pointerleave', hide, opts);
    hero.addEventListener('focusin', (e) => {
      const pill = (e.target as HTMLElement).closest<HTMLElement>('.dvhr__pill');
      if (!pill) return;
      fill(pill);
      const r = pill.getBoundingClientRect();
      place(r.left, r.bottom);
      show();
    }, opts);
    hero.addEventListener('focusout', hide, opts);
    document.addEventListener('keydown', (e) => e.key === 'Escape' && hide(), opts);
    return () => ac.abort();
  }, [tipHost]);
  return (
    <>
      <section ref={rootRef} className={cx(['dvhr', { 'is-revealed': revealed }, className])} data-dev-hero data-titles={JSON.stringify(titles)} data-interval={interval} data-rk-1ae39f="">
        {background === 'dots' && <div className="dvhr__bg" data-dots aria-hidden="true" data-rk-1ae39f=""></div>}
      
        <div className="dvhr__wrap" data-rk-1ae39f="">
          <div className="dvhr__main" data-rk-1ae39f="">
            <h1 className="dvhr__title" aria-label={`${first.base}${first.ext} ${first.role}${name ? ` — ${name}` : ''}`} data-rk-1ae39f="">
              <span className="dvhr__line dvhr__line--1" aria-hidden="true" data-rk-1ae39f=""><span data-base data-rk-1ae39f="">{first.base}</span><span className="dvhr__ext" data-ext data-rk-1ae39f="">{first.ext}</span></span>
              <span className="dvhr__line dvhr__line--2" aria-hidden="true" data-role data-rk-1ae39f="">{first.role}</span>
            </h1>
      
            {words.length > 0 && (
              <p className="dvhr__name" aria-hidden="true" data-rk-1ae39f="">
                <span className="dvhr__block dvhr__block--1" data-rk-1ae39f=""></span>
                <span className="dvhr__block dvhr__block--2" data-rk-1ae39f=""></span>
                {words.map((w, i) => <span key={i} className="dvhr__word" style={st(`animation-delay:${0.3 + i * 0.15}s`)} data-rk-1ae39f="">{w}</span>)}
              </p>
            )}
      
            {tagline && <p className="dvhr__tagline" data-rk-1ae39f="">{tagline}</p>}
      
            {status && (
              <p className="dvhr__status" data-rk-1ae39f=""><span className="dvhr__dot" aria-hidden="true" data-rk-1ae39f=""></span>{status}</p>
            )}
          </div>
      
          {skills.length > 0 && (
            <div className="dvhr__tape" data-rk-1ae39f="">
              <p className="dvhr__tape-label" data-rk-1ae39f="">{tapeLabel}</p>
              <div className="dvhr__viewport" data-viewport data-rk-1ae39f="">
                <div className="dvhr__track" data-rk-1ae39f="">
                  {[0, 1].map((copy, __i: number) => (
                    <div key={__i} className="dvhr__set" aria-hidden={copy === 1 ? 'true' : undefined} data-rk-1ae39f="">
                      {skills.map((group, i) => (
                        <div key={i} className="dvhr__card" data-rk-1ae39f="">
                          <div className="dvhr__card-head" data-rk-1ae39f="">
                            <h2 className="dvhr__card-title" data-rk-1ae39f="">{group.category}</h2>
                            <span className="dvhr__card-num" data-rk-1ae39f="">{String(i + 1).padStart(2, '0')}</span>
                          </div>
                          <ul className="dvhr__pills" data-rk-1ae39f="">
                            {group.skills.map((s, __i: number) => (
                              <li key={__i} data-rk-1ae39f="">
                                <button type="button" className="dvhr__pill" tabIndex={copy === 1 ? -1 : undefined} data-name={s.name} data-cat={group.category} data-desc={s.description} aria-describedby={copy === 0 ? tipId : undefined} data-rk-1ae39f="">
                                  <span className="dvhr__pill-mark" aria-hidden="true" data-rk-1ae39f=""></span>{s.name}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      
        {tipHost && createPortal(
          <div ref={tipRef} className="dvhr__tip" id={tipId} role="tooltip" data-tip data-rk-1ae39f="">
            <span className="dvhr__tip-head" data-rk-1ae39f=""><span className="dvhr__tip-cat" data-tip-cat data-rk-1ae39f=""></span><strong data-tip-name data-rk-1ae39f=""></strong></span>
            <span className="dvhr__tip-desc" data-tip-desc data-rk-1ae39f=""></span>
          </div>,
          tipHost,
        )}
      </section>
    </>
  );
}

export default DevHero;
