'use client';

import { useEffect, useRef, useId } from 'react';
import type { ShowcaseApi, ShowcaseProject, ShowcaseVisualKind } from '../three/showcase-scene';
import './DevProjectsShowcase.css';

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

interface ShowcaseItem {
  title: string;
  tagline: string;
  category: string;
  badge?: string;
  description: string;
  technologies: string[];
  visual?: { kind: ShowcaseVisualKind; lines?: string[] };
  liveUrl?: string;
  repoUrl?: string;
  stars?: number;
  href?: string;
}

/**
 * DevProjectsShowcase — 3D projects slider ("Keycap" design). Projects become architectural cards
 * (paper boxes with ink outlines) fanned out in perspective, each with a small animated visual
 * chosen by data: code | terminal | equalizer | monitor | endpoints | paint | atom. Drag, swipe,
 * horizontal trackpad, arrow buttons, a keycap row or ←/→ move between cards; clicking the centred
 * card brings it forward and opens a project sheet. Light/dark aware. Needs the optional `three`
 * peer dependency.
 *
 * @param {string} eyebrow - HUD badge above the title.
 * @param {string} title - Section title. Default 'Selected projects'.
 * @param {string} subtitle - Intro text.
 * @param {Array<object>} projects - { title, tagline, category, badge?, description, technologies[], visual?: { kind, lines? }, liveUrl?, repoUrl?, stars?, href? }
 * @param {object} labels - UI strings: { prev, next, hint, close, live, code, details, open, key, stack }.
 * @param {string} className - Extra class.
 *
 * Accessibility: every project is also reachable through real buttons (arrows and keycap row with
 * aria-current); the project sheet is a modal dialog (focus trapped, Escape closes, focus returns);
 * ←/→ only act while the section is on screen and no field is focused; reduced motion freezes the
 * animated visuals.
 */
export interface DevProjectsShowcaseProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  projects: ShowcaseItem[];
  labels?: Partial<Record<'prev' | 'next' | 'hint' | 'close' | 'live' | 'code' | 'details' | 'open' | 'key' | 'stack', string>>;
  className?: string;
}

export function DevProjectsShowcase({
  eyebrow = '3D SYSTEM // MONOCHROME',
  title = 'Selected projects',
  subtitle,
  projects = [
    { title: 'Orbit UI', tagline: 'Accessible component kit for React', category: 'Frontend & UI System', badge: 'Popular', description: 'Typed, accessible React components with light and dark themes and zero runtime dependencies.', technologies: ['React', 'TypeScript', 'CSS'], visual: { kind: 'atom' }, stars: 1240 },
    { title: 'Atelier', tagline: 'Online platform for contemporary art', category: 'Web Platform', badge: 'Live', description: 'Artists, galleries and venues publish works, events and art routes.', technologies: ['Next.js', 'PostgreSQL', 'Mapbox'], visual: { kind: 'paint', lines: ['Works', 'Artists', 'Spaces', 'Events'] } },
    { title: 'Tidy', tagline: 'Reclaims disk space from dev caches', category: 'Developer Tools', badge: 'New', description: 'A CLI that safely removes stale build caches, with a dry run and an undo log.', technologies: ['Rust', 'CLI'], visual: { kind: 'terminal' } },
    { title: 'Relay', tagline: 'Declarative API mocks in minutes', category: 'Backend & API', description: 'One schema drives the mock server, validation and docs.', technologies: ['Node.js', 'OpenAPI'], visual: { kind: 'endpoints' } },
  ],
  labels = {},
  className = '',
}: DevProjectsShowcaseProps) {
  const L = {
    prev: 'Previous project',
    next: 'Next project',
    hint: 'Drag to explore · Click to open',
    close: 'ESC / CLOSE',
    live: 'Visit live site',
    code: 'View source code',
    details: 'Case study',
    open: '[ CLICK TO OPEN ↗ ]',
    key: 'KEY',
    stack: 'TECH_STACK:',
    ...labels,
  };
  const pad = (n: number) => String(n).padStart(2, '0');
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');

  // 3D carousel: three.js is loaded on demand (optional peer dependency). The buttons, the counter
  // and the dialog work with the scene; everything is scoped to this section and cleaned up on unmount.
  const rootRef = useRef<HTMLElement>(null);
  const sceneKey = JSON.stringify([projects.map(({ title, tagline, category, badge, technologies, visual }) => ({ title, tagline, category, badge, technologies, visual })), L.open, L.key]);
  useEffect(() => {
    const root = rootRef.current;
    const canvas = root?.querySelector<HTMLElement>('[data-canvas]');
    const overlay = root?.querySelector<HTMLElement>('[data-overlay]');
    const sheet = root?.querySelector<HTMLElement>('[data-sheet]');
    if (!root || !canvas || !overlay || !sheet) return;
    const [sceneProjects, open, key] = JSON.parse(sceneKey) as [ShowcaseProject[], string, string];
    const current = root.querySelector<HTMLElement>('[data-current]');
    const keys = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-key]'));
    const hint = root.querySelector<HTMLElement>('[data-hint]');
    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-sheet-item]'));
    const ac = new AbortController();
    const on = (el: EventTarget | null | undefined, type: string, fn: (e: any) => void) => el?.addEventListener(type, fn, { signal: ac.signal });
    let api: ShowcaseApi | null = null;
    let returnFocus: HTMLElement | null = null;
    let visible = false;
    let cancelled = false;

    const openSheet = (i: number) => {
      returnFocus = document.activeElement as HTMLElement | null;
      items.forEach((it, j) => {
        it.hidden = j !== i;
        const t = it.querySelector('[data-sheet-title]');
        if (t) t.id = j === i ? sheet.getAttribute('aria-labelledby')! : '';
      });
      overlay.hidden = false;
      sheet.focus();
    };
    const closeSheet = () => {
      if (overlay.hidden) return;
      overlay.hidden = true;
      api?.close();
      returnFocus?.focus?.();
    };

    on(root.querySelector('[data-prev]'), 'click', () => { closeSheet(); api?.prev(); });
    on(root.querySelector('[data-next]'), 'click', () => { closeSheet(); api?.next(); });
    keys.forEach((k, i) => on(k, 'click', () => { closeSheet(); api?.goTo(i); }));
    root.querySelectorAll('[data-close]').forEach((b) => on(b, 'click', closeSheet));

    // Focus trap inside the sheet
    on(sheet, 'keydown', (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const f = Array.from(sheet.querySelectorAll<HTMLElement>('a[href], button')).filter((el) => !el.closest('[hidden]'));
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === sheet)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });

    const io = new IntersectionObserver((entries) => (visible = entries[0].isIntersecting), { threshold: 0.25 });
    io.observe(root);
    on(document, 'keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape') return closeSheet();
      if (!visible || !overlay.hidden) return;
      const t = e.target as HTMLElement;
      if (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
      if (e.key === 'ArrowLeft') api?.prev();
      else if (e.key === 'ArrowRight') api?.next();
    });

    Promise.all([import('three'), import('../three/showcase-scene')])
      .then(([THREE, { mountShowcase }]) => {
        if (cancelled) return;
        api = mountShowcase(canvas, THREE, {
          projects: sceneProjects,
          labels: { open, key },
          onIndex: (i) => {
            if (current) current.textContent = String(i + 1).padStart(2, '0');
            keys.forEach((k, j) => {
              k.classList.toggle('is-active', j === i);
              k.setAttribute('aria-current', String(j === i));
            });
          },
          onOpen: (i) => openSheet(i),
          onInteract: () => hint?.classList.add('is-hidden'),
        });
      })
      .catch((err) => console.warn('[DevProjectsShowcase] the 3D carousel needs the optional `three` peer dependency.', err));

    return () => {
      cancelled = true;
      ac.abort();
      io.disconnect();
      api?.dispose();
    };
  }, [sceneKey]);
  return (
    <>
      <section ref={rootRef} className={cx(['dvps', className])} data-dev-showcase data-labels={JSON.stringify({ open: L.open, key: L.key })} data-rk-e67cd3="">
        <div className="dvps__grid-bg" aria-hidden="true" data-rk-e67cd3=""></div>
      
        <div className="dvps__head" data-rk-e67cd3="">
          <div className="dvps__intro" data-rk-e67cd3="">
            {eyebrow && <p className="dvps__badge" data-rk-e67cd3=""><span data-rk-e67cd3="">[</span>{` ${eyebrow} `}<span data-rk-e67cd3="">]</span></p>}
            <h2 className="dvps__title" id={`dvps-title-${uid}`} data-rk-e67cd3="">{title}</h2>
            {subtitle && <p className="dvps__subtitle" data-rk-e67cd3="">{subtitle}</p>}
          </div>
          <div className="dvps__nav" data-rk-e67cd3="">
            <button className="dvps__arrow" type="button" data-prev aria-label={L.prev} data-rk-e67cd3="">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-rk-e67cd3=""><polyline points="15 18 9 12 15 6" data-rk-e67cd3="" /></svg>
            </button>
            <p className="dvps__counter" aria-live="polite" data-rk-e67cd3=""><span className="dvps__dim" data-rk-e67cd3="">[</span> <strong data-current data-rk-e67cd3="">01</strong> <span className="dvps__dim" data-rk-e67cd3="">/ {pad(projects.length)} ]</span></p>
            <button className="dvps__arrow" type="button" data-next aria-label={L.next} data-rk-e67cd3="">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-rk-e67cd3=""><polyline points="9 18 15 12 9 6" data-rk-e67cd3="" /></svg>
            </button>
          </div>
        </div>
      
        <div className="dvps__viewport" data-rk-e67cd3="">
          <div className="dvps__ruler dvps__ruler--top" aria-hidden="true" data-rk-e67cd3=""><span data-rk-e67cd3="">+</span><i data-rk-e67cd3=""></i><em data-rk-e67cd3="">SYSTEM_SPEC // KEYBOARD_AESTHETICS</em><i data-rk-e67cd3=""></i><span data-rk-e67cd3="">+</span></div>
          <div className="dvps__canvas" data-canvas role="img" aria-labelledby={`dvps-title-${uid}`} data-rk-e67cd3=""></div>
          <p className="dvps__hint" data-hint aria-hidden="true" data-rk-e67cd3="">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" data-rk-e67cd3=""><path d="M5 12h14M12 5l7 7-7 7" data-rk-e67cd3="" /></svg>
            {L.hint}
          </p>
          <div className="dvps__ruler dvps__ruler--bottom" aria-hidden="true" data-rk-e67cd3=""><span data-rk-e67cd3="">+</span><i data-rk-e67cd3=""></i><em data-rk-e67cd3="">WIREFRAME_EDGES // INK // PAPER</em><i data-rk-e67cd3=""></i><span data-rk-e67cd3="">+</span></div>
      
          <div className="dvps__overlay" data-overlay hidden data-rk-e67cd3="">
            <div className="dvps__backdrop" data-close data-rk-e67cd3=""></div>
            <div className="dvps__sheet" role="dialog" aria-modal="true" aria-labelledby={`dvps-sheet-${uid}`} data-sheet tabIndex={-1} data-rk-e67cd3="">
              <button className="dvps__close" type="button" data-close data-rk-e67cd3="">{L.close}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" data-rk-e67cd3=""><path d="M18 6 6 18M6 6l12 12" data-rk-e67cd3="" /></svg>
              </button>
              {projects.map((p, i) => (
                <article key={i} className="dvps__card" data-sheet-item={i} hidden data-rk-e67cd3="">
                  <p className="dvps__meta" data-rk-e67cd3="">
                    <strong data-rk-e67cd3="">{L.key} // {pad(i + 1)}</strong><span className="dvps__dim" data-rk-e67cd3="">/</span><span data-rk-e67cd3="">{p.category}</span>
                    {p.badge && <span className="dvps__tag" data-rk-e67cd3="">{p.badge}</span>}
                    {!!p.stars && <span className="dvps__tag" data-rk-e67cd3="">★ {p.stars}</span>}
                  </p>
                  <h3 className="dvps__sheet-title" id={i === 0 ? `dvps-sheet-${uid}` : undefined} data-sheet-title data-rk-e67cd3="">{p.title}</h3>
                  <p className="dvps__tagline" data-rk-e67cd3="">{p.tagline}</p>
                  <hr className="dvps__rule" data-rk-e67cd3="" />
                  <p className="dvps__desc" data-rk-e67cd3="">{p.description}</p>
                  <p className="dvps__stack-label" data-rk-e67cd3="">{L.stack}</p>
                  <ul className="dvps__chips" data-rk-e67cd3="">{p.technologies.map((t, __i: number) => <li key={__i} data-rk-e67cd3="">{t}</li>)}</ul>
                  <div className="dvps__actions" data-rk-e67cd3="">
                    {p.liveUrl && (
                      <a className="dvps__btn dvps__btn--primary" href={p.liveUrl} target="_blank" rel="noopener noreferrer" data-rk-e67cd3="">{L.live}
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-rk-e67cd3=""><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" data-rk-e67cd3="" /><path d="M15 3h6v6M10 14 21 3" data-rk-e67cd3="" /></svg>
                      </a>
                    )}
                    {p.href && <a className="dvps__btn" href={p.href} data-rk-e67cd3="">{L.details} →</a>}
                    {p.repoUrl && (
                      <a className="dvps__btn dvps__btn--icon" href={p.repoUrl} target="_blank" rel="noopener noreferrer" aria-label={`${L.code}: ${p.title}`} data-rk-e67cd3="">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-rk-e67cd3=""><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" data-rk-e67cd3="" /></svg>
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      
        <nav className="dvps__keys" aria-label={title} data-rk-e67cd3="">
          {projects.map((p, i) => (
            <button key={i} type="button" className={cx(['dvps__key', { 'is-active': i === 0 }])} data-key={i} aria-current={i === 0 ? 'true' : 'false'} aria-label={p.title} data-rk-e67cd3="">
              <span className="dvps__key-num" data-rk-e67cd3="">{pad(i + 1)}</span><span className="dvps__key-label" data-rk-e67cd3="">{p.title}</span>
            </button>
          ))}
        </nav>
      
      </section>
    </>
  );
}

export default DevProjectsShowcase;
