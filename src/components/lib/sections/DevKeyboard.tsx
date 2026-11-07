'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import './DevKeyboard.css';

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
 * DevKeyboard — Full-width 3D mechanical keyboard ("Keycap" design) that types a list of words by
 * itself and echoes each one as a huge backdrop word. Clicking a key presses it. Anything passed
 * in the default slot floats over the lower part of the keyboard (e.g. a repository list), leaving
 * the top rows visible. Light/dark aware. Needs the optional `three` peer dependency.
 *
 * @param {string[]} phrases - Words typed in a loop.
 * @param {string} reveal - Space kept free above the slot content so the keys show. Default '24rem'.
 * @param {string} minHeight - Height when the slot is empty. Default '560px'.
 * @param {number} speed - Milliseconds per keystroke. Default 140.
 * @param {string} label - Accessible description of the animation. Default 'Animated keyboard typing'.
 * @param {string} className - Extra class.
 *
 * Accessibility: the canvas is decorative (role="img" with a label listing the words); the typed
 * word is aria-hidden; with prefers-reduced-motion the board is static and shows the first word.
 */
export interface DevKeyboardProps {
  phrases?: string[];
  reveal?: string;
  minHeight?: string;
  speed?: number;
  label?: string;
  className?: string;
  children?: ReactNode;
}

export function DevKeyboard({
  phrases = ['REACT', 'NEXT.JS', 'TYPESCRIPT', 'THREE.JS', 'NODE.JS'],
  reveal = '24rem',
  minHeight = '560px',
  speed = 140,
  label = 'Animated keyboard typing',
  className = '',
  children
}: DevKeyboardProps) {
  const hasSlot = (children != null);

  // 3D keyboard: three.js is loaded on demand (optional peer dependency) and disposed on unmount.
  const rootRef = useRef<HTMLElement>(null);
  const phrasesKey = phrases.join('\u0000');
  useEffect(() => {
    const root = rootRef.current;
    const canvas = root?.querySelector<HTMLElement>('[data-canvas]');
    if (!root || !canvas) return;
    let cancelled = false;
    let dispose: (() => void) | undefined;
    Promise.all([import('three'), import('../three/keyboard-scene')])
      .then(([THREE, { mountKeyboard }]) => {
        if (!cancelled) dispose = mountKeyboard(canvas, THREE, { phrases, typedEl: root.querySelector<HTMLElement>('[data-typed]'), speed });
      })
      .catch((err) => console.warn('[DevKeyboard] the 3D keyboard needs the optional `three` peer dependency.', err));
    return () => {
      cancelled = true;
      dispose?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phrasesKey, speed]);
  return (
    <>
      <section ref={rootRef} className={cx(['dvkb', { 'dvkb--empty': !hasSlot }, className])} style={st(`--dvkb-reveal:${reveal};--dvkb-min:${minHeight}`)} data-dev-keyboard data-phrases={JSON.stringify(phrases)} data-speed={speed} data-rk-5cdff8="">
        <div className="dvkb__stage" data-rk-5cdff8="">
          <div className="dvkb__word" aria-hidden="true" data-rk-5cdff8=""><span data-typed data-rk-5cdff8=""></span><span className="dvkb__cursor" data-rk-5cdff8="">_</span></div>
          <div className="dvkb__canvas" data-canvas role="img" aria-label={`${label}: ${phrases.join(', ')}`} data-rk-5cdff8=""></div>
        </div>
        {hasSlot && <div className="dvkb__content" data-rk-5cdff8="">{children}</div>}
      </section>
    </>
  );
}

export default DevKeyboard;
