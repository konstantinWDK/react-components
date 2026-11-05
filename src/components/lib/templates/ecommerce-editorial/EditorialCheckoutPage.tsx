'use client';

import { useEffect, useRef } from 'react';
import EditorialLayout from './EditorialLayout';
import CheckoutForm from '../../ecommerce/CheckoutForm';
import OrderSummary from '../../ecommerce/OrderSummary';
import { formaStore, editorialRoutes, type EditorialStore, type EditorialRoutes } from './data';
import './EditorialCheckoutPage.css';

/**
 * EditorialCheckoutPage — Split-screen checkout in focus mode: CheckoutForm on the paper side,
 * a full-height tinted panel with OrderSummary (promo codes, shipping, total) on the other.
 *
 * Usage (app/checkout/page.tsx, Next.js):
 *   import { EditorialCheckoutPage } from 'react-component-kit-ui/templates/ecommerce-editorial';
 *   <EditorialCheckoutPage />
 *
 * @param {EditorialStore} store - Catalogue and settings.
 * @param {EditorialRoutes} routes - Page URLs.
 * @param {string} theme - Initial theme (light|dark|auto). Default 'light'.
 * @param {boolean} seedCart - Pre-fill the bag with demo items. Default false.
 * @param {boolean} noindex - Add robots noindex. Default true.
 */
export interface EditorialCheckoutPageProps {
  store?: EditorialStore;
  routes?: EditorialRoutes;
  theme?: 'light' | 'dark' | 'auto';
  seedCart?: boolean;
  noindex?: boolean;
}

export function EditorialCheckoutPage({ store = formaStore, routes = editorialRoutes, theme = 'light', seedCart = false, noindex = true }: EditorialCheckoutPageProps) {

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.addEventListener('ack:order-placed', () => {
        const steps = document.querySelectorAll<HTMLElement>('.co-steps li');
        steps.forEach((li, i) => {
          const el = li.firstElementChild as HTMLElement | null;
          if (!el) return;
          if (i === steps.length - 1) el.setAttribute('aria-current', 'step');
          else el.removeAttribute('aria-current');
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <EditorialLayout title="Checkout" description={`Secure checkout — ${store.name}`} store={store} routes={routes} theme={theme} seedCart={seedCart} noindex={noindex} minimal>
        <div className="co-split" data-rk-b907d6="">
          <div className="co-split__form" data-rk-b907d6="">
            <div className="co-split__inner" data-rk-b907d6="">
            <nav className="co-steps" aria-label="Checkout steps" data-rk-b907d6="">
              <ol data-rk-b907d6="">
                <li data-rk-b907d6=""><a href={routes.bag} data-rk-b907d6="">Bag</a></li>
                <li data-rk-b907d6=""><span aria-current="step" data-rk-b907d6="">Details &amp; payment</span></li>
                <li data-rk-b907d6=""><span data-rk-b907d6="">Confirmation</span></li>
              </ol>
            </nav>
            <h1 className="co-title" data-rk-b907d6="">Checkout</h1>
            <CheckoutForm id="checkout" variant="plain" shippingRates={store.shippingRates} freeShippingThreshold={store.freeShippingThreshold} countries={[
                { label: 'Spain', value: 'ES' },
                { label: 'Portugal', value: 'PT' },
                { label: 'France', value: 'FR' },
                { label: 'Germany', value: 'DE' },
                { label: 'Italy', value: 'IT' },
                { label: 'United Kingdom', value: 'GB' },
              ]} cartKey={store.cartKey} currency={store.currency} locale={store.locale} continueHref={routes.home} />
            </div>
          </div>
          <div className="co-split__summary" data-rk-b907d6="">
            <OrderSummary title="In your bag" variant="plain" cartKey={store.cartKey} shippingRates={store.shippingRates} freeShippingThreshold={store.freeShippingThreshold} taxRate={store.taxRate} promoCodes={store.promoCodes} editHref={routes.bag} currency={store.currency} locale={store.locale} />
          </div>
        </div>
      </EditorialLayout>
    </>
  );
}

export default EditorialCheckoutPage;
