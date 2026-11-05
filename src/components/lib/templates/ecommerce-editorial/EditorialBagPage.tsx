'use client';

import EditorialLayout from './EditorialLayout';
import CartPageList from '../../ecommerce/CartPageList';
import ShopProductRail from '../../sections/ShopProductRail';
import { formaStore, editorialRoutes, pickEditorial, type EditorialStore, type EditorialRoutes } from './data';
import './EditorialBagPage.css';

/**
 * EditorialBagPage — Full shopping-bag page (CartPageList) with gift note and summary,
 * followed by a "You may also like" ShopProductRail.
 *
 * Usage (src/pages/bag.astro):
 *   import { EditorialBagPage } from 'astro-component-kit/templates/ecommerce-editorial';
 *   <EditorialBagPage />
 *
 * @param {EditorialStore} store - Catalogue and settings.
 * @param {EditorialRoutes} routes - Page URLs.
 * @param {string} theme - Initial theme (light|dark|auto). Default 'light'.
 * @param {boolean} seedCart - Pre-fill the bag with demo items. Default false.
 * @param {boolean} noindex - Add robots noindex. Default true (bag pages should not be indexed).
 */
export interface EditorialBagPageProps {
  store?: EditorialStore;
  routes?: EditorialRoutes;
  theme?: 'light' | 'dark' | 'auto';
  seedCart?: boolean;
  noindex?: boolean;
}

export function EditorialBagPage({ store = formaStore, routes = editorialRoutes, theme = 'light', seedCart = false, noindex = true }: EditorialBagPageProps) {
  const suggestions = pickEditorial(store, ['kiln-mug', 'organic-tee', 'acetate-frames', 'paper-lamp', 'canvas-runner']);
  return (
    <>
      <EditorialLayout title="Your bag" description={`Your bag — ${store.name}`} store={store} routes={routes} currentHref={routes.bag} theme={theme} seedCart={seedCart} noindex={noindex}>
        <div className="forma-wrap bag-page" data-rk-566985="">
          <CartPageList cartKey={store.cartKey} checkoutHref={routes.checkout} continueHref={routes.shop} freeShippingThreshold={store.freeShippingThreshold} shippingFlat={store.shippingFlat} currency={store.currency} locale={store.locale} />
        </div>
        <div className="forma-wrap section-space" data-rk-566985="">
          <ShopProductRail eyebrow="Before you go" title="You may also *like*" products={suggestions} productBase={routes.product} link={{ label: 'Shop all', href: routes.shop }} id="bag-rail" size="sm" currency={store.currency} locale={store.locale} cartKey={store.cartKey} />
        </div>
      </EditorialLayout>
    </>
  );
}

export default EditorialBagPage;
