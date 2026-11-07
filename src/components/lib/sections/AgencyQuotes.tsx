'use client';

import type { CSSProperties } from 'react';
import './AgencyQuotes.css';

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

interface Quote { quote: string; name: string; role: string; company: string; result?: string }

/**
 * AgencyQuotes — Client testimonials for agencies: one large lead quote plus a grid of smaller
 * ones, each with the measurable result it produced, initials avatar, name, role and company.
 *
 * @param {string} eyebrow - Small label. Default 'Client results'.
 * @param {string} title - Heading. Default 'Don’t take our word for it'.
 * @param {Array<{quote: string, name: string, role: string, company: string, result?: string}>} quotes - Testimonials (first one is the lead).
 * @param {{value: string, label: string}} rating - Optional aggregate rating badge.
 * @param {string} className - Extra class.
 *
 * Accessibility: each testimonial is a <figure> with <blockquote> and <figcaption>; avatars are
 * decorative initials.
 */
export interface AgencyQuotesProps {
  eyebrow?: string;
  title?: string;
  quotes?: Quote[];
  rating?: { value: string; label: string };
  className?: string;
}

export function AgencyQuotes({
  eyebrow = 'Client results',
  title = 'Don’t take our word for it',
  quotes = [
    { quote: 'Volta treated our ad budget like their own money. We tripled revenue without tripling spend.', name: 'Freja Lund', role: 'Co-founder', company: 'Nordlys', result: '6.2× ROAS' },
    { quote: 'For the first time our own website is our best salesperson.', name: 'Lucía Romero', role: 'Commercial director', company: 'Casa Alba', result: '+64% direct revenue' },
    { quote: 'They speak finance and they speak CAC. Our sales team finally trusts marketing leads.', name: 'Tomás Ferreira', role: 'VP Growth', company: 'Fintrack', result: '−48% CPA' },
    { quote: 'We hired two lawyers this year because of the leads coming from search.', name: 'Elena Prieto', role: 'Managing partner', company: 'Verde Legal', result: '3.1× organic leads' },
  ],
  rating = { value: '4.9/5', label: 'on Google and Clutch' },
  className = '',
}: AgencyQuotesProps) {
  const hues = [80, 190, 280, 25, 330, 150];
  const initials = (n: string) => n.split(/\s+/).slice(0, 2).map((p) => p[0]).join('');
  const [lead, ...rest] = quotes;
  return (
    <>
      <div className="aq-cq" data-rk-018368="">
      <section className={cx(['aq', className])} data-rk-018368="">
        <header className="aq__head" data-rk-018368="">
          <div data-rk-018368="">
            {eyebrow && <p className="aq__eyebrow" data-rk-018368="">{eyebrow}</p>}
            <h2 className="aq__title" data-rk-018368="">{title}</h2>
          </div>
          {rating && <p className="aq__rating" data-rk-018368=""><strong data-rk-018368="">{rating.value}</strong><span aria-hidden="true" data-rk-018368="">★★★★★</span><small data-rk-018368="">{rating.label}</small></p>}
        </header>
        <div className="aq__grid" data-rk-018368="">
          {lead && (
            <figure className="aq__card aq__card--lead" style={st(`--lead-rows: ${Math.max(1, Math.min(3, rest.length))}`)} data-rk-018368="">
              {lead.result && <p className="aq__result" data-rk-018368="">{lead.result}</p>}
              <blockquote data-rk-018368=""><p data-rk-018368="">“{lead.quote}”</p></blockquote>
              <figcaption data-rk-018368="">
                <span className="aq__avatar" style={st(`--h: ${hues[0]}`)} aria-hidden="true" data-rk-018368="">{initials(lead.name)}</span>
                <span data-rk-018368=""><strong data-rk-018368="">{lead.name}</strong><small data-rk-018368="">{lead.role}, {lead.company}</small></span>
              </figcaption>
            </figure>
          )}
          {rest.map((q, i) => (
            <figure key={i} className="aq__card" data-rk-018368="">
              {q.result && <p className="aq__result" data-rk-018368="">{q.result}</p>}
              <blockquote data-rk-018368=""><p data-rk-018368="">“{q.quote}”</p></blockquote>
              <figcaption data-rk-018368="">
                <span className="aq__avatar" style={st(`--h: ${hues[(i + 1) % hues.length]}`)} aria-hidden="true" data-rk-018368="">{initials(q.name)}</span>
                <span data-rk-018368=""><strong data-rk-018368="">{q.name}</strong><small data-rk-018368="">{q.role}, {q.company}</small></span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      </div>
    </>
  );
}

export default AgencyQuotes;
