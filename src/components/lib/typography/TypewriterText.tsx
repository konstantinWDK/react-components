'use client';

import type { CSSProperties } from 'react';
import './TypewriterText.css';

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

/** TypewriterText */
export interface TypewriterTextProps {
  text: string;
  speed?: string;
}

export function TypewriterText({ text, speed = '3s' }: TypewriterTextProps) {
  return (
    <>
      <div className="tw-wrap" data-rk-9a9102="">
        <span className="tw-text" style={st(`--len: ${text.length}; --speed: ${speed}`)} data-rk-9a9102="">
          {text}
        </span>
      </div>
    </>
  );
}

export default TypewriterText;
