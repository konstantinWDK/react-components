'use client';

import type { CSSProperties } from 'react';
import './EcommerceProductCard.css';

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
 * EcommerceProductCard — Commercial card with price, rating and action buttons.
 * 
 * @param {string} title - The product name.
 * @param {string} price - The parsed price string (e.g. "$299").
 * @param {string} imageUrl - The URL mapping to the product's thumbnail.
 * @param {string} tag - Optional. The highlight bubble tag (e.g. "New").
 * @param {string} rating - Optional. Formatted rating string.
 * @param {string} ctaText - Optional. Label for the call to action button. Default is "Add".
 */
export interface EcommerceProductCardProps {
  title: string;
  price: string;
  imageUrl?: string;
  tag?: string;
  rating?: string;
  ctaText?: string;
}

export function EcommerceProductCard({ 
  title, 
  price, 
  imageUrl,
  tag,
  rating,
  ctaText = 'Add'
}: EcommerceProductCardProps) {
  return (
    <>
      <div className="prod-card" data-rk-0a44ca="">
        <div className="prod-card__image" style={st(imageUrl ? `background-image: url('${imageUrl}'); background-size: cover;` : '')} data-rk-0a44ca=""></div>
        <div className="prod-card__info" data-rk-0a44ca="">
          <div className="prod-card__meta" data-rk-0a44ca="">
            {tag ? <span data-rk-0a44ca="">{tag}</span> : <span data-rk-0a44ca=""></span>}
            {rating ? <span data-rk-0a44ca="">{rating}</span> : null}
          </div>
          <h4 className="prod-card__title" data-rk-0a44ca="">{title}</h4>
          <div className="prod-card__bot" data-rk-0a44ca="">
            <span className="prod-card__price" data-rk-0a44ca="">{price}</span>
            <button className="prod-card__cta" type="button" data-rk-0a44ca="">{ctaText}</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EcommerceProductCard;
