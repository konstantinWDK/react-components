'use client';

import { useEffect, useRef } from 'react';
import AnimatedInput from '../forms/AnimatedInput';
import ModernSelect from '../forms/ModernSelect';
import CustomRadioGroup from '../forms/CustomRadioGroup';
import AnimatedCheckmark from '../feedback/AnimatedCheckmark';
import { formatMoney } from './cart-store';
import type { ShippingRate } from './types';
import { createCart } from './cart-store';
import './CheckoutForm.css';

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
 * CheckoutForm — One-page checkout: contact, delivery address, shipping method and payment,
 * built from AnimatedInput, ModernSelect and CustomRadioGroup. Shows an order confirmation
 * (AnimatedCheckmark) on submit and clears the cart.
 *
 * Pair it with OrderSummary: the shipping radios drive its totals and the pay button shows
 * the live total. Replace the demo submit handler with your payment provider.
 *
 * @param {string} id - Form id. Default 'checkout'.
 * @param {ShippingRate[]} shippingRates - Shipping options (must match OrderSummary).
 * @param {number} freeShippingThreshold - Shows "Free" on the first rate above this subtotal. Default 75.
 * @param {Array<{label: string, value: string}>} countries - Country select options.
 * @param {string} cartKey - Cart storage key. Default 'ack-cart'.
 * @param {string} currency - ISO currency. Default 'USD'.
 * @param {string} locale - Number format locale. Default 'en-US'.
 * @param {string} continueHref - "Continue shopping" link on the confirmation. Default '#'.
 * @param {boolean} demo - Simulates payment and never sends data anywhere. Default true.
 * @param {string} variant - Section style (cards|plain). Default 'cards'.
 * @param {string} className - Extra class.
 *
 * Accessibility: grouped fieldsets with legends, autocomplete hints on every field, native
 * validation with focus moved to the first invalid field, confirmation heading receives focus.
 * Emits `ack:order-placed` with `{ orderId, total }`.
 */
export interface CheckoutFormProps {
  id?: string;
  shippingRates?: ShippingRate[];
  freeShippingThreshold?: number;
  countries?: Array<{ label: string; value: string }>;
  cartKey?: string;
  currency?: string;
  locale?: string;
  continueHref?: string;
  demo?: boolean;
  variant?: 'cards' | 'plain';
  className?: string;
}

export function CheckoutForm({
  id = 'checkout',
  shippingRates = [
    { id: 'standard', label: 'Standard', eta: '3–5 business days', price: 6 },
    { id: 'express', label: 'Express', eta: '1–2 business days', price: 14 },
  ],
  freeShippingThreshold = 75,
  countries = [
    { label: 'United States', value: 'US' },
    { label: 'Canada', value: 'CA' },
    { label: 'United Kingdom', value: 'GB' },
    { label: 'Spain', value: 'ES' },
    { label: 'Germany', value: 'DE' },
    { label: 'France', value: 'FR' },
  ],
  cartKey = 'ack-cart',
  currency = 'USD',
  locale = 'en-US',
  continueHref = '#',
  demo = true,
  variant = 'cards',
  className = '',
}: CheckoutFormProps) {
  const money = { currency, locale };

  // Ported from the Astro <script>: runs once after mount (DOM logic kept as in the Astro kit).
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLElement>('[data-checkout]:not([data-bound])').forEach((root) => {
        root.dataset.bound = '';
        const form = root.querySelector<HTMLFormElement>('[data-checkout-form]')!;
        const done = root.querySelector<HTMLElement>('[data-done]')!;
        const pay = root.querySelector<HTMLButtonElement>('[data-pay]')!;
        const payLabel = root.querySelector<HTMLElement>('[data-pay-label]')!;
        const error = root.querySelector<HTMLElement>('[data-error]')!;
        const cardFields = root.querySelector<HTMLElement>('[data-card-fields]')!;
        const altPay = root.querySelector<HTMLElement>('[data-alt-pay]')!;
        const firstRatePrice = root.querySelector<HTMLElement>('[data-first] ~ [data-rate-price]');
        const cart = createCart(root.dataset.key);
        let total = { formatted: '', total: 0, count: 0 };
        const firstRateText = firstRatePrice?.textContent || '';
    
        document.addEventListener('ack:totals', (e) => {
          const d = (e as CustomEvent).detail;
          total = d;
          payLabel.textContent = d.count ? `Pay ${d.formatted}` : 'Pay now';
          if (firstRatePrice) firstRatePrice.textContent = d.freeStandard || (d.subtotal - d.discount) >= Number(root.dataset.free || 0) && Number(root.dataset.free) > 0 ? 'Free' : firstRateText;
        });
        document.dispatchEvent(new CustomEvent('ack:totals-request'));
    
        // Payment method toggles the card fields (and their `required`).
        const setMethod = () => {
          const method = (form.elements.namedItem('payment') as RadioNodeList)?.value || 'card';
          const isCard = method === 'card';
          cardFields.hidden = !isCard;
          altPay.hidden = isCard;
          cardFields.querySelectorAll('input').forEach((i) => { i.required = isCard; });
        };
        form.addEventListener('change', (e) => {
          if ((e.target as HTMLInputElement).name === 'payment') setMethod();
        });
        setMethod();
    
        // Light input masks
        form.querySelector<HTMLInputElement>('[data-cc]')?.addEventListener('input', (e) => {
          const el = e.target as HTMLInputElement;
          el.value = el.value.replace(/\D/g, '').slice(0, 19).replace(/(\d{4})(?=\d)/g, '$1 ');
        });
        form.querySelector<HTMLInputElement>('[data-exp]')?.addEventListener('input', (e) => {
          const el = e.target as HTMLInputElement;
          const digits = el.value.replace(/\D/g, '').slice(0, 4);
          el.value = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
        });
    
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          error.hidden = true;
          form.querySelectorAll('[aria-invalid]').forEach((n) => n.removeAttribute('aria-invalid'));
          if (!cart.items().length) {
            error.textContent = 'Your cart is empty — add a product before checking out.';
            error.hidden = false;
            return;
          }
          if (!form.checkValidity()) {
            const invalid = Array.from(form.querySelectorAll<HTMLInputElement>('input, select')).filter((n) => !n.checkValidity());
            invalid.forEach((n) => n.setAttribute('aria-invalid', 'true'));
            error.textContent = `Please check ${invalid.length === 1 ? '1 field' : `${invalid.length} fields`} highlighted in red.`;
            error.hidden = false;
            invalid[0]?.focus();
            return;
          }
          pay.disabled = true;
          pay.classList.add('is-loading');
          payLabel.textContent = 'Processing…';
    
          const finish = () => {
            const orderId = `#${Math.floor(100000 + Math.random() * 900000)}`;
            const email = (form.elements.namedItem('email') as HTMLInputElement).value;
            root.querySelector('[data-order-id]')!.textContent = orderId;
            root.querySelector('[data-order-email]')!.textContent = email;
            root.querySelector('[data-order-total]')!.textContent = total.formatted;
            form.hidden = true;
            done.hidden = false;
            cart.clear();
            done.querySelector<HTMLElement>('h2')?.focus();
            document.dispatchEvent(new CustomEvent('ack:order-placed', { detail: { orderId, total: total.total } }));
            window.scrollTo({ top: 0, behavior: 'smooth' });
          };
          // Demo mode: simulate the payment round-trip. Replace with your provider's SDK.
          window.setTimeout(finish, root.hasAttribute('data-demo') ? 1100 : 0);
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={cx(['checkout', `checkout--${variant}`, className])} data-checkout data-key={cartKey} data-demo={demo ? '' : undefined} data-free={freeShippingThreshold} data-rk-e0a849="">
        <form className="checkout__form" id={id} noValidate data-checkout-form data-rk-e0a849="">
          <fieldset className="checkout__section" data-rk-e0a849="">
            <legend data-rk-e0a849=""><span className="checkout__num" aria-hidden="true" data-rk-e0a849="">1</span> Contact</legend>
            <AnimatedInput label="Email" id={`${id}-email`} name="email" type="email" required autocomplete="email" />
            <label className="checkout__check" data-rk-e0a849="">
              <input type="checkbox" name="newsletter" defaultChecked data-rk-e0a849="" />
              <span className="checkout__box" aria-hidden="true" data-rk-e0a849=""></span>
              Email me with news and offers
            </label>
          </fieldset>
      
          <fieldset className="checkout__section" data-rk-e0a849="">
            <legend data-rk-e0a849=""><span className="checkout__num" aria-hidden="true" data-rk-e0a849="">2</span> Delivery</legend>
            <ModernSelect label="Country / region" id={`${id}-country`} name="country" options={countries} required />
            <div className="checkout__row" data-rk-e0a849="">
              <AnimatedInput label="First name" id={`${id}-first`} name="firstName" required autocomplete="given-name" />
              <AnimatedInput label="Last name" id={`${id}-last`} name="lastName" required autocomplete="family-name" />
            </div>
            <AnimatedInput label="Address" id={`${id}-address`} name="address" required autocomplete="address-line1" />
            <AnimatedInput label="Apartment, suite (optional)" id={`${id}-address2`} name="address2" autocomplete="address-line2" />
            <div className="checkout__row checkout__row--3" data-rk-e0a849="">
              <AnimatedInput label="City" id={`${id}-city`} name="city" required autocomplete="address-level2" />
              <AnimatedInput label="State" id={`${id}-state`} name="state" autocomplete="address-level1" />
              <AnimatedInput label="ZIP / Postal" id={`${id}-zip`} name="zip" required autocomplete="postal-code" />
            </div>
            <AnimatedInput label="Phone (for delivery updates)" id={`${id}-phone`} name="phone" type="tel" autocomplete="tel" />
          </fieldset>
      
          <fieldset className="checkout__section" data-rk-e0a849="">
            <legend data-rk-e0a849=""><span className="checkout__num" aria-hidden="true" data-rk-e0a849="">3</span> Shipping method</legend>
            <div className="checkout__rates" data-rk-e0a849="">
              {shippingRates.map((r, i) => (
                <label key={i} className="checkout__rate" data-rk-e0a849="">
                  <input type="radio" name="shipping" defaultValue={r.id} defaultChecked={i === 0} data-price={r.price} data-first={i === 0 ? '' : undefined} data-rk-e0a849="" />
                  <span className="checkout__rate-dot" aria-hidden="true" data-rk-e0a849=""></span>
                  <span className="checkout__rate-text" data-rk-e0a849="">
                    <strong data-rk-e0a849="">{r.label}</strong>
                    <span data-rk-e0a849="">{r.eta}</span>
                  </span>
                  <span className="checkout__rate-price" data-rate-price data-rk-e0a849="">{r.price === 0 ? 'Free' : formatMoney(r.price, money)}</span>
                </label>
              ))}
            </div>
          </fieldset>
      
          <fieldset className="checkout__section" data-rk-e0a849="">
            <legend data-rk-e0a849=""><span className="checkout__num" aria-hidden="true" data-rk-e0a849="">4</span> Payment</legend>
            <p className="checkout__secure" data-rk-e0a849="">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true" data-rk-e0a849=""><rect x="4" y="11" width="16" height="10" rx="2" data-rk-e0a849="" /><path d="M8 11V7a4 4 0 0 1 8 0v4" data-rk-e0a849="" /></svg>
              All transactions are secure and encrypted.
            </p>
            <CustomRadioGroup name="payment" horizontal options={[
                { label: 'Card', value: 'card', checked: true },
                { label: 'PayPal', value: 'paypal' },
                { label: 'Apple Pay', value: 'applepay' },
              ]} />
            <div className="checkout__card" data-card-fields data-rk-e0a849="">
              <div className="checkout__field" data-rk-e0a849="">
                <label htmlFor={`${id}-cc`} data-rk-e0a849="">Card number</label>
                <input id={`${id}-cc`} name="cc" inputMode="numeric" autoComplete="cc-number" placeholder="1234 1234 1234 1234" required pattern="[0-9 ]{15,23}" maxLength={23} data-cc data-rk-e0a849="" />
              </div>
              <div className="checkout__row" data-rk-e0a849="">
                <div className="checkout__field" data-rk-e0a849="">
                  <label htmlFor={`${id}-exp`} data-rk-e0a849="">Expiry (MM/YY)</label>
                  <input id={`${id}-exp`} name="exp" inputMode="numeric" autoComplete="cc-exp" placeholder="MM/YY" required pattern="(0[1-9]|1[0-2])\\/[0-9]{2}" maxLength={5} data-exp data-rk-e0a849="" />
                </div>
                <div className="checkout__field" data-rk-e0a849="">
                  <label htmlFor={`${id}-cvc`} data-rk-e0a849="">Security code</label>
                  <input id={`${id}-cvc`} name="cvc" inputMode="numeric" autoComplete="cc-csc" placeholder="CVC" required pattern="[0-9]{3,4}" maxLength={4} data-rk-e0a849="" />
                </div>
              </div>
              <div className="checkout__field" data-rk-e0a849="">
                <label htmlFor={`${id}-ccname`} data-rk-e0a849="">Name on card</label>
                <input id={`${id}-ccname`} name="ccName" autoComplete="cc-name" required data-rk-e0a849="" />
              </div>
            </div>
            <p className="checkout__alt" data-alt-pay hidden data-rk-e0a849="">You will be redirected to complete the payment securely.</p>
          </fieldset>
      
          <p className="checkout__error" role="alert" data-error hidden data-rk-e0a849=""></p>
      
          <button className="checkout__pay" type="submit" data-pay data-rk-e0a849="">
            <span className="checkout__spinner" aria-hidden="true" data-rk-e0a849=""></span>
            <span data-pay-label data-rk-e0a849="">Pay now</span>
          </button>
          {demo && <p className="checkout__demo" data-rk-e0a849="">Demo checkout — no data leaves your browser. Try code <strong data-rk-e0a849="">ASTRO10</strong>.</p>}
        </form>
      
        <section className="checkout__done" data-done hidden aria-labelledby={`${id}-done-title`} data-rk-e0a849="">
          <AnimatedCheckmark size={72} color="var(--c-success, #34d399)" />
          <h2 id={`${id}-done-title`} tabIndex={-1} data-rk-e0a849="">Thank you for your order!</h2>
          <p data-rk-e0a849="">Order <strong data-order-id data-rk-e0a849="">#—</strong> is confirmed. A receipt is on its way to <strong data-order-email data-rk-e0a849="">your inbox</strong>.</p>
          <p className="checkout__done-total" data-rk-e0a849="">Total paid: <strong data-order-total data-rk-e0a849="">—</strong></p>
          <a className="checkout__pay checkout__pay--link" href={continueHref} data-rk-e0a849="">Continue shopping</a>
        </section>
      </div>
    </>
  );
}

export default CheckoutForm;
