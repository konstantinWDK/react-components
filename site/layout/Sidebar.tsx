'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { Locale } from '../config/site';
import { getLocalizedPath } from '../i18n/translations';
import type { SidebarData, SidebarGroup } from './sidebar-data';
import '../styles/sidebar.css';

const ICONS = {
  install: '<path d="M12 3v12M7 10l5 5 5-5"/><path d="M5 21h14"/>',
  mcp: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>',
  templates: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
  store: '<path d="M6 7h12l-1 13H7z"/><path d="M9 7V6a3 3 0 0 1 6 0v1"/>',
};
const SCROLL_KEY = 'sidebar-scroll-pos';

const Icon = ({ d }: { d: string }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: d }} />
);

/**
 * Docs navigation: search → Get started → Components → Sections → Templates.
 * Only the group containing the current page starts open. `path` is the locale-free route.
 */
export function Sidebar({ lang, path, data }: { lang: Locale; path: string; data: SidebarData }) {
  const L = data.labels;
  const current = path.replace(/\/$/, '') || '/';
  const allGroups = useMemo(() => [...data.componentGroups, ...data.sectionGroups], [data]);
  // On the installation page (entry point of "Components") the first group starts open,
  // elsewhere only the group that contains the current page.
  const initiallyOpen = useMemo(
    () =>
      Object.fromEntries(
        allGroups.map((g, i) => [g.id, g.items.some((it) => it.raw === current) || (current.startsWith('/install') && i === 0)]),
      ),
    [allGroups, current],
  );
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(initiallyOpen);
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const asideRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const q = query.toLowerCase().trim();
  const matches = (name: string) => !q || name.toLowerCase().includes(q);

  const getStarted = [
    { label: L['nav.install'], raw: '/install', icon: ICONS.install, active: current.startsWith('/install'), isNew: false },
    { label: L['nav.mcp'], raw: '/mcp', icon: ICONS.mcp, active: current.startsWith('/mcp'), isNew: true },
    { label: L['nav.templates'], raw: '/templates', icon: ICONS.templates, active: current === '/templates', isNew: true },
  ];
  const componentTotal = data.componentGroups.reduce((n, g) => n + g.items.length, 0);
  const sectionTotal = data.sectionGroups.reduce((n, g) => n + g.items.length, 0);
  const searchLabel = L['sidebar.search'].replace('{n}', String(componentTotal + sectionTotal));

  const resultCount = q
    ? getStarted.filter((i) => matches(i.label)).length +
      allGroups.reduce((n, g) => n + g.items.filter((i) => matches(i.name)).length, 0) +
      data.templates.filter((tpl) => matches(`${tpl.name} ${tpl.slug} template`)).length
    : 0;

  // Keep scroll position between page loads; otherwise bring the current page into view.
  useEffect(() => {
    const el = asideRef.current;
    if (!el) return;
    let saved: string | null = null;
    try { saved = sessionStorage.getItem(SCROLL_KEY); } catch { /* ignore */ }
    if (saved !== null) requestAnimationFrame(() => (el.scrollTop = parseInt(saved!, 10)));
    else setTimeout(() => el.querySelector('[aria-current="page"]')?.scrollIntoView({ block: 'center' }), 150);
    let timer: number;
    const onScroll = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => { try { sessionStorage.setItem(SCROLL_KEY, String(el.scrollTop)); } catch { /* ignore */ } }, 60);
    };
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  // "/" focuses the search; Escape closes the mobile drawer.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const a = document.activeElement as HTMLElement | null;
      if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(a?.tagName ?? '') && !a?.isContentEditable) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
  }, [mobileOpen]);

  const closeOnMobile = () => window.innerWidth <= 768 && setMobileOpen(false);

  const renderGroup = (g: SidebarGroup) => {
    const items = g.items.filter((i) => matches(i.name));
    if (q && items.length === 0) return null;
    const open = q ? true : openGroups[g.id];
    return (
      <div key={g.id} className={`sidebar__group ${open ? 'is-expanded' : ''}`}>
        <button type="button" className="sidebar__group-header" aria-expanded={open} aria-controls={`sbg-${g.id}`} onClick={() => setOpenGroups({ ...openGroups, [g.id]: !openGroups[g.id] })}>
          <span className="sidebar__group-icon" aria-hidden="true" dangerouslySetInnerHTML={{ __html: g.icon }} />
          <span className="sidebar__group-name">{g.name}</span>
          {g.isNew && <span className="sb-new">{L['sidebar.new']}</span>}
          <span className="sidebar__group-count">{g.items.length}</span>
          <svg className="sidebar__group-chevron" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>
        </button>
        <div className="sidebar__group-content" id={`sbg-${g.id}`}>
          <div className="sidebar__group-content-inner">
            <ul className="sidebar__list">
              {items.map((item) => {
                const active = item.raw === current;
                return (
                  <li key={item.raw} className="sidebar__item">
                    <a href={getLocalizedPath(item.raw, lang)} className={`sidebar__link ${active ? 'sidebar__link--active' : ''}`} aria-current={active ? 'page' : undefined} tabIndex={open ? undefined : -1} onClick={closeOnMobile}>
                      {item.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const blocks = [
    { key: 'components', label: L['nav.components'], total: componentTotal, groups: data.componentGroups, all: null },
    { key: 'sections', label: L['nav.sections'], total: sectionTotal, groups: data.sectionGroups, all: '/sections' },
  ];
  const quick = getStarted.filter((i) => matches(i.label));
  const tpls = data.templates.filter((tpl) => matches(`${tpl.name} ${tpl.slug} template`));

  return (
    <>
      <aside ref={asideRef} className={`sidebar ${mobileOpen ? 'is-open' : ''}`} id="sidebar" aria-label={L['sidebar.navLabel']}>
        <div className="sidebar__search" role="search">
          <svg className="sidebar__search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
          <input
            ref={inputRef}
            type="search"
            placeholder={searchLabel}
            aria-label={searchLabel}
            aria-describedby="sidebar-search-status"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setQuery('');
              if (e.key === 'Enter' && q) asideRef.current?.querySelector<HTMLAnchorElement>('.sidebar__item a')?.click();
            }}
          />
          <kbd className="sidebar__kbd" aria-hidden="true">/</kbd>
          <button type="button" className="sidebar__clear" aria-label={L['sidebar.clear']} hidden={!q} onClick={() => { setQuery(''); inputRef.current?.focus(); }}>×</button>
        </div>
        <p className="sidebar__status" id="sidebar-search-status" aria-live="polite">{q ? L['sidebar.results'].replace('{n}', String(resultCount)) : ''}</p>

        <nav className="sidebar__nav" aria-label={L['sidebar.navLabel']}>
          {quick.length > 0 && (
            <section className="sb-section">
              <h2 className="sb-label">{L['sidebar.getStarted']}</h2>
              <ul className="sb-quick">
                {quick.map((item) => (
                  <li key={item.raw} className="sidebar__item">
                    <a href={getLocalizedPath(item.raw, lang)} className={`sb-quick__link ${item.active ? 'is-active' : ''}`} aria-current={item.active ? 'page' : undefined} onClick={closeOnMobile}>
                      <span className="sb-quick__icon" aria-hidden="true"><Icon d={item.icon} /></span>
                      <span className="sb-quick__text">{item.label}</span>
                      {item.isNew && <span className="sb-new">{L['sidebar.new']}</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {blocks.map((block) => {
            const rendered = block.groups.map(renderGroup).filter(Boolean);
            if (block.groups.length === 0 && !block.all) return null;
            if (q && rendered.length === 0) return null;
            return (
              <section key={block.key} className="sb-section">
                <h2 className="sb-label">
                  <span>{block.label}</span>
                  <span className="sb-label__count">{block.total}</span>
                  {block.all && <a className="sb-label__link" href={getLocalizedPath(block.all, lang)}>{L['sidebar.viewAll']}</a>}
                </h2>
                {rendered}
              </section>
            );
          })}

          {tpls.length > 0 && (
            <section className="sb-section">
              <h2 className="sb-label">
                <span>{L['nav.templates']}</span>
                <span className="sb-label__count">{data.templates.length}</span>
              </h2>
              <ul className="sb-quick">
                {tpls.map((tpl) => {
                  const raw = `/templates/${tpl.slug}`;
                  const active = current === raw;
                  return (
                    <li key={tpl.slug} className="sidebar__item">
                      <a href={getLocalizedPath(raw, lang)} className={`sb-quick__link sb-quick__link--tpl ${active ? 'is-active' : ''}`} aria-current={active ? 'page' : undefined}>
                        <span className="sb-quick__icon sb-quick__icon--tpl" aria-hidden="true"><Icon d={ICONS.store} /></span>
                        <span className="sb-quick__text">{tpl.name}<small>{tpl.pages} {L['sidebar.pages']}</small></span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {q && resultCount === 0 && <p className="sidebar__empty">{L['sidebar.noResultsFor']} “{query.trim()}”</p>}
        </nav>
      </aside>

      <div className="mobile-filter-trigger">
        <button id="mobile-filter-btn" type="button" aria-label={L['sidebar.exploreLabel']} aria-controls="sidebar" aria-expanded={mobileOpen} onClick={() => setMobileOpen(true)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
          <span>{L['sidebar.explore']}</span>
        </button>
      </div>
      <div className={`mobile-filter-backdrop ${mobileOpen ? 'is-open' : ''}`} onClick={() => setMobileOpen(false)} />
    </>
  );
}
