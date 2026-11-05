'use client';

import { useEffect, useRef } from 'react';
import './AuthCard.css';

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
 * AuthCard — Sign-in / sign-up split screen: form card (email, password with show/hide, remember
 * me, SSO buttons) next to a brand panel with a quote and key figures.
 *
 * @param {string} mode - 'signin' or 'signup'. Default 'signin'.
 * @param {string} brand - Product name. Default 'Lobby'.
 * @param {string} title - Heading. Defaults by mode.
 * @param {string} subtitle - Supporting text.
 * @param {string} action - Form action. With '#' it validates and redirects to `successHref`. Default '#'.
 * @param {string} successHref - Where to go after a demo sign-in. Default '#'.
 * @param {string[]} providers - SSO buttons. Default ['Google', 'Microsoft'].
 * @param {string} switchHref - Link to the other mode. Default '#'.
 * @param {{quote: string, author: string, role?: string}} testimonial - Brand panel quote (optional).
 * @param {Array<{value: string, label: string}>} stats - Brand panel figures.
 * @param {string} variant - Layout (split|centered). Default 'split'.
 * @param {string} className - Extra class.
 *
 * Accessibility: one h1; labelled fields with autocomplete (email, current-password /
 * new-password); errors are linked with aria-describedby and announced; the show-password
 * button is a toggle with aria-pressed.
 */
export interface AuthCardProps {
  mode?: 'signin' | 'signup';
  brand?: string;
  title?: string;
  subtitle?: string;
  action?: string;
  successHref?: string;
  providers?: string[];
  switchHref?: string;
  testimonial?: { quote: string; author: string; role?: string };
  stats?: Array<{ value: string; label: string }>;
  variant?: 'split' | 'centered';
  className?: string;
}

export function AuthCard({
  mode = 'signin',
  brand = 'Lobby',
  title = mode === 'signin' ? 'Welcome back' : 'Create your workspace',
  subtitle = mode === 'signin' ? 'Sign in to manage your property.' : 'Start your 14-day free trial — no card required.',
  action = '#',
  successHref = '#',
  providers = ['Google', 'Microsoft'],
  switchHref = '#',
  testimonial = { quote: 'We replaced three tools with Lobby. Check-in takes half the time and our occupancy is up 9% this season.', author: 'Lucía Ortega', role: 'GM, Hotel Mirador' },
  stats = [{ value: '2,400+', label: 'properties' }, { value: '38%', label: 'less admin time' }, { value: '4.9/5', label: 'support rating' }],
  variant = 'split',
  className = '',
}: AuthCardProps) {
  const isIn = mode === 'signin';

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLFormElement>('form[data-auth]:not([data-bound])').forEach((form) => {
        form.dataset.bound = '';
        const eye = form.querySelector<HTMLButtonElement>('[data-eye]');
        const pass = form.querySelector<HTMLInputElement>('#auth-pass');
        const error = form.querySelector<HTMLElement>('[data-error]')!;
        eye?.addEventListener('click', () => {
          const show = eye.getAttribute('aria-pressed') !== 'true';
          eye.setAttribute('aria-pressed', String(show));
          eye.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
          if (pass) pass.type = show ? 'text' : 'password';
        });
        form.addEventListener('submit', (e) => {
          form.querySelectorAll('[aria-invalid]').forEach((n) => n.removeAttribute('aria-invalid'));
          const bad = Array.from(form.querySelectorAll<HTMLInputElement>('input[required]')).filter((i) => !i.checkValidity());
          if (bad.length) {
            e.preventDefault();
            bad.forEach((i) => i.setAttribute('aria-invalid', 'true'));
            error.textContent = bad[0].type === 'password' ? 'Your password needs at least 8 characters.' : 'Please check your email address.';
            bad[0].focus();
            return;
          }
          if (form.getAttribute('action') === '#') {
            e.preventDefault();
            const btn = form.querySelector<HTMLButtonElement>('[data-submit]')!;
            btn.disabled = true;
            btn.textContent = 'Signing in…';
            window.setTimeout(() => { window.location.href = form.dataset.success || '#'; }, 700);
          }
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="auth-cq" data-rk-149787="">
      <section className={cx(['auth', `auth--${variant}`, className])} data-rk-149787="">
        <div className="auth__form-side" data-rk-149787="">
          <form className="auth__card" action={action} method="post" noValidate data-auth data-success={successHref} data-rk-149787="">
            <p className="auth__brand" data-rk-149787=""><span aria-hidden="true" data-rk-149787="">{brand.slice(0, 1)}</span>{brand}</p>
            <h1 className="auth__title" data-rk-149787="">{title}</h1>
            {subtitle && <p className="auth__sub" data-rk-149787="">{subtitle}</p>}
      
            {providers.length > 0 && (
              <>
                <div className="auth__sso" data-rk-149787="">
                  {providers.map((p, __i: number) => <button key={__i} type="button" className="auth__sso-btn" data-rk-149787="">Continue with {p}</button>)}
                </div>
                <p className="auth__or" data-rk-149787=""><span data-rk-149787="">or with email</span></p>
              </>
            )}
      
            {!isIn && (
              <div className="auth__field" data-rk-149787="">
                <label htmlFor="auth-name" data-rk-149787="">Full name</label>
                <input id="auth-name" name="name" type="text" autoComplete="name" required data-rk-149787="" />
              </div>
            )}
            <div className="auth__field" data-rk-149787="">
              <label htmlFor="auth-email" data-rk-149787="">Work email</label>
              <input id="auth-email" name="email" type="email" autoComplete="email" required aria-describedby="auth-error" data-rk-149787="" />
            </div>
            <div className="auth__field" data-rk-149787="">
              <div className="auth__label-row" data-rk-149787="">
                <label htmlFor="auth-pass" data-rk-149787="">Password</label>
                {isIn && <a href="#" data-rk-149787="">Forgot password?</a>}
              </div>
              <div className="auth__pass" data-rk-149787="">
                <input id="auth-pass" name="password" type="password" autoComplete={isIn ? 'current-password' : 'new-password'} required minLength={8} aria-describedby="auth-error" data-rk-149787="" />
                <button type="button" className="auth__eye" aria-pressed="false" aria-label="Show password" data-eye data-rk-149787="">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-rk-149787=""><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" data-rk-149787="" /><circle cx="12" cy="12" r="3" data-rk-149787="" /></svg>
                </button>
              </div>
            </div>
            {isIn && (
              <label className="auth__remember" data-rk-149787=""><input type="checkbox" name="remember" defaultChecked data-rk-149787="" /> Keep me signed in</label>
            )}
            <p className="auth__error" id="auth-error" role="alert" data-error data-rk-149787=""></p>
            <button type="submit" className="auth__submit" data-submit data-rk-149787="">{isIn ? 'Sign in' : 'Create account'}</button>
            <p className="auth__switch" data-rk-149787="">{isIn ? 'New to ' + brand + '?' : 'Already have an account?'} <a href={switchHref} data-rk-149787="">{isIn ? 'Start a free trial' : 'Sign in'}</a></p>
          </form>
        </div>
      
        {variant === 'split' && (
          <aside className="auth__brand-side" aria-label={`About ${brand}`} data-rk-149787="">
            {testimonial && (
              <figure className="auth__quote" data-rk-149787="">
                <blockquote data-rk-149787=""><p data-rk-149787="">“{testimonial.quote}”</p></blockquote>
                <figcaption data-rk-149787=""><strong data-rk-149787="">{testimonial.author}</strong>{testimonial.role && <span data-rk-149787=""> · {testimonial.role}</span>}</figcaption>
              </figure>
            )}
            {stats.length > 0 && (
              <dl className="auth__stats" data-rk-149787="">{stats.map((s, __i: number) => <div key={__i} data-rk-149787=""><dt data-rk-149787="">{s.label}</dt><dd data-rk-149787="">{s.value}</dd></div>)}</dl>
            )}
          </aside>
        )}
      </section>
      </div>
    </>
  );
}

export default AuthCard;
