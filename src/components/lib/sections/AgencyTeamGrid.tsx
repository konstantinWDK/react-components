'use client';

import type { CSSProperties } from 'react';
import './AgencyTeamGrid.css';

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

interface Person { name: string; role: string; location?: string; fact?: string; photo?: string; links?: Array<{ label: string; href: string }> }

/**
 * AgencyTeamGrid — Team portraits with name, role, location, a personal "fun fact" revealed on
 * hover/focus and social links, plus an optional "we're hiring" card.
 *
 * @param {string} eyebrow - Small label. Default 'The studio'.
 * @param {string} title - Heading. Default 'Small team, senior people'.
 * @param {string} text - Intro paragraph.
 * @param {Array<{name: string, role: string, location?: string, fact?: string, photo?: string, links?: {label: string, href: string}[]}>} people - Team members.
 * @param {{title: string, text: string, href: string, label?: string}} hiring - Hiring card (optional).
 * @param {number} columns - Desktop columns (3–4). Default 4.
 * @param {string} variant - Style (portrait|compact). Default 'portrait'.
 * @param {string} className - Extra class.
 *
 * Accessibility: each person is an article with a heading; the fun fact is real text (visible on
 * hover and on keyboard focus of the card); social links have descriptive labels.
 */
export interface AgencyTeamGridProps {
  eyebrow?: string;
  title?: string;
  text?: string;
  people?: Person[];
  hiring?: { title: string; text: string; href: string; label?: string };
  columns?: 3 | 4;
  variant?: 'portrait' | 'compact';
  className?: string;
}

export function AgencyTeamGrid({
  eyebrow = 'The studio',
  title = 'Small team, senior people',
  text = 'No juniors hidden behind account managers. You work directly with the people who do the work.',
  people = [
    { name: 'Marta Ibáñez', role: 'Founder & creative director', location: 'Madrid', fact: 'Designed her first logo at 12 — for her cat.', links: [{ label: 'LinkedIn', href: '#' }] },
    { name: 'Jonas Weber', role: 'Head of design', location: 'Berlin', fact: 'Owns 41 typefaces, uses three.', links: [{ label: 'Dribbble', href: '#' }] },
    { name: 'Aisha Bello', role: 'Growth lead', location: 'Lisbon', fact: 'Ran a marathon and a product launch the same week.', links: [{ label: 'LinkedIn', href: '#' }] },
    { name: 'Leo Martins', role: 'Lead developer', location: 'Remote', fact: 'Ships to production from a sailboat.', links: [{ label: 'GitHub', href: '#' }] },
  ],
  hiring = { title: 'We are hiring', text: 'Senior designers and Astro developers — remote in Europe.', href: '#', label: 'See open roles' },
  columns = 4,
  variant = 'portrait',
  className = '',
}: AgencyTeamGridProps) {
  const hues = [80, 280, 20, 190, 330, 140];
  const initials = (n: string) => n.split(/\s+/).slice(0, 2).map((p) => p[0]).join('');
  return (
    <>
      <div className="cq-agency-team" data-rk-28a916="">
      <section className={cx(['atg', `atg--${variant}`, className])} style={st(`--cols: ${columns}`)} aria-labelledby="atg-title" data-rk-28a916="">
        <header className="atg__head" data-rk-28a916="">
          <p className="atg__eyebrow" data-rk-28a916="">{eyebrow}</p>
          <h2 className="atg__title" id="atg-title" data-rk-28a916="">{title}</h2>
          {text && <p className="atg__text" data-rk-28a916="">{text}</p>}
        </header>
        <div className="atg__grid" data-rk-28a916="">
          {people.map((p, i) => (
            <article key={i} className="atg__person" tabIndex={0} aria-labelledby={`atg-p-${i}`} data-rk-28a916="">
              <div className="atg__photo" style={st(`--h: ${hues[i % hues.length]}`)} data-rk-28a916="">
                {p.photo ? <img src={p.photo} alt={`Portrait of ${p.name}`} loading="lazy" decoding="async" data-rk-28a916="" /> : <span className="atg__initials" aria-hidden="true" data-rk-28a916="">{initials(p.name)}</span>}
                {p.fact && <p className="atg__fact" data-rk-28a916=""><span data-rk-28a916="">Fun fact</span>{p.fact}</p>}
              </div>
              <h3 className="atg__name" id={`atg-p-${i}`} data-rk-28a916="">{p.name}</h3>
              <p className="atg__role" data-rk-28a916="">{p.role}{p.location && <span data-rk-28a916=""> · {p.location}</span>}</p>
              {p.links && <p className="atg__links" data-rk-28a916="">{p.links.map((l, __i: number) => <a key={__i} href={l.href} aria-label={`${p.name} on ${l.label}`} data-rk-28a916="">{l.label}</a>)}</p>}
            </article>
          ))}
          {hiring && (
            <a className="atg__hiring" href={hiring.href} data-rk-28a916="">
              <strong data-rk-28a916="">{hiring.title}</strong>
              <span data-rk-28a916="">{hiring.text}</span>
              <em data-rk-28a916="">{hiring.label ?? 'Open roles'} ↗</em>
            </a>
          )}
        </div>
      </section>
      </div>
    </>
  );
}

export default AgencyTeamGrid;
