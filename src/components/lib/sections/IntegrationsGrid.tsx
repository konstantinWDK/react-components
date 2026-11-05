'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import './IntegrationsGrid.css';

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

interface Item { name: string; category: string; description: string; status?: 'available' | 'beta' | 'soon' }

/**
 * IntegrationsGrid — Integrations directory with category filter chips
 * (progressively enhanced), monogram tiles and connection status badges.
 *
 * @param {string} title - Section heading.
 * @param {string} subtitle - Section description.
 * @param {Array<{name: string, category: string, description: string, status?: 'available'|'beta'|'soon'}>} items - Integrations.
 * @param {string} variant - Tile style (card|compact|outline).
 * @param {string} size - Vertical rhythm (sm|md|lg).
 * @param {string} className - Extra CSS class.
 */
export interface IntegrationsGridProps {
  title?: string;
  subtitle?: string;
  items?: Item[];
  variant?: 'card' | 'compact' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function IntegrationsGrid({
  title = 'Plays well with your stack',
  subtitle = 'Connect the tools your team already uses. New integrations every month.',
  items = [
    { name: 'Slack', category: 'Messaging', description: 'Post alerts and weekly digests to channels.', status: 'available' },
    { name: 'GitHub', category: 'Developer', description: 'Annotate charts with deploys and releases.', status: 'available' },
    { name: 'Stripe', category: 'Payments', description: 'Sync MRR, churn and invoices automatically.', status: 'available' },
    { name: 'Linear', category: 'Developer', description: 'Turn insights into issues in one click.', status: 'beta' },
    { name: 'Notion', category: 'Docs', description: 'Embed live charts in your team wiki.', status: 'available' },
    { name: 'HubSpot', category: 'CRM', description: 'Attribute revenue to campaigns and deals.', status: 'beta' },
    { name: 'Postgres', category: 'Data', description: 'Query your warehouse with zero ETL.', status: 'available' },
    { name: 'Discord', category: 'Messaging', description: 'Community metrics and bot notifications.', status: 'soon' },
  ],
  variant = 'card',
  size = 'md',
  className = '',
}: IntegrationsGridProps) {
  const id = `ig-${Math.random().toString(36).slice(2, 8)}`;
  const categories = ['All', ...new Set(items.map((i) => i.category))];
  const hues = ['var(--chart-1, #3987e5)', 'var(--chart-2, #d95926)', 'var(--chart-3, #199e70)', 'var(--chart-4, #c98500)', 'var(--chart-5, #d55181)', 'var(--chart-7, #9085e9)'];
  const statusLabel = { available: 'Available', beta: 'Beta', soon: 'Coming soon' };

  // Ported from the Astro <script>: runs once after mount (DOM logic kept as in the Astro kit).
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLElement>('[data-ig]').forEach((root) => {
        const chips = root.querySelectorAll<HTMLButtonElement>('.ig__chip');
        const tiles = root.querySelectorAll<HTMLElement>('.ig__tile');
        const count = root.querySelector('.ig__count');
        chips.forEach((chip) => {
          chip.addEventListener('click', () => {
            const f = chip.dataset.filter;
            chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
            let shown = 0;
            tiles.forEach((t) => {
              const on = f === 'All' || t.dataset.category === f;
              t.hidden = !on;
              if (on) shown += 1;
            });
            if (count) count.textContent = `${shown} integration${shown === 1 ? '' : 's'}${f === 'All' ? '' : ` in ${f}`}`;
          });
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className={`ig ig--${variant} ig--${size} ${className}`} aria-labelledby={id} data-ig data-rk-32bfaf="">
        <div className="ig__inner" data-rk-32bfaf="">
          <header className="ig__head" data-rk-32bfaf="">
            <h2 id={id} className="ig__title" data-rk-32bfaf="">{title}</h2>
            <p className="ig__subtitle" data-rk-32bfaf="">{subtitle}</p>
          </header>
      
          <div className="ig__filters" role="group" aria-label="Filter integrations by category" data-rk-32bfaf="">
            {categories.map((c, i) => (
              <button key={i} type="button" className="ig__chip" data-filter={c} aria-pressed={i === 0 ? 'true' : 'false'} data-rk-32bfaf="">{c}</button>
            ))}
          </div>
          <p className="ig__count" role="status" aria-live="polite" data-rk-32bfaf="">{items.length} integrations</p>
      
          <ul className="ig__grid" data-rk-32bfaf="">
            {items.map((it, i) => (
              <li key={i} className="ig__tile" data-category={it.category} data-rk-32bfaf="">
                <span className="ig__logo" style={st(`--c:${hues[i % hues.length]}`)} aria-hidden="true" data-rk-32bfaf="">{it.name.slice(0, 2)}</span>
                <div className="ig__body" data-rk-32bfaf="">
                  <div className="ig__row" data-rk-32bfaf="">
                    <h3 className="ig__name" data-rk-32bfaf="">{it.name}</h3>
                    {it.status && <span className={`ig__status ig__status--${it.status}`} data-rk-32bfaf="">{statusLabel[it.status]}</span>}
                  </div>
                  <p className="ig__desc" data-rk-32bfaf="">{it.description}</p>
                  <span className="ig__cat" data-rk-32bfaf="">{it.category}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default IntegrationsGrid;
