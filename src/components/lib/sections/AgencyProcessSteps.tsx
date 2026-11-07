'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import './AgencyProcessSteps.css';

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
 * AgencyProcessSteps — "How we work" timeline: numbered phases with duration chips joined by a
 * line that fills as the section scrolls into view. Horizontal on wide containers, vertical on narrow.
 *
 * @param {string} eyebrow - Small label. Default 'How we work'.
 * @param {string} title - Heading. Default 'From audit to growth in four steps'.
 * @param {Array<{title: string, text: string, duration?: string}>} steps - Phases (3–5 work best).
 * @param {{label: string, href: string}} cta - Optional call to action under the steps.
 * @param {string} className - Extra class.
 *
 * Accessibility: an ordered list; the progress line is decorative and does not animate with
 * reduced motion.
 */
export interface AgencyProcessStepsProps {
  eyebrow?: string;
  title?: string;
  steps?: Array<{ title: string; text: string; duration?: string }>;
  cta?: { label: string; href: string };
  className?: string;
}

export function AgencyProcessSteps({
  eyebrow = 'How we work',
  title = 'From audit to growth in four steps',
  steps = [
    { title: 'Free audit', text: 'We review your ads, site and search presence and show you the biggest opportunities.', duration: 'Week 0' },
    { title: 'Growth plan', text: 'A 90-day plan with targets, budget, channels and the first experiments.', duration: 'Week 1' },
    { title: 'Launch', text: 'Tracking, campaigns, content and pages go live with the team that planned them.', duration: 'Weeks 2–4' },
    { title: 'Optimise', text: 'Weekly tests, monthly reviews and budget that follows what is working.', duration: 'Ongoing' },
  ],
  cta,
  className = '',
}: AgencyProcessStepsProps) {

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLElement>('[data-process]:not([data-bound])').forEach((el) => {
        el.dataset.bound = '';
        if (!('IntersectionObserver' in window)) { el.classList.add('is-in'); return; }
        const io = new IntersectionObserver((entries) => {
          if (entries.some((e) => e.isIntersecting)) { el.classList.add('is-in'); io.disconnect(); }
        }, { threshold: 0.3 });
        io.observe(el);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="aps-cq" data-rk-2ce2eb="">
      <section className={cx(['aps', className])} data-process data-rk-2ce2eb="">
        <header className="aps__head" data-rk-2ce2eb="">
          {eyebrow && <p className="aps__eyebrow" data-rk-2ce2eb="">{eyebrow}</p>}
          <h2 className="aps__title" data-rk-2ce2eb="">{title}</h2>
        </header>
        <div className="aps__wrap" data-rk-2ce2eb="">
        <span className="aps__line" aria-hidden="true" data-rk-2ce2eb=""><span data-rk-2ce2eb=""></span></span>
        <ol className="aps__list" style={st(`--n: ${steps.length}`)} data-rk-2ce2eb="">
          {steps.map((s, i) => (
            <li key={i} className="aps__step" style={st(`--i: ${i}`)} data-rk-2ce2eb="">
              <span className="aps__dot" aria-hidden="true" data-rk-2ce2eb="">{String(i + 1).padStart(2, '0')}</span>
              {s.duration && <span className="aps__time" data-rk-2ce2eb="">{s.duration}</span>}
              <h3 className="aps__name" data-rk-2ce2eb="">{s.title}</h3>
              <p className="aps__text" data-rk-2ce2eb="">{s.text}</p>
            </li>
          ))}
        </ol>
        </div>
        {cta && <a className="aps__cta" href={cta.href} data-rk-2ce2eb="">{cta.label}<span aria-hidden="true" data-rk-2ce2eb="">→</span></a>}
      </section>
      </div>
    </>
  );
}

export default AgencyProcessSteps;
