'use client';

import type { CSSProperties } from 'react';
import './AgencyCaseStudyHero.css';

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
 * AgencyCaseStudyHero — Case-study header: back link, client and category, headline, summary,
 * a big headline result, project facts (industry, services, duration, year) and a generated art
 * panel tinted by `hue` (or a real image).
 *
 * @param {string} client - Client name. Default 'Nordlys'.
 * @param {string} category - Category chip (Ads, SEO, Web…). Default 'Ads'.
 * @param {string} title - Headline.
 * @param {string} summary - Short summary.
 * @param {string} result - Headline result. Default '6.2× ROAS'.
 * @param {string} resultLabel - Caption under the result. Default 'Headline result'.
 * @param {Array<{label: string, value: string}>} facts - Project facts.
 * @param {number} hue - Art colour (0–360). Default 190.
 * @param {string} image - Optional image URL replacing the art.
 * @param {string} imageAlt - Alt text for `image`. Default ''.
 * @param {{label: string, href: string}} back - Back link. Default 'All case studies'.
 * @param {string} className - Extra class.
 *
 * Accessibility: h1 headline; facts as a description list; generated art is decorative and an
 * image needs meaningful alt text via `imageAlt`.
 */
export interface AgencyCaseStudyHeroProps {
  client?: string;
  category?: string;
  title?: string;
  summary?: string;
  result?: string;
  resultLabel?: string;
  facts?: Array<{ label: string; value: string }>;
  hue?: number;
  image?: string;
  imageAlt?: string;
  back?: { label: string; href: string };
  className?: string;
}

export function AgencyCaseStudyHero({
  client = 'Nordlys',
  category = 'Ads',
  title = 'Scaling a skincare brand to 6.2× ROAS on Meta and Google',
  summary = 'Nordlys had a loyal community but paid social stopped scaling past €20k a month. We rebuilt tracking, campaign structure and the creative engine.',
  result = '6.2× ROAS',
  resultLabel = 'Headline result',
  facts = [
    { label: 'Industry', value: 'Beauty · D2C e-commerce' },
    { label: 'Services', value: 'Meta Ads, Google Shopping, Creative' },
    { label: 'Duration', value: '9 months' },
    { label: 'Year', value: '2026' },
  ],
  hue = 190,
  image,
  imageAlt = '',
  back = { label: 'All case studies', href: '#' },
  className = '',
}: AgencyCaseStudyHeroProps) {
  return (
    <>
      <div className="ach-cq" data-rk-6f1196="">
      <section className={cx(['ach', className])} style={st(`--h: ${hue}`)} data-rk-6f1196="">
        <div className="ach__copy" data-rk-6f1196="">
          {back && <a className="ach__back" href={back.href} data-rk-6f1196=""><span aria-hidden="true" data-rk-6f1196="">←</span> {back.label}</a>}
          <p className="ach__meta" data-rk-6f1196=""><span className="ach__chip" data-rk-6f1196="">{category}</span><span data-rk-6f1196="">{client}</span></p>
          <h1 className="ach__title" data-rk-6f1196="">{title}</h1>
          {summary && <p className="ach__summary" data-rk-6f1196="">{summary}</p>}
          <dl className="ach__facts" data-rk-6f1196="">
            {facts.map((f, __i: number) => <div key={__i} data-rk-6f1196=""><dt data-rk-6f1196="">{f.label}</dt><dd data-rk-6f1196="">{f.value}</dd></div>)}
          </dl>
        </div>
        <div className="ach__art" data-rk-6f1196="">
          {image ? <img src={image} alt={imageAlt} loading="eager" data-rk-6f1196="" /> : (
            <svg viewBox="0 0 400 400" aria-hidden="true" preserveAspectRatio="xMidYMid slice" data-rk-6f1196="">
              <rect width="400" height="400" fill={`hsl(${hue} 55% 18%)`} data-rk-6f1196="" />
              <circle cx="300" cy="90" r="150" fill={`hsl(${hue} 70% 45%)`} opacity="0.55" data-rk-6f1196="" />
              <circle cx="80" cy="330" r="120" fill={`hsl(${(hue + 40) % 360} 75% 60%)`} opacity="0.45" data-rk-6f1196="" />
              <path d="M0 300 C 100 240, 160 330, 260 250 S 380 200, 400 150 V400 H0Z" fill={`hsl(${hue} 60% 10%)`} opacity="0.6" data-rk-6f1196="" />
              <g stroke={`hsl(${hue} 80% 85%)`} strokeWidth="2" fill="none" opacity="0.7" data-rk-6f1196="">
                <path d="M40 260 L120 220 L190 236 L260 160 L330 120" data-rk-6f1196="" />
                <circle cx="330" cy="120" r="7" fill={`hsl(${hue} 80% 85%)`} data-rk-6f1196="" />
              </g>
            </svg>
          )}
          <p className="ach__result" data-rk-6f1196=""><strong data-rk-6f1196="">{result}</strong><span data-rk-6f1196="">{resultLabel}</span></p>
        </div>
      </section>
      </div>
    </>
  );
}

export default AgencyCaseStudyHero;
