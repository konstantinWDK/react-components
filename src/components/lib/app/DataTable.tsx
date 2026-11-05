'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { initials, hueFrom } from './app-icons';
import './DataTable.css';

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

type CellType = 'text' | 'person' | 'status' | 'money' | 'date' | 'number' | 'tags';

interface Column { key: string; label: string; type?: CellType; align?: 'left' | 'right'; sortable?: boolean }

/**
 * DataTable — Client-side data table for SaaS apps: search, status filter chips, sortable
 * columns, row selection with a bulk-action bar, pagination and typed cells
 * (text, person, status, money, date, number, tags).
 *
 * @param {string} title - Card title (optional).
 * @param {Array<{key: string, label: string, type?: 'text'|'person'|'status'|'money'|'date'|'number'|'tags', align?: 'left'|'right', sortable?: boolean}>} columns - Column definitions.
 * @param {Array<Record<string, any>>} rows - Row data; `person` cells take `{ name, sub? }`, `status` cells take a string.
 * @param {Record<string, 'success'|'warning'|'danger'|'info'|'default'>} statusTones - Status → tone map.
 * @param {string} filterKey - Column used for the filter chips (optional).
 * @param {boolean} selectable - Show row checkboxes and the bulk bar. Default true.
 * @param {string[]} bulkActions - Bulk bar buttons. Default ['Export', 'Send email'].
 * @param {number} pageSize - Rows per page. Default 8.
 * @param {string} searchPlaceholder - Search placeholder. Default 'Search…'.
 * @param {string} currency - ISO currency for money cells. Default 'EUR'.
 * @param {string} locale - Number/date locale. Default 'en-GB'.
 * @param {string} emptyText - Shown when nothing matches. Default 'No results match your filters.'
 * @param {string} id - Table id (unique per page). Default 'data-table'.
 * @param {string} variant - Style (card|plain). Default 'card'.
 * @param {string} density - Row height (compact|comfortable). Default 'comfortable'.
 * @param {string} className - Extra class.
 *
 * Accessibility: real <table> with a caption; sortable headers are buttons inside <th> with
 * aria-sort; checkboxes have row labels; result counts and page changes are announced politely.
 */
export interface DataTableProps {
  title?: string;
  columns?: Column[];
  rows?: Array<Record<string, any>>;
  statusTones?: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'default'>;
  filterKey?: string;
  selectable?: boolean;
  bulkActions?: string[];
  pageSize?: number;
  searchPlaceholder?: string;
  currency?: string;
  locale?: string;
  emptyText?: string;
  id?: string;
  variant?: 'card' | 'plain';
  density?: 'compact' | 'comfortable';
  className?: string;
}

export function DataTable({
  title = 'Reservations',
  columns = [
    { key: 'ref', label: 'Booking', sortable: true },
    { key: 'guest', label: 'Guest', type: 'person', sortable: true },
    { key: 'room', label: 'Room', sortable: true },
    { key: 'checkIn', label: 'Check-in', type: 'date', sortable: true },
    { key: 'nights', label: 'Nights', type: 'number', align: 'right', sortable: true },
    { key: 'status', label: 'Status', type: 'status' },
    { key: 'total', label: 'Total', type: 'money', align: 'right', sortable: true },
  ],
  rows = [
    { ref: 'MR-2841', guest: { name: 'Elena Duarte', sub: 'Booking.com' }, room: '204 · Deluxe', checkIn: '2026-11-04', nights: 3, status: 'Confirmed', total: 612 },
    { ref: 'MR-2840', guest: { name: 'James Whitfield', sub: 'Direct' }, room: '310 · Suite', checkIn: '2026-11-04', nights: 2, status: 'Checked in', total: 890 },
    { ref: 'MR-2839', guest: { name: 'Aiko Tanaka', sub: 'Expedia' }, room: '108 · Standard', checkIn: '2026-11-05', nights: 4, status: 'Pending', total: 476 },
    { ref: 'MR-2838', guest: { name: 'Marco Bellini', sub: 'Direct' }, room: '212 · Deluxe', checkIn: '2026-11-06', nights: 1, status: 'Cancelled', total: 0 },
  ],
  statusTones = { Confirmed: 'info', 'Checked in': 'success', 'Checked out': 'default', Pending: 'warning', Cancelled: 'danger', 'No show': 'danger' },
  filterKey = 'status',
  selectable = true,
  bulkActions = ['Export', 'Send email'],
  pageSize = 8,
  searchPlaceholder = 'Search…',
  currency = 'EUR',
  locale = 'en-GB',
  emptyText = 'No results match your filters.',
  id = 'data-table',
  variant = 'card',
  density = 'comfortable',
  className = '',
}: DataTableProps) {
  const money = (n: number) => new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(n);
  const date = (v: string) => new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(new Date(`${v}T00:00:00Z`));
  const filters = filterKey ? Array.from(new Set(rows.map((r) => String(r[filterKey])))) : [];
  const searchText = (r: Record<string, any>) =>
    columns.map((c) => (c.type === 'person' ? `${r[c.key]?.name ?? ''} ${r[c.key]?.sub ?? ''}` : Array.isArray(r[c.key]) ? r[c.key].join(' ') : r[c.key] ?? '')).join(' ').toLowerCase();
  const sortValue = (c: Column, v: any) => (c.type === 'person' ? v?.name ?? '' : v ?? '');

  // Ported from the Astro <script>: runs once after mount (DOM logic kept as in the Astro kit).
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLElement>('[data-table]:not([data-bound])').forEach((root) => {
        root.dataset.bound = '';
        const body = root.querySelector<HTMLTableSectionElement>('[data-body]')!;
        const rows = Array.from(body.querySelectorAll<HTMLTableRowElement>('[data-row]'));
        const size = Number(root.dataset.pageSize) || 8;
        const search = root.querySelector<HTMLInputElement>('[data-search]');
        const chips = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-filter]'));
        const sorters = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-sort]'));
        const all = root.querySelector<HTMLInputElement>('[data-all]');
        const bulk = root.querySelector<HTMLElement>('[data-bulk]');
        const pagesEl = root.querySelector<HTMLElement>('[data-pages]')!;
        let query = '';
        let filter = '';
        let sortKey = '';
        let sortDir = 1;
        let page = 0;
    
        function visibleRows() {
          return rows.filter((r) => (!query || (r.dataset.search || '').includes(query)) && (!filter || r.dataset.filterValue === filter));
        }
    
        function render() {
          let list = visibleRows();
          if (sortKey) {
            const type = sorters.find((s) => s.dataset.sort === sortKey)?.dataset.type;
            const attr = `v${sortKey.toLowerCase().replace(/^./, (c) => c.toUpperCase())}`;
            list = [...list].sort((a, b) => {
              const A = a.dataset[attr] ?? '', B = b.dataset[attr] ?? '';
              const cmp = type === 'money' || type === 'number' ? Number(A) - Number(B) : A.localeCompare(B);
              return cmp * sortDir;
            });
          } else {
            list = [...list].sort((a, b) => Number(a.dataset.index) - Number(b.dataset.index));
          }
          const pages = Math.max(1, Math.ceil(list.length / size));
          page = Math.min(page, pages - 1);
          const shown = list.slice(page * size, page * size + size);
          rows.forEach((r) => { r.hidden = true; });
          body.append(...list);
          shown.forEach((r) => { r.hidden = false; });
          root.querySelector('[data-count]')!.textContent = String(list.length);
          root.querySelector<HTMLElement>('[data-empty]')!.hidden = list.length > 0;
          root.querySelector('[data-range]')!.textContent = list.length ? `${page * size + 1}–${page * size + shown.length} of ${list.length}` : '';
          pagesEl.replaceChildren(...Array.from({ length: pages }, (_, i) => {
            const b = document.createElement('button');
            b.type = 'button';
            b.className = 'dt__page';
            b.textContent = String(i + 1);
            b.setAttribute('aria-label', `Page ${i + 1}`);
            if (i === page) b.setAttribute('aria-current', 'page');
            b.addEventListener('click', () => { page = i; render(); });
            return b;
          }));
          root.querySelector<HTMLButtonElement>('[data-prev]')!.disabled = page === 0;
          root.querySelector<HTMLButtonElement>('[data-next]')!.disabled = page >= pages - 1;
          syncSelection();
        }
    
        function syncSelection() {
          const boxes = rows.map((r) => r.querySelector<HTMLInputElement>('[data-select]')).filter(Boolean) as HTMLInputElement[];
          const selected = boxes.filter((b) => b.checked);
          rows.forEach((r) => r.classList.toggle('is-selected', Boolean(r.querySelector<HTMLInputElement>('[data-select]')?.checked)));
          if (bulk) {
            bulk.hidden = selected.length === 0;
            bulk.querySelector('[data-selected]')!.textContent = String(selected.length);
          }
          if (all) {
            const pageBoxes = rows.filter((r) => !r.hidden).map((r) => r.querySelector<HTMLInputElement>('[data-select]')!).filter(Boolean);
            all.checked = pageBoxes.length > 0 && pageBoxes.every((b) => b.checked);
            all.indeterminate = !all.checked && pageBoxes.some((b) => b.checked);
          }
        }
    
        search?.addEventListener('input', () => { query = search.value.trim().toLowerCase(); page = 0; render(); });
        chips.forEach((c) => c.addEventListener('click', () => {
          filter = c.dataset.filter || '';
          chips.forEach((x) => x.setAttribute('aria-pressed', String(x === c)));
          page = 0;
          render();
        }));
        sorters.forEach((s) => s.addEventListener('click', () => {
          if (sortKey === s.dataset.sort) sortDir = sortDir === 1 ? -1 : sortDir === -1 ? 0 : 1;
          else { sortKey = s.dataset.sort || ''; sortDir = 1; }
          if (sortDir === 0) sortKey = '';
          sorters.forEach((x) => x.closest('th')?.setAttribute('aria-sort', x === s && sortKey ? (sortDir === 1 ? 'ascending' : 'descending') : 'none'));
          render();
        }));
        root.querySelector('[data-prev]')?.addEventListener('click', () => { page = Math.max(0, page - 1); render(); });
        root.querySelector('[data-next]')?.addEventListener('click', () => { page += 1; render(); });
        root.addEventListener('change', (e) => { if ((e.target as HTMLElement).matches('[data-select]')) syncSelection(); });
        all?.addEventListener('change', () => {
          rows.filter((r) => !r.hidden).forEach((r) => { const b = r.querySelector<HTMLInputElement>('[data-select]'); if (b) b.checked = all.checked; });
          syncSelection();
        });
        root.querySelector('[data-clear]')?.addEventListener('click', () => {
          rows.forEach((r) => { const b = r.querySelector<HTMLInputElement>('[data-select]'); if (b) b.checked = false; });
          syncSelection();
        });
        render();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className={cx(['dt', `dt--${variant}`, `dt--${density}`, className])} data-table={id} data-page-size={pageSize} aria-labelledby={`${id}-title`} data-rk-bf3c5c="">
        <div className="dt__toolbar" data-rk-bf3c5c="">
          <h2 className="dt__title" id={`${id}-title`} data-rk-bf3c5c="">{title} <span className="dt__count" aria-live="polite" data-rk-bf3c5c=""><span data-count data-rk-bf3c5c="">{rows.length}</span></span></h2>
          <div className="dt__tools" data-rk-bf3c5c="">
            <label className="dt__search" data-rk-bf3c5c="">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" data-rk-bf3c5c=""><circle cx="11" cy="11" r="7" data-rk-bf3c5c="" /><path d="m20 20-3.5-3.5" data-rk-bf3c5c="" /></svg>
              <span className="sr-only" data-rk-bf3c5c="">{searchPlaceholder}</span>
              <input type="search" placeholder={searchPlaceholder} data-search data-rk-bf3c5c="" />
            </label>
          </div>
        </div>
        {filters.length > 1 && (
          <div className="dt__chips" role="group" aria-label="Filter by status" data-rk-bf3c5c="">
            <button type="button" className="dt__chip" aria-pressed="true" data-filter="" data-rk-bf3c5c="">All <span data-rk-bf3c5c="">{rows.length}</span></button>
            {filters.map((f, __i: number) => (
              <button key={__i} type="button" className="dt__chip" aria-pressed="false" data-filter={f} data-rk-bf3c5c="">{f} <span data-rk-bf3c5c="">{rows.filter((r) => String(r[filterKey]) === f).length}</span></button>
            ))}
          </div>
        )}
      
        {selectable && (
          <div className="dt__bulk" hidden data-bulk data-rk-bf3c5c="">
            <span data-rk-bf3c5c=""><strong data-selected data-rk-bf3c5c="">0</strong> selected</span>
            {bulkActions.map((a, __i: number) => <button key={__i} type="button" className="dt__bulk-btn" data-rk-bf3c5c="">{a}</button>)}
            <button type="button" className="dt__bulk-clear" data-clear data-rk-bf3c5c="">Clear</button>
          </div>
        )}
      
        <div className="dt__scroll" tabIndex={0} role="region" aria-labelledby={`${id}-title`} data-rk-bf3c5c="">
          <table className="dt__table" data-rk-bf3c5c="">
            <caption className="sr-only" data-rk-bf3c5c="">{title}</caption>
            <thead data-rk-bf3c5c="">
              <tr data-rk-bf3c5c="">
                {selectable && <th className="dt__check" scope="col" data-rk-bf3c5c=""><input type="checkbox" aria-label="Select all rows on this page" data-all data-rk-bf3c5c="" /></th>}
                {columns.map((c, __i: number) => (
                  <th key={__i} scope="col" className={cx([{ 'dt__right': c.align === 'right' }])} aria-sort={c.sortable ? 'none' : undefined} data-rk-bf3c5c="">
                    {c.sortable ? (
                      <button type="button" className="dt__sort" data-sort={c.key} data-type={c.type ?? 'text'} data-rk-bf3c5c="">
                        {c.label}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-rk-bf3c5c=""><path d="m7 15 5 5 5-5M7 9l5-5 5 5" data-rk-bf3c5c="" /></svg>
                      </button>
                    ) : c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody data-body data-rk-bf3c5c="">
              {rows.map((r, i) => (
                <tr key={i} data-row data-search={searchText(r)} data-filter-value={filterKey ? String(r[filterKey]) : ''} data-index={i} {...Object.fromEntries(columns.map((c) => [`data-v-${c.key.toLowerCase()}`, String(sortValue(c, r[c.key]))]))} data-rk-bf3c5c="">
                  {selectable && <td className="dt__check" data-rk-bf3c5c=""><input type="checkbox" aria-label={`Select ${columns[0] ? sortValue(columns[0], r[columns[0].key]) : `row ${i + 1}`}`} data-select data-rk-bf3c5c="" /></td>}
                  {columns.map((c) => {
                    const v = r[c.key];
                    return (
                      <td className={cx([{ 'dt__right': c.align === 'right' }])} data-rk-bf3c5c="">
                        {c.type === 'person' ? (
                          <span className="dt__person" data-rk-bf3c5c="">
                            <span className="dt__avatar" style={st(`--h: ${hueFrom(v?.name ?? '')}`)} aria-hidden="true" data-rk-bf3c5c="">{initials(v?.name ?? '?')}</span>
                            <span data-rk-bf3c5c=""><strong data-rk-bf3c5c="">{v?.name}</strong>{v?.sub && <small data-rk-bf3c5c="">{v.sub}</small>}</span>
                          </span>
                        ) : c.type === 'status' ? (
                          <span className={cx(['dt__status', `dt__status--${statusTones[v] ?? 'default'}`])} data-rk-bf3c5c=""><i aria-hidden="true" data-rk-bf3c5c=""></i>{v}</span>
                        ) : c.type === 'money' ? money(Number(v) || 0)
                          : c.type === 'date' ? <time dateTime={v} data-rk-bf3c5c="">{date(v)}</time>
                          : c.type === 'tags' ? <span className="dt__tags" data-rk-bf3c5c="">{(v ?? []).map((tg: string, __i: number) => <span key={__i} data-rk-bf3c5c="">{tg}</span>)}</span>
                          : v}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="dt__empty" hidden data-empty data-rk-bf3c5c="">{emptyText}</p>
        </div>
      
        <div className="dt__foot" data-rk-bf3c5c="">
          <p className="dt__range" aria-live="polite" data-range data-rk-bf3c5c=""></p>
          <div className="dt__pager" data-rk-bf3c5c="">
            <button type="button" className="dt__page" aria-label="Previous page" data-prev data-rk-bf3c5c="">‹</button>
            <span className="dt__pages" data-pages data-rk-bf3c5c=""></span>
            <button type="button" className="dt__page" aria-label="Next page" data-next data-rk-bf3c5c="">›</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default DataTable;
