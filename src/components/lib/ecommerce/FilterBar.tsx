'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { formatMoney } from './cart-store';
import { applyCatalogFilter, syncCatalogUrl } from './catalog-filter';
import './FilterBar.css';

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
 * FilterBar — Horizontal catalogue toolbar: category chips, a "Refine" panel (price, colour,
 * availability), sort select and a live count. Filters any grid of product cards instantly.
 *
 * @param {string} target - id of the product grid. Default 'product-grid'.
 * @param {Array<{id: string, name: string, count?: number}>} categories - Category chips.
 * @param {string[]} selected - Pre-selected category ids (also read from `?category=`).
 * @param {number} maxPrice - Upper bound of the price slider. Default 400.
 * @param {Array<{name: string, hex: string}>} colors - Colour options.
 * @param {number} total - Initial product count. Default 0.
 * @param {string} allLabel - Label of the "all" chip. Default 'All'.
 * @param {string} countLabel - Text after the count. Default 'products'.
 * @param {string} currency - ISO currency. Default 'EUR'.
 * @param {string} locale - Number format locale. Default 'en-GB'.
 * @param {boolean} sticky - Stick under the header while scrolling. Default true.
 * @param {string} variant - Style (line|filled). Default 'line'.
 * @param {string} id - Base id. Default 'filter-bar'.
 * @param {string} className - Extra class.
 *
 * Accessibility: chips are toggle buttons (aria-pressed); "Refine" is a disclosure that closes
 * with Escape; the count is a polite live region; all controls are native inputs.
 */
export interface FilterBarProps {
  target?: string;
  categories?: Array<{ id: string; name: string; count?: number }>;
  selected?: string[];
  maxPrice?: number;
  colors?: Array<{ name: string; hex: string }>;
  total?: number;
  allLabel?: string;
  countLabel?: string;
  currency?: string;
  locale?: string;
  sticky?: boolean;
  variant?: 'line' | 'filled';
  id?: string;
  className?: string;
}

export function FilterBar({
  target = 'product-grid',
  categories = [
    { id: 'clothing', name: 'Clothing', count: 5 },
    { id: 'shoes', name: 'Shoes', count: 2 },
    { id: 'bags', name: 'Bags', count: 2 },
    { id: 'objects', name: 'Objects', count: 3 },
  ],
  selected = [],
  maxPrice = 400,
  colors = [
    { name: 'Oat', hex: '#d9cbb3' },
    { name: 'Ink', hex: '#22252b' },
    { name: 'Rust', hex: '#9c3d1c' },
    { name: 'Sage', hex: '#8a9a7b' },
  ],
  total = 0,
  allLabel = 'All',
  countLabel = 'products',
  currency = 'EUR',
  locale = 'en-GB',
  sticky = true,
  variant = 'line',
  id = 'filter-bar',
  className = '',
}: FilterBarProps) {
  const money = { currency, locale };

  // Ported from the Astro <script>: runs once after mount (DOM logic kept as in the Astro kit).
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLElement>('[data-filter-bar]:not([data-bound])').forEach((bar) => {
        bar.dataset.bound = '';
        const grid = document.getElementById(bar.dataset.target || '');
        if (!grid) return;
        const target: HTMLElement = grid;
        const chips = Array.from(bar.querySelectorAll<HTMLButtonElement>('[data-chip]'));
        const panel = bar.querySelector<HTMLFormElement>('[data-panel]')!;
        const refine = bar.querySelector<HTMLButtonElement>('[data-refine]')!;
        const sort = bar.querySelector<HTMLSelectElement>('[data-sort]')!;
        const active = bar.querySelector<HTMLElement>('[data-active]')!;
        const priceOut = bar.querySelector<HTMLOutputElement>('[data-price-out]');
        const priceInput = panel.elements.namedItem('max') as HTMLInputElement;
        const money = { currency: bar.dataset.currency, locale: bar.dataset.locale };
    
        const params = new URLSearchParams(window.location.search);
        let categories = (params.get('category') || '').split(',').filter(Boolean);
        if (!categories.length) categories = chips.filter((c) => c.dataset.chip && c.getAttribute('aria-pressed') === 'true').map((c) => c.dataset.chip!);
        if (params.get('sort')) sort.value = params.get('sort')!;
    
        function run() {
          const data = new FormData(panel);
          const max = Number(data.get('max'));
          const colors = data.getAll('color') as string[];
          const inStockOnly = data.get('stock') === 'in';
          chips.forEach((c) => {
            const id = c.dataset.chip;
            c.setAttribute('aria-pressed', String(id ? categories.includes(id) : categories.length === 0));
          });
          applyCatalogFilter(target, { categories, colors, maxPrice: max, minRating: 0, inStockOnly, sort: sort.value });
          syncCatalogUrl({ categories, sort: sort.value });
          if (priceOut) priceOut.textContent = formatMoney(max, money);
          const n = colors.length + (inStockOnly ? 1 : 0) + (max < Number(priceInput.max) ? 1 : 0);
          active.hidden = n === 0;
          active.textContent = String(n);
        }
    
        chips.forEach((chip) => chip.addEventListener('click', () => {
          const id = chip.dataset.chip;
          if (!id) categories = [];
          else categories = categories.includes(id) ? categories.filter((c) => c !== id) : [...categories, id];
          run();
        }));
        const setOpen = (open: boolean) => {
          panel.hidden = !open;
          refine.setAttribute('aria-expanded', String(open));
        };
        refine.addEventListener('click', () => setOpen(panel.hidden));
        bar.querySelector('[data-close]')?.addEventListener('click', () => { setOpen(false); refine.focus(); });
        bar.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !panel.hidden) { setOpen(false); refine.focus(); } });
        panel.addEventListener('input', run);
        panel.addEventListener('reset', () => window.setTimeout(run, 0));
        sort.addEventListener('change', run);
        run();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={cx(['fbar', `fbar--${variant}`, { 'fbar--sticky': sticky }, className])} data-filter-bar data-target={target} data-currency={currency} data-locale={locale} data-rk-aeb6ec="">
        <div className="fbar__row" data-rk-aeb6ec="">
          <div className="fbar__chips" role="group" aria-label="Categories" data-rk-aeb6ec="">
            <button type="button" className="fbar__chip" data-chip="" aria-pressed={selected.length === 0 ? 'true' : 'false'} data-rk-aeb6ec="">{allLabel}</button>
            {categories.map((c, __i: number) => (
              <button key={__i} type="button" className="fbar__chip" data-chip={c.id} aria-pressed={selected.includes(c.id) ? 'true' : 'false'} data-rk-aeb6ec="">
                {c.name}{c.count !== undefined && <sup data-rk-aeb6ec="">{c.count}</sup>}
              </button>
            ))}
          </div>
      
          <div className="fbar__tools" data-rk-aeb6ec="">
            <p className="fbar__count" aria-live="polite" data-rk-aeb6ec=""><span data-result-count={target} data-rk-aeb6ec="">{total}</span> {countLabel}</p>
            <button type="button" className="fbar__refine" aria-expanded="false" aria-controls={`${id}-panel`} data-refine data-rk-aeb6ec="">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" data-rk-aeb6ec=""><path d="M4 7h10M18 7h2M4 17h4M12 17h8" data-rk-aeb6ec="" /><circle cx="16" cy="7" r="2" data-rk-aeb6ec="" /><circle cx="10" cy="17" r="2" data-rk-aeb6ec="" /></svg>
              Refine <span className="fbar__badge" data-active hidden data-rk-aeb6ec=""></span>
            </button>
            <label className="fbar__sort" data-rk-aeb6ec="">
              <span className="sr-only" data-rk-aeb6ec="">Sort by</span>
              <select data-sort data-rk-aeb6ec="">
                <option value="featured" data-rk-aeb6ec="">Featured</option>
                <option value="price-asc" data-rk-aeb6ec="">Price, low to high</option>
                <option value="price-desc" data-rk-aeb6ec="">Price, high to low</option>
                <option value="name" data-rk-aeb6ec="">Alphabetical</option>
              </select>
            </label>
          </div>
        </div>
      
        <form className="fbar__panel" id={`${id}-panel`} hidden data-panel aria-label="Refine products" data-rk-aeb6ec="">
          <fieldset data-rk-aeb6ec="">
            <legend data-rk-aeb6ec="">Price</legend>
            <label className="fbar__range" data-rk-aeb6ec="">
              <span data-rk-aeb6ec="">Up to <output data-price-out data-rk-aeb6ec="">{formatMoney(maxPrice, money)}</output></span>
              <input type="range" name="max" min="0" max={maxPrice} step="5" defaultValue={maxPrice} aria-label="Maximum price" data-rk-aeb6ec="" />
            </label>
          </fieldset>
          {colors.length > 0 && (
            <fieldset data-rk-aeb6ec="">
              <legend data-rk-aeb6ec="">Colour</legend>
              <div className="fbar__colors" data-rk-aeb6ec="">
                {colors.map((c, __i: number) => (
                  <label key={__i} className="fbar__color" style={st(`--sw: ${c.hex}`)} data-rk-aeb6ec="">
                    <input type="checkbox" name="color" defaultValue={c.name.toLowerCase()} data-rk-aeb6ec="" />
                    <span aria-hidden="true" data-rk-aeb6ec=""></span>{c.name}
                  </label>
                ))}
              </div>
            </fieldset>
          )}
          <fieldset data-rk-aeb6ec="">
            <legend data-rk-aeb6ec="">Availability</legend>
            <label className="fbar__check" data-rk-aeb6ec=""><input type="checkbox" name="stock" defaultValue="in" data-rk-aeb6ec="" /> <span data-rk-aeb6ec="">In stock only</span></label>
          </fieldset>
          <div className="fbar__panel-actions" data-rk-aeb6ec="">
            <button type="reset" className="fbar__link" data-rk-aeb6ec="">Clear filters</button>
            <button type="button" className="fbar__done" data-close data-rk-aeb6ec="">Show results</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default FilterBar;
