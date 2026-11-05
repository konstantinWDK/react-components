'use client';

import type { CSSProperties } from 'react';
import { appIcon, initials, hueFrom } from './app-icons';
import './GuestProfileCard.css';

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
 * GuestProfileCard — CRM profile for a guest or customer: avatar, loyalty tier, contact details,
 * lifetime stats, preference tags, upcoming stay and internal notes.
 *
 * @param {{name: string, email?: string, phone?: string, country?: string, since?: string}} guest - Identity and contact.
 * @param {string} tier - Loyalty tier label (optional). Default 'Gold'.
 * @param {Array<{label: string, value: string}>} stats - Lifetime figures (stays, nights, spend…).
 * @param {string[]} preferences - Preference tags.
 * @param {{room: string, dates: string, status?: string}} upcoming - Next stay (optional).
 * @param {string[]} notes - Staff notes (optional).
 * @param {Array<{label: string, href?: string, primary?: boolean}>} actions - Buttons in the header.
 * @param {string} variant - Style (card|plain). Default 'card'.
 * @param {string} className - Extra class.
 *
 * Accessibility: h2 with the guest name; contact items are real mailto/tel links; stats are a
 * description list; tags are a plain list.
 */
export interface GuestProfileCardProps {
  guest?: { name: string; email?: string; phone?: string; country?: string; since?: string };
  tier?: string;
  stats?: Array<{ label: string; value: string }>;
  preferences?: string[];
  upcoming?: { room: string; dates: string; status?: string };
  notes?: string[];
  actions?: Array<{ label: string; href?: string; primary?: boolean }>;
  variant?: 'card' | 'plain';
  className?: string;
}

export function GuestProfileCard({
  guest = { name: 'Elena Duarte', email: 'elena.duarte@mail.com', phone: '+34 612 345 678', country: 'Spain', since: 'Mar 2022' },
  tier = 'Gold',
  stats = [{ label: 'Stays', value: '7' }, { label: 'Nights', value: '19' }, { label: 'Lifetime spend', value: '€4,820' }, { label: 'Avg. rating', value: '4.9' }],
  preferences = ['High floor', 'Feather-free pillows', 'Late check-out', 'Sparkling water'],
  upcoming = { room: '204 · Deluxe King', dates: 'Nov 4 – Nov 7', status: 'Confirmed' },
  notes = ['Celebrating anniversary — prepare welcome card.', 'Prefers WhatsApp for contact.'],
  actions = [{ label: 'Message' }, { label: 'New booking', primary: true }],
  variant = 'card',
  className = '',
}: GuestProfileCardProps) {
  return (
    <>
      <article className={cx(['gp', `gp--${variant}`, className])} aria-labelledby="gp-name" data-rk-333a1a="">
        <header className="gp__head" data-rk-333a1a="">
          <span className="gp__avatar" style={st(`--h: ${hueFrom(guest.name)}`)} aria-hidden="true" data-rk-333a1a="">{initials(guest.name)}</span>
          <div className="gp__id" data-rk-333a1a="">
            <h2 className="gp__name" id="gp-name" data-rk-333a1a="">{guest.name}</h2>
            <p className="gp__sub" data-rk-333a1a="">
              {tier && <span className="gp__tier" data-rk-333a1a=""><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-rk-333a1a=""><g dangerouslySetInnerHTML={{ __html: appIcon('star') }} data-rk-333a1a="" /></svg>{tier} member</span>}
              {guest.since && <span data-rk-333a1a="">Guest since {guest.since}</span>}
            </p>
          </div>
          <div className="gp__actions" data-rk-333a1a="">
            {actions.map((a) => {
              const Tag = a.href ? 'a' : 'button';
              return <Tag className={cx(['gp__btn', { 'gp__btn--primary': a.primary }])} href={a.href} type={a.href ? undefined : 'button'} data-rk-333a1a="">{a.label}</Tag>;
            })}
          </div>
        </header>
      
        <ul className="gp__contact" data-rk-333a1a="">
          {guest.email && <li data-rk-333a1a=""><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-rk-333a1a=""><g dangerouslySetInnerHTML={{ __html: appIcon('mail') }} data-rk-333a1a="" /></svg><a href={`mailto:${guest.email}`} data-rk-333a1a="">{guest.email}</a></li>}
          {guest.phone && <li data-rk-333a1a=""><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-rk-333a1a=""><g dangerouslySetInnerHTML={{ __html: appIcon('phone') }} data-rk-333a1a="" /></svg><a href={`tel:${guest.phone.replace(/\s/g, '')}`} data-rk-333a1a="">{guest.phone}</a></li>}
          {guest.country && <li data-rk-333a1a=""><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-rk-333a1a=""><g dangerouslySetInnerHTML={{ __html: appIcon('plane') }} data-rk-333a1a="" /></svg>{guest.country}</li>}
        </ul>
      
        <dl className="gp__stats" data-rk-333a1a="">
          {stats.map((s, __i: number) => <div key={__i} data-rk-333a1a=""><dt data-rk-333a1a="">{s.label}</dt><dd data-rk-333a1a="">{s.value}</dd></div>)}
        </dl>
      
        {upcoming && (
          <div className="gp__block" data-rk-333a1a="">
            <h3 data-rk-333a1a="">Upcoming stay</h3>
            <p className="gp__stay" data-rk-333a1a=""><strong data-rk-333a1a="">{upcoming.room}</strong><span data-rk-333a1a="">{upcoming.dates}</span>{upcoming.status && <em data-rk-333a1a="">{upcoming.status}</em>}</p>
          </div>
        )}
        {preferences.length > 0 && (
          <div className="gp__block" data-rk-333a1a="">
            <h3 data-rk-333a1a="">Preferences</h3>
            <ul className="gp__tags" data-rk-333a1a="">{preferences.map((p, __i: number) => <li key={__i} data-rk-333a1a="">{p}</li>)}</ul>
          </div>
        )}
        {notes.length > 0 && (
          <div className="gp__block" data-rk-333a1a="">
            <h3 data-rk-333a1a="">Staff notes</h3>
            <ul className="gp__notes" data-rk-333a1a="">{notes.map((n, __i: number) => <li key={__i} data-rk-333a1a="">{n}</li>)}</ul>
          </div>
        )}
      </article>
    </>
  );
}

export default GuestProfileCard;
