'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import '../../../../styles/global.css';
import ShopHeaderEditorial from '../../sections/ShopHeaderEditorial';
import ShopFooterWordmark from '../../sections/ShopFooterWordmark';
import CartToast from '../../ecommerce/CartToast';
import { formaStore, editorialRoutes, editorialCategoryHref, type EditorialStore, type EditorialRoutes } from './data';
import { createCart } from '../../ecommerce/cart-store';
import './EditorialLayout.css';

/**
 * EditorialLayout — Full HTML document for the editorial e-commerce template: ShopHeaderEditorial
 * with mega menu, main slot, ShopFooterWordmark and CartToast. Owns the "Forma" look through
 * design tokens: serif display font, square corners, terracotta accent, light + dark palettes.
 *
 * @param {string} title - Page title (store name is appended).
 * @param {string} description - Meta description.
 * @param {EditorialStore} store - Catalogue and settings. Default: Forma demo store.
 * @param {EditorialRoutes} routes - Page URLs.
 * @param {string} currentHref - Highlights the matching menu link.
 * @param {string} theme - Initial theme (light|dark|auto). The header toggle overrides it per visitor. Default 'light'.
 * @param {boolean} seedCart - Pre-fill an empty bag with demo items (previews only). Default false.
 * @param {boolean} noindex - Add robots noindex. Default false.
 * @param {boolean} minimal - Hide the menu and footer columns (checkout focus mode). Default false.
 * @param {string} lang - Document language. Default 'en'.
 */
export interface EditorialLayoutProps {
  title: string;
  description?: string;
  store?: EditorialStore;
  routes?: EditorialRoutes;
  currentHref?: string;
  theme?: 'light' | 'dark' | 'auto';
  seedCart?: boolean;
  noindex?: boolean;
  minimal?: boolean;
  lang?: string;
  children?: ReactNode;
  head?: ReactNode;
}

export function EditorialLayout({
  title,
  description,
  store = formaStore,
  routes = editorialRoutes,
  currentHref,
  theme = 'light',
  seedCart = false,
  noindex = false,
  minimal = false,
  lang = 'en',
  children,
  head
}: EditorialLayoutProps) {
  const fullTitle = title.includes(store.name) ? title : `${title} — ${store.name} Studio`;
  const half = Math.ceil(store.categories.length / 2);
  const links = [
    {
      label: 'Shop',
      href: routes.shop,
      columns: [
        { title: 'Categories', links: store.categories.slice(0, half).map((c) => ({ label: c.name, href: editorialCategoryHref(routes, c.id) })) },
        { title: 'More', links: store.categories.slice(half).map((c) => ({ label: c.name, href: editorialCategoryHref(routes, c.id) })) },
        { title: 'Edits', links: [{ label: 'New in', href: `${routes.shop}?sort=featured` }, { label: 'Under €100', href: `${routes.shop}?sort=price-asc` }, { label: 'Gifts', href: routes.shop }] },
      ],
      feature: { title: 'The Autumn edit', text: 'Warm, quiet pieces for the colder months.', href: `${routes.product}wool-overcoat/`, icon: 'jacket', hue: 18 },
    },
    { label: 'New in', href: `${routes.shop}?sort=featured` },
    { label: 'Objects', href: editorialCategoryHref(routes, 'objects') },
  ];
  const seed = seedCart
    ? [
        { id: 'linen-overshirt::Oat / M', name: 'Linen Overshirt', price: 145, qty: 1, variant: 'Oat / M', icon: 'shirt' as const, hue: 30 },
        { id: 'kiln-mug::Clay', name: 'Kiln Mug', price: 32, qty: 2, variant: 'Clay', icon: 'mug' as const, hue: 14 },
      ]
    : [];
  const footerColumns = [
    { title: 'Shop', links: store.categories.map((c) => ({ label: c.name, href: editorialCategoryHref(routes, c.id) })) },
    { title: 'Care', links: [{ label: 'Shipping', href: '#' }, { label: 'Returns', href: '#' }, { label: 'Repairs', href: '#' }, { label: 'Size guide', href: '#' }] },
    { title: 'Studio', links: [{ label: 'About', href: '#' }, { label: 'Journal', href: '#' }, { label: 'Stockists', href: '#' }] },
  ];

  // Ported from the Astro <script>: runs once after mount (DOM logic kept as in the Astro kit).
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    // <html>/<body> attributes of the Astro layout
    if (!document.documentElement.hasAttribute("lang")) document.documentElement.setAttribute("lang", String((lang)));
    document.documentElement.classList.add(...String("theme-forma").split(/\s+/).filter(Boolean));
    if (!document.documentElement.hasAttribute("data-theme")) document.documentElement.setAttribute("data-theme", String((theme === 'auto' ? 'light' : theme)));
    document.body.classList.add(...String("forma").split(/\s+/).filter(Boolean));

    const { initial }: Record<string, any> = { initial: theme };
    
          (function () {
            var t = initial;
            try { t = localStorage.getItem('ack-theme') || t; } catch (e) {}
            if (t === 'auto') t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            document.documentElement.dataset.theme = t;
          })();

    // Demo seed (previews) + "View bag" goes to the bag page instead of a drawer.
      const seed = document.querySelector<HTMLElement>('[data-forma-seed]');
      if (seed) { try { createCart(seed.dataset.key).seed(JSON.parse(seed.dataset.formaSeed || '[]')); } catch { /* ignore */ } }
      document.addEventListener('ack:cart-open', () => {
        const bag = document.querySelector<HTMLAnchorElement>('a[data-bag-link]');
        if (bag) window.location.href = bag.href;
      });
    
      // Expose the header height so sticky toolbars sit right under it.
      const header = document.querySelector<HTMLElement>('[data-shop-header]');
      const setH = () => { if (header) document.documentElement.style.setProperty('--shop-header-h', `${header.offsetHeight}px`); };
      setH();
      window.addEventListener('resize', setH);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <>
        <>
          
          
          <title data-rk-759955="">{fullTitle}</title>
          {description && <meta name="description" content={description} data-rk-759955="" />}
          {noindex && <meta name="robots" content="noindex, follow" data-rk-759955="" />}
          <link rel="preconnect" href="https://fonts.googleapis.com" data-rk-759955="" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" data-rk-759955="" />
          <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..600&display=swap" rel="stylesheet" data-rk-759955="" />
          
          {head}
        </>
        <>
          <a className="forma__skip" href="#main" data-rk-759955="">Skip to content</a>
          <ShopHeaderEditorial brand={store.name} brandHref={routes.home} announcement={minimal ? '' : store.announcement} links={minimal ? [] : links} searchHref={minimal ? '' : routes.shop} bagHref={routes.bag} cartKey={store.cartKey} currentHref={currentHref} data-rk-759955="" />
          <main id="main" className="forma__main" tabIndex={-1} data-rk-759955="">
            {children}
          </main>
          <ShopFooterWordmark brand={store.name} brandHref={routes.home} columns={minimal ? [] : footerColumns} contact={minimal ? undefined : store.contact} copyright={`© ${new Date().getFullYear()} ${store.name} Studio · Demo store built with React Components Kit`} />
          <CartToast cartKey={store.cartKey} position="bottom-right" actionLabel="View bag" addedTitle="Added to bag" />
          {seed.length > 0 && <div hidden data-forma-seed={JSON.stringify(seed)} data-key={store.cartKey} data-rk-759955=""></div>}
        </>
      </>
    </>
  );
}

export default EditorialLayout;
