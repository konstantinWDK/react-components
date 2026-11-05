'use client';

import { useEffect, useRef } from 'react';
import type { CartItem } from './types';
import { createCart, formatMoney } from './cart-store';
import { productIcon } from './product-icons';
import './CartDrawer.css';

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
 * CartDrawer — Slide-in cart with line items, quantity steppers, remove, free-shipping
 * progress, subtotal and checkout button. Reads and writes the shared cart store.
 *
 * Opens on the `ack:cart-open` event (dispatched by StoreHeader's cart button and by
 * add-to-cart buttons) or on any `[data-cart-open]` element outside a StoreHeader.
 *
 * @param {string} cartKey - Cart storage key. Default 'ack-cart'.
 * @param {string} title - Drawer heading. Default 'Your cart'.
 * @param {string} checkoutHref - Checkout page URL. Default '#'.
 * @param {string} checkoutLabel - Checkout button label. Default 'Checkout'.
 * @param {string} currency - ISO currency. Default 'USD'.
 * @param {string} locale - Number format locale. Default 'en-US'.
 * @param {number} freeShippingThreshold - Shows progress towards free shipping (0 hides it). Default 75.
 * @param {CartItem[]} demoItems - Seeds an empty cart once (demo stores only).
 * @param {boolean} inline - Render as an always-visible panel instead of an overlay (docs/previews). Default false.
 * @param {string} side - Slide-in side (right|left). Default 'right'.
 * @param {string} size - Panel width (sm|md|lg). Default 'md'.
 * @param {string} id - Base id for inner elements (unique per page). Default 'cart-drawer'.
 * @param {string} className - Extra class.
 *
 * Accessibility: modal dialog with focus trap, Escape to close, focus returned to the trigger,
 * background scroll locked; totals are announced through a polite live region.
 */
export interface CartDrawerProps {
  cartKey?: string;
  title?: string;
  checkoutHref?: string;
  checkoutLabel?: string;
  currency?: string;
  locale?: string;
  freeShippingThreshold?: number;
  demoItems?: CartItem[];
  inline?: boolean;
  side?: 'right' | 'left';
  size?: 'sm' | 'md' | 'lg';
  id?: string;
  className?: string;
}

export function CartDrawer({
  cartKey = 'ack-cart',
  title = 'Your cart',
  checkoutHref = '#',
  checkoutLabel = 'Checkout',
  currency = 'USD',
  locale = 'en-US',
  freeShippingThreshold = 75,
  demoItems = [],
  inline = false,
  side = 'right',
  size = 'md',
  id = 'cart-drawer',
  className = '',
}: CartDrawerProps) {
  const uid = id;

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';
    
      document.querySelectorAll<HTMLElement>('[data-cart-drawer]:not([data-bound])').forEach((root) => {
        root.dataset.bound = '';
        const cart = createCart(root.dataset.key);
        const money = { currency: root.dataset.currency, locale: root.dataset.locale };
        const inline = root.hasAttribute('data-inline');
        const free = Number(root.dataset.free) || 0;
        const panel = root.querySelector<HTMLElement>('.cart-drawer__panel')!;
        const list = root.querySelector<HTMLUListElement>('[data-lines]')!;
        const empty = root.querySelector<HTMLElement>('[data-empty]')!;
        const foot = root.querySelector<HTMLElement>('[data-foot]')!;
        const subtotalEl = root.querySelector<HTMLElement>('[data-subtotal]')!;
        const qtyEl = root.querySelector<HTMLElement>('[data-cart-qty]')!;
        const ship = root.querySelector<HTMLElement>('[data-ship]');
        const shipText = root.querySelector<HTMLElement>('[data-ship-text]');
        const shipBar = root.querySelector<HTMLElement>('[data-ship-bar]');
        let lastTrigger: HTMLElement | null = null;
    
        if (root.dataset.seed) {
          try { cart.seed(JSON.parse(root.dataset.seed)); } catch { /* bad seed */ }
        }
    
        const el = <K extends keyof HTMLElementTagNameMap>(tag: K, cls?: string, text?: string) => {
          const node = document.createElement(tag);
          if (cls) node.className = cls;
          if (text !== undefined) node.textContent = text;
          return node;
        };
    
        function line(item: CartItem): HTMLLIElement {
          const li = el('li', 'cart-line');
          const media = el('div', 'cart-line__media');
          media.style.setProperty('--h', String(item.hue ?? 40));
          if (item.image) {
            const img = el('img');
            img.src = item.image;
            img.alt = '';
            media.append(img);
          } else {
            media.innerHTML = `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${productIcon(item.icon)}</svg>`;
          }
          const info = el('div', 'cart-line__info');
          info.append(el('p', 'cart-line__name', item.name));
          if (item.variant) info.append(el('p', 'cart-line__variant', item.variant));
    
          const stepper = el('div', 'cart-line__stepper');
          const minus = el('button', 'cart-line__step', '−');
          minus.type = 'button';
          minus.setAttribute('aria-label', `Decrease quantity of ${item.name}`);
          minus.addEventListener('click', () => cart.setQty(item.id, item.qty - 1));
          const qty = el('span', 'cart-line__count', String(item.qty));
          qty.setAttribute('aria-label', `Quantity ${item.qty}`);
          const plus = el('button', 'cart-line__step', '+');
          plus.type = 'button';
          plus.setAttribute('aria-label', `Increase quantity of ${item.name}`);
          plus.disabled = item.qty >= 99;
          plus.addEventListener('click', () => cart.setQty(item.id, item.qty + 1));
          stepper.append(minus, qty, plus);
          info.append(stepper);
    
          const side = el('div', 'cart-line__side');
          side.append(el('p', 'cart-line__price', formatMoney(item.price * item.qty, money)));
          const remove = el('button', 'cart-line__remove', 'Remove');
          remove.type = 'button';
          remove.setAttribute('aria-label', `Remove ${item.name}`);
          remove.addEventListener('click', () => cart.remove(item.id));
          side.append(remove);
    
          li.append(media, info, side);
          return li;
        }
    
        function render() {
          const items = cart.items();
          const count = items.reduce((n, i) => n + i.qty, 0);
          const subtotal = items.reduce((n, i) => n + i.qty * i.price, 0);
          const active = document.activeElement as HTMLElement | null;
          const focusedLabel = active && root.contains(active) ? active.getAttribute('aria-label') : null;
          list.replaceChildren(...items.map(line));
          empty.hidden = items.length > 0;
          foot.hidden = items.length === 0;
          list.hidden = items.length === 0;
          qtyEl.textContent = count ? `(${count})` : '';
          subtotalEl.textContent = formatMoney(subtotal, money);
          if (ship && shipText && shipBar) {
            ship.hidden = items.length === 0;
            const left = Math.max(0, free - subtotal);
            shipText.textContent = left > 0
              ? `You're ${formatMoney(left, money)} away from free shipping`
              : 'You unlocked free shipping';
            shipBar.style.width = `${Math.min(100, (subtotal / free) * 100)}%`;
            ship.classList.toggle('is-done', left === 0);
          }
          // keep the keyboard position after re-rendering the lines
          if (focusedLabel && !root.contains(document.activeElement)) {
            const again = Array.from(root.querySelectorAll<HTMLElement>('[aria-label]')).find((n) => n.getAttribute('aria-label') === focusedLabel);
            (again ?? panel).focus();
          }
        }
    
        function open(trigger?: HTMLElement | null) {
          if (inline) return;
          lastTrigger = trigger ?? (document.activeElement as HTMLElement | null);
          root.hidden = false;
          document.documentElement.style.overflow = 'hidden';
          requestAnimationFrame(() => {
            root.classList.add('is-open');
            panel.focus();
          });
        }
    
        function close() {
          if (inline || root.hidden) return;
          root.classList.remove('is-open');
          document.documentElement.style.overflow = '';
          const done = () => { root.hidden = true; };
          if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) done();
          else window.setTimeout(done, 280);
          lastTrigger?.focus();
        }
    
        render();
        cart.subscribe(render);
    
        document.addEventListener('ack:cart-open', (e) => {
          const detail = (e as CustomEvent).detail || {};
          if (!detail.key || detail.key === cart.key) open(detail.trigger);
        });
        document.querySelectorAll<HTMLElement>('[data-cart-open]').forEach((btn) => {
          if (btn.closest('[data-store-header]')) return; // the header dispatches the event itself
          btn.addEventListener('click', () => open(btn));
        });
        root.querySelectorAll('[data-cart-close]').forEach((n) => n.addEventListener('click', close));
    
        root.addEventListener('keydown', (e) => {
          if (inline) return;
          if (e.key === 'Escape') { e.preventDefault(); close(); return; }
          if (e.key !== 'Tab') return;
          const nodes = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((n) => !n.closest('[hidden]'));
          if (!nodes.length) return;
          const first = nodes[0];
          const last = nodes[nodes.length - 1];
          if (e.shiftKey && (document.activeElement === first || document.activeElement === panel)) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={cx(['cart-drawer', `cart-drawer--${side}`, `cart-drawer--${size}`, { 'cart-drawer--inline': inline }, className])} data-cart-drawer data-key={cartKey} data-currency={currency} data-locale={locale} data-free={freeShippingThreshold} data-seed={demoItems.length ? JSON.stringify(demoItems) : undefined} data-inline={inline ? '' : undefined} hidden={!inline} data-rk-571235="">
        {!inline && <div className="cart-drawer__backdrop" data-cart-close data-rk-571235=""></div>}
        <aside className="cart-drawer__panel" role={inline ? 'region' : 'dialog'} aria-modal={inline ? undefined : 'true'} aria-labelledby={`${uid}-title`} tabIndex={-1} data-rk-571235="">
          <header className="cart-drawer__head" data-rk-571235="">
            <h2 className="cart-drawer__title" id={`${uid}-title`} data-rk-571235="">{title} <span className="cart-drawer__qty" data-cart-qty data-rk-571235=""></span></h2>
            {!inline && (
              <button className="cart-drawer__close" type="button" aria-label="Close cart" data-cart-close data-rk-571235="">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true" data-rk-571235=""><path d="M18 6 6 18M6 6l12 12" data-rk-571235="" /></svg>
              </button>
            )}
          </header>
      
          {freeShippingThreshold > 0 && (
            <div className="cart-drawer__ship" data-ship data-rk-571235="">
              <p className="cart-drawer__ship-text" data-ship-text data-rk-571235=""></p>
              <div className="cart-drawer__ship-bar" aria-hidden="true" data-rk-571235=""><span data-ship-bar data-rk-571235=""></span></div>
            </div>
          )}
      
          <ul className="cart-drawer__lines" data-lines aria-label="Cart items" data-rk-571235=""></ul>
      
          <div className="cart-drawer__empty" data-empty hidden data-rk-571235="">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-rk-571235=""><path d="M6 7h12l-1 13H7z" data-rk-571235="" /><path d="M9 7V6a3 3 0 0 1 6 0v1" data-rk-571235="" /></svg>
            <p data-rk-571235=""><strong data-rk-571235="">Your cart is empty</strong></p>
            <p data-rk-571235="">Add a few products and they will show up here.</p>
            {!inline && <button className="cart-drawer__ghost" type="button" data-cart-close data-rk-571235="">Continue shopping</button>}
          </div>
      
          <footer className="cart-drawer__foot" data-foot data-rk-571235="">
            <div className="cart-drawer__row" data-rk-571235="">
              <span data-rk-571235="">Subtotal</span>
              <strong data-subtotal aria-live="polite" data-rk-571235="">—</strong>
            </div>
            <p className="cart-drawer__note" data-rk-571235="">Taxes and shipping are calculated at checkout.</p>
            <a className="cart-drawer__checkout" href={checkoutHref} data-rk-571235="">
              {checkoutLabel}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-rk-571235=""><path d="M5 12h14M13 6l6 6-6 6" data-rk-571235="" /></svg>
            </a>
          </footer>
        </aside>
      </div>
    </>
  );
}

export default CartDrawer;
