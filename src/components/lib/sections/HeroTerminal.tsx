'use client';

import { useEffect, useRef, useId } from 'react';
import type { CSSProperties } from 'react';
import './HeroTerminal.css';

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

interface Line { type: 'cmd' | 'out' | 'ok'; text: string }

/**
 * HeroTerminal — Developer-focused split hero with an animated terminal showing
 * install and build commands, plus a copyable install snippet.
 *
 * @param {string} eyebrow - Small label above the title.
 * @param {string} title - Headline.
 * @param {string} subtitle - Supporting paragraph.
 * @param {string} command - Install command shown in the copy field.
 * @param {Array<{type: 'cmd'|'out'|'ok', text: string}>} lines - Terminal transcript.
 * @param {{label: string, href: string}} primary - Primary CTA.
 * @param {string} variant - Terminal style (default|glass|minimal).
 * @param {string} size - Vertical rhythm (sm|md|lg).
 * @param {string} className - Extra CSS class.
 */
export interface HeroTerminalProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  command?: string;
  lines?: Line[];
  primary?: { label: string; href: string };
  variant?: 'default' | 'glass' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function HeroTerminal({
  eyebrow = 'For developers',
  title = 'From zero to production in one command',
  subtitle = 'Scaffold a fully accessible React site with sections, charts and design tokens already wired up.',
  command = 'npm create vite@latest my-app -- --template react-ts',
  lines = [
    { type: 'cmd', text: 'npm create vite@latest my-app -- --template react-ts' },
    { type: 'out', text: 'Scaffolding project in ./my-site …' },
    { type: 'ok', text: '50 sections installed' },
    { type: 'ok', text: '45 SVG charts installed' },
    { type: 'cmd', text: 'npm run build' },
    { type: 'out', text: '12 pages built in 1.84s' },
    { type: 'ok', text: 'Lighthouse: 100 · 100 · 100 · 100' },
  ],
  primary = { label: 'Get started', href: '#' },
  variant = 'default',
  size = 'md',
  className = '',
}: HeroTerminalProps) {
  const id = `ht-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLButtonElement>('.ht__copy-btn').forEach((btn) => {
        btn.addEventListener('click', async () => {
          const status = btn.parentElement?.querySelector('.ht__status');
          try {
            await navigator.clipboard.writeText(btn.dataset.copy || '');
            btn.classList.add('is-copied');
            if (status) status.textContent = 'Copied to clipboard';
            setTimeout(() => {
              btn.classList.remove('is-copied');
              if (status) status.textContent = '';
            }, 1800);
          } catch {
            if (status) status.textContent = 'Copy failed — select the text manually';
          }
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="cq-hero-terminal-cq" data-rk-ac30d5="">
      <section className={`ht ht--${variant} ht--${size} ${className}`} aria-labelledby={id} data-rk-ac30d5="">
        <div className="ht__inner" data-rk-ac30d5="">
          <div className="ht__copy" data-rk-ac30d5="">
            <p className="ht__eyebrow" data-rk-ac30d5="">{eyebrow}</p>
            <h1 id={id} className="ht__title" data-rk-ac30d5="">{title}</h1>
            <p className="ht__subtitle" data-rk-ac30d5="">{subtitle}</p>
            <div className="ht__install" data-rk-ac30d5="">
              <code className="ht__cmd" data-rk-ac30d5=""><span aria-hidden="true" data-rk-ac30d5="">$ </span>{command}</code>
              <button type="button" className="ht__copy-btn" data-copy={command} aria-label="Copy install command" data-rk-ac30d5="">
                <svg className="ht__icon-copy" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" data-rk-ac30d5=""><rect x="9" y="9" width="13" height="13" rx="2" data-rk-ac30d5="" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" data-rk-ac30d5="" /></svg>
                <svg className="ht__icon-ok" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" data-rk-ac30d5=""><path d="M20 6 9 17l-5-5" data-rk-ac30d5="" /></svg>
              </button>
              <span className="ht__status" role="status" aria-live="polite" data-rk-ac30d5=""></span>
            </div>
            <a className="ht__btn" href={primary.href} data-rk-ac30d5="">
              {primary.label}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" data-rk-ac30d5=""><path d="M5 12h14M13 6l6 6-6 6" data-rk-ac30d5="" /></svg>
            </a>
          </div>
      
          <div className="ht__terminal" role="img" aria-label={`Terminal transcript: ${lines.map((l) => l.text).join('. ')}`} data-rk-ac30d5="">
            <div className="ht__bar" aria-hidden="true" data-rk-ac30d5="">
              <span data-rk-ac30d5=""></span><span data-rk-ac30d5=""></span><span data-rk-ac30d5=""></span>
              <p data-rk-ac30d5="">~/my-site — zsh</p>
            </div>
            <ol className="ht__lines" aria-hidden="true" data-rk-ac30d5="">
              {lines.map((l, i) => (
                <li key={i} className={`ht__line ht__line--${l.type}`} style={st(`--i:${i}`)} data-rk-ac30d5="">
                  {l.type === 'cmd' && <span className="ht__prompt" data-rk-ac30d5="">❯</span>}
                  {l.type === 'ok' && <span className="ht__ok" data-rk-ac30d5="">✓</span>}
                  {l.text}
                </li>
              ))}
              <li className="ht__line ht__cursor" style={st(`--i:${lines.length}`)} data-rk-ac30d5=""><span className="ht__prompt" data-rk-ac30d5="">❯</span><span className="ht__caret" data-rk-ac30d5=""></span></li>
            </ol>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

export default HeroTerminal;
