'use client';

import { useEffect, useRef } from 'react';
import './ShopNewsletterEditorial.css';

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
 * ShopNewsletterEditorial — Oversized editorial sign-up: large serif statement on one side,
 * underline-style email field, consent note and inline success/error messages on the other.
 *
 * @param {string} title - Statement (use *asterisks* for italics). Default 'Letters from the *studio*'.
 * @param {string} text - Supporting copy.
 * @param {string} action - Form action. With '#' the form validates and confirms locally. Default '#'.
 * @param {string} buttonLabel - Submit label. Default 'Subscribe'.
 * @param {string} consent - Small print under the field.
 * @param {string} successText - Message after a valid submit.
 * @param {string} variant - Style (plain|inverted|accent). Default 'plain'.
 * @param {string} size - Type scale (sm|md|lg). Default 'md'.
 * @param {string} id - Base id. Default 'shop-news'.
 * @param {string} className - Extra class.
 *
 * Accessibility: labelled email input with autocomplete, aria-invalid + described error,
 * messages in a polite live region.
 */
export interface ShopNewsletterEditorialProps {
  title?: string;
  text?: string;
  action?: string;
  buttonLabel?: string;
  consent?: string;
  successText?: string;
  variant?: 'plain' | 'inverted' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  id?: string;
  className?: string;
}

export function ShopNewsletterEditorial({
  title = 'Letters from the *studio*',
  text = 'One email a month: new pieces before anyone else, the people who make them, and 10% off your first order.',
  action = '#',
  buttonLabel = 'Subscribe',
  consent = 'By subscribing you accept our privacy policy. Unsubscribe in one click.',
  successText = 'Thank you — your first letter is on its way.',
  variant = 'plain',
  size = 'md',
  id = 'shop-news',
  className = '',
}: ShopNewsletterEditorialProps) {
  const parts = title.split(/\*(.+?)\*/g);

  // Ported from the Astro <script>: runs once after mount (DOM logic kept as in the Astro kit).
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLFormElement>('form[data-news]:not([data-bound])').forEach((form) => {
        form.dataset.bound = '';
        const input = form.querySelector<HTMLInputElement>('input[type="email"]')!;
        const msg = form.querySelector<HTMLElement>('[data-msg]')!;
        form.addEventListener('submit', (e) => {
          const local = form.getAttribute('action') === '#';
          if (!input.checkValidity()) {
            e.preventDefault();
            input.setAttribute('aria-invalid', 'true');
            msg.dataset.state = 'error';
            msg.textContent = 'Please enter a valid email address.';
            input.focus();
            return;
          }
          input.removeAttribute('aria-invalid');
          if (local) {
            e.preventDefault();
            msg.dataset.state = 'ok';
            msg.textContent = form.dataset.success || 'Subscribed.';
            form.reset();
          }
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="sne-cq" data-rk-b34b0e="">
      <section className={cx(['sne', `sne--${variant}`, `sne--${size}`, className])} aria-labelledby={`${id}-title`} data-rk-b34b0e="">
        <h2 className="sne__title" id={`${id}-title`} data-rk-b34b0e="">{parts.map((p, i) => (i % 2 ? <em data-rk-b34b0e="">{p}</em> : p))}</h2>
        <div className="sne__side" data-rk-b34b0e="">
          {text && <p className="sne__text" data-rk-b34b0e="">{text}</p>}
          <form className="sne__form" action={action} method="post" noValidate data-news data-success={successText} data-rk-b34b0e="">
            <label className="sne__label" htmlFor={`${id}-email`} data-rk-b34b0e="">Email address</label>
            <div className="sne__field" data-rk-b34b0e="">
              <input id={`${id}-email`} name="email" type="email" required autoComplete="email" placeholder="you@example.com" aria-describedby={`${id}-msg`} data-rk-b34b0e="" />
              <button type="submit" data-rk-b34b0e="">{buttonLabel} <span aria-hidden="true" data-rk-b34b0e="">→</span></button>
            </div>
            <p className="sne__msg" id={`${id}-msg`} aria-live="polite" data-msg data-rk-b34b0e=""></p>
            {consent && <p className="sne__consent" data-rk-b34b0e="">{consent}</p>}
          </form>
        </div>
      </section>
      </div>
    </>
  );
}

export default ShopNewsletterEditorial;
