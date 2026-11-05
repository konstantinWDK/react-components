'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import './AgencyWorkGrid.css';

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

interface Project { slug: string; client: string; title: string; category: string; services?: string[]; result?: string; year?: string; hue?: number; image?: string; href?: string }

/**
 * AgencyWorkGrid — Case-study grid with category filter chips: large art tiles, client, title,
 * services and a headline result, in an alternating big/small rhythm.
 *
 * @param {string} eyebrow - Small label. Default 'Selected work'.
 * @param {string} title - Heading. Default 'Work we are proud of'.
 * @param {Array<{slug: string, client: string, title: string, category: string, services?: string[], result?: string, year?: string, hue?: number, image?: string, href?: string}>} projects - Case studies.
 * @param {boolean} filters - Show category chips. Default true.
 * @param {{label: string, href: string}} link - "All work" link (optional).
 * @param {string} variant - Layout (mosaic|grid). Default 'mosaic'.
 * @param {string} className - Extra class.
 *
 * Accessibility: each card is one link with a heading; filter chips are toggle buttons and the
 * number of visible projects is announced; art is decorative.
 */
export interface AgencyWorkGridProps {
  eyebrow?: string;
  title?: string;
  projects?: Project[];
  filters?: boolean;
  link?: { label: string; href: string };
  variant?: 'mosaic' | 'grid';
  className?: string;
}

export function AgencyWorkGrid({
  eyebrow = 'Selected work',
  title = 'Work we are proud of',
  projects = [
    { slug: 'nordlys', client: 'Nordlys', title: 'A Nordic skincare brand that sold out its launch', category: 'Brand', services: ['Identity', 'Packaging'], result: '+212% preorders', year: '2026', hue: 190 },
    { slug: 'pace', client: 'Pace', title: 'A running app redesign that doubled retention', category: 'Product', services: ['UX', 'UI'], result: '2× day-30 retention', year: '2025', hue: 80 },
    { slug: 'casa-alba', client: 'Casa Alba', title: 'Direct bookings for a boutique hotel group', category: 'Web', services: ['Website', 'SEO'], result: '+64% direct revenue', year: '2025', hue: 25 },
    { slug: 'fintrack', client: 'Fintrack', title: 'Paid social that halved the cost per signup', category: 'Growth', services: ['Paid social', 'CRO'], result: '−48% CPA', year: '2026', hue: 280 },
  ],
  filters = true,
  link = { label: 'All case studies', href: '#' },
  variant = 'mosaic',
  className = '',
}: AgencyWorkGridProps) {
  const cats = Array.from(new Set(projects.map((p) => p.category)));

  // Ported from the Astro <script>: runs once after mount (DOM logic kept as in the Astro kit).
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLElement>('[data-work]:not([data-bound])').forEach((root) => {
        root.dataset.bound = '';
        const chips = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-cat]')).filter((b) => b.tagName === 'BUTTON');
        const items = Array.from(root.querySelectorAll<HTMLElement>('li[data-cat]'));
        const announce = root.querySelector<HTMLElement>('[data-announce]')!;
        chips.forEach((c) => c.addEventListener('click', () => {
          const cat = c.dataset.cat || '';
          chips.forEach((x) => x.setAttribute('aria-pressed', String(x === c)));
          let n = 0;
          items.forEach((it) => { const show = !cat || it.dataset.cat === cat; it.hidden = !show; if (show) n++; });
          announce.textContent = `${n} ${n === 1 ? 'project' : 'projects'} shown`;
        }));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="cq-agency-work" data-rk-81678a="">
      <section className={cx(['awg', `awg--${variant}`, className])} aria-labelledby="awg-title" data-work data-rk-81678a="">
        <header className="awg__head" data-rk-81678a="">
          <div data-rk-81678a="">
            <p className="awg__eyebrow" data-rk-81678a="">{eyebrow}</p>
            <h2 className="awg__title" id="awg-title" data-rk-81678a="">{title}</h2>
          </div>
          {link && <a className="awg__all" href={link.href} data-rk-81678a="">{link.label} <span aria-hidden="true" data-rk-81678a="">↗</span></a>}
        </header>
        {filters && cats.length > 1 && (
          <div className="awg__chips" role="group" aria-label="Filter by discipline" data-rk-81678a="">
            <button type="button" aria-pressed="true" data-cat="" data-rk-81678a="">All <sup data-rk-81678a="">{projects.length}</sup></button>
            {cats.map((c, __i: number) => <button key={__i} type="button" aria-pressed="false" data-cat={c} data-rk-81678a="">{c} <sup data-rk-81678a="">{projects.filter((p) => p.category === c).length}</sup></button>)}
          </div>
        )}
        <p className="sr-only" aria-live="polite" data-announce data-rk-81678a=""></p>
        <ul className="awg__grid" data-rk-81678a="">
          {projects.map((p, i) => (
            <li key={i} className={cx(['awg__item', { 'awg__item--wide': variant === 'mosaic' && i % 3 === 0 }])} data-cat={p.category} data-rk-81678a="">
              <a className="awg__card" href={p.href ?? '#'} data-rk-81678a="">
                <span className="awg__art" style={st(`--h: ${p.hue ?? 80}`)} aria-hidden="true" data-rk-81678a="">
                  {p.image ? <img src={p.image} alt="" loading="lazy" decoding="async" data-rk-81678a="" /> : <span className="awg__glyph" data-rk-81678a="">{p.client.slice(0, 1)}</span>}
                  {p.result && <span className="awg__result" data-rk-81678a="">{p.result}</span>}
                </span>
                <span className="awg__meta" data-rk-81678a=""><span data-rk-81678a="">{p.client}</span>{p.year && <span data-rk-81678a="">{p.year}</span>}</span>
                <h3 className="awg__name" data-rk-81678a="">{p.title}</h3>
                {p.services && <span className="awg__tags" data-rk-81678a="">{p.services.map((s, __i: number) => <span key={__i} data-rk-81678a="">{s}</span>)}</span>}
              </a>
            </li>
          ))}
        </ul>
      </section>
      </div>
    </>
  );
}

export default AgencyWorkGrid;
