'use client';

import { useId } from 'react';
import type { CSSProperties } from 'react';
import './BlogGridSection.css';

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

interface Post { title: string; excerpt: string; category: string; date: string; readTime: string; author: string; href: string; image?: string }

/**
 * BlogGridSection — Latest articles section with one featured post and a grid of
 * smaller posts. Covers are CSS gradients by default (pass `image` for photos).
 *
 * @param {string} title - Section heading.
 * @param {{label: string, href: string}} viewAll - Link to the full blog.
 * @param {Array<{title: string, excerpt: string, category: string, date: string, readTime: string, author: string, href: string, image?: string}>} posts - Posts (first is featured).
 * @param {string} variant - Card style (cards|minimal|overlay).
 * @param {string} size - Vertical rhythm (sm|md|lg).
 * @param {string} className - Extra CSS class.
 */
export interface BlogGridSectionProps {
  title?: string;
  viewAll?: { label: string; href: string };
  posts?: Post[];
  variant?: 'cards' | 'minimal' | 'overlay';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function BlogGridSection({
  title = 'From the blog',
  viewAll = { label: 'View all posts', href: '#' },
  posts = [
    { title: 'Building zero-JS charts with SVG and Astro', excerpt: 'How we replaced a 200 kB charting library with build-time SVG, without losing tooltips or accessibility.', category: 'Engineering', date: '2026-10-28', readTime: '8 min', author: 'Marcus Lee', href: '#' },
    { title: 'Designing for dark mode first', excerpt: 'Contrast, elevation and color tokens that hold up at night.', category: 'Design', date: '2026-10-21', readTime: '5 min', author: 'Sofía Ruiz', href: '#' },
    { title: 'The accessibility checklist we run on every component', excerpt: 'Focus, keyboard, contrast and screen readers — our exact process.', category: 'Accessibility', date: '2026-10-14', readTime: '6 min', author: 'Priya Natarajan', href: '#' },
    { title: 'Landing page anatomy: 7 sections that convert', excerpt: 'A data-backed look at hero, proof, pricing and FAQ placement.', category: 'Growth', date: '2026-10-07', readTime: '7 min', author: 'Alicia Gómez', href: '#' },
  ],
  variant = 'cards',
  size = 'md',
  className = '',
}: BlogGridSectionProps) {
  const id = `bgs-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const gradients = [
    'radial-gradient(circle at 20% 20%, rgba(57,135,229,.65), transparent 55%), radial-gradient(circle at 80% 80%, rgba(144,133,233,.55), transparent 50%), #101018',
    'radial-gradient(circle at 70% 30%, color-mix(in srgb, var(--c-primary-light, #d4a017) 60%, transparent), transparent 50%), #15120a',
    'radial-gradient(circle at 30% 70%, rgba(25,158,112,.6), transparent 55%), #0b1411',
    'radial-gradient(circle at 60% 40%, rgba(213,81,129,.55), transparent 55%), #150b10',
  ];
  const fmtDate = (d: string) => new Date(`${d}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
  return (
    <>
      <div className="cq-blog-grid-section-cq" data-rk-1eb7bb="">
      <section className={`bgs bgs--${variant} bgs--${size} ${className}`} aria-labelledby={id} data-rk-1eb7bb="">
        <div className="bgs__inner" data-rk-1eb7bb="">
          <header className="bgs__head" data-rk-1eb7bb="">
            <h2 id={id} className="bgs__title" data-rk-1eb7bb="">{title}</h2>
            {viewAll && (
              <a className="bgs__all" href={viewAll.href} data-rk-1eb7bb="">
                {viewAll.label}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" data-rk-1eb7bb=""><path d="M5 12h14M13 6l6 6-6 6" data-rk-1eb7bb="" /></svg>
              </a>
            )}
          </header>
          <ul className="bgs__grid" data-rk-1eb7bb="">
            {posts.map((p, i) => (
              <li key={i} className={cx(['bgs__post', { 'bgs__post--featured': i === 0 }])} data-rk-1eb7bb="">
                <article className="bgs__card" data-rk-1eb7bb="">
                  <div className="bgs__cover" style={st(p.image ? undefined : `background:${gradients[i % gradients.length]}`)} data-rk-1eb7bb="">
                    {p.image && <img src={p.image} alt="" loading="lazy" decoding="async" data-rk-1eb7bb="" />}
                  </div>
                  <div className="bgs__body" data-rk-1eb7bb="">
                    <p className="bgs__meta" data-rk-1eb7bb="">
                      <span className="bgs__cat" data-rk-1eb7bb="">{p.category}</span>
                      <time dateTime={p.date} data-rk-1eb7bb="">{fmtDate(p.date)}</time>
                      <span aria-hidden="true" data-rk-1eb7bb="">·</span>
                      <span data-rk-1eb7bb="">{p.readTime} read</span>
                    </p>
                    <h3 className="bgs__post-title" data-rk-1eb7bb=""><a href={p.href} data-rk-1eb7bb="">{p.title}</a></h3>
                    <p className="bgs__excerpt" data-rk-1eb7bb="">{p.excerpt}</p>
                    <p className="bgs__author" data-rk-1eb7bb="">By {p.author}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
      </div>
    </>
  );
}

export default BlogGridSection;
