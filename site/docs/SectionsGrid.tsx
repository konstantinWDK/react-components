'use client';

import { useState } from 'react';

export interface SectionCardData {
  slug: string;
  name: string;
  description: string;
  category: string;
  categoryLabel: string;
  tags: string[];
  href: string | null; // null = not ported yet
}

/** Category filter tabs + section cards (same markup/classes as SectionsCatalogPage.astro). */
export function SectionsGrid({
  tabs,
  cards,
  labels,
}: {
  tabs: { id: string; name: string; count: number }[];
  cards: SectionCardData[];
  labels: { filter: string; view: string; soon: string; soonDesc: string };
}) {
  const [filter, setFilter] = useState('all');
  const visible = (c: SectionCardData) =>
    filter === 'all' || c.category === filter || c.tags.join(' ').toLowerCase().includes(filter) || c.slug.includes(filter);

  return (
    <>
      <div className="category-filters" role="tablist" aria-label={labels.filter}>
        {tabs.map((tab) => (
          <button key={tab.id} type="button" role="tab" aria-selected={filter === tab.id} className={`filter-tab ${filter === tab.id ? 'filter-tab--active' : ''}`} onClick={() => setFilter(tab.id)}>
            {tab.name}
            <span className="filter-count">{tab.count}</span>
          </button>
        ))}
      </div>

      <div className="sections-grid" id="sectionsGrid">
        {cards.map((s) => (
          <article key={s.slug} className={`section-card ${s.href ? '' : 'section-card--soon'}`} style={{ display: visible(s) ? 'flex' : 'none' }}>
            <div className="section-card__preview">
              <div className="section-card__fallback" aria-hidden="true">
                {s.name}
                {!s.href && <span className="section-card__soon">{labels.soon}</span>}
              </div>
            </div>
            <div className="section-card__content">
              <div className="section-card__meta">
                <span className="section-card__cat-badge">{s.categoryLabel}</span>
                <h3 className="section-card__name">
                  {s.href ? <a className="section-card__link" href={s.href}>{s.name}</a> : s.name}
                </h3>
              </div>
              <p className="section-card__desc">{s.description}</p>
              <div className="section-card__tags">
                {s.tags.slice(0, 3).map((tag) => <span key={tag} className="section-card__tag">{tag}</span>)}
              </div>
            </div>
            <div className="section-card__arrow" aria-hidden="true">
              {s.href ? (
                <>
                  <span>{labels.view}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </>
              ) : (
                <span>{labels.soonDesc}</span>
              )}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
