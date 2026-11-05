'use client';

import { useEffect, useRef, useId } from 'react';
import './CtaNewsletterSection.css';

/**
 * CtaNewsletterSection — Newsletter signup band with benefits list, accessible
 * email form, inline validation and privacy note.
 *
 * @param {string} title - Heading.
 * @param {string} subtitle - Supporting copy.
 * @param {string[]} perks - Short benefit bullets.
 * @param {string} action - Form action URL.
 * @param {string} buttonLabel - Submit label.
 * @param {string} privacy - Privacy note under the form.
 * @param {string} variant - Band style (gradient|glass|bordered).
 * @param {string} size - Vertical rhythm (sm|md|lg).
 * @param {string} className - Extra CSS class.
 */
export interface CtaNewsletterSectionProps {
  title?: string;
  subtitle?: string;
  perks?: string[];
  action?: string;
  buttonLabel?: string;
  privacy?: string;
  variant?: 'gradient' | 'glass' | 'bordered';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function CtaNewsletterSection({
  title = 'Get new components every week',
  subtitle = 'One short email with fresh sections, charts and Astro tips. Join 12,000+ developers.',
  perks = ['Weekly, never spam', 'Early access to new blocks', 'Unsubscribe in one click'],
  action = '#',
  buttonLabel = 'Subscribe',
  privacy = 'We respect your privacy. Read our privacy policy.',
  variant = 'gradient',
  size = 'md',
  className = '',
}: CtaNewsletterSectionProps) {
  const id = `cns-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;

  // Ported from the Astro <script>: runs once after mount (DOM logic kept as in the Astro kit).
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLFormElement>('.cns__form').forEach((form) => {
        const input = form.querySelector<HTMLInputElement>('.cns__input');
        const msg = form.querySelector<HTMLElement>('.cns__msg');
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          if (!input || !msg) return;
          if (!input.value || !input.checkValidity()) {
            input.setAttribute('aria-invalid', 'true');
            msg.dataset.state = 'error';
            msg.textContent = 'Please enter a valid email address.';
            input.focus();
            return;
          }
          input.removeAttribute('aria-invalid');
          msg.dataset.state = 'ok';
          msg.textContent = 'Thanks! Please confirm your subscription in your inbox.';
          input.value = '';
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="cq-cta-newsletter-section-cq" data-rk-95ed6a="">
      <section className={`cns cns--${variant} cns--${size} ${className}`} aria-labelledby={id} data-rk-95ed6a="">
        <div className="cns__box" data-rk-95ed6a="">
          <div className="cns__copy" data-rk-95ed6a="">
            <span className="cns__icon" aria-hidden="true" data-rk-95ed6a="">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" data-rk-95ed6a=""><rect x="2" y="4" width="20" height="16" rx="2" data-rk-95ed6a="" /><path d="m22 7-10 6L2 7" data-rk-95ed6a="" /></svg>
            </span>
            <h2 id={id} className="cns__title" data-rk-95ed6a="">{title}</h2>
            <p className="cns__subtitle" data-rk-95ed6a="">{subtitle}</p>
            <ul className="cns__perks" data-rk-95ed6a="">
              {perks.map((p, __i: number) => (
                <li key={__i} data-rk-95ed6a=""><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-rk-95ed6a=""><path d="M20 6 9 17l-5-5" data-rk-95ed6a="" /></svg>{p}</li>
              ))}
            </ul>
          </div>
          <form className="cns__form" action={action} method="post" noValidate data-rk-95ed6a="">
            <label className="cns__label" htmlFor={`${id}-email`} data-rk-95ed6a="">Email address</label>
            <div className="cns__field" data-rk-95ed6a="">
              <input className="cns__input" id={`${id}-email`} name="email" type="email" required autoComplete="email" placeholder="you@company.com" aria-describedby={`${id}-msg ${id}-privacy`} data-rk-95ed6a="" />
              <button className="cns__btn" type="submit" data-rk-95ed6a="">{buttonLabel}</button>
            </div>
            <p id={`${id}-msg`} className="cns__msg" role="status" aria-live="polite" data-rk-95ed6a=""></p>
            <p id={`${id}-privacy`} className="cns__privacy" data-rk-95ed6a="">{privacy}</p>
          </form>
        </div>
      </section>
      </div>
    </>
  );
}

export default CtaNewsletterSection;
