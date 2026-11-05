'use client';

import type { CSSProperties } from 'react';
import EditorialLayout from './EditorialLayout';
import ProductMedia from '../../ecommerce/ProductMedia';
import ProductRating from '../../ecommerce/ProductRating';
import VariantPicker from '../../ecommerce/VariantPicker';
import StockIndicator from '../../ecommerce/StockIndicator';
import ShopProductRail from '../../sections/ShopProductRail';
import ShopReviewsEditorial from '../../sections/ShopReviewsEditorial';
import { formatMoney } from '../../ecommerce/cart-store';
import type { Product, StoreCategory } from '../../ecommerce/types';
import { formaStore, editorialRoutes, editorialCategoryHref, type EditorialStore, type EditorialRoutes } from './data';
import './EditorialProductPage.css';

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
 * EditorialProductPage — Editorial product detail: stacked full-bleed images on the left, a sticky
 * info column (VariantPicker colour + size, add to bag, StockIndicator, size guide and care notes),
 * then "Complete the look" (ShopProductRail) and reviews (ShopReviewsEditorial).
 *
 * Usage (app/product/[slug]/page.tsx, Next.js):
 *   import { EditorialProductPage, formaStore } from 'react-component-kit-ui/templates/ecommerce-editorial';
 *   export const generateStaticParams = () => formaStore.products.map((p) => ({ slug: p.slug }));
 *   <EditorialProductPage slug={(await params).slug} />
 *
 * @param {string} slug - Product slug. Default: first product.
 * @param {EditorialStore} store - Catalogue and settings.
 * @param {EditorialRoutes} routes - Page URLs.
 * @param {string} theme - Initial theme (light|dark|auto). Default 'light'.
 * @param {boolean} seedCart - Pre-fill the bag with demo items. Default false.
 * @param {boolean} noindex - Add robots noindex. Default false.
 */
export interface EditorialProductPageProps {
  slug?: string;
  store?: EditorialStore;
  routes?: EditorialRoutes;
  theme?: 'light' | 'dark' | 'auto';
  seedCart?: boolean;
  noindex?: boolean;
}

export function EditorialProductPage({ slug, store = formaStore, routes = editorialRoutes, theme = 'light', seedCart = false, noindex = false }: EditorialProductPageProps) {
  const catalog: EditorialStore = store;
  
  const product: Product = catalog.products.find((p: Product) => p.slug === slug) ?? catalog.products[0];
  const category: StoreCategory | undefined = catalog.categories.find((c: StoreCategory) => c.id === product.category);
  const money = { currency: store.currency, locale: store.locale };
  const inStock = product.inStock !== false;
  const views = [0, 1, 2, 3].map((i) => ({ hue: (product.hue ?? 205) + i * 14, turn: [0, -12, 10, 0][i], zoom: [1, 1.25, 0.9, 1.5][i], variant: (i % 2 ? 'glow' : 'soft') as 'glow' | 'soft' }));
  const related: Product[] = catalog.products.filter((p: Product) => p.slug !== product.slug && p.category !== product.category).slice(0, 6);
  const payload = JSON.stringify({ id: product.slug, name: product.name, price: product.price, icon: product.icon, hue: product.hue, image: product.image });
  const productReviews = catalog.reviews.filter((r: EditorialStore['reviews'][number]) => r.product === product.name);
  return (
    <>
      <EditorialLayout title={product.name} description={product.description} store={store} routes={routes} theme={theme} seedCart={seedCart} noindex={noindex}>
        <div className="forma-wrap" data-rk-f346d1="">
          <nav className="pdp-crumbs" aria-label="Breadcrumb" data-rk-f346d1="">
            <ol data-rk-f346d1="">
              <li data-rk-f346d1=""><a href={routes.home} data-rk-f346d1="">Home</a></li>
              <li data-rk-f346d1=""><a href={routes.shop} data-rk-f346d1="">Shop</a></li>
              {category && <li data-rk-f346d1=""><a href={editorialCategoryHref(routes, category.id)} data-rk-f346d1="">{category.name}</a></li>}
              <li data-rk-f346d1=""><span aria-current="page" data-rk-f346d1="">{product.name}</span></li>
            </ol>
          </nav>
      
          <div className="pdp" data-rk-f346d1="">
            <div className="pdp__gallery" aria-label={`${product.name} images`} role="group" data-rk-f346d1="">
              {product.image ? (
                <ProductMedia image={product.image} alt={product.name} ratio="4 / 5" />
              ) : (
                views.map((v, i) => (
                  <div key={i} className={cx(['pdp__view', { 'pdp__view--wide': i === 0 || i === 3 }])} style={st(`--turn: ${v.turn}deg; --zoom: ${v.zoom}`)} data-rk-f346d1="">
                    <ProductMedia icon={product.icon} hue={v.hue} ratio={i === 0 || i === 3 ? '4 / 5' : '3 / 4'} variant={v.variant} size="lg" />
                  </div>
                ))
              )}
            </div>
      
            <div className="pdp__info" data-rk-f346d1="">
              <p className="pdp__cat" data-rk-f346d1="">{category?.name}{product.badge && <span data-rk-f346d1=""> · {product.badge}</span>}</p>
              <h1 className="pdp__title" data-rk-f346d1="">{product.name}</h1>
              <p className="pdp__price" data-rk-f346d1="">
                <span data-rk-f346d1="">{formatMoney(product.price, money)}</span>
                {product.compareAt && <s data-rk-f346d1=""><span className="sr-only" data-rk-f346d1="">Was </span>{formatMoney(product.compareAt, money)}</s>}
              </p>
              {product.rating !== undefined && (
                <a className="pdp__rating" href="#reviews" data-rk-f346d1=""><ProductRating value={product.rating} count={product.reviews} /></a>
              )}
              {product.description && <p className="pdp__desc" data-rk-f346d1="">{product.description}</p>}
      
              <div className="pdp__pickers" data-rk-f346d1="">
                {product.colors && product.colors.length > 0 && (
                  <VariantPicker label="Colour" name="pdp-color" type="swatch" size="sm" target="pdp-add" options={product.colors.map((c: { name: string; hex: string }) => ({ label: c.name, hex: c.hex }))} />
                )}
                {product.sizes && product.sizes.length > 0 && (
                  <VariantPicker label="Size" name="pdp-size" type="pill" size="sm" target="pdp-add" options={product.sizes.map((s: string) => ({ label: s }))} selected={Math.floor(product.sizes.length / 2)} />
                )}
              </div>
      
              {product.sizes && product.sizes.length > 0 && (
                <details className="pdp__guide" data-rk-f346d1="">
                  <summary data-rk-f346d1="">Size guide</summary>
                  <p data-rk-f346d1="">Our pieces are cut relaxed. If you are between sizes, choose the smaller one for a closer fit. Model is 183 cm and wears size M.</p>
                </details>
              )}
      
              <button type="button" className="pdp__add" id="pdp-add" data-add-to-cart={payload} data-cart-key={store.cartKey} data-open-cart="false" data-added-label="Added to bag ✓" disabled={!inStock} data-rk-f346d1=""><span data-label data-rk-f346d1="">{inStock ? `Add to bag — ${formatMoney(product.price, money)}` : 'Sold out'}</span></button>
      
              {inStock && product.stock !== undefined && product.stock <= 5 && (
                <StockIndicator stock={product.stock} viewers={6 + ((product.reviews ?? 0) % 11)} variant="inline" size="sm" />
              )}
      
              <ul className="pdp__notes" data-rk-f346d1="">
                <li data-rk-f346d1="">Complimentary shipping over {formatMoney(store.freeShippingThreshold, money)}</li>
                <li data-rk-f346d1="">Free returns within 30 days</li>
                <li data-rk-f346d1="">Free repairs, for life</li>
              </ul>
      
              <div className="pdp__acc" data-rk-f346d1="">
                <details open data-rk-f346d1=""><summary data-rk-f346d1="">Materials &amp; care</summary><p data-rk-f346d1="">Natural fibres, traceable to the mill. Wash cold, dry flat, iron while damp. Every piece comes with a care card.</p></details>
                <details data-rk-f346d1=""><summary data-rk-f346d1="">Made by</summary><p data-rk-f346d1="">A family workshop we have worked with since day one. Small batches, fair wages and audited conditions.</p></details>
                <details data-rk-f346d1=""><summary data-rk-f346d1="">Shipping &amp; returns</summary><p data-rk-f346d1="">Ships in 1–2 days in plastic-free packaging. Return anything within 30 days — we cover the label.</p></details>
              </div>
            </div>
          </div>
        </div>
      
        {related.length > 0 && (
          <div className="forma-wrap section-space" data-rk-f346d1="">
            <ShopProductRail eyebrow="Pairs well with" title="Complete the *look*" products={related} productBase={routes.product} link={{ label: 'Shop all', href: routes.shop }} id="pdp-rail" currency={store.currency} locale={store.locale} cartKey={store.cartKey} />
          </div>
        )}
      
        <div className="forma-wrap section-space pdp-reviews" id="reviews" data-rk-f346d1="">
          <ShopReviewsEditorial eyebrow="Reviews" score={product.rating ?? 4.8} count={product.reviews ?? 0} reviews={productReviews.length ? productReviews : store.reviews} />
        </div>
      </EditorialLayout>
    </>
  );
}

export default EditorialProductPage;
