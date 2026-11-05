'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { formatMoney } from './cart-store';
import './FilterSidebar.css';

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
 * FilterSidebar — Catalog filters (category, max price, colour, rating, stock) that filter
 * and sort a ProductGrid instantly in the browser. Collapses behind a "Filters" button on mobile.
 *
 * @param {string} target - id of the ProductGrid to filter. Default 'product-grid'.
 * @param {string} id - Form id; ProductToolbar's sort select uses `${id}-sort`. Default 'catalog-filters'.
 * @param {Array<{id: string, name: string, count?: number}>} categories - Category checkboxes.
 * @param {string[]} selected - Pre-checked category ids (also read from `?category=` in the URL).
 * @param {number} maxPrice - Upper bound of the price slider. Default 300.
 * @param {Array<{name: string, hex: string}>} colors - Colour swatches.
 * @param {string} currency - ISO currency. Default 'USD'.
 * @param {string} locale - Number format locale. Default 'en-US'.
 * @param {string} variant - Style (glass|plain). Default 'glass'.
 * @param {string} size - Density (sm|md). Default 'md'.
 * @param {string} className - Extra class.
 *
 * Accessibility: native form controls in fieldsets with legends; result count is announced
 * by ProductToolbar's live region; the mobile toggle is a disclosure button.
 */
export interface FilterSidebarProps {
  target?: string;
  id?: string;
  categories?: Array<{ id: string; name: string; count?: number }>;
  selected?: string[];
  maxPrice?: number;
  colors?: Array<{ name: string; hex: string }>;
  currency?: string;
  locale?: string;
  variant?: 'glass' | 'plain';
  size?: 'sm' | 'md';
  className?: string;
}

export function FilterSidebar({
  target = 'product-grid',
  id = 'catalog-filters',
  categories = [
    { id: 'audio', name: 'Audio', count: 3 },
    { id: 'wearables', name: 'Wearables', count: 2 },
    { id: 'bags', name: 'Bags', count: 2 },
    { id: 'home', name: 'Home', count: 3 },
  ],
  selected = [],
  maxPrice = 300,
  colors = [
    { name: 'Graphite', hex: '#2b2b2f' },
    { name: 'Sand', hex: '#d8c3a5' },
    { name: 'Ocean', hex: '#3d6f9e' },
    { name: 'Moss', hex: '#5f7a4e' },
    { name: 'Clay', hex: '#b5654a' },
  ],
  currency = 'USD',
  locale = 'en-US',
  variant = 'glass',
  size = 'md',
  className = '',
}: FilterSidebarProps) {
  const money = { currency, locale };

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLFormElement>('form[data-filters]:not([data-bound])').forEach((form) => {
        form.dataset.bound = '';
        const root = form.closest<HTMLElement>('[data-filters-root]')!;
        const target = document.getElementById(form.dataset.filters || '');
        if (!target) return;
        const grid: HTMLElement = target;
        const wrap = grid.parentElement;
        const empty = wrap?.querySelector<HTMLElement>('[data-product-empty]');
        const cards = Array.from(grid.querySelectorAll<HTMLElement>('[data-product]'));
        cards.forEach((c, i) => { c.dataset.index = String(i); });
        const sort = document.getElementById(`${form.id}-sort`) as HTMLSelectElement | null;
        const priceOut = form.querySelector<HTMLOutputElement>('[data-price-out]');
        const toggle = root.querySelector<HTMLButtonElement>('[data-filters-toggle]');
        const activeBadge = root.querySelector<HTMLElement>('[data-active-count]');
        const money = { currency: form.dataset.currency, locale: form.dataset.locale };
        const priceInput = form.elements.namedItem('max') as HTMLInputElement;
        const ceiling = Number(priceInput.max);
    
        // Pre-select categories from ?category=a,b
        const params = new URLSearchParams(window.location.search);
        const fromUrl = (params.get('category') || '').split(',').filter(Boolean);
        if (fromUrl.length) {
          form.querySelectorAll<HTMLInputElement>('input[name="category"]').forEach((i) => { i.checked = fromUrl.includes(i.value); });
        }
        if (sort && params.get('sort')) sort.value = params.get('sort')!;
    
        function apply() {
          const data = new FormData(form);
          const cats = data.getAll('category') as string[];
          const colors = data.getAll('color') as string[];
          const max = Number(data.get('max'));
          const minRating = Number(data.get('rating') || 0);
          const stockOnly = data.get('stock') === 'in';
          let visible = 0;
    
          cards.forEach((card) => {
            const d = card.dataset;
            const cardColors = (d.colors || '').split(',').filter(Boolean);
            const ok =
              (!cats.length || cats.includes(d.category || '')) &&
              Number(d.price) <= max &&
              Number(d.rating) >= minRating &&
              (!stockOnly || d.stock === 'in') &&
              (!colors.length || colors.some((c) => cardColors.includes(c)));
            card.hidden = !ok;
            if (ok) visible++;
          });
    
          const mode = sort?.value || 'featured';
          const sorted = [...cards].sort((a, b) => {
            const A = a.dataset, B = b.dataset;
            if (mode === 'price-asc') return Number(A.price) - Number(B.price);
            if (mode === 'price-desc') return Number(B.price) - Number(A.price);
            if (mode === 'rating') return Number(B.rating) - Number(A.rating);
            if (mode === 'name') return (A.name || '').localeCompare(B.name || '');
            return Number(A.index) - Number(B.index);
          });
          grid.append(...sorted);
    
          if (empty) empty.hidden = visible > 0;
          if (priceOut) priceOut.textContent = formatMoney(max, money);
          document.querySelectorAll<HTMLElement>(`[data-result-count="${grid.id}"]`).forEach((n) => { n.textContent = String(visible); });
    
          const active = cats.length + colors.length + (max < ceiling ? 1 : 0) + (minRating > 0 ? 1 : 0) + (stockOnly ? 1 : 0);
          if (activeBadge) { activeBadge.hidden = active === 0; activeBadge.textContent = String(active); }
    
          const url = new URL(window.location.href);
          if (cats.length) url.searchParams.set('category', cats.join(','));
          else url.searchParams.delete('category');
          if (mode !== 'featured') url.searchParams.set('sort', mode);
          else url.searchParams.delete('sort');
          window.history.replaceState(null, '', url);
        }
    
        form.addEventListener('input', apply);
        form.addEventListener('change', apply);
        form.addEventListener('submit', (e) => { e.preventDefault(); apply(); });
        form.addEventListener('reset', () => window.setTimeout(apply, 0));
        sort?.addEventListener('change', apply);
    
        toggle?.addEventListener('click', () => {
          const open = toggle.getAttribute('aria-expanded') !== 'true';
          toggle.setAttribute('aria-expanded', String(open));
          root.classList.toggle('is-open', open);
        });
    
        apply();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={cx(['filters', `filters--${variant}`, `filters--${size}`, className])} data-filters-root data-rk-a56ca5="">
        <button className="filters__toggle" type="button" aria-expanded="false" aria-controls={id} data-filters-toggle data-rk-a56ca5="">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true" data-rk-a56ca5=""><path d="M4 6h16M7 12h10M10 18h4" data-rk-a56ca5="" /></svg>
          Filters
          <span className="filters__active" data-active-count hidden data-rk-a56ca5=""></span>
        </button>
      
        <form className="filters__form" id={id} data-filters={target} data-currency={currency} data-locale={locale} aria-label="Product filters" data-rk-a56ca5="">
          <fieldset className="filters__group" data-rk-a56ca5="">
            <legend data-rk-a56ca5="">Category</legend>
            {categories.map((c, __i: number) => (
              <label key={__i} className="filters__check" data-rk-a56ca5="">
                <input type="checkbox" name="category" defaultValue={c.id} defaultChecked={selected.includes(c.id)} data-rk-a56ca5="" />
                <span className="filters__box" aria-hidden="true" data-rk-a56ca5=""></span>
                <span className="filters__label" data-rk-a56ca5="">{c.name}</span>
                {c.count !== undefined && <span className="filters__count" data-rk-a56ca5="">{c.count}</span>}
              </label>
            ))}
          </fieldset>
      
          <fieldset className="filters__group" data-rk-a56ca5="">
            <legend data-rk-a56ca5="">Price</legend>
            <label className="filters__range" data-rk-a56ca5="">
              <span className="filters__range-head" data-rk-a56ca5="">
                <span data-rk-a56ca5="">Up to</span>
                <output data-price-out data-rk-a56ca5="">{formatMoney(maxPrice, money)}</output>
              </span>
              <input type="range" name="max" min="0" max={maxPrice} step="5" defaultValue={maxPrice} aria-label="Maximum price" data-rk-a56ca5="" />
              <span className="filters__range-scale" aria-hidden="true" data-rk-a56ca5=""><span data-rk-a56ca5="">{formatMoney(0, money)}</span><span data-rk-a56ca5="">{formatMoney(maxPrice, money)}</span></span>
            </label>
          </fieldset>
      
          {colors.length > 0 && (
            <fieldset className="filters__group" data-rk-a56ca5="">
              <legend data-rk-a56ca5="">Colour</legend>
              <div className="filters__swatches" data-rk-a56ca5="">
                {colors.map((c, __i: number) => (
                  <label key={__i} className="filters__swatch" style={st(`--sw: ${c.hex}`)} data-rk-a56ca5="">
                    <input type="checkbox" name="color" defaultValue={c.name.toLowerCase()} data-rk-a56ca5="" />
                    <span className="filters__swatch-dot" aria-hidden="true" data-rk-a56ca5=""></span>
                    <span className="sr-only" data-rk-a56ca5="">{c.name}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}
      
          <fieldset className="filters__group" data-rk-a56ca5="">
            <legend data-rk-a56ca5="">Rating</legend>
            {[['0', 'Any rating'], ['4.5', '4.5 ★ & up'], ['4', '4 ★ & up']].map(([v, l], i) => (
              <label key={i} className="filters__check filters__check--radio" data-rk-a56ca5="">
                <input type="radio" name="rating" defaultValue={v} defaultChecked={i === 0} data-rk-a56ca5="" />
                <span className="filters__box" aria-hidden="true" data-rk-a56ca5=""></span>
                <span className="filters__label" data-rk-a56ca5="">{l}</span>
              </label>
            ))}
          </fieldset>
      
          <fieldset className="filters__group" data-rk-a56ca5="">
            <legend className="sr-only" data-rk-a56ca5="">Availability</legend>
            <label className="filters__switch" data-rk-a56ca5="">
              <span data-rk-a56ca5="">In stock only</span>
              <input type="checkbox" name="stock" defaultValue="in" role="switch" data-rk-a56ca5="" />
              <span className="filters__track" aria-hidden="true" data-rk-a56ca5=""></span>
            </label>
          </fieldset>
      
          <button className="filters__reset" type="reset" data-rk-a56ca5="">Clear all filters</button>
        </form>
      </div>
    </>
  );
}

export default FilterSidebar;
