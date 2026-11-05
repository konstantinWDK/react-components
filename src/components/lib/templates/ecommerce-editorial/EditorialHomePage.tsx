'use client';

import EditorialLayout from './EditorialLayout';
import ShopHeroEditorial from '../../sections/ShopHeroEditorial';
import ShopCollectionMosaic from '../../sections/ShopCollectionMosaic';
import ShopProductRail from '../../sections/ShopProductRail';
import ShopLookbook from '../../sections/ShopLookbook';
import ShopValuesMarquee from '../../sections/ShopValuesMarquee';
import ShopReviewsEditorial from '../../sections/ShopReviewsEditorial';
import ShopNewsletterEditorial from '../../sections/ShopNewsletterEditorial';
import { formaStore, editorialRoutes, editorialProductHref, editorialCategoryHref, pickEditorial, type EditorialStore, type EditorialRoutes } from './data';
import './EditorialHomePage.css';

/**
 * EditorialHomePage — Editorial store home: magazine hero with ticker, collection mosaic,
 * new-in product rail, shoppable lookbook, values marquee, reviews and newsletter.
 *
 * Usage (src/pages/index.astro):
 *   import { EditorialHomePage } from 'astro-component-kit/templates/ecommerce-editorial';
 *   <EditorialHomePage />
 *
 * @param {EditorialStore} store - Catalogue and settings. Default: Forma demo store.
 * @param {EditorialRoutes} routes - Page URLs.
 * @param {string} theme - Initial theme (light|dark|auto). Default 'light'.
 * @param {boolean} seedCart - Pre-fill the bag with demo items. Default false.
 * @param {boolean} noindex - Add robots noindex. Default false.
 */
export interface EditorialHomePageProps {
  store?: EditorialStore;
  routes?: EditorialRoutes;
  theme?: 'light' | 'dark' | 'auto';
  seedCart?: boolean;
  noindex?: boolean;
}

export function EditorialHomePage({ store = formaStore, routes = editorialRoutes, theme = 'light', seedCart = false, noindex = false }: EditorialHomePageProps) {
  const count = (id: string) => store.products.filter((p) => p.category === id).length;
  const cat = (id: string) => store.categories.find((c) => c.id === id);
  const mosaic = ['clothing', 'objects', 'bags', 'shoes']
    .map((id) => cat(id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c))
    .map((c) => ({ title: c.name, text: c.description, href: editorialCategoryHref(routes, c.id), count: count(c.id), icon: c.icon, hue: c.hue }));
  const coat = store.products.find((p) => p.slug === 'wool-overcoat') ?? store.products[0];
  const fmt = (n: number) => new Intl.NumberFormat(store.locale, { style: 'currency', currency: store.currency, maximumFractionDigits: 0 }).format(n);
  const look = store.look
    .map((l) => {
      const product = store.products.find((p) => p.slug === l.slug);
      return product ? { x: l.x, y: l.y, product, href: editorialProductHref(routes, product.slug) } : null;
    })
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const money = { currency: store.currency, locale: store.locale, cartKey: store.cartKey };
  return (
    <>
      <EditorialLayout title={`${store.name} Studio — ${store.tagline.split(',')[0]}`} description={store.tagline} store={store} routes={routes} currentHref={routes.home} theme={theme} seedCart={seedCart} noindex={noindex}>
        <ShopHeroEditorial kicker="Autumn / Winter 26" issue="N° 04" title="Quiet *objects* for everyday rituals" text={store.tagline} primary={{ label: 'Shop the collection', href: routes.shop }} secondary={{ label: 'New in', href: `${routes.shop}?sort=featured` }} media={{ icon: coat.icon, hue: coat.hue, caption: `${coat.name}, in ${coat.colors?.[0]?.name ?? 'Rust'} — ${fmt(coat.price)}`, href: editorialProductHref(routes, coat.slug) }} />
      
        <div className="forma-wrap section-space" data-rk-682d94="">
          <ShopCollectionMosaic eyebrow={`${store.categories.length} categories`} title="Shop by *intention*" items={mosaic} />
        </div>
      
        <div className="forma-wrap section-space home-tight" data-rk-682d94="">
          <ShopProductRail eyebrow="Just in" title="New this *week*" products={pickEditorial(store, store.newIn)} productBase={routes.product} link={{ label: 'View all', href: routes.shop }} id="new-in" {...money} />
        </div>
      
        <div className="forma-wrap section-space" data-rk-682d94="">
          <ShopLookbook eyebrow="Lookbook · N° 04" title="A Sunday *uniform*" text="Linen, canvas and stoneware: three pieces that make a slow morning feel deliberate." media={{ icon: 'jacket', hue: 26 }} spots={look} {...money} />
        </div>
      
        <ShopValuesMarquee values={store.values} />
      
        <div className="forma-wrap section-space" data-rk-682d94="">
          <ShopReviewsEditorial score={4.9} count={1284} reviews={store.reviews} />
        </div>
      
        <ShopNewsletterEditorial variant="accent" />
      </EditorialLayout>
    </>
  );
}

export default EditorialHomePage;
