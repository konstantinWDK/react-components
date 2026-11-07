'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import './DevMonitor.css';

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
 * DevMonitor — 3D CRT monitor ("Keycap" design): a paper body with ink outlines that drops into
 * place, sways with the cursor and types terminal lines on an inverted screen. Use it as a visual
 * in heroes or project pages. Light/dark aware. Needs the optional `three` peer dependency.
 *
 * @param {string[]} lines - Lines typed in a loop. Lines starting with "$ " get the prompt.
 * @param {string} prompt - Shell prompt. Default 'dev@keycap:~$'.
 * @param {string} height - Canvas height. Default '420px'.
 * @param {string} label - Accessible description. Default 'Terminal on a 3D monitor'.
 * @param {string} className - Extra class.
 *
 * Accessibility: role="img" whose label includes the terminal lines; reduced motion shows every
 * line at once with no drop or typing.
 */
export interface DevMonitorProps {
  lines?: string[];
  prompt?: string;
  height?: string;
  label?: string;
  className?: string;
}

export function DevMonitor({ lines = ['$ whoami', '> full-stack developer'], prompt = 'dev@keycap:~$', height = '420px', label = 'Terminal on a 3D monitor', className = '' }: DevMonitorProps) {

  // 3D monitor: three.js is loaded on demand (optional peer dependency) and disposed on unmount.
  const rootRef = useRef<HTMLDivElement>(null);
  const linesKey = lines.join('\u0000');
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let cancelled = false;
    let dispose: (() => void) | undefined;
    Promise.all([import('three'), import('../three/monitor-scene')])
      .then(([THREE, { mountMonitor }]) => {
        if (!cancelled) dispose = mountMonitor(el, THREE, { lines, prompt });
      })
      .catch((err) => console.warn('[DevMonitor] the 3D monitor needs the optional `three` peer dependency.', err));
    return () => {
      cancelled = true;
      dispose?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linesKey, prompt]);
  return (
    <>
      <div ref={rootRef} className={cx(['dvmn', className])} style={st(`--dvmn-h:${height}`)} data-dev-monitor data-lines={JSON.stringify(lines)} data-prompt={prompt} role="img" aria-label={`${label}: ${lines.join(' — ')}`} data-rk-e3650c=""></div>
    </>
  );
}

export default DevMonitor;
