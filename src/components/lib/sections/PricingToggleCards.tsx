'use client';

import { useEffect, useRef, useId } from 'react';
import './PricingToggleCards.css';

interface Plan { name: string; monthly: number; yearly: number; description: string; features: string[]; cta: string; href: string; featured?: boolean }

/**
 * PricingToggleCards — Three pricing tiers with an accessible monthly/yearly
 * switch (role="switch"), savings badge and a highlighted recommended plan.
 *
 * @param {string} title - Section heading.
 * @param {string} subtitle - Section description.
 * @param {Array<{name: string, monthly: number, yearly: number, description: string, features: string[], cta: string, href: string, featured?: boolean}>} plans - Tiers.
 * @param {string} currency - Currency symbol.
 * @param {string} savingsLabel - Badge next to the yearly option.
 * @param {string} variant - Card style (glass|solid|outline).
 * @param {string} size - Vertical rhythm (sm|md|lg).
 * @param {string} className - Extra CSS class.
 */
export interface PricingToggleCardsProps {
  title?: string;
  subtitle?: string;
  plans?: Plan[];
  currency?: string;
  savingsLabel?: string;
  variant?: 'glass' | 'solid' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PricingToggleCards({
  title = 'Simple pricing that scales with you',
  subtitle = 'Start free. Upgrade when your team grows. Cancel anytime.',
  plans = [
    { name: 'Starter', monthly: 0, yearly: 0, description: 'For side projects and prototypes.', features: ['All components', 'Community support', '1 project'], cta: 'Get started', href: '#' },
    { name: 'Pro', monthly: 24, yearly: 19, description: 'For professionals shipping client work.', features: ['Everything in Starter', 'Premium sections', 'Unlimited projects', 'Priority support'], cta: 'Start 14-day trial', href: '#', featured: true },
    { name: 'Team', monthly: 79, yearly: 63, description: 'For agencies and product teams.', features: ['Everything in Pro', '10 seats included', 'Figma kit', 'Private Discord'], cta: 'Contact sales', href: '#' },
  ],
  currency = '$',
  savingsLabel = 'Save 20%',
  variant = 'glass',
  size = 'md',
  className = '',
}: PricingToggleCardsProps) {
  const id = `ptc-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLElement>('[data-ptc]').forEach((root) => {
        const sw = root.querySelector<HTMLButtonElement>('.ptc__switch');
        const live = root.querySelector('.ptc__live');
        sw?.addEventListener('click', () => {
          const yearly = sw.getAttribute('aria-checked') !== 'true';
          sw.setAttribute('aria-checked', String(yearly));
          root.dataset.period = yearly ? 'yearly' : 'monthly';
          root.querySelectorAll<HTMLElement>('.ptc__amount').forEach((el) => {
            el.textContent = (yearly ? el.dataset.yearly : el.dataset.monthly) || '';
          });
          if (live) live.textContent = yearly ? 'Showing yearly prices' : 'Showing monthly prices';
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className={`ptc ptc--${variant} ptc--${size} ${className}`} aria-labelledby={id} data-ptc data-period="monthly" data-rk-101321="">
        <div className="ptc__inner" data-rk-101321="">
          <header className="ptc__head" data-rk-101321="">
            <h2 id={id} className="ptc__title" data-rk-101321="">{title}</h2>
            <p className="ptc__subtitle" data-rk-101321="">{subtitle}</p>
            <div className="ptc__toggle" data-rk-101321="">
              <span className="ptc__period" id={`${id}-m`} data-rk-101321="">Monthly</span>
              <button type="button" className="ptc__switch" role="switch" aria-checked="false" aria-labelledby={`${id}-y`} data-rk-101321="">
                <span className="ptc__knob" aria-hidden="true" data-rk-101321=""></span>
              </button>
              <span className="ptc__period" id={`${id}-y`} data-rk-101321="">Yearly <span className="ptc__save" data-rk-101321="">{savingsLabel}</span></span>
            </div>
          </header>
      
          <ul className="ptc__grid" data-rk-101321="">
            {plans.map((p, __i: number) => (
              <li key={__i} className={`ptc__card ${p.featured ? 'ptc__card--featured' : ''}`} data-rk-101321="">
                {p.featured && <span className="ptc__ribbon" data-rk-101321="">Most popular</span>}
                <h3 className="ptc__name" data-rk-101321="">{p.name}</h3>
                <p className="ptc__desc" data-rk-101321="">{p.description}</p>
                <p className="ptc__price" data-rk-101321="">
                  <span className="ptc__amount" data-monthly={`${currency}${p.monthly}`} data-yearly={`${currency}${p.yearly}`} data-rk-101321="">{currency}{p.monthly}</span>
                  <span className="ptc__per" data-rk-101321="">/ month<span className="ptc__billed" data-yearly-only data-rk-101321="">, billed yearly</span></span>
                </p>
                <a className="ptc__cta" href={p.href} data-rk-101321="">{p.cta}</a>
                <ul className="ptc__features" data-rk-101321="">
                  {p.features.map((f, __i: number) => (
                    <li key={__i} data-rk-101321=""><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-rk-101321=""><path d="M20 6 9 17l-5-5" data-rk-101321="" /></svg>{f}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <p className="ptc__live" role="status" aria-live="polite" data-rk-101321=""></p>
        </div>
      </section>
    </>
  );
}

export default PricingToggleCards;
