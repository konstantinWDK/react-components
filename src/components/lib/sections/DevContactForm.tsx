'use client';

import { useEffect, useRef, useId } from 'react';
import './DevContactForm.css';

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
 * DevContactForm — Project inquiry form for developer portfolios ("Keycap" design): name, email,
 * project-type keys, budget, timeline and message, with inline validation and a success state;
 * an aside lists availability, response time and direct contacts.
 *
 * @param {string} action - Form endpoint. Without it the form validates and shows the success state (demo).
 * @param {string} method - HTTP method. Default 'post'.
 * @param {string[]} topics - Project types. Default Website / Web app / 3D & creative / Consulting.
 * @param {string[]} budgets - Budget options.
 * @param {string} availability - Availability line. Default 'Available for new projects'.
 * @param {string} response - Response-time line. Default 'Replies within 24 hours'.
 * @param {Array<{label: string, value: string, href: string}>} contacts - Direct contacts in the aside.
 * @param {object} labels - Field labels and messages: { name, email, topic, budget, message, submit, sending, success, required, invalidEmail }.
 * @param {string} className - Extra class.
 *
 * Accessibility: native labels, required fields marked and validated with aria-invalid and
 * aria-describedby error text; topic keys are a radio group (fieldset/legend); the status message
 * is announced in a live region and receives focus on success.
 */
export interface DevContactFormProps {
  action?: string;
  method?: 'post' | 'get';
  topics?: string[];
  budgets?: string[];
  availability?: string;
  response?: string;
  contacts?: Array<{ label: string; value: string; href: string }>;
  labels?: Partial<Record<'name' | 'email' | 'topic' | 'budget' | 'message' | 'submit' | 'sending' | 'success' | 'required' | 'invalidEmail', string>>;
  className?: string;
}

export function DevContactForm({
  action,
  method = 'post',
  topics = ['Website', 'Web app', '3D & creative', 'Consulting'],
  budgets = ['< €5k', '€5k – €15k', '€15k – €40k', '€40k +'],
  availability = 'Available for new projects',
  response = 'Replies within 24 hours',
  contacts = [],
  labels = {},
  className = '',
}: DevContactFormProps) {
  const L = {
    name: 'Your name', email: 'Email', topic: 'What are we building?', budget: 'Budget', message: 'Tell me about the project',
    submit: 'Send message', sending: 'Sending…', success: "Thanks! Your message is on its way — I'll reply soon.",
    required: 'This field is required.', invalidEmail: 'Enter a valid email address.',
    ...labels,
  };
  const id = `dvcf-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLFormElement>('[data-dev-form]:not([data-bound])').forEach((form) => {
        form.dataset.bound = '';
        const status = form.querySelector<HTMLElement>('[data-status]')!;
        const submit = form.querySelector<HTMLButtonElement>('[data-submit]')!;
        const fields = Array.from(form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input[required], textarea[required]'));
    
        const check = (f: HTMLInputElement | HTMLTextAreaElement) => {
          const err = f.closest('.dvcf__field')?.querySelector<HTMLElement>('[data-err]');
          let msg = '';
          if (!f.value.trim()) msg = status.dataset.required ?? '';
          else if (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value.trim())) msg = status.dataset.invalidEmail ?? '';
          f.setAttribute('aria-invalid', String(!!msg));
          if (err) err.textContent = msg;
          return !msg;
        };
        fields.forEach((f) => f.addEventListener('blur', () => f.getAttribute('aria-invalid') !== null && check(f)));
    
        form.addEventListener('submit', async (e) => {
          const invalid = fields.filter((f) => !check(f));
          if (invalid.length) {
            e.preventDefault();
            invalid[0].focus();
            return;
          }
          if (!form.hasAttribute('data-demo')) return; // real endpoint: let the browser submit
          e.preventDefault();
          submit.disabled = true;
          submit.textContent = submit.dataset.sending ?? '';
          await new Promise((r) => setTimeout(r, 700));
          form.reset();
          fields.forEach((f) => f.removeAttribute('aria-invalid'));
          form.querySelectorAll<HTMLElement>('[data-err]').forEach((el) => (el.textContent = ''));
          submit.disabled = false;
          submit.innerHTML = `${submit.dataset.label} <span aria-hidden="true">→</span>`;
          status.textContent = status.dataset.success ?? '';
          status.classList.add('is-success');
          status.focus();
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className={cx(['dvcf', className])} data-rk-036bce="">
        <div className="dvcf__wrap" data-rk-036bce="">
          <form className="dvcf__form" data-dev-form action={action} method={method} noValidate data-demo={action ? undefined : ''} data-rk-036bce="">
            <div className="dvcf__row" data-rk-036bce="">
              <div className="dvcf__field" data-rk-036bce="">
                <label htmlFor={`${id}-name`} data-rk-036bce="">{L.name} <span aria-hidden="true" data-rk-036bce="">*</span></label>
                <input id={`${id}-name`} name="name" type="text" autoComplete="name" required aria-describedby={`${id}-name-err`} data-rk-036bce="" />
                <p className="dvcf__err" id={`${id}-name-err`} data-err data-rk-036bce=""></p>
              </div>
              <div className="dvcf__field" data-rk-036bce="">
                <label htmlFor={`${id}-email`} data-rk-036bce="">{L.email} <span aria-hidden="true" data-rk-036bce="">*</span></label>
                <input id={`${id}-email`} name="email" type="email" autoComplete="email" required aria-describedby={`${id}-email-err`} data-rk-036bce="" />
                <p className="dvcf__err" id={`${id}-email-err`} data-err data-rk-036bce=""></p>
              </div>
            </div>
      
            <fieldset className="dvcf__topics" data-rk-036bce="">
              <legend data-rk-036bce="">{L.topic}</legend>
              <div className="dvcf__keys" data-rk-036bce="">
                {topics.map((t, i) => (
                  <label key={i} className="dvcf__key" data-rk-036bce="">
                    <input type="radio" name="topic" defaultValue={t} defaultChecked={i === 0} data-rk-036bce="" />
                    <span data-rk-036bce="">{t}</span>
                  </label>
                ))}
              </div>
            </fieldset>
      
            <div className="dvcf__field" data-rk-036bce="">
              <label htmlFor={`${id}-budget`} data-rk-036bce="">{L.budget}</label>
              <select id={`${id}-budget`} name="budget" data-rk-036bce="">
                {budgets.map((b, __i: number) => <option key={__i} value={b} data-rk-036bce="">{b}</option>)}
              </select>
            </div>
      
            <div className="dvcf__field" data-rk-036bce="">
              <label htmlFor={`${id}-msg`} data-rk-036bce="">{L.message} <span aria-hidden="true" data-rk-036bce="">*</span></label>
              <textarea id={`${id}-msg`} name="message" rows={6} required aria-describedby={`${id}-msg-err`} data-rk-036bce=""></textarea>
              <p className="dvcf__err" id={`${id}-msg-err`} data-err data-rk-036bce=""></p>
            </div>
      
            <button className="dvcf__submit" type="submit" data-submit data-label={L.submit} data-sending={L.sending} data-rk-036bce="">{L.submit} <span aria-hidden="true" data-rk-036bce="">→</span></button>
            <p className="dvcf__status" role="status" tabIndex={-1} data-status data-success={L.success} data-required={L.required} data-invalid-email={L.invalidEmail} data-rk-036bce=""></p>
          </form>
      
          <aside className="dvcf__aside" data-rk-036bce="">
            <p className="dvcf__avail" data-rk-036bce=""><span aria-hidden="true" data-rk-036bce=""></span>{availability}</p>
            <p className="dvcf__resp" data-rk-036bce="">{response}</p>
            {contacts.length > 0 && (
              <ul className="dvcf__contacts" data-rk-036bce="">
                {contacts.map((c, __i: number) => (
                  <li key={__i} data-rk-036bce=""><span data-rk-036bce="">{c.label}</span><a href={c.href} data-rk-036bce="">{c.value}</a></li>
                ))}
              </ul>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}

export default DevContactForm;
