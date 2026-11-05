'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import ProductMedia from './ProductMedia';
import { formatMoney } from './cart-store';
import type { Product } from './types';
import { bindAddToCart } from './cart-store';
import './ProductCardMinimal.css';

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
 * ProductCardMinimal — Editorial product card: tall media that swaps to a second view on hover,
 * quick-add size buttons, name, price and colour count. Square corners, typography-led.
 *
 * @param {Product} product - Product data. A demo product is used by default.
 * @param {string} href - Product page URL. Default '#'.
 * @param {number} index - Optional catalogue number shown as "N° 01".
 * @param {string} currency - ISO currency. Default 'EUR'.
 * @param {string} locale - Number format locale. Default 'en-GB'.
 * @param {string} cartKey - Cart storage key. Default 'ack-cart'.
 * @param {boolean} quickAdd - Show quick-add (sizes, or a single "Add" button). Default true.
 * @param {string} ratio - Media aspect ratio. Default '3 / 4'.
 * @param {string} variant - Style (plain|framed). Default 'plain'.
 * @param {string} size - Type scale (sm|md|lg). Default 'md'.
 * @param {string} headingLevel - Title element (h2|h3|h4). Default 'h3'.
 * @param {string} className - Extra class.
 *
 * Accessibility: the title is a stretched link; quick-add buttons sit above it with their own
 * labels ("Add size M"), are reachable by keyboard and appear on focus as well as hover.
 */
export interface ProductCardMinimalProps {
  product?: Product;
  href?: string;
  index?: number;
  currency?: string;
  locale?: string;
  cartKey?: string;
  quickAdd?: boolean;
  ratio?: string;
  variant?: 'plain' | 'framed';
  size?: 'sm' | 'md' | 'lg';
  headingLevel?: 'h2' | 'h3' | 'h4';
  className?: string;
}

export function ProductCardMinimal({
  product = {
    slug: 'linen-overshirt',
    name: 'Linen Overshirt',
    price: 145,
    category: 'clothing',
    badge: 'New',
    colors: [{ name: 'Oat', hex: '#d9cbb3' }, { name: 'Ink', hex: '#22252b' }, { name: 'Rust', hex: '#9c3d1c' }],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    icon: 'shirt',
    hue: 30,
  },
  href = '#',
  index,
  currency = 'EUR',
  locale = 'en-GB',
  cartKey = 'ack-cart',
  quickAdd = true,
  ratio = '3 / 4',
  variant = 'plain',
  size = 'md',
  headingLevel = 'h3',
  className = '',
}: ProductCardMinimalProps) {
  const Heading: any = headingLevel;
  const money = { currency, locale };
  const inStock = product.inStock !== false;
  const base = { id: product.slug, name: product.name, price: product.price, icon: product.icon, hue: product.hue, image: product.image };
  const color = product.colors?.[0]?.name;
  const titleId = `pcm-${product.slug}`;

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    bindAddToCart(document);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <article className={cx(['pcm', `pcm--${variant}`, `pcm--${size}`, className])} aria-labelledby={titleId} data-product data-name={product.name.toLowerCase()} data-category={product.category} data-price={product.price} data-rating={product.rating ?? 0} data-colors={(product.colors ?? []).map((c) => c.name.toLowerCase()).join(',')} data-stock={inStock ? 'in' : 'out'} data-rk-5864b0="">
        <div className="pcm__media" data-rk-5864b0="">
          <div className="pcm__view pcm__view--a" data-rk-5864b0="">
            <ProductMedia image={product.image} alt={product.name} icon={product.icon} hue={product.hue} ratio={ratio} variant="soft" size="lg" />
          </div>
          <div className="pcm__view pcm__view--b" aria-hidden="true" data-rk-5864b0="">
            <ProductMedia icon={product.icon} hue={(product.hue ?? 30) + 20} ratio={ratio} variant="glow" size="sm" />
          </div>
          {(product.badge || !inStock) && <span className="pcm__badge" data-rk-5864b0="">{inStock ? product.badge : 'Sold out'}</span>}
          {index !== undefined && <span className="pcm__index" aria-hidden="true" data-rk-5864b0="">N° {String(index).padStart(2, '0')}</span>}
      
          {quickAdd && inStock && (
            <div className="pcm__quick" role="group" aria-label={`Quick add ${product.name}`} data-rk-5864b0="">
              {product.sizes?.length ? (
                <>
                  <span className="pcm__quick-label" aria-hidden="true" data-rk-5864b0="">Quick add</span>
                  <div className="pcm__sizes" data-rk-5864b0="">
                    {product.sizes.map((s) => (
                      <button type="button" className="pcm__size" data-add-to-cart={JSON.stringify({ ...base, variant: [color, s].filter(Boolean).join(' / ') })} data-cart-key={cartKey} data-open-cart="false" aria-label={`Add ${product.name}, size ${s}`} data-rk-5864b0=""><span data-label data-rk-5864b0="">{s}</span></button>
                    ))}
                  </div>
                </>
              ) : (
                <button type="button" className="pcm__size pcm__size--wide" data-add-to-cart={JSON.stringify({ ...base, variant: color })} data-cart-key={cartKey} data-open-cart="false" data-added-label="Added" aria-label={`Add ${product.name} to bag`} data-rk-5864b0=""><span data-label data-rk-5864b0="">Add to bag +</span></button>
              )}
            </div>
          )}
        </div>
      
        <div className="pcm__info" data-rk-5864b0="">
          <Heading className="pcm__title" id={titleId} data-rk-5864b0=""><a className="pcm__link" href={href} data-rk-5864b0="">{product.name}</a></Heading>
          <p className="pcm__price" data-rk-5864b0="">
            <span data-rk-5864b0="">{formatMoney(product.price, money)}</span>
            {product.compareAt && <s data-rk-5864b0=""><span className="sr-only" data-rk-5864b0="">Was </span>{formatMoney(product.compareAt, money)}</s>}
          </p>
          {product.colors && product.colors.length > 0 && (
            <p className="pcm__colors" data-rk-5864b0="">
              <span className="pcm__dots" aria-hidden="true" data-rk-5864b0="">{product.colors.slice(0, 4).map((c, __i: number) => <i key={__i} style={st(`--sw: ${c.hex}`)} data-rk-5864b0=""></i>)}</span>
              {product.colors.length} {product.colors.length === 1 ? 'colour' : 'colours'}
            </p>
          )}
        </div>
      </article>
    </>
  );
}

export default ProductCardMinimal;
