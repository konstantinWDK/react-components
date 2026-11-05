'use client';

import StoreLayout from './StoreLayout';
import StoreHero from '../../ecommerce/StoreHero';
import TrustBadges from '../../ecommerce/TrustBadges';
import CategoryTiles from '../../ecommerce/CategoryTiles';
import ProductGrid from '../../ecommerce/ProductGrid';
import ProductMedia from '../../ecommerce/ProductMedia';
import CountdownBanner from '../../ecommerce/CountdownBanner';
import LogoCloudSection from '../../sections/LogoCloudSection';
import CtaNewsletterSection from '../../sections/CtaNewsletterSection';
import { demoStore, defaultRoutes, productHref, categoryHref, categoryNames, pickProducts, type StoreConfig, type StoreRoutes } from './data';
import './StoreHomePage.css';

/**
 * StoreHomePage — E-commerce template home: hero, guarantees, categories, best sellers,
 * editorial banner, new arrivals, press logos and newsletter.
 *
 * Usage (src/pages/index.astro):
 *   import { StoreHomePage } from 'astro-component-kit/templates/ecommerce';
 *   <StoreHomePage />
 *
 * @param {StoreConfig} store - Catalogue and settings. Default: demo store.
 * @param {StoreRoutes} routes - Page URLs. Default: '/', '/shop/', '/product/', '/checkout/'.
 * @param {boolean} seedCart - Pre-fill the cart with demo items. Default false.
 * @param {string} theme - Initial theme (dark|light|auto). Default 'dark'.
 * @param {boolean} noindex - Add robots noindex. Default false.
 */
export interface StoreHomePageProps {
  store?: StoreConfig;
  routes?: StoreRoutes;
  seedCart?: boolean;
  noindex?: boolean;
  theme?: 'dark' | 'light' | 'auto';
}

export function StoreHomePage({ store = demoStore, routes = defaultRoutes, seedCart = false, noindex = false, theme = 'dark' }: StoreHomePageProps) {
  const names = categoryNames(store);
  const best = pickProducts(store, store.bestSellers);
  const fresh = pickProducts(store, store.newArrivals);
  const heroProduct = best[0] ?? store.products[0];
  const tiles = store.categories.map((c) => ({
    ...c,
    href: categoryHref(routes, c.id),
    count: store.products.filter((p) => p.category === c.id).length,
  }));
  const feature = store.products.find((p) => p.slug === 'storm-jacket') ?? store.products[store.products.length - 1];
  const shared = { productBase: routes.product, categoryNames: names, currency: store.currency, locale: store.locale, cartKey: store.cartKey, openCart: false };
  return (
    <>
      <StoreLayout theme={theme} title={`${store.name} — ${store.tagline.split('.')[0]}`} description={store.tagline} store={store} routes={routes} currentHref={routes.home} seedCart={seedCart} noindex={noindex} liveActivity>
        <StoreHero eyebrow="New season · 2026" title="Gear that feels" highlight="made for you" subtitle={`${store.tagline} Free shipping over ${new Intl.NumberFormat(store.locale, { style: 'currency', currency: store.currency, maximumFractionDigits: 0 }).format(store.freeShippingThreshold)}.`} primary={{ label: 'Shop the collection', href: routes.shop }} secondary={{ label: 'See best sellers', href: `${routes.shop}?sort=rating` }} product={heroProduct} productHref={productHref(routes, heroProduct.slug)} currency={store.currency} locale={store.locale} />
      
        <div className="store-container home-block home-block--tight" data-rk-c3f911="">
          <TrustBadges />
        </div>
      
        <div className="store-container home-block" data-rk-c3f911="">
          <CategoryTiles title="Shop by category" subtitle="Five small collections, each one obsessively edited." categories={tiles} columns={5} />
        </div>
      
        <section className="store-container home-block" aria-labelledby="best-title" data-rk-c3f911="">
          <div className="home-head" data-rk-c3f911="">
            <div data-rk-c3f911="">
              <p className="home-eyebrow" data-rk-c3f911="">Loved by 12k+ customers</p>
              <h2 id="best-title" data-rk-c3f911="">Best sellers</h2>
            </div>
            <a className="home-link" href={`${routes.shop}?sort=rating`} data-rk-c3f911="">View all <span aria-hidden="true" data-rk-c3f911="">→</span></a>
          </div>
          <ProductGrid id="best-sellers" products={best} {...shared} />
        </section>
      
        <section className="store-container home-block" aria-labelledby="feature-title" data-rk-c3f911="">
          <div className="feature" data-rk-c3f911="">
            <div className="feature__copy" data-rk-c3f911="">
              <p className="home-eyebrow" data-rk-c3f911="">The Storm edit</p>
              <h2 id="feature-title" data-rk-c3f911="">Built for weather you'd rather avoid</h2>
              <p data-rk-c3f911="">Three-layer shells, sealed seams and recycled fabrics. Tested in the Scottish Highlands so you don't have to.</p>
              <ul className="feature__list" data-rk-c3f911="">
                <li data-rk-c3f911="">Waterproof to 20,000 mm</li>
                <li data-rk-c3f911="">Made from 100% recycled nylon</li>
                <li data-rk-c3f911="">Lifetime repair programme</li>
              </ul>
              <a className="feature__cta" href={productHref(routes, feature.slug)} data-rk-c3f911="">Shop {feature.name}</a>
            </div>
            <div className="feature__art" aria-hidden="true" data-rk-c3f911="">
              <ProductMedia icon={feature.icon} hue={feature.hue} ratio="4 / 3" size="lg" />
            </div>
          </div>
        </section>
      
        <div className="store-container home-block" data-rk-c3f911="">
          <CountdownBanner eyebrow="Flash sale · ends soon" title="Up to 30% off the Storm collection" text="Waterproof shells and insulated layers at their lowest price of the season. Free returns, as always." cta={{ label: 'Shop the sale', href: productHref(routes, feature.slug) }} hours={36} storageKey={`${store.cartKey}-sale`} />
        </div>
      
        <section className="store-container home-block" aria-labelledby="new-title" data-rk-c3f911="">
          <div className="home-head" data-rk-c3f911="">
            <div data-rk-c3f911="">
              <p className="home-eyebrow" data-rk-c3f911="">Just landed</p>
              <h2 id="new-title" data-rk-c3f911="">New arrivals</h2>
            </div>
            <a className="home-link" href={routes.shop} data-rk-c3f911="">Shop all <span aria-hidden="true" data-rk-c3f911="">→</span></a>
          </div>
          <ProductGrid id="new-arrivals" products={fresh} {...shared} />
        </section>
      
        <LogoCloudSection title="AS FEATURED IN" logos={[
            { name: 'Northwind', symbol: '◆' },
            { name: 'Lumen Daily', symbol: '●' },
            { name: 'Gearbox', symbol: '▲' },
            { name: 'Field Notes', symbol: '✦' },
            { name: 'Outpost', symbol: '◎' },
            { name: 'Kinfolk Lab', symbol: '■' },
          ]} />
      
        <div className="store-container home-block" data-rk-c3f911="">
          <CtaNewsletterSection title="Get 10% off your first order" subtitle="Join the list for early access to drops, restocks and members-only offers." perks={['One email a week', 'Early access to new drops', 'Unsubscribe anytime']} buttonLabel="Join the list" privacy="By subscribing you agree to our privacy policy." variant="glass" />
        </div>
      </StoreLayout>
    </>
  );
}

export default StoreHomePage;
