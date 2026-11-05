'use client';

import './TestimonialFeatured.css';

/**
 * TestimonialFeatured — A single large customer quote paired with the company's
 * headline results (case-study style), plus a link to the full story.
 *
 * @param {string} quote - The testimonial text.
 * @param {string} name - Author name.
 * @param {string} role - Author role and company.
 * @param {string} company - Company wordmark text.
 * @param {Array<{value: string, label: string}>} metrics - Outcome stats.
 * @param {{label: string, href: string}} link - Case study link.
 * @param {string} variant - Layout style (split|centered|card).
 * @param {string} size - Vertical rhythm (sm|md|lg).
 * @param {string} className - Extra CSS class.
 */
export interface TestimonialFeaturedProps {
  quote?: string;
  name?: string;
  role?: string;
  company?: string;
  metrics?: Array<{ value: string; label: string }>;
  link?: { label: string; href: string };
  variant?: 'split' | 'centered' | 'card';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function TestimonialFeatured({
  quote = 'We replaced three tools and a chart library with this kit. Our product pages load twice as fast and our conversion rate has never been higher.',
  name = 'Elena Vasquez',
  role = 'VP of Marketing, Orbitly',
  company = 'Orbitly',
  metrics = [
    { value: '2.1×', label: 'faster page loads' },
    { value: '+38%', label: 'trial conversion' },
    { value: '−64%', label: 'front-end bundle size' },
  ],
  link = { label: 'Read the case study', href: '#' },
  variant = 'split',
  size = 'md',
  className = '',
}: TestimonialFeaturedProps) {
  const initials = name.split(' ').map((p) => p[0]).slice(0, 2).join('');
  return (
    <>
      <div className="cq-testimonial-featured-cq" data-rk-bd39f1="">
      <section className={`tf tf--${variant} tf--${size} ${className}`} aria-label={`Customer story: ${company}`} data-rk-bd39f1="">
        <div className="tf__inner" data-rk-bd39f1="">
          <figure className="tf__figure" data-rk-bd39f1="">
            <p className="tf__company" aria-hidden="true" data-rk-bd39f1="">
              <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" data-rk-bd39f1=""><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" data-rk-bd39f1="" /><circle cx="12" cy="12" r="4" fill="currentColor" data-rk-bd39f1="" /></svg>
              {company}
            </p>
            <svg className="tf__mark" width="48" height="36" viewBox="0 0 48 36" aria-hidden="true" data-rk-bd39f1=""><path d="M0 36V22C0 9 7 2 20 0l2 5C14 7 11 12 11 18h9v18H0zm28 0V22C28 9 35 2 48 0l2 5c-8 2-11 7-11 13h9v18H28z" fill="currentColor" data-rk-bd39f1="" /></svg>
            <blockquote className="tf__quote" data-rk-bd39f1=""><p data-rk-bd39f1="">{quote}</p></blockquote>
            <figcaption className="tf__author" data-rk-bd39f1="">
              <span className="tf__avatar" aria-hidden="true" data-rk-bd39f1="">{initials}</span>
              <span data-rk-bd39f1=""><strong data-rk-bd39f1="">{name}</strong><span className="tf__role" data-rk-bd39f1="">{role}</span></span>
            </figcaption>
          </figure>
      
          <div className="tf__side" data-rk-bd39f1="">
            <dl className="tf__metrics" data-rk-bd39f1="">
              {metrics.map((mt, __i: number) => (
                <div key={__i} className="tf__metric" data-rk-bd39f1="">
                  <dt data-rk-bd39f1="">{mt.label}</dt>
                  <dd data-rk-bd39f1="">{mt.value}</dd>
                </div>
              ))}
            </dl>
            {link && (
              <a className="tf__link" href={link.href} data-rk-bd39f1="">
                {link.label}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" data-rk-bd39f1=""><path d="M5 12h14M13 6l6 6-6 6" data-rk-bd39f1="" /></svg>
              </a>
            )}
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

export default TestimonialFeatured;
