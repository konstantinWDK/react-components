'use client';

import { useEffect, useRef } from 'react';
import StoreLayout from './StoreLayout';
import StepBreadcrumbBar from '../../navigation/StepBreadcrumbBar';
import CheckoutForm from '../../ecommerce/CheckoutForm';
import OrderSummary from '../../ecommerce/OrderSummary';
import { demoStore, defaultRoutes, type StoreConfig, type StoreRoutes } from './data';
import './StoreCheckoutPage.css';

/**
 * StoreCheckoutPage — E-commerce template checkout in focus mode: StepBreadcrumbBar,
 * CheckoutForm (contact, delivery, shipping, payment) and a live OrderSummary.
 *
 * Usage (app/checkout/page.tsx, Next.js):
 *   import { StoreCheckoutPage } from 'react-component-kit-ui/templates/ecommerce';
 *   <StoreCheckoutPage />
 *
 * @param {StoreConfig} store - Catalogue and settings. Default: demo store.
 * @param {StoreRoutes} routes - Page URLs.
 * @param {boolean} seedCart - Pre-fill the cart with demo items. Default false.
 * @param {string} theme - Initial theme (dark|light|auto). Default 'dark'.
 * @param {boolean} noindex - Add robots noindex. Default true (checkout pages should not be indexed).
 */
export interface StoreCheckoutPageProps {
  store?: StoreConfig;
  routes?: StoreRoutes;
  seedCart?: boolean;
  noindex?: boolean;
  theme?: 'dark' | 'light' | 'auto';
}

export function StoreCheckoutPage({ store = demoStore, routes = defaultRoutes, seedCart = false, noindex = true, theme = 'dark' }: StoreCheckoutPageProps) {

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    // Move the step bar to "Confirmation" once the order is placed.
      document.addEventListener('ack:order-placed', () => {
        const items = Array.from(document.querySelectorAll<HTMLElement>('[data-co-steps] .step-nav__item'));
        items.forEach((item, i) => {
          item.classList.remove('step-nav__item--active', 'step-nav__item--upcoming');
          item.classList.add(i === items.length - 1 ? 'step-nav__item--active' : 'step-nav__item--complete');
          const link = item.querySelector('a');
          if (i === items.length - 1) link?.setAttribute('aria-current', 'step');
          else link?.removeAttribute('aria-current');
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <StoreLayout theme={theme} title="Checkout" description={`Secure checkout — ${store.name}`} store={store} routes={routes} seedCart={seedCart} noindex={noindex} minimal>
        <div className="store-container co" data-rk-2b1a8c="">
          <div className="co__steps" data-co-steps data-rk-2b1a8c="">
            <StepBreadcrumbBar steps={[
                { step: 1, label: 'Cart', status: 'complete', href: routes.shop },
                { step: 2, label: 'Details & payment', status: 'active', href: '#checkout' },
                { step: 3, label: 'Confirmation', status: 'upcoming', href: '#checkout' },
              ]} />
          </div>
      
          <div className="co__head" data-rk-2b1a8c="">
            <h1 data-rk-2b1a8c="">Checkout</h1>
            <a href={routes.shop} data-rk-2b1a8c=""><span aria-hidden="true" data-rk-2b1a8c="">←</span> Continue shopping</a>
          </div>
      
          <div className="co__layout" data-rk-2b1a8c="">
            <CheckoutForm id="checkout" shippingRates={store.shippingRates} freeShippingThreshold={store.freeShippingThreshold} cartKey={store.cartKey} currency={store.currency} locale={store.locale} continueHref={routes.home} />
            <OrderSummary cartKey={store.cartKey} shippingRates={store.shippingRates} freeShippingThreshold={store.freeShippingThreshold} taxRate={store.taxRate} promoCodes={store.promoCodes} currency={store.currency} locale={store.locale} />
          </div>
        </div>
      </StoreLayout>
    </>
  );
}

export default StoreCheckoutPage;
