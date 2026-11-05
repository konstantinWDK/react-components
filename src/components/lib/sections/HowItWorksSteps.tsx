'use client';

import { useId } from 'react';
import type { CSSProperties } from 'react';
import './HowItWorksSteps.css';

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

interface Step { title: string; text: string; time?: string }

/**
 * HowItWorksSteps — Numbered process section ("How it works") with a connecting
 * line between steps. Horizontal on desktop, vertical on mobile.
 *
 * @param {string} eyebrow - Small label above the heading.
 * @param {string} title - Section heading.
 * @param {Array<{title: string, text: string, time?: string}>} steps - Ordered steps.
 * @param {{label: string, href: string}} cta - Optional CTA under the steps.
 * @param {string} variant - Step marker style (numbers|dots|cards).
 * @param {string} size - Vertical rhythm (sm|md|lg).
 * @param {string} className - Extra CSS class.
 */
export interface HowItWorksStepsProps {
  eyebrow?: string;
  title?: string;
  steps?: Step[];
  cta?: { label: string; href: string };
  variant?: 'numbers' | 'dots' | 'cards';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function HowItWorksSteps({
  eyebrow = 'How it works',
  title = 'Ship a polished page in four steps',
  steps = [
    { title: 'Pick sections', text: 'Browse heroes, features, pricing and more in the catalog.', time: '2 min' },
    { title: 'Copy the code', text: 'Paste components into your React project. No install needed.', time: '1 min' },
    { title: 'Customize props', text: 'Change copy, colors and data through typed props and tokens.', time: '10 min' },
    { title: 'Deploy', text: 'Build static HTML and ship to any CDN or edge host.', time: '30 s' },
  ],
  cta = { label: 'Start building', href: '#' },
  variant = 'numbers',
  size = 'md',
  className = '',
}: HowItWorksStepsProps) {
  const id = `hiw-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <>
      <div className="cq-how-it-works-steps-cq" data-rk-1a3d09="">
      <section className={`hiw hiw--${variant} hiw--${size} ${className}`} aria-labelledby={id} style={st(`--hiw-n:${steps.length}`)} data-rk-1a3d09="">
        <div className="hiw__inner" data-rk-1a3d09="">
          <header className="hiw__head" data-rk-1a3d09="">
            <p className="hiw__eyebrow" data-rk-1a3d09="">{eyebrow}</p>
            <h2 id={id} className="hiw__title" data-rk-1a3d09="">{title}</h2>
          </header>
          <ol className="hiw__steps" data-rk-1a3d09="">
            {steps.map((s, i) => (
              <li key={i} className="hiw__step" style={st(`--i:${i}`)} data-rk-1a3d09="">
                <span className="hiw__marker" aria-hidden="true" data-rk-1a3d09="">{variant === 'dots' ? '' : String(i + 1).padStart(2, '0')}</span>
                <div className="hiw__body" data-rk-1a3d09="">
                  <h3 className="hiw__step-title" data-rk-1a3d09=""><span className="hiw__sr" data-rk-1a3d09="">Step {i + 1}: </span>{s.title}</h3>
                  <p className="hiw__text" data-rk-1a3d09="">{s.text}</p>
                  {s.time && (
                    <span className="hiw__time" data-rk-1a3d09="">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" data-rk-1a3d09=""><circle cx="12" cy="12" r="10" data-rk-1a3d09="" /><path d="M12 6v6l4 2" data-rk-1a3d09="" /></svg>
                      {s.time}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ol>
          {cta && (
            <div className="hiw__cta" data-rk-1a3d09="">
              <a href={cta.href} data-rk-1a3d09="">{cta.label}</a>
            </div>
          )}
        </div>
      </section>
      </div>
    </>
  );
}

export default HowItWorksSteps;
