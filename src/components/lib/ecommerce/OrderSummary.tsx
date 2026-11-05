'use client';

import { useEffect, useRef } from 'react';
import { createCart, formatMoney } from './cart-store';
import { productIcon } from './product-icons';
import type { CartItem, ShippingRate } from './types';
import './OrderSummary.css';

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
 * OrderSummary — Checkout sidebar: cart lines, promo code, subtotal, shipping, tax and total.
 * Reads the cart store live and follows the shipping method chosen in CheckoutForm.
 *
 * @param {string} title - Heading. Default 'Order summary'.
 * @param {string} cartKey - Cart storage key. Default 'ack-cart'.
 * @param {ShippingRate[]} shippingRates - Rates matching CheckoutForm's `shipping` radios.
 * @param {number} freeShippingThreshold - Subtotal that makes the first rate free (0 disables). Default 75.
 * @param {number} taxRate - Tax as a fraction (0.08 = 8%). Default 0.08.
 * @param {Record<string, number>} promoCodes - Code → percent discount. Default { ASTRO10: 10 }.
 * @param {string} editHref - "Edit cart" link (optional).
 * @param {string} currency - ISO currency. Default 'USD'.
 * @param {string} locale - Number format locale. Default 'en-US'.
 * @param {boolean} sticky - Stick while the form scrolls (desktop). Default true.
 * @param {string} variant - Style (glass|plain). Default 'glass'.
 * @param {string} className - Extra class.
 *
 * Emits `ack:totals` on document with `{ subtotal, discount, shipping, tax, total, formatted }`.
 *
 * Accessibility: the totals block is a polite live region; promo feedback is a status message.
 */
export interface OrderSummaryProps {
  title?: string;
  cartKey?: string;
  shippingRates?: ShippingRate[];
  freeShippingThreshold?: number;
  taxRate?: number;
  promoCodes?: Record<string, number>;
  editHref?: string;
  currency?: string;
  locale?: string;
  sticky?: boolean;
  variant?: 'glass' | 'plain';
  className?: string;
}

export function OrderSummary({
  title = 'Order summary',
  cartKey = 'ack-cart',
  shippingRates = [
    { id: 'standard', label: 'Standard', eta: '3–5 business days', price: 6 },
    { id: 'express', label: 'Express', eta: '1–2 business days', price: 14 },
  ],
  freeShippingThreshold = 75,
  taxRate = 0.08,
  promoCodes = { ASTRO10: 10 },
  editHref,
  currency = 'USD',
  locale = 'en-US',
  sticky = true,
  variant = 'glass',
  className = '',
}: OrderSummaryProps) {
  const config = JSON.stringify({ shippingRates, freeShippingThreshold, taxRate, promoCodes, currency, locale });

  // Ported from the Astro <script>: runs once after mount (DOM logic kept as in the Astro kit).
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLElement>('[data-order-summary]:not([data-bound])').forEach((root) => {
        root.dataset.bound = '';
        const cfg = JSON.parse(root.dataset.config || '{}') as {
          shippingRates: ShippingRate[]; freeShippingThreshold: number; taxRate: number;
          promoCodes: Record<string, number>; currency: string; locale: string;
        };
        const money = { currency: cfg.currency, locale: cfg.locale };
        const cart = createCart(root.dataset.key);
        const list = root.querySelector<HTMLUListElement>('[data-lines]')!;
        const empty = root.querySelector<HTMLElement>('[data-empty]')!;
        const promo = root.querySelector<HTMLFormElement>('[data-promo]')!;
        const promoMsg = root.querySelector<HTMLElement>('[data-promo-msg]')!;
        const discountRow = root.querySelector<HTMLElement>('[data-discount-row]')!;
        const codeOut = root.querySelector<HTMLElement>('[data-code]')!;
        const out = (k: string) => root.querySelector<HTMLElement>(`[data-t="${k}"]`)!;
        let code = '';
        let shippingId = cfg.shippingRates[0]?.id;
    
        const line = (i: CartItem) => {
          const li = document.createElement('li');
          li.className = 'o-line';
          const media = document.createElement('span');
          media.className = 'o-line__media';
          media.style.setProperty('--h', String(i.hue ?? 40));
          media.innerHTML = i.image
            ? `<img src="${encodeURI(i.image)}" alt="">`
            : `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${productIcon(i.icon)}</svg>`;
          const qty = document.createElement('span');
          qty.className = 'o-line__qty';
          qty.textContent = String(i.qty);
          qty.setAttribute('aria-hidden', 'true');
          media.append(qty);
          const info = document.createElement('span');
          info.className = 'o-line__info';
          const name = document.createElement('span');
          name.className = 'o-line__name';
          name.textContent = i.name;
          const meta = document.createElement('span');
          meta.className = 'o-line__meta';
          meta.textContent = [i.variant, `Qty ${i.qty}`].filter(Boolean).join(' · ');
          info.append(name, meta);
          const price = document.createElement('span');
          price.className = 'o-line__price';
          price.textContent = formatMoney(i.price * i.qty, money);
          li.append(media, info, price);
          return li;
        };
    
        function render() {
          const items = cart.items();
          list.replaceChildren(...items.map(line));
          empty.hidden = items.length > 0;
          const subtotal = items.reduce((n, i) => n + i.price * i.qty, 0);
          const pct = code ? cfg.promoCodes[code] ?? 0 : 0;
          const discount = Math.round(subtotal * pct) / 100;
          const rate = cfg.shippingRates.find((r) => r.id === shippingId) ?? cfg.shippingRates[0];
          const freeStandard = cfg.freeShippingThreshold > 0 && subtotal - discount >= cfg.freeShippingThreshold && rate === cfg.shippingRates[0];
          const shipping = items.length === 0 || !rate ? 0 : freeStandard ? 0 : rate.price;
          const tax = Math.round((subtotal - discount) * cfg.taxRate * 100) / 100;
          const total = Math.max(0, subtotal - discount + shipping + tax);
    
          out('subtotal').textContent = formatMoney(subtotal, money);
          out('discount').textContent = `−${formatMoney(discount, money)}`;
          discountRow.hidden = discount === 0;
          codeOut.textContent = code ? `(${code})` : '';
          out('shipping').textContent = shipping === 0 && items.length ? 'Free' : formatMoney(shipping, money);
          out('tax').textContent = formatMoney(tax, money);
          out('total').textContent = formatMoney(total, money);
    
          document.dispatchEvent(new CustomEvent('ack:totals', {
            detail: { subtotal, discount, shipping, tax, total, formatted: formatMoney(total, money), freeStandard, count: items.length },
          }));
        }
    
        promo.addEventListener('submit', (e) => {
          e.preventDefault();
          const input = promo.elements.namedItem('code') as HTMLInputElement;
          const value = input.value.trim().toUpperCase();
          if (!value) { promoMsg.textContent = 'Enter a code first.'; promoMsg.dataset.state = 'error'; return; }
          if (cfg.promoCodes[value] !== undefined) {
            code = value;
            promoMsg.textContent = `${value} applied — ${cfg.promoCodes[value]}% off.`;
            promoMsg.dataset.state = 'ok';
          } else {
            promoMsg.textContent = `"${value}" is not a valid code.`;
            promoMsg.dataset.state = 'error';
          }
          render();
        });
    
        document.addEventListener('change', (e) => {
          const t = e.target as HTMLInputElement;
          if (t?.name === 'shipping' && t.checked) { shippingId = t.value; render(); }
        });
        document.addEventListener('ack:totals-request', render);
    
        render();
        cart.subscribe(render);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <aside className={cx(['o-summary', `o-summary--${variant}`, { 'o-summary--sticky': sticky }, className])} aria-labelledby="o-summary-title" data-order-summary data-key={cartKey} data-config={config} data-rk-abd13c="">
        <div className="o-summary__head" data-rk-abd13c="">
          <h2 className="o-summary__title" id="o-summary-title" data-rk-abd13c="">{title}</h2>
          {editHref && <a className="o-summary__edit" href={editHref} data-rk-abd13c="">Edit cart</a>}
        </div>
      
        <ul className="o-summary__lines" data-lines aria-label="Items in your order" data-rk-abd13c=""></ul>
        <p className="o-summary__empty" data-empty hidden data-rk-abd13c="">Your cart is empty.</p>
      
        <form className="o-summary__promo" data-promo noValidate data-rk-abd13c="">
          <label className="sr-only" htmlFor="o-summary-code" data-rk-abd13c="">Discount code</label>
          <input id="o-summary-code" name="code" type="text" placeholder="Discount code" autoComplete="off" autoCapitalize="characters" spellCheck="false" data-rk-abd13c="" />
          <button type="submit" data-rk-abd13c="">Apply</button>
        </form>
        <p className="o-summary__promo-msg" role="status" data-promo-msg data-rk-abd13c=""></p>
      
        <dl className="o-summary__totals" aria-live="polite" data-rk-abd13c="">
          <div data-rk-abd13c=""><dt data-rk-abd13c="">Subtotal</dt><dd data-t="subtotal" data-rk-abd13c="">—</dd></div>
          <div data-discount-row hidden data-rk-abd13c=""><dt data-rk-abd13c="">Discount <span data-code data-rk-abd13c=""></span></dt><dd data-t="discount" data-rk-abd13c="">—</dd></div>
          <div data-rk-abd13c=""><dt data-rk-abd13c="">Shipping</dt><dd data-t="shipping" data-rk-abd13c="">—</dd></div>
          <div data-rk-abd13c=""><dt data-rk-abd13c="">Estimated tax</dt><dd data-t="tax" data-rk-abd13c="">—</dd></div>
          <div className="o-summary__total" data-rk-abd13c=""><dt data-rk-abd13c="">Total</dt><dd data-t="total" data-rk-abd13c="">—</dd></div>
        </dl>
      </aside>
    </>
  );
}

export default OrderSummary;
