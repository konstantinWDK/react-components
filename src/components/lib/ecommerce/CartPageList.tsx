'use client';

import { useEffect, useRef } from 'react';
import type { CartItem } from './types';
import { createCart, formatMoney } from './cart-store';
import { productIcon } from './product-icons';
import './CartPageList.css';

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
 * CartPageList — Full shopping-bag page: line items with quantity and remove, gift note,
 * free-shipping progress and a summary card with the checkout button. Reads the cart store live.
 *
 * @param {string} cartKey - Cart storage key. Default 'ack-cart'.
 * @param {string} title - Page heading. Default 'Your bag'.
 * @param {string} checkoutHref - Checkout URL. Default '#'.
 * @param {string} continueHref - "Continue shopping" URL. Default '#'.
 * @param {number} freeShippingThreshold - Free shipping from this subtotal (0 hides it). Default 150.
 * @param {number} shippingFlat - Shipping estimate below the threshold. Default 8.
 * @param {string} currency - ISO currency. Default 'EUR'.
 * @param {string} locale - Number format locale. Default 'en-GB'.
 * @param {CartItem[]} demoItems - Seeds an empty cart once (demos only).
 * @param {string} variant - Style (editorial|card). Default 'editorial'.
 * @param {string} className - Extra class.
 *
 * Accessibility: one h1; the item list is a real list with labelled quantity buttons;
 * totals are a polite live region; removing an item moves focus to the next row (or the heading).
 */
export interface CartPageListProps {
  cartKey?: string;
  title?: string;
  checkoutHref?: string;
  continueHref?: string;
  freeShippingThreshold?: number;
  shippingFlat?: number;
  currency?: string;
  locale?: string;
  demoItems?: CartItem[];
  variant?: 'editorial' | 'card';
  className?: string;
}

export function CartPageList({
  cartKey = 'ack-cart',
  title = 'Your bag',
  checkoutHref = '#',
  continueHref = '#',
  freeShippingThreshold = 150,
  shippingFlat = 8,
  currency = 'EUR',
  locale = 'en-GB',
  demoItems = [],
  variant = 'editorial',
  className = '',
}: CartPageListProps) {

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLElement>('[data-bag]:not([data-bound])').forEach((root) => {
        root.dataset.bound = '';
        const cart = createCart(root.dataset.key);
        const money = { currency: root.dataset.currency, locale: root.dataset.locale };
        const free = Number(root.dataset.free) || 0;
        const flat = Number(root.dataset.ship) || 0;
        const list = root.querySelector<HTMLUListElement>('[data-lines]')!;
        const empty = root.querySelector<HTMLElement>('[data-empty]')!;
        const summary = root.querySelector<HTMLElement>('[data-summary]')!;
        const cols = root.querySelector<HTMLElement>('.bag__cols')!;
        const noteWrap = root.querySelector<HTMLElement>('[data-note-wrap]')!;
        const note = root.querySelector<HTMLTextAreaElement>('[data-note]')!;
        const heading = root.querySelector<HTMLElement>('#bag-title')!;
        const out = (k: string) => root.querySelector<HTMLElement>(`[data-t="${k}"]`)!;
        const noteKey = `${cart.key}:note`;
    
        if (root.dataset.seed) { try { cart.seed(JSON.parse(root.dataset.seed)); } catch { /* ignore */ } }
        try { note.value = window.localStorage.getItem(noteKey) || ''; } catch { /* ignore */ }
        note.addEventListener('input', () => { try { window.localStorage.setItem(noteKey, note.value); } catch { /* ignore */ } });
    
        const make = <K extends keyof HTMLElementTagNameMap>(tag: K, cls: string, text?: string) => {
          const n = document.createElement(tag);
          n.className = cls;
          if (text !== undefined) n.textContent = text;
          return n;
        };
    
        function row(item: CartItem, i: number, all: CartItem[]) {
          const li = make('li', 'bag-line');
          const media = make('div', 'bag-line__media');
          media.style.setProperty('--h', String(item.hue ?? 30));
          media.innerHTML = item.image
            ? `<img src="${encodeURI(item.image)}" alt="">`
            : `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${productIcon(item.icon)}</svg>`;
          const info = make('div', 'bag-line__info');
          info.append(make('p', 'bag-line__name', item.name));
          if (item.variant) info.append(make('p', 'bag-line__meta', item.variant));
          info.append(make('p', 'bag-line__unit', formatMoney(item.price, money)));
          const remove = make('button', 'bag-line__remove', 'Remove');
          remove.type = 'button';
          remove.setAttribute('aria-label', `Remove ${item.name}`);
          remove.addEventListener('click', () => {
            const next = all[i + 1] ?? all[i - 1];
            cart.remove(item.id);
            const target = next ? root.querySelector<HTMLElement>(`[aria-label="Remove ${CSS.escape(next.name)}"]`) : null;
            (target ?? heading).focus();
          });
          info.append(remove);
    
          const qty = make('div', 'bag-line__qty');
          const minus = make('button', 'bag-line__step', '−');
          minus.type = 'button';
          minus.setAttribute('aria-label', `Decrease quantity of ${item.name}`);
          minus.addEventListener('click', () => cart.setQty(item.id, item.qty - 1));
          const count = make('span', 'bag-line__count', String(item.qty));
          const plus = make('button', 'bag-line__step', '+');
          plus.type = 'button';
          plus.setAttribute('aria-label', `Increase quantity of ${item.name}`);
          plus.addEventListener('click', () => cart.setQty(item.id, item.qty + 1));
          qty.append(minus, count, plus);
    
          li.append(media, info, qty, make('p', 'bag-line__total', formatMoney(item.price * item.qty, money)));
          return li;
        }
    
        function render() {
          const items = cart.items();
          const focused = document.activeElement?.getAttribute('aria-label');
          list.replaceChildren(...items.map((it, i) => row(it, i, items)));
          const has = items.length > 0;
          empty.hidden = has;
          summary.hidden = !has;
          cols.hidden = !has;
          noteWrap.hidden = !has;
          const count = items.reduce((n, i) => n + i.qty, 0);
          root.querySelector('[data-count]')!.textContent = has ? `(${count})` : '';
          const subtotal = items.reduce((n, i) => n + i.qty * i.price, 0);
          const shipping = !has || (free > 0 && subtotal >= free) ? 0 : flat;
          out('subtotal').textContent = formatMoney(subtotal, money);
          out('shipping').textContent = shipping === 0 ? 'Free' : formatMoney(shipping, money);
          out('total').textContent = formatMoney(subtotal + shipping, money);
          const shipWrap = root.querySelector<HTMLElement>('[data-ship-wrap]')!;
          shipWrap.hidden = free <= 0;
          const left = Math.max(0, free - subtotal);
          root.querySelector('[data-ship-text]')!.textContent = left > 0 ? `${formatMoney(left, money)} away from free shipping` : 'Free shipping unlocked';
          root.querySelector<HTMLElement>('[data-ship-bar]')!.style.width = `${free ? Math.min(100, (subtotal / free) * 100) : 100}%`;
          if (focused && !root.contains(document.activeElement)) {
            root.querySelector<HTMLElement>(`[aria-label="${CSS.escape(focused)}"]`)?.focus();
          }
        }
    
        render();
        cart.subscribe(render);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className={cx(['bag', `bag--${variant}`, className])} aria-labelledby="bag-title" data-bag data-key={cartKey} data-currency={currency} data-locale={locale} data-free={freeShippingThreshold} data-ship={shippingFlat} data-seed={demoItems.length ? JSON.stringify(demoItems) : undefined} data-rk-48a7b8="">
        <header className="bag__head" data-rk-48a7b8="">
          <h1 className="bag__title" id="bag-title" tabIndex={-1} data-rk-48a7b8="">{title} <sup data-count data-rk-48a7b8=""></sup></h1>
          <a className="bag__continue" href={continueHref} data-rk-48a7b8="">← Continue shopping</a>
        </header>
      
        <div className="bag__layout" data-rk-48a7b8="">
          <div className="bag__main" data-rk-48a7b8="">
            <div className="bag__cols" aria-hidden="true" data-rk-48a7b8=""><span data-rk-48a7b8="">Item</span><span data-rk-48a7b8="">Quantity</span><span data-rk-48a7b8="">Total</span></div>
            <ul className="bag__lines" data-lines aria-label="Items in your bag" data-rk-48a7b8=""></ul>
            <div className="bag__empty" data-empty hidden data-rk-48a7b8="">
              <p className="bag__empty-title" data-rk-48a7b8="">Your bag is empty.</p>
              <p data-rk-48a7b8="">Pieces you add will wait here for you.</p>
              <a className="bag__btn" href={continueHref} data-rk-48a7b8="">Discover the collection</a>
            </div>
            <details className="bag__note" data-note-wrap data-rk-48a7b8="">
              <summary data-rk-48a7b8="">Add a gift note</summary>
              <label className="sr-only" htmlFor="bag-note" data-rk-48a7b8="">Gift note</label>
              <textarea id="bag-note" rows={3} maxLength={200} placeholder="Write a short message — we'll print it on a card." data-note data-rk-48a7b8=""></textarea>
            </details>
          </div>
      
          <aside className="bag__summary" aria-label="Order summary" data-summary data-rk-48a7b8="">
            <div className="bag__ship" data-ship-wrap data-rk-48a7b8="">
              <p data-ship-text data-rk-48a7b8=""></p>
              <div className="bag__ship-bar" aria-hidden="true" data-rk-48a7b8=""><span data-ship-bar data-rk-48a7b8=""></span></div>
            </div>
            <dl className="bag__totals" aria-live="polite" data-rk-48a7b8="">
              <div data-rk-48a7b8=""><dt data-rk-48a7b8="">Subtotal</dt><dd data-t="subtotal" data-rk-48a7b8="">—</dd></div>
              <div data-rk-48a7b8=""><dt data-rk-48a7b8="">Shipping</dt><dd data-t="shipping" data-rk-48a7b8="">—</dd></div>
              <div className="bag__total" data-rk-48a7b8=""><dt data-rk-48a7b8="">Estimated total</dt><dd data-t="total" data-rk-48a7b8="">—</dd></div>
            </dl>
            <p className="bag__taxes" data-rk-48a7b8="">Taxes included. Discount codes are applied at checkout.</p>
            <a className="bag__btn bag__btn--block" href={checkoutHref} data-checkout data-rk-48a7b8="">Checkout</a>
            <ul className="bag__assurance" data-rk-48a7b8="">
              <li data-rk-48a7b8="">Free returns within 30 days</li>
              <li data-rk-48a7b8="">Secure payment · Cards, PayPal, Apple Pay</li>
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}

export default CartPageList;
