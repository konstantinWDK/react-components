'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import '../../../../styles/global.css';
import PromoBar from '../../ecommerce/PromoBar';
import StoreHeader from '../../ecommerce/StoreHeader';
import CartDrawer from '../../ecommerce/CartDrawer';
import FooterMegaSection from '../../sections/FooterMegaSection';
import CartToast from '../../ecommerce/CartToast';
import LiveActivityToast from '../../ecommerce/LiveActivityToast';
import { demoStore, defaultRoutes, categoryHref, type StoreConfig, type StoreRoutes } from './data';
import './StoreLayout.css';

/**
 * StoreLayout — Full HTML document for the e-commerce template: promo bar, StoreHeader with
 * category menu, CartDrawer, main content slot and FooterMegaSection.
 *
 * @param {string} title - Page title (store name is appended).
 * @param {string} description - Meta description.
 * @param {StoreConfig} store - Catalogue and settings. Default: the demo store.
 * @param {StoreRoutes} routes - Page URLs. Default: '/', '/shop/', '/product/', '/checkout/'.
 * @param {string} currentHref - Highlights the matching menu link.
 * @param {boolean} seedCart - Pre-fill an empty cart with two demo items (previews only). Default false.
 * @param {boolean} noindex - Add robots noindex (previews, staging). Default false.
 * @param {boolean} minimal - Hide promo bar and menu (checkout focus mode). Default false.
 * @param {string} lang - Document language. Default 'en'.
 * @param {string} theme - Initial theme (dark|light|auto). The header toggle overrides it per visitor. Default 'dark'.
 * @param {boolean} liveActivity - Show rotating recent-purchase notices (store.recentBuyers). Default false.
 * @param {boolean} themeToggle - Show the light/dark toggle in the header. Default true.
 *
 * Slots: default (page content), `head` (extra tags in <head>).
 */
export interface StoreLayoutProps {
  title: string;
  description?: string;
  store?: StoreConfig;
  routes?: StoreRoutes;
  currentHref?: string;
  seedCart?: boolean;
  noindex?: boolean;
  minimal?: boolean;
  lang?: string;
  theme?: 'dark' | 'light' | 'auto';
  themeToggle?: boolean;
  liveActivity?: boolean;
  children?: ReactNode;
  head?: ReactNode;
}

export function StoreLayout({
  title,
  description,
  store = demoStore,
  routes = defaultRoutes,
  currentHref,
  seedCart = false,
  noindex = false,
  minimal = false,
  lang = 'en',
  theme = 'dark',
  themeToggle = true,
  liveActivity = false,
  children,
  head
}: StoreLayoutProps) {
  const fullTitle = title.includes(store.name) ? title : `${title} — ${store.name}`;
  const links = [
    {
      label: 'Shop',
      href: routes.shop,
      children: store.categories.map((c) => ({ label: c.name, href: categoryHref(routes, c.id), description: c.description })),
    },
    { label: 'New in', href: `${routes.shop}?sort=featured` },
    { label: 'Top rated', href: `${routes.shop}?sort=rating` },
    { label: 'Sale', href: `${routes.shop}?sort=price-asc` },
  ];
  const seed = seedCart
    ? store.products.slice(0, 1).concat(store.products.filter((p) => p.slug === 'ember-mug')).map((p, i) => ({
        id: p.colors?.[0] ? `${p.slug}::${p.colors[0].name}` : p.slug,
        name: p.name,
        price: p.price,
        qty: i === 0 ? 1 : 2,
        variant: p.colors?.[0]?.name,
        icon: p.icon,
        hue: p.hue,
      }))
    : [];
  const activity = liveActivity
    ? store.recentBuyers
        .map((b) => {
          const p = store.products.find((x) => x.slug === b.product);
          return p ? { name: b.name, city: b.city, ago: b.ago, product: p.name, href: `${routes.product}${p.slug}/`, icon: p.icon, hue: p.hue } : null;
        })
        .filter((x): x is NonNullable<typeof x> => Boolean(x))
    : [];
  const footer = [
    { title: 'Shop', links: store.categories.map((c) => ({ label: c.name, href: categoryHref(routes, c.id) })) },
    ...store.footer.slice(1),
  ];

  // Ported from the Astro <script>: runs once after mount (DOM logic kept as in the Astro kit).
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    // <html>/<body> attributes of the Astro layout
    if (!document.documentElement.hasAttribute("lang")) document.documentElement.setAttribute("lang", String((lang)));
    if (!document.documentElement.hasAttribute("data-theme")) document.documentElement.setAttribute("data-theme", String((theme === 'auto' ? 'dark' : theme)));
    document.body.classList.add(...String("store").split(/\s+/).filter(Boolean));

    const { initial, allowToggle }: Record<string, any> = { initial: theme, allowToggle: themeToggle };
    
          (function () {
            var t = initial;
            try { if (allowToggle) t = localStorage.getItem('ack-theme') || t; } catch (e) {}
            if (t === 'auto') t = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
            document.documentElement.dataset.theme = t;
          })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <>
        <>
          
          
          <title data-rk-47be70="">{fullTitle}</title>
          {description && <meta name="description" content={description} data-rk-47be70="" />}
          {noindex && <meta name="robots" content="noindex, follow" data-rk-47be70="" />}
          <meta name="theme-color" content={theme === 'light' ? '#f6f5f2' : '#050505'} data-rk-47be70="" />
          
          {head}
        </>
        <>
          <a className="store__skip" href="#main" data-rk-47be70="">Skip to content</a>
          {!minimal && <PromoBar messages={store.promoMessages} storageKey={`${store.cartKey}-promo`} data-rk-47be70="" />}
          <StoreHeader brand={store.name} brandHref={routes.home} links={minimal ? [] : links} searchAction={routes.shop} accountHref="" cartKey={store.cartKey} currentHref={currentHref} themeToggle={themeToggle} />
          <main id="main" className="store__main" tabIndex={-1} data-rk-47be70="">
            {children}
          </main>
          <FooterMegaSection brand={store.name} tagline={store.tagline} columns={footer} status="All orders shipping on time" copyright={`© ${new Date().getFullYear()} ${store.name}. Demo store built with React Components Kit.`} />
          <CartDrawer cartKey={store.cartKey} checkoutHref={routes.checkout} currency={store.currency} locale={store.locale} freeShippingThreshold={store.freeShippingThreshold} demoItems={seed} />
          <CartToast cartKey={store.cartKey} />
          {activity.length > 0 && <LiveActivityToast items={activity} storageKey={`${store.cartKey}-activity`} />}
        </>
      </>
    </>
  );
}

export default StoreLayout;
