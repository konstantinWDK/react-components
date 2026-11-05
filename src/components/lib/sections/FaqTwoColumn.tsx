'use client';

import { useId } from 'react';
import './FaqTwoColumn.css';

/**
 * FaqTwoColumn — FAQ section with a sticky intro column (heading + support CTA)
 * and native <details> accordions on the right. Works without JavaScript.
 *
 * @param {string} title - Section heading.
 * @param {string} subtitle - Intro copy.
 * @param {Array<{q: string, a: string}>} items - Questions and answers.
 * @param {{label: string, href: string}} support - Support link.
 * @param {boolean} exclusive - Only one item open at a time (uses the `name` attribute).
 * @param {string} variant - Item style (bordered|cards|plain).
 * @param {string} size - Vertical rhythm (sm|md|lg).
 * @param {string} className - Extra CSS class.
 */
export interface FaqTwoColumnProps {
  title?: string;
  subtitle?: string;
  items?: Array<{ q: string; a: string }>;
  support?: { label: string; href: string };
  exclusive?: boolean;
  variant?: 'bordered' | 'cards' | 'plain';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function FaqTwoColumn({
  title = 'Frequently asked questions',
  subtitle = 'Everything you need to know about the kit. Can’t find an answer? Our team replies within a day.',
  items = [
    { q: 'Do I need to install a package?', a: 'No. Every component is a standalone .tsx file. Copy it into your project, or install the package if you prefer imports.' },
    { q: 'Do the charts need a JavaScript library?', a: 'No. The SVG charts render at build time. A tiny shared script only powers hover tooltips, and every chart includes a data table fallback.' },
    { q: 'Is it accessible?', a: 'Components target WCAG 2.2 AA: semantic HTML, visible focus states, keyboard support and contrast of at least 4.5:1 for text.' },
    { q: 'Can I use it in commercial projects?', a: 'Yes. The kit is MIT licensed. Use it for client work, SaaS products and anything else.' },
    { q: 'How do I change the colors?', a: 'Edit the CSS custom properties in global.css. Every component reads from the same tokens, so one change updates everything.' },
  ],
  support = { label: 'Contact support', href: '#' },
  exclusive = true,
  variant = 'bordered',
  size = 'md',
  className = '',
}: FaqTwoColumnProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const id = `ftc-${uid}`;
  return (
    <>
      <div className="cq-faq-two-column-cq" data-rk-73cab5="">
      <section className={`ftc ftc--${variant} ftc--${size} ${className}`} aria-labelledby={id} data-rk-73cab5="">
        <div className="ftc__inner" data-rk-73cab5="">
          <div className="ftc__intro" data-rk-73cab5="">
            <h2 id={id} className="ftc__title" data-rk-73cab5="">{title}</h2>
            <p className="ftc__subtitle" data-rk-73cab5="">{subtitle}</p>
            {support && (
              <a className="ftc__support" href={support.href} data-rk-73cab5="">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-rk-73cab5=""><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" data-rk-73cab5="" /></svg>
                {support.label}
              </a>
            )}
          </div>
          <div className="ftc__list" data-rk-73cab5="">
            {items.map((it, i) => (
              <details key={i} className="ftc__item" name={exclusive ? `faq-${uid}` : undefined} open={i === 0} data-rk-73cab5="">
                <summary className="ftc__q" data-rk-73cab5="">
                  <span data-rk-73cab5="">{it.q}</span>
                  <svg className="ftc__chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" data-rk-73cab5=""><path d="M12 5v14M5 12h14" data-rk-73cab5="" /></svg>
                </summary>
                <div className="ftc__a" data-rk-73cab5=""><p data-rk-73cab5="">{it.a}</p></div>
              </details>
            ))}
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

export default FaqTwoColumn;
