'use client';

import type { CSSProperties } from 'react';
import './PlanUsageCard.css';

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

/** "a: b; --c: d" → style object */
function st(css: string | undefined): CSSProperties {
  const o: Record<string, string> = {};
  for (const decl of String(css ?? '').split(';')) {
    const i = decl.indexOf(':');
    if (i < 0) continue;
    const k = decl.slice(0, i).trim();
    if (k) o[k.startsWith('--') ? k : k.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = decl.slice(i + 1).trim();
  }
  return o as CSSProperties;
}

/**
 * PlanUsageCard — Billing summary: current plan and price, renewal date, usage meters with
 * warning thresholds, payment method and upgrade / manage actions.
 *
 * @param {string} plan - Plan name. Default 'Pro'.
 * @param {string} price - Price label. Default '€149 / month'.
 * @param {string} renews - Renewal text. Default 'Renews on Dec 1, 2026'.
 * @param {Array<{label: string, used: number, limit: number, unit?: string}>} usage - Meters.
 * @param {string} card - Payment method label (optional). Default 'Visa •••• 4242'.
 * @param {{label: string, href: string}} upgrade - Primary action. Default upgrade.
 * @param {{label: string, href: string}} manage - Secondary action (optional).
 * @param {number} warnAt - Percentage at which a meter turns amber. Default 80.
 * @param {string} variant - Style (card|accent). Default 'card'.
 * @param {string} className - Extra class.
 *
 * Accessibility: each meter is a role="meter" with aria-valuenow/min/max and a text value,
 * so usage is never conveyed by colour alone.
 */
export interface PlanUsageCardProps {
  plan?: string;
  price?: string;
  renews?: string;
  usage?: Array<{ label: string; used: number; limit: number; unit?: string }>;
  card?: string;
  upgrade?: { label: string; href: string };
  manage?: { label: string; href: string };
  warnAt?: number;
  variant?: 'card' | 'accent';
  className?: string;
}

export function PlanUsageCard({
  plan = 'Pro',
  price = '€149 / month',
  renews = 'Renews on Dec 1, 2026',
  usage = [
    { label: 'Rooms', used: 42, limit: 50 },
    { label: 'Team seats', used: 4, limit: 10 },
    { label: 'Channel connections', used: 3, limit: 5 },
    { label: 'Guest emails', used: 8200, limit: 10000, unit: '/ month' },
  ],
  card = 'Visa •••• 4242',
  upgrade = { label: 'Upgrade to Business', href: '#' },
  manage = { label: 'Manage billing', href: '#' },
  warnAt = 80,
  variant = 'card',
  className = '',
}: PlanUsageCardProps) {
  const fmt = (n: number) => new Intl.NumberFormat('en-GB').format(n);
  return (
    <>
      <section className={cx(['plan', `plan--${variant}`, className])} aria-labelledby="plan-title" data-rk-aac02d="">
        <header className="plan__head" data-rk-aac02d="">
          <div data-rk-aac02d="">
            <p className="plan__eyebrow" data-rk-aac02d="">Current plan</p>
            <h2 className="plan__title" id="plan-title" data-rk-aac02d="">{plan} <span data-rk-aac02d="">{price}</span></h2>
            <p className="plan__renew" data-rk-aac02d="">{renews}</p>
          </div>
          {card && <p className="plan__card" data-rk-aac02d=""><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-rk-aac02d=""><rect x="2" y="5" width="20" height="14" rx="2" data-rk-aac02d="" /><path d="M2 10h20" data-rk-aac02d="" /></svg>{card}</p>}
        </header>
        <ul className="plan__meters" data-rk-aac02d="">
          {usage.map((u) => {
            const pct = Math.min(100, Math.round((u.used / u.limit) * 100));
            const tone = pct >= 100 ? 'danger' : pct >= warnAt ? 'warning' : 'ok';
            return (
              <li data-rk-aac02d="">
                <div className="plan__meter-head" data-rk-aac02d="">
                  <span data-rk-aac02d="">{u.label}</span>
                  <strong data-rk-aac02d="">{fmt(u.used)} <small data-rk-aac02d="">of {fmt(u.limit)}{u.unit ? ` ${u.unit}` : ''}</small></strong>
                </div>
                <div className={cx(['plan__bar', `plan__bar--${tone}`])} role="meter" aria-label={u.label} aria-valuemin={0} aria-valuemax={u.limit} aria-valuenow={u.used} aria-valuetext={`${fmt(u.used)} of ${fmt(u.limit)}, ${pct}%`} data-rk-aac02d="">
                  <span style={st(`width: ${pct}%`)} data-rk-aac02d=""></span>
                </div>
                {tone === 'warning' && <p className="plan__warn" data-rk-aac02d="">{pct}% used — consider upgrading soon.</p>}
              </li>
            );
          })}
        </ul>
        <div className="plan__actions" data-rk-aac02d="">
          {upgrade && <a className="plan__btn plan__btn--primary" href={upgrade.href} data-rk-aac02d="">{upgrade.label}</a>}
          {manage && <a className="plan__btn" href={manage.href} data-rk-aac02d="">{manage.label}</a>}
        </div>
      </section>
    </>
  );
}

export default PlanUsageCard;
