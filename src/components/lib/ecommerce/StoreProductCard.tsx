'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import ProductMedia from './ProductMedia';
import ProductRating from './ProductRating';
import Badge from '../feedback/Badge';
import { formatMoney } from './cart-store';
import type { Product } from './types';
import { bindAddToCart } from './cart-store';
import './StoreProductCard.css';

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
 * StoreProductCard — Shop product tile with media, badge, rating, colour swatches,
 * price (with compare-at), wishlist toggle and an add-to-cart button wired to the cart store.
 *
 * @param {Product} product - Product data (see ecommerce/types.ts). A demo product is used by default.
 * @param {string} href - Product page URL. Default '#'.
 * @param {string} categoryLabel - Small label above the title (e.g. category name).
 * @param {string} currency - ISO currency. Default 'USD'.
 * @param {string} locale - Number format locale. Default 'en-US'.
 * @param {string} ctaLabel - Add-to-cart label. Default 'Add to cart'.
 * @param {string} addedLabel - Label shown briefly after adding. Default 'Added'.
 * @param {string} cartKey - Cart storage key (several stores on one domain). Default 'ack-cart'.
 * @param {boolean} openCart - Open the CartDrawer after adding; false fires a CartToast instead. Default true.
 * @param {string} variant - Visual style (glass|minimal|bordered). Default 'glass'.
 * @param {string} size - Card density (sm|md|lg). Default 'md'.
 * @param {string} headingLevel - Title element (h2|h3|h4). Default 'h3'.
 * @param {string} className - Extra class.
 *
 * Accessibility: the title link covers the whole card (stretched link) so there are no
 * nested interactive elements; wishlist uses aria-pressed; out-of-stock disables the button.
 */
export interface StoreProductCardProps {
  product?: Product;
  href?: string;
  categoryLabel?: string;
  currency?: string;
  locale?: string;
  ctaLabel?: string;
  addedLabel?: string;
  cartKey?: string;
  openCart?: boolean;
  variant?: 'glass' | 'minimal' | 'bordered';
  size?: 'sm' | 'md' | 'lg';
  headingLevel?: 'h2' | 'h3' | 'h4';
  className?: string;
}

export function StoreProductCard({
  product = {
    slug: 'aurora-headphones',
    name: 'Aurora Wireless Headphones',
    price: 189,
    compareAt: 229,
    category: 'audio',
    rating: 4.8,
    reviews: 312,
    badge: '-18%',
    badgeVariant: 'warning',
    colors: [{ name: 'Graphite', hex: '#2b2b2f' }, { name: 'Sand', hex: '#d8c3a5' }, { name: 'Ocean', hex: '#3d6f9e' }],
    icon: 'headphones',
    hue: 38,
    inStock: true,
  },
  href = '#',
  categoryLabel = 'Audio',
  currency = 'USD',
  locale = 'en-US',
  ctaLabel = 'Add to cart',
  addedLabel = 'Added',
  cartKey = 'ack-cart',
  openCart = true,
  variant = 'glass',
  size = 'md',
  headingLevel = 'h3',
  className = '',
}: StoreProductCardProps) {
  const Heading: any = headingLevel;
  const money = { currency, locale };
  const inStock = product.inStock !== false;
  const cartPayload = JSON.stringify({
    id: product.slug,
    name: product.name,
    price: product.price,
    icon: product.icon,
    hue: product.hue,
    image: product.image,
    variant: product.colors?.[0]?.name,
  });
  const titleId = `spc-${product.slug}`;

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    function init() {
        bindAddToCart(document);
        document.querySelectorAll<HTMLButtonElement>('[data-wishlist]:not([data-wish-bound])').forEach((btn) => {
          btn.dataset.wishBound = '';
          btn.addEventListener('click', () => {
            btn.setAttribute('aria-pressed', String(btn.getAttribute('aria-pressed') !== 'true'));
          });
        });
      }
      init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <article className={cx(['sp-card', `sp-card--${variant}`, `sp-card--${size}`, 'is-hoverable', className])} aria-labelledby={titleId} data-product data-name={product.name.toLowerCase()} data-category={product.category} data-price={product.price} data-rating={product.rating ?? 0} data-colors={(product.colors ?? []).map((c) => c.name.toLowerCase()).join(',')} data-stock={inStock ? 'in' : 'out'} data-rk-82d407="">
        <div className="sp-card__media" data-rk-82d407="">
          <ProductMedia image={product.image} alt={product.name} icon={product.icon} hue={product.hue} />
          {product.badge && (
            <div className="sp-card__badge" data-rk-82d407=""><Badge variant={product.badgeVariant ?? 'default'}>{product.badge}</Badge></div>
          )}
          <button className="sp-card__wish" type="button" aria-pressed="false" aria-label={`Save ${product.name} to wishlist`} data-wishlist data-rk-82d407="">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-rk-82d407=""><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" data-rk-82d407="" /></svg>
          </button>
        </div>
      
        <div className="sp-card__body" data-rk-82d407="">
          {categoryLabel && <p className="sp-card__cat" data-rk-82d407="">{categoryLabel}</p>}
          <Heading className="sp-card__title" id={titleId} data-rk-82d407="">
            <a className="sp-card__link" href={href} data-rk-82d407="">{product.name}</a>
          </Heading>
          {product.rating !== undefined && <ProductRating value={product.rating} count={product.reviews} />}
      
          {product.colors && product.colors.length > 0 && (
            <ul className="sp-card__swatches" aria-label={`Colours: ${product.colors.map((c) => c.name).join(', ')}`} data-rk-82d407="">
              {product.colors.slice(0, 4).map((c, __i: number) => (
                <li key={__i} className="sp-card__swatch" style={st(`--sw: ${c.hex}`)} title={c.name} data-rk-82d407="" />
              ))}
              {product.colors.length > 4 && <li className="sp-card__swatch-more" data-rk-82d407="">+{product.colors.length - 4}</li>}
            </ul>
          )}
      
          <div className="sp-card__foot" data-rk-82d407="">
            <p className="sp-card__price" data-rk-82d407="">
              <span className="sp-card__now" data-rk-82d407="">{formatMoney(product.price, money)}</span>
              {product.compareAt && (
                <s className="sp-card__was" data-rk-82d407=""><span className="sr-only" data-rk-82d407="">Was </span>{formatMoney(product.compareAt, money)}</s>
              )}
            </p>
            <button className="sp-card__add" type="button" data-add-to-cart={cartPayload} data-cart-key={cartKey} data-open-cart={openCart ? undefined : 'false'} data-added-label={addedLabel} disabled={!inStock} aria-label={inStock ? `${ctaLabel}: ${product.name}` : `${product.name} is sold out`} data-rk-82d407="">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-rk-82d407=""><path d="M6 6h15l-1.5 9h-12z" data-rk-82d407="" /><path d="M6 6 5 3H2" data-rk-82d407="" /><circle cx="9" cy="20" r="1.4" data-rk-82d407="" /><circle cx="18" cy="20" r="1.4" data-rk-82d407="" /></svg>
              <span data-label data-rk-82d407="">{inStock ? ctaLabel : 'Sold out'}</span>
            </button>
          </div>
        </div>
      </article>
    </>
  );
}

export default StoreProductCard;
