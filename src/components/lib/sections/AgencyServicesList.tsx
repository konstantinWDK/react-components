'use client';

import { useEffect, useRef } from 'react';
import './AgencyServicesList.css';

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

interface Service { name: string; pitch: string; deliverables?: string[]; timeline?: string; from?: string; href?: string }

/**
 * AgencyServicesList — Numbered, expandable service rows: big service names, short pitch,
 * deliverable chips, typical timeline and "from" price, with a hover/focus reveal.
 *
 * @param {string} eyebrow - Small label. Default 'What we do'.
 * @param {string} title - Section heading. Default 'Services that move the needle'.
 * @param {Array<{name: string, pitch: string, deliverables?: string[], timeline?: string, from?: string, href?: string}>} services - Rows.
 * @param {number} open - Index opened by default (-1 for none). Default 0.
 * @param {boolean} exclusive - Opening one row closes the others. Default true.
 * @param {string} variant - Style (lines|cards). Default 'lines'.
 * @param {string} className - Extra class.
 *
 * Accessibility: native <details>/<summary> rows (keyboard and screen-reader friendly); each row
 * has a heading; the decorative number and arrow are aria-hidden.
 */
export interface AgencyServicesListProps {
  eyebrow?: string;
  title?: string;
  services?: Service[];
  open?: number;
  exclusive?: boolean;
  variant?: 'lines' | 'cards';
  className?: string;
}

export function AgencyServicesList({
  eyebrow = 'What we do',
  title = 'Services that move the needle',
  services = [
    { name: 'Brand identity', pitch: 'Positioning, naming, logo systems and guidelines that make you unmistakable.', deliverables: ['Strategy workshop', 'Visual identity', 'Brand book', 'Launch kit'], timeline: '6–8 weeks', from: '€18k' },
    { name: 'Websites', pitch: 'Fast, accessible Astro sites with a CMS your team will actually enjoy.', deliverables: ['UX & content', 'Design system', 'Astro build', 'CMS & analytics'], timeline: '8–12 weeks', from: '€24k' },
    { name: 'Growth marketing', pitch: 'Performance campaigns, SEO and CRO run by people who read the numbers.', deliverables: ['Paid social', 'SEO', 'A/B testing', 'Monthly reporting'], timeline: 'Monthly', from: '€6k / mo' },
    { name: 'Content & social', pitch: 'Always-on content engines: shoots, short video, copy and community.', deliverables: ['Editorial calendar', 'Production', 'Community'], timeline: 'Monthly', from: '€4k / mo' },
  ],
  open = 0,
  exclusive = true,
  variant = 'lines',
  className = '',
}: AgencyServicesListProps) {

  // Ported from the Astro <script>: runs once after mount (DOM logic kept as in the Astro kit).
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLElement>('[data-services][data-exclusive]:not([data-bound])').forEach((root) => {
        root.dataset.bound = '';
        const rows = Array.from(root.querySelectorAll<HTMLDetailsElement>('details'));
        rows.forEach((d) => d.addEventListener('toggle', () => { if (d.open) rows.forEach((o) => { if (o !== d) o.open = false; }); }));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="cq-agency-services" data-rk-773b38="">
      <section className={cx(['asl', `asl--${variant}`, className])} aria-labelledby="asl-title" data-services data-exclusive={exclusive ? '' : undefined} data-rk-773b38="">
        <header className="asl__head" data-rk-773b38="">
          <p className="asl__eyebrow" data-rk-773b38="">{eyebrow}</p>
          <h2 className="asl__title" id="asl-title" data-rk-773b38="">{title}</h2>
        </header>
        <div className="asl__list" data-rk-773b38="">
          {services.map((s, i) => (
            <details key={i} className="asl__row" open={i === open} data-rk-773b38="">
              <summary className="asl__summary" data-rk-773b38="">
                <span className="asl__num" aria-hidden="true" data-rk-773b38="">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="asl__name" data-rk-773b38="">{s.name}</h3>
                {s.from && <span className="asl__from" data-rk-773b38="">from {s.from}</span>}
                <span className="asl__arrow" aria-hidden="true" data-rk-773b38="">↗</span>
              </summary>
              <div className="asl__body" data-rk-773b38="">
                <p className="asl__pitch" data-rk-773b38="">{s.pitch}</p>
                {s.deliverables && <ul className="asl__chips" data-rk-773b38="">{s.deliverables.map((d, __i: number) => <li key={__i} data-rk-773b38="">{d}</li>)}</ul>}
                <p className="asl__meta" data-rk-773b38="">{s.timeline && <span data-rk-773b38="">Timeline · <strong data-rk-773b38="">{s.timeline}</strong></span>}{s.href && <a href={s.href} data-rk-773b38="">Learn more →</a>}</p>
              </div>
            </details>
          ))}
        </div>
      </section>
      </div>
    </>
  );
}

export default AgencyServicesList;
