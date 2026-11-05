'use client';

import './PricingCompareMiniCard.css';

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
 * PricingCompareMiniCard — High-conversion mini pricing card with plan perks, price tier, and action button.
 * 
 * @param {string} planName - Plan name (e.g. 'Pro Developer').
 * @param {string} price - Price figure (e.g. '$29').
 * @param {string} period - Frequency string (e.g. '/month').
 * @param {string} description - Plan highlight subtitle.
 * @param {string[]} features - List of plan feature bullet points.
 * @param {boolean} featured - Whether the card is visually emphasized.
 * @param {string} ctaText - Label for the call to action button. Default is 'Get Started'.
 * @param {string} ctaHref - Link URL for the button.
 */
export interface PricingCompareMiniCardProps {
  planName: string;
  price: string;
  period?: string;
  description?: string;
  features?: string[];
  featured?: boolean;
  ctaText?: string;
  ctaHref?: string;
}

export function PricingCompareMiniCard({
  planName = 'Pro Developer',
  price = '$29',
  period = '/month',
  description = 'For growing teams and fast production workflows.',
  features = [
    'Unlimited UI components',
    'Full source code access',
    'Commercial license',
    'Community Discord support',
  ],
  featured = false,
  ctaText = 'Get Started',
  ctaHref = '#',
}: PricingCompareMiniCardProps) {
  return (
    <>
      <div className={cx(['mini-price-card', { 'mini-price-card--featured': featured }])} data-rk-d6e120="">
        {featured && <span className="mini-price-card__badge" data-rk-d6e120="">Most Popular</span>}
      
        <div className="mini-price-card__header" data-rk-d6e120="">
          <h3 className="mini-price-card__plan" data-rk-d6e120="">{planName}</h3>
          <p className="mini-price-card__desc" data-rk-d6e120="">{description}</p>
          <div className="mini-price-card__amount" data-rk-d6e120="">
            <span className="val" data-rk-d6e120="">{price}</span>
            <span className="period" data-rk-d6e120="">{period}</span>
          </div>
        </div>
      
        <ul className="mini-price-card__features" data-rk-d6e120="">
          {features.map((feat, __i: number) => (
            <li key={__i} className="mini-price-card__feature" data-rk-d6e120="">
              <svg className="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-rk-d6e120="">
                <polyline points="20 6 9 17 4 12" data-rk-d6e120="" />
              </svg>
              <span data-rk-d6e120="">{feat}</span>
            </li>
          ))}
        </ul>
      
        <a href={ctaHref} className="mini-price-card__btn" data-rk-d6e120="">
          {ctaText}
          <span aria-hidden="true" data-rk-d6e120="">→</span>
        </a>
      </div>
    </>
  );
}

export default PricingCompareMiniCard;
