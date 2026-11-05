'use client';

import { useId } from 'react';
import './PricingSinglePlan.css';

/**
 * PricingSinglePlan — One-plan pricing section: price card on one side,
 * full feature checklist on the other, with a money-back guarantee note.
 *
 * @param {string} title - Section heading.
 * @param {string} subtitle - Section description.
 * @param {string} planName - Plan name.
 * @param {string} price - Formatted price.
 * @param {string} period - Billing period label.
 * @param {string} originalPrice - Optional struck-through price.
 * @param {string[]} features - Included features.
 * @param {{label: string, href: string}} cta - CTA button.
 * @param {string} guarantee - Reassurance note under the CTA.
 * @param {string} variant - Card style (glow|glass|minimal).
 * @param {string} size - Vertical rhythm (sm|md|lg).
 * @param {string} className - Extra CSS class.
 */
export interface PricingSinglePlanProps {
  title?: string;
  subtitle?: string;
  planName?: string;
  price?: string;
  period?: string;
  originalPrice?: string;
  features?: string[];
  cta?: { label: string; href: string };
  guarantee?: string;
  variant?: 'glow' | 'glass' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PricingSinglePlan({
  title = 'One price. Everything included.',
  subtitle = 'Lifetime access to every component, section and future update.',
  planName = 'Lifetime license',
  price = '$149',
  period = 'one-time payment',
  originalPrice = '$249',
  features = [
    '250+ components & sections',
    '45 dependency-free SVG charts',
    'Lifetime updates',
    'Unlimited projects',
    'Commercial license',
    'Figma design kit',
    'Private community',
    'Priority email support',
  ],
  cta = { label: 'Get lifetime access', href: '#' },
  guarantee = '30-day money-back guarantee. No questions asked.',
  variant = 'glow',
  size = 'md',
  className = '',
}: PricingSinglePlanProps) {
  const id = `psp-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <>
      <div className="cq-pricing-single-plan-cq" data-rk-ed3ab2="">
      <section className={`psp psp--${variant} psp--${size} ${className}`} aria-labelledby={id} data-rk-ed3ab2="">
        <div className="psp__inner" data-rk-ed3ab2="">
          <header className="psp__head" data-rk-ed3ab2="">
            <h2 id={id} className="psp__title" data-rk-ed3ab2="">{title}</h2>
            <p className="psp__subtitle" data-rk-ed3ab2="">{subtitle}</p>
          </header>
          <div className="psp__card" data-rk-ed3ab2="">
            <div className="psp__price-col" data-rk-ed3ab2="">
              <p className="psp__plan" data-rk-ed3ab2="">{planName}</p>
              <p className="psp__price" data-rk-ed3ab2="">
                {originalPrice && <s className="psp__orig" data-rk-ed3ab2=""><span className="psp__sr" data-rk-ed3ab2="">Was </span>{originalPrice}</s>}
                <span className="psp__amount" data-rk-ed3ab2=""><span className="psp__sr" data-rk-ed3ab2="">Now </span>{price}</span>
              </p>
              <p className="psp__period" data-rk-ed3ab2="">{period}</p>
              <a className="psp__cta" href={cta.href} data-rk-ed3ab2="">{cta.label}</a>
              <p className="psp__guarantee" data-rk-ed3ab2="">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-rk-ed3ab2=""><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" data-rk-ed3ab2="" /><path d="m9 12 2 2 4-4" data-rk-ed3ab2="" /></svg>
                {guarantee}
              </p>
            </div>
            <div className="psp__features-col" data-rk-ed3ab2="">
              <h3 className="psp__features-title" data-rk-ed3ab2="">What’s included</h3>
              <ul className="psp__features" data-rk-ed3ab2="">
                {features.map((f, __i: number) => (
                  <li key={__i} data-rk-ed3ab2=""><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-rk-ed3ab2=""><path d="M20 6 9 17l-5-5" data-rk-ed3ab2="" /></svg>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

export default PricingSinglePlan;
