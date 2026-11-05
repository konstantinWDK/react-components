'use client';

import EditorialLayout from './EditorialLayout';
import ShopCategoryHero from '../../sections/ShopCategoryHero';
import ShopNewsletterEditorial from '../../sections/ShopNewsletterEditorial';
import FilterBar from '../../ecommerce/FilterBar';
import ProductCardMinimal from '../../ecommerce/ProductCardMinimal';
import { formaStore, editorialRoutes, editorialProductHref, editorialCategoryHref, type EditorialStore, type EditorialRoutes } from './data';
import './EditorialShopPage.css';

/**
 * EditorialShopPage — Editorial catalogue: ShopCategoryHero, sticky FilterBar (chips, refine
 * panel, sort, live count) and a grid of ProductCardMinimal with quick add.
 *
 * Usage (app/shop/page.tsx, Next.js):
 *   import { EditorialShopPage } from 'react-component-kit-ui/templates/ecommerce-editorial';
 *   <EditorialShopPage />
 * Category links use `?category=<id>`; pass `category` to build one static page per category.
 *
 * @param {EditorialStore} store - Catalogue and settings.
 * @param {EditorialRoutes} routes - Page URLs.
 * @param {string} category - Pre-selected category id.
 * @param {string} theme - Initial theme (light|dark|auto). Default 'light'.
 * @param {boolean} seedCart - Pre-fill the bag with demo items. Default false.
 * @param {boolean} noindex - Add robots noindex. Default false.
 */
export interface EditorialShopPageProps {
  store?: EditorialStore;
  routes?: EditorialRoutes;
  category?: string;
  theme?: 'light' | 'dark' | 'auto';
  seedCart?: boolean;
  noindex?: boolean;
}

export function EditorialShopPage({ store = formaStore, routes = editorialRoutes, category, theme = 'light', seedCart = false, noindex = false }: EditorialShopPageProps) {
  const active = store.categories.find((c) => c.id === category);
  const maxPrice = Math.ceil(Math.max(...store.products.map((p) => p.price)) / 50) * 50;
  const colors = Array.from(new Map(store.products.flatMap((p) => p.colors ?? []).map((c) => [c.name, c])).values());
  const chips = store.categories.map((c) => ({ id: c.id, name: c.name, count: store.products.filter((p) => p.category === c.id).length }));
  const title = active?.name ?? 'All pieces';
  const text = active?.description ?? 'Everything we make, in one place — clothing, shoes, bags and objects for the home. Filter by category, colour or price.';
  return (
    <>
      <EditorialLayout title={title} description={text} store={store} routes={routes} currentHref={routes.shop} theme={theme} seedCart={seedCart} noindex={noindex}>
        <div className="forma-wrap" data-rk-f25080="">
          <ShopCategoryHero breadcrumb={[{ label: 'Home', href: routes.home }, { label: 'Shop', href: routes.shop }, ...(active ? [{ label: active.name }] : [])]} title={title} count={active ? chips.find((c) => c.id === active.id)?.count : store.products.length} text={text} links={[]} visuals={[]} />
        </div>
      
        <div className="forma-wrap" data-rk-f25080="">
          <FilterBar target="forma-grid" categories={chips} selected={active ? [active.id] : []} maxPrice={maxPrice} colors={colors} total={store.products.length} countLabel="pieces" currency={store.currency} locale={store.locale} />
        </div>
      
        <div className="forma-wrap shop-grid-wrap" data-rk-f25080="">
          <ul className="shop-grid" id="forma-grid" data-rk-f25080="">
            {store.products.map((p, i) => (
              <li key={i} data-rk-f25080=""><ProductCardMinimal product={p} href={editorialProductHref(routes, p.slug)} index={i + 1} currency={store.currency} locale={store.locale} cartKey={store.cartKey} /></li>
            ))}
          </ul>
          <div className="shop-empty" data-product-empty hidden role="status" data-rk-f25080="">
            <p className="shop-empty__title" data-rk-f25080="">Nothing matches — yet.</p>
            <p data-rk-f25080="">Try another colour or <a href={editorialCategoryHref(routes)} data-rk-f25080="">see everything</a>.</p>
          </div>
        </div>
      
        <div className="section-space" data-rk-f25080="">
          <ShopNewsletterEditorial size="sm" title="New pieces, *first*" />
        </div>
      </EditorialLayout>
    </>
  );
}

export default EditorialShopPage;
