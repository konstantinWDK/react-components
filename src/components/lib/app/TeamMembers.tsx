'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { initials, hueFrom } from './app-icons';
import './TeamMembers.css';
// TODO(port): <option selected> → set defaultValue on the <select>

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

interface Member { name: string; email: string; role: string; status?: 'active' | 'invited' | 'suspended'; you?: boolean }

/**
 * TeamMembers — Team management list: members with avatar, email, role selector and status,
 * an invite form, and remove with confirmation.
 *
 * @param {string} title - Card title. Default 'Team'.
 * @param {Array<{name: string, email: string, role: string, status?: 'active'|'invited'|'suspended', you?: boolean}>} members - People.
 * @param {string[]} roles - Role options. Default ['Owner', 'Manager', 'Front desk', 'Housekeeping', 'Viewer'].
 * @param {number} seats - Seats in the plan (shows "4 of 10 seats"). Optional.
 * @param {string} variant - Style (card|plain). Default 'card'.
 * @param {string} className - Extra class.
 *
 * Accessibility: real list; role selects and remove buttons are labelled with the member's name;
 * the invite email field validates natively; changes are announced politely.
 * Emits `app:team-invite` `{ email, role }` and `app:team-remove` `{ email }`.
 */
export interface TeamMembersProps {
  title?: string;
  members?: Member[];
  roles?: string[];
  seats?: number;
  variant?: 'card' | 'plain';
  className?: string;
}

export function TeamMembers({
  title = 'Team',
  members = [
    { name: 'Lucía Ortega', email: 'lucia@mirador.com', role: 'Owner', status: 'active', you: true },
    { name: 'Daniel Kim', email: 'daniel@mirador.com', role: 'Manager', status: 'active' },
    { name: 'Rosa Jiménez', email: 'rosa@mirador.com', role: 'Housekeeping', status: 'active' },
    { name: 'Omar Haddad', email: 'omar@mirador.com', role: 'Front desk', status: 'invited' },
  ],
  roles = ['Owner', 'Manager', 'Front desk', 'Housekeeping', 'Viewer'],
  seats = 10,
  variant = 'card',
  className = '',
}: TeamMembersProps) {

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLElement>('[data-team]:not([data-bound])').forEach((team) => {
        team.dataset.bound = '';
        const list = team.querySelector<HTMLUListElement>('[data-list]')!;
        const msg = team.querySelector<HTMLElement>('[data-msg]')!;
        const used = team.querySelector<HTMLElement>('[data-used]');
        const form = team.querySelector<HTMLFormElement>('[data-invite]')!;
        const recount = () => { if (used) used.textContent = String(list.children.length); };
    
        const bindRemove = (btn: HTMLButtonElement) => {
          let armed = false;
          btn.addEventListener('click', () => {
            const row = btn.closest<HTMLElement>('.team__row')!;
            const name = row.querySelector('strong')?.textContent?.replace(' (you)', '') ?? '';
            if (!armed) {
              armed = true;
              btn.classList.add('is-armed');
              btn.setAttribute('aria-label', `Confirm removing ${name}`);
              msg.textContent = `Click again to remove ${name}.`;
              window.setTimeout(() => { armed = false; btn.classList.remove('is-armed'); btn.setAttribute('aria-label', `Remove ${name}`); }, 3000);
              return;
            }
            team.dispatchEvent(new CustomEvent('app:team-remove', { bubbles: true, detail: { email: row.dataset.email } }));
            const next = (row.nextElementSibling ?? row.previousElementSibling)?.querySelector<HTMLElement>('select, button');
            row.remove();
            msg.textContent = `${name} was removed from the team.`;
            recount();
            next?.focus();
          });
        };
        team.querySelectorAll<HTMLButtonElement>('[data-remove]').forEach(bindRemove);
    
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const input = form.elements.namedItem('email') as HTMLInputElement;
          const role = (form.elements.namedItem('role') as HTMLSelectElement).value;
          if (!input.checkValidity()) { msg.textContent = 'Enter a valid email address.'; input.focus(); return; }
          const email = input.value.trim();
          const name = email.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
          const li = document.createElement('li');
          li.className = 'team__row is-new';
          li.dataset.email = email;
          li.innerHTML = `<span class="team__avatar" style="--h:${hueFrom(name)}" aria-hidden="true">${initials(name)}</span>
            <span class="team__who"><strong></strong><small></small></span>
            <span class="team__status team__status--invited">Invited</span>
            <span class="team__role-static"></span>
            <button type="button" class="team__remove" data-remove><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></button>`;
          li.querySelector('strong')!.textContent = name;
          li.querySelector('small')!.textContent = email;
          li.querySelector('.team__role-static')!.textContent = role;
          li.querySelector('button')!.setAttribute('aria-label', `Remove ${name}`);
          list.append(li);
          bindRemove(li.querySelector<HTMLButtonElement>('[data-remove]')!);
          msg.textContent = `Invitation sent to ${email} as ${role}.`;
          team.dispatchEvent(new CustomEvent('app:team-invite', { bubbles: true, detail: { email, role } }));
          form.reset();
          recount();
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className={cx(['team', `team--${variant}`, className])} data-team aria-labelledby="team-title" data-rk-5c76e9="">
        <header className="team__head" data-rk-5c76e9="">
          <div data-rk-5c76e9="">
            <h2 className="team__title" id="team-title" data-rk-5c76e9="">{title}</h2>
            {seats && <p className="team__seats" data-rk-5c76e9=""><span data-used data-rk-5c76e9="">{members.length}</span> of {seats} seats used</p>}
          </div>
        </header>
      
        <form className="team__invite" noValidate data-invite data-rk-5c76e9="">
          <label className="sr-only" htmlFor="team-email" data-rk-5c76e9="">Email to invite</label>
          <input id="team-email" type="email" name="email" placeholder="name@company.com" required autoComplete="email" data-rk-5c76e9="" />
          <label className="sr-only" htmlFor="team-role" data-rk-5c76e9="">Role</label>
          <select id="team-role" name="role" data-rk-5c76e9="">{roles.filter((r) => r !== 'Owner').map((r, __i: number) => <option key={__i} data-rk-5c76e9="">{r}</option>)}</select>
          <button type="submit" data-rk-5c76e9="">Send invite</button>
        </form>
        <p className="team__msg" aria-live="polite" data-msg data-rk-5c76e9=""></p>
      
        <ul className="team__list" data-list data-rk-5c76e9="">
          {members.map((m, __i: number) => (
            <li key={__i} className="team__row" data-email={m.email} data-rk-5c76e9="">
              <span className="team__avatar" style={st(`--h: ${hueFrom(m.name)}`)} aria-hidden="true" data-rk-5c76e9="">{initials(m.name)}</span>
              <span className="team__who" data-rk-5c76e9="">
                <strong data-rk-5c76e9="">{m.name}{m.you && <em data-rk-5c76e9=""> (you)</em>}</strong>
                <small data-rk-5c76e9="">{m.email}</small>
              </span>
              <span className={cx(['team__status', `team__status--${m.status ?? 'active'}`])} data-rk-5c76e9="">{m.status === 'invited' ? 'Invited' : m.status === 'suspended' ? 'Suspended' : 'Active'}</span>
              <label className="sr-only" htmlFor={`role-${m.email}`} data-rk-5c76e9="">Role for {m.name}</label>
              <select id={`role-${m.email}`} className="team__role" disabled={m.role === 'Owner'} data-rk-5c76e9="">
                {roles.map((r, __i: number) => <option key={__i} data-rk-5c76e9="">{r}</option>)}
              </select>
              <button type="button" className="team__remove" aria-label={`Remove ${m.name}`} disabled={m.you} data-remove data-rk-5c76e9="">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" data-rk-5c76e9=""><path d="M18 6 6 18M6 6l12 12" data-rk-5c76e9="" /></svg>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default TeamMembers;
