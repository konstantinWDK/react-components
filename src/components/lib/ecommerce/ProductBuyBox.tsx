'use client';

import { useEffect, useRef } from 'react';
import Badge from '../feedback/Badge';
import StepperInput from '../forms/StepperInput';
import ProductRating from './ProductRating';
import VariantPicker from './VariantPicker';
import TrustBadges from './TrustBadges';
import StockIndicator from './StockIndicator';
import { formatMoney } from './cart-store';
import type { Product } from './types';
import { bindAddToCart } from './cart-store';
import './ProductBuyBox.css';

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

/**
 * ProductBuyBox — Product detail purchase panel: title, rating, price, colour/size pickers,
 * quantity (StepperInput), add to cart, buy now, guarantees and expandable details.
 *
 * @param {Product} product - Product data. A demo product is used by default.
 * @param {string} categoryLabel - Eyebrow text (e.g. the category name).
 * @param {string} checkoutHref - Where "Buy now" goes after adding the item. Default '#'.
 * @param {Array<{title: string, body: string}>} details - Expandable sections (materials, shipping…).
 * @param {string} currency - ISO currency. Default 'USD'.
 * @param {string} locale - Number format locale. Default 'en-US'.
 * @param {string} cartKey - Cart storage key. Default 'ack-cart'.
 * @param {string} id - Base id for inner controls. Default 'buy-box'.
 * @param {string} variant - Style (plain|glass). Default 'plain'.
 * @param {string} size - Type scale (md|lg). Default 'md'.
 * @param {string} className - Extra class.
 *
 * Accessibility: one h1 with the product name; pickers are radio groups; details use native
 * <details>/<summary>; sold-out state disables the buttons and says so in text.
 */
export interface ProductBuyBoxProps {
  product?: Product;
  categoryLabel?: string;
  checkoutHref?: string;
  details?: Array<{ title: string; body: string }>;
  currency?: string;
  locale?: string;
  cartKey?: string;
  id?: string;
  variant?: 'plain' | 'glass';
  size?: 'md' | 'lg';
  className?: string;
}

export function ProductBuyBox({
  product = {
    slug: 'aurora-headphones',
    name: 'Aurora Wireless Headphones',
    price: 189,
    compareAt: 229,
    category: 'audio',
    rating: 4.8,
    reviews: 312,
    badge: 'Bestseller',
    badgeVariant: 'warning',
    colors: [{ name: 'Graphite', hex: '#2b2b2f' }, { name: 'Sand', hex: '#d8c3a5' }, { name: 'Ocean', hex: '#3d6f9e' }],
    icon: 'headphones',
    hue: 38,
    description: 'Adaptive noise cancelling, 40-hour battery and memory-foam cushions that disappear after five minutes. Tuned in-house for a warm, detailed sound.',
    inStock: true,
  },
  categoryLabel = 'Audio',
  checkoutHref = '#',
  details = [
    { title: 'Features', body: 'Hybrid ANC with transparency mode · Bluetooth 5.4 multipoint · USB-C fast charge (10 min = 5 h) · Foldable aluminium frame.' },
    { title: 'Shipping & returns', body: 'Free standard shipping over $75, delivered in 2–4 business days. Return anything within 30 days for a full refund.' },
    { title: 'Warranty', body: 'Two-year limited warranty covering manufacturing defects, with free repair or replacement.' },
  ],
  currency = 'USD',
  locale = 'en-US',
  cartKey = 'ack-cart',
  id = 'buy-box',
  variant = 'plain',
  size = 'md',
  className = '',
}: ProductBuyBoxProps) {
  const money = { currency, locale };
  const inStock = product.inStock !== false;
  const saving = product.compareAt ? Math.round((1 - product.price / product.compareAt) * 100) : 0;
  const payload = JSON.stringify({ id: product.slug, name: product.name, price: product.price, icon: product.icon, hue: product.hue, image: product.image });
  const addId = `${id}-add`;

  // Ported from the Astro <script>: runs once after mount (DOM logic kept as in the Astro kit).
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    bindAddToCart(document);
      document.querySelectorAll<HTMLAnchorElement>('[data-buy-now]').forEach((link) => {
        link.addEventListener('click', (e) => {
          const btn = document.getElementById(link.dataset.buyNow || '') as HTMLButtonElement | null;
          if (!btn || btn.disabled) return;
          e.preventDefault();
          btn.dataset.openCart = 'false';
          btn.click();
          window.location.href = link.href;
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={cx(['buy-box', `buy-box--${variant}`, `buy-box--${size}`, className])} data-rk-ed869a="">
        <div className="buy-box__top" data-rk-ed869a="">
          {categoryLabel && <p className="buy-box__cat" data-rk-ed869a="">{categoryLabel}</p>}
          {product.badge && <Badge variant={product.badgeVariant ?? 'default'}>{product.badge}</Badge>}
        </div>
        <h1 className="buy-box__title" data-rk-ed869a="">{product.name}</h1>
        {product.rating !== undefined && (
          <a className="buy-box__rating" href="#reviews" data-rk-ed869a="">
            <ProductRating value={product.rating} count={product.reviews} size="md" />
          </a>
        )}
      
        <p className="buy-box__price" data-rk-ed869a="">
          <span className="buy-box__now" data-rk-ed869a="">{formatMoney(product.price, money)}</span>
          {product.compareAt && <s className="buy-box__was" data-rk-ed869a=""><span className="sr-only" data-rk-ed869a="">Was </span>{formatMoney(product.compareAt, money)}</s>}
          {saving > 0 && <span className="buy-box__save" data-rk-ed869a="">Save {saving}%</span>}
        </p>
        {product.description && <p className="buy-box__desc" data-rk-ed869a="">{product.description}</p>}
      
        <div className="buy-box__pickers" data-rk-ed869a="">
          {product.colors && product.colors.length > 0 && (
            <VariantPicker label="Colour" name={`${id}-color`} type="swatch" target={addId} options={product.colors.map((c) => ({ label: c.name, hex: c.hex }))} />
          )}
          {product.sizes && product.sizes.length > 0 && (
            <VariantPicker label="Size" name={`${id}-size`} type="pill" target={addId} options={product.sizes.map((s) => ({ label: s }))} />
          )}
        </div>
      
        <div className="buy-box__actions" data-rk-ed869a="">
          <StepperInput id={`${id}-qty`} name="qty" value={1} min={1} max={10} />
          <button className="buy-box__add" id={addId} type="button" data-add-to-cart={payload} data-cart-key={cartKey} data-qty-from={`${id}-qty`} data-added-label="Added to cart" disabled={!inStock} data-rk-ed869a="">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-rk-ed869a=""><path d="M6 7h12l-1 13H7z" data-rk-ed869a="" /><path d="M9 7V6a3 3 0 0 1 6 0v1" data-rk-ed869a="" /></svg>
            <span data-label data-rk-ed869a="">{inStock ? 'Add to cart' : 'Sold out'}</span>
          </button>
        </div>
        {inStock && (
          <a className="buy-box__buy" href={checkoutHref} data-buy-now={addId} data-rk-ed869a="">Buy now</a>
        )}
      
        {inStock && product.stock !== undefined && product.stock <= 5 ? (
          <StockIndicator stock={product.stock} viewers={8 + (product.reviews ?? 0) % 17} />
        ) : (
          <p className="buy-box__stock" data-in={inStock ? '' : undefined} data-rk-ed869a="">
            <span aria-hidden="true" data-rk-ed869a=""></span>{inStock ? 'In stock — ships in 24 hours' : 'Out of stock — back soon'}
          </p>
        )}
      
        <TrustBadges variant="inline" size="sm" items={[
          { icon: 'truck', title: 'Free shipping', text: 'Over $75' },
          { icon: 'return', title: '30-day returns', text: 'Free & easy' },
        ]} />
      
        {details.length > 0 && (
          <div className="buy-box__details" data-rk-ed869a="">
            {details.map((d, i) => (
              <details key={i} open={i === 0} data-rk-ed869a="">
                <summary data-rk-ed869a="">{d.title}</summary>
                <p data-rk-ed869a="">{d.body}</p>
              </details>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default ProductBuyBox;
