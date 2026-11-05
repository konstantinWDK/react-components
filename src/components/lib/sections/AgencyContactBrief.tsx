'use client';

import { useEffect, useRef } from 'react';
import './AgencyContactBrief.css';

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
 * AgencyContactBrief — "Start a project" brief: service chips, budget pills, timeline, contact
 * details and message, with validation and a success state; side column with direct contacts,
 * office and response time.
 *
 * @param {string} title - Heading. Default "Let's build something people remember".
 * @param {string} text - Intro text.
 * @param {string[]} services - Service chips (multi-select).
 * @param {string[]} budgets - Budget options (single-select).
 * @param {string[]} timelines - Timeline select options.
 * @param {string} action - Form action. With '#' the form validates and confirms locally. Default '#'.
 * @param {Array<{label: string, value: string, href: string}>} contacts - Direct channels.
 * @param {{city: string, address: string}} office - Office card (optional).
 * @param {string} responseTime - Reply promise. Default 'We reply within one business day.'
 * @param {string} id - Base id. Default 'brief'.
 * @param {string} className - Extra class.
 *
 * Accessibility: chips and pills are native checkboxes/radios inside fieldsets with legends;
 * required fields use autocomplete hints; errors are listed in an alert and focus moves to the
 * first invalid field; the success message receives focus.
 */
export interface AgencyContactBriefProps {
  title?: string;
  text?: string;
  services?: string[];
  budgets?: string[];
  timelines?: string[];
  action?: string;
  contacts?: Array<{ label: string; value: string; href: string }>;
  office?: { city: string; address: string };
  responseTime?: string;
  id?: string;
  className?: string;
}

export function AgencyContactBrief({
  title = "Let's build something people remember",
  text = 'Tell us a little about your project. A partner — not a salesperson — will reply with next steps.',
  services = ['Brand identity', 'Website', 'Growth marketing', 'Content & social', 'Not sure yet'],
  budgets = ['< €15k', '€15–30k', '€30–60k', '€60k+'],
  timelines = ['As soon as possible', 'In 1–3 months', 'In 3–6 months', 'Just exploring'],
  action = '#',
  contacts = [
    { label: 'New business', value: 'hello@volta.studio', href: 'mailto:hello@volta.studio' },
    { label: 'Call us', value: '+34 910 123 456', href: 'tel:+34910123456' },
  ],
  office = { city: 'Madrid', address: 'Calle de Fuencarral 45, 28004' },
  responseTime = 'We reply within one business day.',
  id = 'brief',
  className = '',
}: AgencyContactBriefProps) {

  // Ported from the Astro <script>: runs once after mount (DOM logic kept as in the Astro kit).
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLFormElement>('form[data-brief]:not([data-bound])').forEach((form) => {
        form.dataset.bound = '';
        const error = form.querySelector<HTMLElement>('[data-error]')!;
        const done = form.parentElement!.querySelector<HTMLElement>('[data-done]')!;
        form.addEventListener('submit', (e) => {
          form.querySelectorAll('[aria-invalid]').forEach((n) => n.removeAttribute('aria-invalid'));
          const invalid = Array.from(form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input[required], textarea[required]')).filter((n) => !n.checkValidity());
          const noService = !form.querySelector('input[name="services"]:checked');
          if (invalid.length || noService) {
            e.preventDefault();
            invalid.forEach((n) => n.setAttribute('aria-invalid', 'true'));
            const msgs = invalid.map((n) => form.querySelector(`label[for="${n.id}"]`)?.textContent).filter(Boolean);
            if (noService) msgs.unshift('at least one service');
            error.textContent = `Please complete: ${msgs.join(', ')}.`;
            (invalid[0] ?? form.querySelector<HTMLInputElement>('input[name="services"]'))?.focus();
            return;
          }
          if (form.getAttribute('action') === '#') {
            e.preventDefault();
            form.hidden = true;
            done.hidden = false;
            done.focus();
          }
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="cq-agency-brief" data-rk-ed1e3a="">
      <section className={cx(['acb', className])} aria-labelledby={`${id}-title`} data-rk-ed1e3a="">
        <div className="acb__intro" data-rk-ed1e3a="">
          <h2 className="acb__title" id={`${id}-title`} data-rk-ed1e3a="">{title}</h2>
          {text && <p className="acb__text" data-rk-ed1e3a="">{text}</p>}
          <ul className="acb__contacts" data-rk-ed1e3a="">
            {contacts.map((c, __i: number) => <li key={__i} data-rk-ed1e3a=""><span data-rk-ed1e3a="">{c.label}</span><a href={c.href} data-rk-ed1e3a="">{c.value}</a></li>)}
          </ul>
          {office && <p className="acb__office" data-rk-ed1e3a=""><span data-rk-ed1e3a="">Studio</span><strong data-rk-ed1e3a="">{office.city}</strong>{office.address}</p>}
          {responseTime && <p className="acb__reply" data-rk-ed1e3a=""><i aria-hidden="true" data-rk-ed1e3a=""></i>{responseTime}</p>}
        </div>
      
        <form className="acb__form" action={action} method="post" noValidate data-brief data-rk-ed1e3a="">
          <fieldset className="acb__group" data-rk-ed1e3a="">
            <legend data-rk-ed1e3a="">What do you need?</legend>
            <div className="acb__chips" data-rk-ed1e3a="">
              {services.map((s, i) => (
                <label key={i} className="acb__chip" data-rk-ed1e3a=""><input type="checkbox" name="services" defaultValue={s} defaultChecked={i === 0} data-rk-ed1e3a="" /><span data-rk-ed1e3a="">{s}</span></label>
              ))}
            </div>
          </fieldset>
          <fieldset className="acb__group" data-rk-ed1e3a="">
            <legend data-rk-ed1e3a="">Budget</legend>
            <div className="acb__chips" data-rk-ed1e3a="">
              {budgets.map((b, i) => (
                <label key={i} className="acb__chip" data-rk-ed1e3a=""><input type="radio" name="budget" defaultValue={b} defaultChecked={i === 1} data-rk-ed1e3a="" /><span data-rk-ed1e3a="">{b}</span></label>
              ))}
            </div>
          </fieldset>
          <div className="acb__row" data-rk-ed1e3a="">
            <div className="acb__field" data-rk-ed1e3a="">
              <label htmlFor={`${id}-name`} data-rk-ed1e3a="">Your name</label>
              <input id={`${id}-name`} name="name" required autoComplete="name" data-rk-ed1e3a="" />
            </div>
            <div className="acb__field" data-rk-ed1e3a="">
              <label htmlFor={`${id}-email`} data-rk-ed1e3a="">Work email</label>
              <input id={`${id}-email`} name="email" type="email" required autoComplete="email" data-rk-ed1e3a="" />
            </div>
          </div>
          <div className="acb__row" data-rk-ed1e3a="">
            <div className="acb__field" data-rk-ed1e3a="">
              <label htmlFor={`${id}-company`} data-rk-ed1e3a="">Company</label>
              <input id={`${id}-company`} name="company" autoComplete="organization" data-rk-ed1e3a="" />
            </div>
            <div className="acb__field" data-rk-ed1e3a="">
              <label htmlFor={`${id}-when`} data-rk-ed1e3a="">Timeline</label>
              <select id={`${id}-when`} name="timeline" data-rk-ed1e3a="">{timelines.map((t, __i: number) => <option key={__i} data-rk-ed1e3a="">{t}</option>)}</select>
            </div>
          </div>
          <div className="acb__field" data-rk-ed1e3a="">
            <label htmlFor={`${id}-msg`} data-rk-ed1e3a="">Tell us about the project</label>
            <textarea id={`${id}-msg`} name="message" rows={4} required minLength={20} placeholder="Goals, audience, deadlines, links…" data-rk-ed1e3a=""></textarea>
          </div>
          <p className="acb__error" role="alert" data-error data-rk-ed1e3a=""></p>
          <button className="acb__submit" type="submit" data-rk-ed1e3a="">Send brief <span aria-hidden="true" data-rk-ed1e3a="">↗</span></button>
          <p className="acb__fine" data-rk-ed1e3a="">By sending this form you agree to our privacy policy. No newsletters, promise.</p>
        </form>
      
        <div className="acb__done" hidden tabIndex={-1} data-done data-rk-ed1e3a="">
          <span className="acb__done-badge" aria-hidden="true" data-rk-ed1e3a="">✓</span>
          <h3 data-rk-ed1e3a="">Brief received — thank you!</h3>
          <p data-rk-ed1e3a="">{responseTime} In the meantime, have a look at our recent work.</p>
        </div>
      </section>
      </div>
    </>
  );
}

export default AgencyContactBrief;
