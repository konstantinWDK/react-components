'use client';

import { useId } from 'react';
import './ChangelogSection.css';

interface Change { type: 'new' | 'improved' | 'fixed'; text: string }

interface Release { version: string; date: string; title: string; changes: Change[] }

/**
 * ChangelogSection — Release notes timeline with version tags, dates and
 * categorised entries (new / improved / fixed), each labelled with text + icon.
 *
 * @param {string} title - Section heading.
 * @param {string} subtitle - Section description.
 * @param {Array<{version: string, date: string, title: string, changes: Array<{type: 'new'|'improved'|'fixed', text: string}>}>} releases - Releases, newest first.
 * @param {{label: string, href: string}} subscribe - Optional RSS/updates link.
 * @param {string} variant - Layout (timeline|cards|compact).
 * @param {string} size - Vertical rhythm (sm|md|lg).
 * @param {string} className - Extra CSS class.
 */
export interface ChangelogSectionProps {
  title?: string;
  subtitle?: string;
  releases?: Release[];
  subscribe?: { label: string; href: string };
  variant?: 'timeline' | 'cards' | 'compact';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ChangelogSection({
  title = 'Changelog',
  subtitle = 'New components, improvements and fixes, shipped every week.',
  releases = [
    { version: 'v0.5.1', date: '2026-11-04', title: 'Official MCP Server & 1-Click AI Integrations', changes: [
      { type: 'new', text: 'Official remote SSE MCP server (mcp.reactcomponents.dev) and local stdio mode.' },
      { type: 'new', text: '1-click CLI installer (`npx react-component-kit-ui mcp install <client>`) for Cursor, Claude, Codex, Lovable and universal MCP.' },
      { type: 'new', text: 'Dedicated /mcp interactive landing page with client tabs and tools catalog.' },
      { type: 'new', text: '8 built-in AI tools with real-time discovery of 340+ components, templates, and design tokens.' },
    ] },
    { version: 'v0.4.1', date: '2026-11-04', title: 'Multi-page templates & e-commerce suite', changes: [
      { type: 'new', text: 'Three complete production templates: Nova Store, Forma Studio & The Lobby.' },
      { type: 'new', text: '17 e-commerce components with persistent cart, filters and checkout.' },
      { type: 'new', text: 'Light theme tokens with adaptive ink-rgb contrast and theme toggle.' },
    ] },
    { version: 'v0.4.0', date: '2026-11-03', title: 'SVG charts & 24 new sections', changes: [
      { type: 'new', text: '40 zero-dependency SVG charts with tooltips and table fallbacks.' },
      { type: 'new', text: 'Waitlist, terminal and dashboard hero sections.' },
      { type: 'improved', text: 'Chart color tokens validated for color-vision deficiency.' },
    ] },
    { version: 'v0.3.1', date: '2026-10-27', title: 'Localized SEO', changes: [
      { type: 'improved', text: 'Meta titles and descriptions in English, Spanish and Russian.' },
      { type: 'fixed', text: 'Code blocks no longer appear in search snippets.' },
    ] },
    { version: 'v0.3.0', date: '2026-10-12', title: 'Notes & categories', changes: [
      { type: 'new', text: 'Browse-by-category section on the home page.' },
      { type: 'fixed', text: 'Category titles resolve correctly in every locale.' },
    ] },
  ],
  subscribe = { label: 'Subscribe via RSS', href: '#' },
  variant = 'timeline',
  size = 'md',
  className = '',
}: ChangelogSectionProps) {
  const id = `cls-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const typeLabel = { new: 'New', improved: 'Improved', fixed: 'Fixed' };
  const typeIcon = {
    new: '<path d="M12 5v14M5 12h14"/>',
    improved: '<path d="M12 19V5M5 12l7-7 7 7"/>',
    fixed: '<path d="M20 6 9 17l-5-5"/>',
  };
  const fmtDate = (d: string) => new Date(`${d}T00:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
  return (
    <>
      <div className="cq-changelog-section-cq" data-rk-01cab4="">
      <section className={`cls cls--${variant} cls--${size} ${className}`} aria-labelledby={id} data-rk-01cab4="">
        <div className="cls__inner" data-rk-01cab4="">
          <header className="cls__head" data-rk-01cab4="">
            <div data-rk-01cab4="">
              <h2 id={id} className="cls__title" data-rk-01cab4="">{title}</h2>
              <p className="cls__subtitle" data-rk-01cab4="">{subtitle}</p>
            </div>
            {subscribe && (
              <a className="cls__subscribe" href={subscribe.href} data-rk-01cab4="">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" data-rk-01cab4=""><path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16" data-rk-01cab4="" /><circle cx="5" cy="19" r="1" fill="currentColor" data-rk-01cab4="" /></svg>
                {subscribe.label}
              </a>
            )}
          </header>
          <ol className="cls__list" data-rk-01cab4="">
            {releases.map((r, __i: number) => (
              <li key={__i} className="cls__release" data-rk-01cab4="">
                <div className="cls__when" data-rk-01cab4="">
                  <span className="cls__version" data-rk-01cab4="">{r.version}</span>
                  <time dateTime={r.date} data-rk-01cab4="">{fmtDate(r.date)}</time>
                </div>
                <article className="cls__body" data-rk-01cab4="">
                  <h3 className="cls__release-title" data-rk-01cab4="">{r.title}</h3>
                  <ul className="cls__changes" data-rk-01cab4="">
                    {r.changes.map((c, __i: number) => (
                      <li key={__i} data-rk-01cab4="">
                        <span className={`cls__type cls__type--${c.type}`} data-rk-01cab4="">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: typeIcon[c.type] }} data-rk-01cab4=""></svg>
                          {typeLabel[c.type]}
                        </span>
                        <span data-rk-01cab4="">{c.text}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>
      </div>
    </>
  );
}

export default ChangelogSection;
