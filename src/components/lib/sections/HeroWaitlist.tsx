'use client';

import { useEffect, useRef, useId } from 'react';
import type { CSSProperties } from 'react';
import './HeroWaitlist.css';

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
 * HeroWaitlist — Pre-launch hero with an accessible email capture form,
 * inline validation, success state and avatar-stack social proof.
 *
 * @param {string} badge - Status pill text (e.g. 'Private beta').
 * @param {string} title - Headline.
 * @param {string} subtitle - Supporting paragraph.
 * @param {string} action - Form action URL (posts `email`).
 * @param {string} buttonLabel - Submit button text.
 * @param {string} successMessage - Message after a valid submission.
 * @param {number} count - Number of people already on the list.
 * @param {string} variant - Background treatment (default|aurora|minimal).
 * @param {string} size - Vertical rhythm (sm|md|lg).
 * @param {string} className - Extra CSS class.
 */
export interface HeroWaitlistProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  action?: string;
  buttonLabel?: string;
  successMessage?: string;
  count?: number;
  variant?: 'default' | 'aurora' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function HeroWaitlist({
  badge = 'Private beta · Spring 2027',
  title = 'Analytics that respect your users',
  subtitle = 'Cookieless, privacy-first insights with beautiful dashboards. Join the waitlist for early access and founder pricing.',
  action = '#',
  buttonLabel = 'Join waitlist',
  successMessage = "You're on the list! Check your inbox to confirm.",
  count = 4280,
  variant = 'aurora',
  size = 'lg',
  className = '',
}: HeroWaitlistProps) {
  const id = `hw-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const initials = ['AK', 'MR', 'JS', 'LP', 'TW'];
  const hues = ['var(--chart-1, #3987e5)', 'var(--chart-2, #d95926)', 'var(--chart-3, #199e70)', 'var(--chart-5, #d55181)', 'var(--chart-7, #9085e9)'];

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLFormElement>('.hw__form').forEach((form) => {
        const input = form.querySelector<HTMLInputElement>('input[type="email"]');
        const msg = document.getElementById(input?.getAttribute('aria-describedby') || '');
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
          msg.dataset.state = 'success';
          msg.textContent = form.dataset.success || 'Thanks!';
          form.classList.add('is-done');
          input.value = '';
        });
        input?.addEventListener('input', () => {
          input.removeAttribute('aria-invalid');
          if (msg && msg.dataset.state === 'error') msg.textContent = '';
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="cq-hero-waitlist-cq" data-rk-536aca="">
      <section className={`hw hw--${variant} hw--${size} ${className}`} aria-labelledby={id} data-rk-536aca="">
        <div className="hw__aurora" aria-hidden="true" data-rk-536aca=""><span data-rk-536aca=""></span><span data-rk-536aca=""></span><span data-rk-536aca=""></span></div>
        <div className="hw__inner" data-rk-536aca="">
          <span className="hw__badge" data-rk-536aca=""><span className="hw__pulse" aria-hidden="true" data-rk-536aca=""></span>{badge}</span>
          <h1 id={id} className="hw__title" data-rk-536aca="">{title}</h1>
          <p className="hw__subtitle" data-rk-536aca="">{subtitle}</p>
      
          <form className="hw__form" action={action} method="post" noValidate data-success={successMessage} data-rk-536aca="">
            <label htmlFor={`${id}-email`} className="hw__sr" data-rk-536aca="">Email address</label>
            <input id={`${id}-email`} className="hw__input" type="email" name="email" placeholder="you@company.com" autoComplete="email" required aria-describedby={`${id}-msg`} data-rk-536aca="" />
            <button className="hw__btn" type="submit" data-rk-536aca="">
              <span data-rk-536aca="">{buttonLabel}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" data-rk-536aca=""><path d="M5 12h14M13 6l6 6-6 6" data-rk-536aca="" /></svg>
            </button>
          </form>
          <p id={`${id}-msg`} className="hw__msg" role="status" aria-live="polite" data-rk-536aca=""></p>
      
          <div className="hw__proof" data-rk-536aca="">
            <div className="hw__avatars" aria-hidden="true" data-rk-536aca="">
              {initials.map((ini, i) => <span key={i} style={st(`background:${hues[i]}`)} data-rk-536aca="">{ini}</span>)}
            </div>
            <p data-rk-536aca=""><strong data-rk-536aca="">{count.toLocaleString('en-US')}+</strong> builders already joined</p>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

export default HeroWaitlist;
