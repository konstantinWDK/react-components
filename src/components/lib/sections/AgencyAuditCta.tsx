'use client';

import { useEffect, useRef } from 'react';
import './AgencyAuditCta.css';

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
 * AgencyAuditCta — "Free growth audit" lead magnet: website + email form with validation; on
 * submit it runs an animated scan (checklist + progress) and reveals a score gauge with the top
 * opportunities and a booking CTA. Pass an `action` URL to post the form to your backend instead.
 *
 * @param {string} eyebrow - Small label. Default 'Free growth audit'.
 * @param {string} title - Heading. Default 'How much growth is your website leaving on the table?'.
 * @param {string} text - Intro paragraph.
 * @param {string} action - Form action. With '#' the demo scan runs in the browser. Default '#'.
 * @param {string[]} checks - Labels shown while "scanning".
 * @param {Array<{area: string, text: string}>} findings - Opportunities revealed after the scan.
 * @param {{label: string, href: string}} cta - Booking CTA shown with the results.
 * @param {string} note - Privacy line under the form.
 * @param {string} id - Section id (anchor). Default 'audit'.
 * @param {string} className - Extra class.
 *
 * Accessibility: labelled inputs with inline errors (aria-invalid + aria-describedby); scan
 * progress and results are announced through a polite live region; focus moves to the results.
 */
export interface AgencyAuditCtaProps {
  eyebrow?: string;
  title?: string;
  text?: string;
  action?: string;
  checks?: string[];
  findings?: Array<{ area: string; text: string }>;
  cta?: { label: string; href: string };
  note?: string;
  id?: string;
  className?: string;
}

export function AgencyAuditCta({
  eyebrow = 'Free growth audit',
  title = 'How much growth is your website leaving on the table?',
  text = 'Enter your site and we will check speed, SEO and tracking in seconds. A strategist follows up with a full written audit within 48 hours — free.',
  action = '#',
  checks = ['Crawling your pages', 'Measuring Core Web Vitals', 'Checking indexation & metadata', 'Looking for tracking & pixels', 'Estimating paid search opportunity'],
  findings = [
    { area: 'Speed', text: 'Mobile pages load slower than 70% of competitors — every second costs conversions.' },
    { area: 'SEO', text: 'Key service pages target no clear keyword and miss structured data.' },
    { area: 'Ads', text: 'No server-side conversion tracking: platforms optimise on incomplete data.' },
  ],
  cta = { label: 'Book my free strategy call', href: '#contact' },
  note = 'No spam. We only use your email to send the audit.',
  id = 'audit',
  className = '',
}: AgencyAuditCtaProps) {

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLElement>('[data-audit]:not([data-bound])').forEach((root) => {
        root.dataset.bound = '';
        const form = root.querySelector<HTMLFormElement>('[data-audit-form]')!;
        const scan = root.querySelector<HTMLElement>('[data-scan]')!;
        const result = root.querySelector<HTMLElement>('[data-result]')!;
        const live = root.querySelector<HTMLElement>('[data-live]')!;
        const bar = root.querySelector<HTMLElement>('[data-bar]')!;
        const checks = Array.from(root.querySelectorAll<HTMLElement>('[data-check]'));
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
        const setError = (input: HTMLInputElement, bad: boolean) => {
          input.setAttribute('aria-invalid', String(bad));
          const err = root.querySelector<HTMLElement>(`#${input.getAttribute('aria-describedby')}`);
          if (err) err.hidden = !bad;
        };
        const validUrl = (v: string) => /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i.test(v.trim());
        const validEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
    
        form.addEventListener('submit', (e) => {
          const url = form.elements.namedItem('website') as HTMLInputElement;
          const email = form.elements.namedItem('email') as HTMLInputElement;
          const urlBad = !validUrl(url.value);
          const emailBad = !validEmail(email.value);
          setError(url, urlBad);
          setError(email, emailBad);
          if (urlBad || emailBad) { e.preventDefault(); (urlBad ? url : email).focus(); return; }
          if (form.getAttribute('action') !== '#') return; // real backend
    
          e.preventDefault();
          const site = url.value.trim().replace(/^https?:\/\//, '').replace(/\/$/, '');
          // Deterministic demo score (52–78) so the same site always gets the same result.
          let h = 0;
          for (const ch of site) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
          const score = 52 + (h % 27);
    
          form.hidden = true;
          scan.hidden = false;
          root.querySelector<HTMLElement>('[data-site]')!.textContent = `Scanning ${site}…`;
          root.querySelector<HTMLElement>('[data-site-2]')!.textContent = site;
          live.textContent = `Scanning ${site}`;
    
          const step = reduce ? 80 : 650;
          checks.forEach((c, i) => {
            window.setTimeout(() => {
              c.classList.add('is-done');
              bar.style.width = `${((i + 1) / checks.length) * 100}%`;
            }, step * (i + 1));
          });
          window.setTimeout(() => {
            scan.hidden = true;
            result.hidden = false;
            const arc = root.querySelector<SVGCircleElement>('[data-arc]')!;
            const out = root.querySelector<HTMLElement>('[data-score]')!;
            requestAnimationFrame(() => arc.style.setProperty('--v', String(score)));
            const t0 = performance.now();
            const tick = (t: number) => {
              const p = reduce ? 1 : Math.min(1, (t - t0) / 1000);
              out.textContent = String(Math.round(score * p));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            live.textContent = `Audit ready: ${site} scores ${score} out of 100. ${checks.length} checks completed.`;
            result.focus();
          }, step * (checks.length + 1));
        });
    
        form.querySelectorAll('input').forEach((input) => input.addEventListener('input', () => {
          if (input.getAttribute('aria-invalid') === 'true') setError(input, input.name === 'email' ? !validEmail(input.value) : !validUrl(input.value));
        }));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="aac-cq" data-rk-6ec0b9="">
      <section className={cx(['aac', className])} id={id} data-audit data-rk-6ec0b9="">
        <div className="aac__copy" data-rk-6ec0b9="">
          {eyebrow && <p className="aac__eyebrow" data-rk-6ec0b9=""><span aria-hidden="true" data-rk-6ec0b9="">●</span>{eyebrow}</p>}
          <h2 className="aac__title" data-rk-6ec0b9="">{title}</h2>
          {text && <p className="aac__text" data-rk-6ec0b9="">{text}</p>}
        </div>
      
        <div className="aac__panel" data-rk-6ec0b9="">
          <form className="aac__form" action={action} method="post" noValidate data-audit-form data-rk-6ec0b9="">
            <div className="aac__field" data-rk-6ec0b9="">
              <label htmlFor={`${id}-url`} data-rk-6ec0b9="">Website</label>
              <input id={`${id}-url`} name="website" type="text" inputMode="url" autoComplete="url" placeholder="yourbrand.com" required aria-describedby={`${id}-url-err`} data-rk-6ec0b9="" />
              <p className="aac__err" id={`${id}-url-err`} hidden data-rk-6ec0b9="">Enter a valid website, e.g. yourbrand.com</p>
            </div>
            <div className="aac__field" data-rk-6ec0b9="">
              <label htmlFor={`${id}-email`} data-rk-6ec0b9="">Work email</label>
              <input id={`${id}-email`} name="email" type="email" autoComplete="email" placeholder="you@yourbrand.com" required aria-describedby={`${id}-email-err`} data-rk-6ec0b9="" />
              <p className="aac__err" id={`${id}-email-err`} hidden data-rk-6ec0b9="">Enter a valid email address</p>
            </div>
            <button className="aac__submit" type="submit" data-rk-6ec0b9="">Run my free audit <span aria-hidden="true" data-rk-6ec0b9="">→</span></button>
            {note && <p className="aac__note" data-rk-6ec0b9="">{note}</p>}
          </form>
      
          <div className="aac__scan" hidden data-scan data-rk-6ec0b9="">
            <p className="aac__scan-site" data-site data-rk-6ec0b9=""></p>
            <div className="aac__bar" aria-hidden="true" data-rk-6ec0b9=""><span data-bar data-rk-6ec0b9=""></span></div>
            <ul className="aac__checks" data-rk-6ec0b9="">
              {checks.map((c, __i: number) => <li key={__i} data-check data-rk-6ec0b9=""><span className="aac__tick" aria-hidden="true" data-rk-6ec0b9=""></span>{c}</li>)}
            </ul>
          </div>
      
          <div className="aac__result" hidden tabIndex={-1} data-result data-rk-6ec0b9="">
            <div className="aac__score" data-rk-6ec0b9="">
              <svg viewBox="0 0 120 120" aria-hidden="true" data-rk-6ec0b9="">
                <circle cx="60" cy="60" r="50" className="aac__track" data-rk-6ec0b9="" />
                <circle cx="60" cy="60" r="50" className="aac__arc" pathLength="100" data-arc data-rk-6ec0b9="" />
              </svg>
              <p data-rk-6ec0b9=""><strong data-score data-rk-6ec0b9="">0</strong><span data-rk-6ec0b9="">/100</span></p>
            </div>
            <div className="aac__findings" data-rk-6ec0b9="">
              <p className="aac__result-title" data-rk-6ec0b9="">Growth score for <span data-site-2 data-rk-6ec0b9=""></span></p>
              <ul data-rk-6ec0b9="">
                {findings.map((f, __i: number) => <li key={__i} data-rk-6ec0b9=""><strong data-rk-6ec0b9="">{f.area}</strong>{f.text}</li>)}
              </ul>
              {cta && <a className="aac__submit aac__book" href={cta.href} data-rk-6ec0b9="">{cta.label} <span aria-hidden="true" data-rk-6ec0b9="">↗</span></a>}
            </div>
          </div>
          <p className="sr-only" aria-live="polite" data-live data-rk-6ec0b9=""></p>
        </div>
      </section>
      </div>
    </>
  );
}

export default AgencyAuditCta;
