'use client';

import type { ReactNode } from 'react';
import './PricingCard.css';

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
 * PricingCard — Optimized card for showing product plans and features.
 * 
 * @param {string} plan - The plan name (e.g. "Pro").
 * @param {string} price - The integer/decimal price value.
 * @param {boolean} featured - Applies a highlighted styling variant if true.
 */
export interface PricingCardProps {
  plan: string;
  price: string;
  featured?: boolean;
  children?: ReactNode;
}

export function PricingCard({ plan, price, featured = false,
  children
}: PricingCardProps) {
  return (
    <>
      <div className={cx(["price-card", { "featured": featured }])} data-rk-29b1af="">
        <span className="price-card__plan" data-rk-29b1af="">{plan}</span>
        <div className="price-card__price" data-rk-29b1af=""><span data-rk-29b1af="">$</span>{price}</div>
        <ul className="price-card__features" data-rk-29b1af="">
          {children}
        </ul>
        <button className="price-card__btn" type="button" data-rk-29b1af="">Choose Plan</button>
      </div>
    </>
  );
}

export default PricingCard;
