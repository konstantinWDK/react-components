'use client';

import { useEffect, useRef } from 'react';
import StoreLayout from './StoreLayout';
import ProductToolbar from '../../ecommerce/ProductToolbar';
import FilterSidebar from '../../ecommerce/FilterSidebar';
import ProductGrid from '../../ecommerce/ProductGrid';
import TrustBadges from '../../ecommerce/TrustBadges';
import { demoStore, defaultRoutes, categoryHref, categoryNames, type StoreConfig, type StoreRoutes } from './data';
import './StoreCategoryPage.css';

/**
 * StoreCategoryPage — E-commerce template catalogue: breadcrumb, category chips, toolbar
 * with live count + sort, FilterSidebar and ProductGrid (instant client-side filtering).
 *
 * Usage (app/shop/page.tsx, Next.js):
 *   import { StoreCategoryPage } from 'react-component-kit-ui/templates/ecommerce';
 *   <StoreCategoryPage />
 * Category links use `?category=<id>`; pass `category` to build one static page per category.
 *
 * @param {StoreConfig} store - Catalogue and settings. Default: demo store.
 * @param {StoreRoutes} routes - Page URLs.
 * @param {string} category - Pre-selected category id (optional).
 * @param {boolean} seedCart - Pre-fill the cart with demo items. Default false.
 * @param {string} theme - Initial theme (dark|light|auto). Default 'dark'.
 * @param {boolean} noindex - Add robots noindex. Default false.
 */
export interface StoreCategoryPageProps {
  store?: StoreConfig;
  routes?: StoreRoutes;
  category?: string;
  seedCart?: boolean;
  noindex?: boolean;
  theme?: 'dark' | 'light' | 'auto';
}

export function StoreCategoryPage({ store = demoStore, routes = defaultRoutes, category, seedCart = false, noindex = false, theme = 'dark' }: StoreCategoryPageProps) {
  const active = store.categories.find((c) => c.id === category);
  const names = categoryNames(store);
  const maxPrice = Math.ceil(Math.max(...store.products.map((p) => p.price)) / 50) * 50;
  const colors = Array.from(new Map(store.products.flatMap((p) => p.colors ?? []).map((c) => [c.name, c])).values());
  const filterCats = store.categories.map((c) => ({ id: c.id, name: c.name, count: store.products.filter((p) => p.category === c.id).length }));
  const title = active ? active.name : 'All products';
  const description = active?.description ?? 'Everything we make, in one place. Filter by category, price, colour and rating.';

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    // Category chips filter in place (no reload) and keep FilterSidebar in sync.
      document.querySelectorAll<HTMLAnchorElement>('.chips a').forEach((chip) => {
        chip.addEventListener('click', (e) => {
          const form = document.getElementById('shop-filters') as HTMLFormElement | null;
          if (!form) return;
          e.preventDefault();
          const id = chip.dataset.chip;
          form.querySelectorAll<HTMLInputElement>('input[name="category"]').forEach((i) => { i.checked = id ? i.value === id : false; });
          form.dispatchEvent(new Event('change', { bubbles: true }));
        });
      });
      const syncChips = () => {
        const form = document.getElementById('shop-filters') as HTMLFormElement | null;
        if (!form) return;
        const checked = Array.from(form.querySelectorAll<HTMLInputElement>('input[name="category"]:checked')).map((i) => i.value);
        document.querySelectorAll<HTMLAnchorElement>('.chips a').forEach((chip) => {
          const id = chip.dataset.chip;
          const on = id ? checked.length === 1 && checked[0] === id : checked.length === 0;
          if (on) chip.setAttribute('aria-current', 'page');
          else chip.removeAttribute('aria-current');
        });
      };
      document.getElementById('shop-filters')?.addEventListener('change', syncChips);
      document.getElementById('shop-filters')?.addEventListener('reset', () => window.setTimeout(syncChips, 0));
      syncChips();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <StoreLayout theme={theme} title={title} description={description} store={store} routes={routes} currentHref={routes.shop} seedCart={seedCart} noindex={noindex}>
        <div className="store-container shop" data-rk-3f1bf4="">
          <nav className="crumbs" aria-label="Breadcrumb" data-rk-3f1bf4="">
            <ol data-rk-3f1bf4="">
              <li data-rk-3f1bf4=""><a href={routes.home} data-rk-3f1bf4="">Home</a></li>
              <li data-rk-3f1bf4=""><a href={routes.shop} aria-current={active ? undefined : 'page'} data-rk-3f1bf4="">Shop</a></li>
              {active && <li data-rk-3f1bf4=""><span aria-current="page" data-rk-3f1bf4="">{active.name}</span></li>}
            </ol>
          </nav>
      
          <ProductToolbar title={title} description={description} total={store.products.length} target="shop-grid" filtersId="shop-filters" />
      
          <ul className="chips" aria-label="Categories" data-rk-3f1bf4="">
            <li data-rk-3f1bf4=""><a className="chip" href={routes.shop} aria-current={!active ? 'page' : undefined} data-rk-3f1bf4="">All</a></li>
            {store.categories.map((c, __i: number) => (
              <li key={__i} data-rk-3f1bf4=""><a className="chip" href={categoryHref(routes, c.id)} aria-current={active?.id === c.id ? 'page' : undefined} data-chip={c.id} data-rk-3f1bf4="">{c.name}</a></li>
            ))}
          </ul>
      
          <div className="shop__layout" data-rk-3f1bf4="">
            <div className="shop__filters" data-rk-3f1bf4="">
              <FilterSidebar target="shop-grid" id="shop-filters" categories={filterCats} selected={active ? [active.id] : []} maxPrice={maxPrice} colors={colors} currency={store.currency} locale={store.locale} />
            </div>
            <ProductGrid id="shop-grid" products={store.products} productBase={routes.product} categoryNames={names} columns={3} currency={store.currency} locale={store.locale} cartKey={store.cartKey} openCart={false} />
          </div>
      
          <div className="shop__trust" data-rk-3f1bf4="">
            <TrustBadges variant="divided" size="sm" />
          </div>
        </div>
      </StoreLayout>
    </>
  );
}

export default StoreCategoryPage;
