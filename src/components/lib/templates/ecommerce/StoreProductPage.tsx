'use client';

import type { CSSProperties } from 'react';
import StoreLayout from './StoreLayout';
import ProductGallery from '../../ecommerce/ProductGallery';
import ProductBuyBox from '../../ecommerce/ProductBuyBox';
import ProductRating from '../../ecommerce/ProductRating';
import ProductGrid from '../../ecommerce/ProductGrid';
import { demoStore, defaultRoutes, categoryHref, categoryNames, type StoreConfig, type StoreRoutes } from './data';
import './StoreProductPage.css';

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
 * StoreProductPage — E-commerce template product detail: breadcrumb, ProductGallery,
 * ProductBuyBox, reviews summary and related products.
 *
 * Usage (app/product/[slug]/page.tsx, Next.js):
 *   import { StoreProductPage, demoStore } from 'react-component-kit-ui/templates/ecommerce';
 *   export const generateStaticParams = () => demoStore.products.map((p) => ({ slug: p.slug }));
 *   <StoreProductPage slug={(await params).slug} />
 *
 * @param {string} slug - Product slug to show. Default: first product.
 * @param {StoreConfig} store - Catalogue and settings. Default: demo store.
 * @param {StoreRoutes} routes - Page URLs.
 * @param {boolean} seedCart - Pre-fill the cart with demo items. Default false.
 * @param {string} theme - Initial theme (dark|light|auto). Default 'dark'.
 * @param {boolean} noindex - Add robots noindex. Default false.
 */
export interface StoreProductPageProps {
  slug?: string;
  store?: StoreConfig;
  routes?: StoreRoutes;
  seedCart?: boolean;
  noindex?: boolean;
  theme?: 'dark' | 'light' | 'auto';
}

export function StoreProductPage({ slug, store = demoStore, routes = defaultRoutes, seedCart = false, noindex = false, theme = 'dark' }: StoreProductPageProps) {
  const product = store.products.find((p) => p.slug === slug) ?? store.products[0];
  const category = store.categories.find((c) => c.id === product.category);
  const related = store.products
    .filter((p) => p.slug !== product.slug)
    .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category))
    .slice(0, 4);
  
  // Deterministic demo review distribution derived from the rating.
  const total = product.reviews ?? 0;
  const r = product.rating ?? 0;
  const weights = [Math.max(0, r - 3.6) * 3, 1.2, 0.5, 0.2, 0.12];
  const sum = weights.reduce((a, b) => a + b, 0) || 1;
  const bars = [5, 4, 3, 2, 1].map((stars, i) => ({ stars, count: Math.round((weights[i] / sum) * total) }));
  const reviews = [
    { name: 'Maya R.', title: 'Exceeded expectations', body: 'Beautifully made and it arrived in two days. I have already ordered a second one as a gift.', rating: 5 },
    { name: 'Jonas K.', title: 'Great quality', body: 'Feels premium and the details are spot on. Packaging was plastic-free, which I appreciated.', rating: 5 },
    { name: 'Lea M.', title: 'Almost perfect', body: 'Love the colour and the finish. Took a few days to get used to, but now I use it every day.', rating: 4 },
  ];
  const money = new Intl.NumberFormat(store.locale, { style: 'currency', currency: store.currency, maximumFractionDigits: 0 }).format(store.freeShippingThreshold);
  return (
    <>
      <StoreLayout theme={theme} title={product.name} description={product.description} store={store} routes={routes} seedCart={seedCart} noindex={noindex}>
        <div className="store-container pdp" data-rk-4b42ab="">
          <nav className="crumbs" aria-label="Breadcrumb" data-rk-4b42ab="">
            <ol data-rk-4b42ab="">
              <li data-rk-4b42ab=""><a href={routes.home} data-rk-4b42ab="">Home</a></li>
              <li data-rk-4b42ab=""><a href={routes.shop} data-rk-4b42ab="">Shop</a></li>
              {category && <li data-rk-4b42ab=""><a href={categoryHref(routes, category.id)} data-rk-4b42ab="">{category.name}</a></li>}
              <li data-rk-4b42ab=""><span aria-current="page" data-rk-4b42ab="">{product.name}</span></li>
            </ol>
          </nav>
      
          <div className="pdp__main" data-rk-4b42ab="">
            <ProductGallery images={product.image ? [product.image] : []} alt={product.name} icon={product.icon} hue={product.hue} />
            <ProductBuyBox product={product} categoryLabel={category?.name} checkoutHref={routes.checkout} currency={store.currency} locale={store.locale} cartKey={store.cartKey} details={[
                { title: 'Details', body: product.description ?? '' },
                { title: 'Shipping & returns', body: `Free standard shipping over ${money}, delivered in 2–4 business days. Return anything within 30 days for a full refund.` },
                { title: 'Warranty', body: 'Two-year limited warranty covering manufacturing defects, with free repair or replacement.' },
              ]} />
          </div>
      
          {total > 0 && (
            <section className="reviews" id="reviews" aria-labelledby="reviews-title" data-rk-4b42ab="">
              <div className="reviews__summary" data-rk-4b42ab="">
                <h2 id="reviews-title" data-rk-4b42ab="">Customer reviews</h2>
                <p className="reviews__score" data-rk-4b42ab="">{r.toFixed(1)}<span data-rk-4b42ab="">/5</span></p>
                <ProductRating value={r} count={total} size="lg" showValue={false} />
                <ul className="reviews__bars" aria-label="Rating distribution" data-rk-4b42ab="">
                  {bars.map((b, __i: number) => (
                    <li key={__i} data-rk-4b42ab="">
                      <span data-rk-4b42ab="">{b.stars} ★</span>
                      <span className="reviews__bar" aria-hidden="true" data-rk-4b42ab=""><span style={st(`width: ${total ? (b.count / total) * 100 : 0}%`)} data-rk-4b42ab=""></span></span>
                      <span className="reviews__count" data-rk-4b42ab="">{b.count}<span className="sr-only" data-rk-4b42ab=""> reviews with {b.stars} stars</span></span>
                    </li>
                  ))}
                </ul>
              </div>
              <ul className="reviews__list" data-rk-4b42ab="">
                {reviews.map((rv, __i: number) => (
                  <li key={__i} className="review" data-rk-4b42ab="">
                    <ProductRating value={rv.rating} showValue={false} />
                    <h3 data-rk-4b42ab="">{rv.title}</h3>
                    <p data-rk-4b42ab="">{rv.body}</p>
                    <p className="review__by" data-rk-4b42ab="">{rv.name} · <span data-rk-4b42ab="">Verified buyer</span></p>
                  </li>
                ))}
              </ul>
            </section>
          )}
      
          <section className="related" aria-labelledby="related-title" data-rk-4b42ab="">
            <h2 id="related-title" data-rk-4b42ab="">You may also like</h2>
            <ProductGrid id="related" products={related} productBase={routes.product} categoryNames={categoryNames(store)} currency={store.currency} locale={store.locale} cartKey={store.cartKey} openCart={false} />
          </section>
        </div>
      </StoreLayout>
    </>
  );
}

export default StoreProductPage;
