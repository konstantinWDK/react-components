'use client';

import { useId } from 'react';
import type { CSSProperties } from 'react';
import './CurvedPathHeading.css';

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
 * CurvedPathHeading — Typographic heading flowing along an SVG circular or arched trajectory.
 * 
 * @param {string} text - Headline text content. Default is 'REACT COMPONENTS KIT • ZERO RUNTIME DEPENDENCIES •'.
 * @param {number} size - Pixel container diameter. Default is 260.
 * @param {boolean} animate - Whether the badge rotates continuously. Default is true.
 */
export interface CurvedPathHeadingProps {
  text?: string;
  size?: number;
  animate?: boolean;
}

export function CurvedPathHeading({
  text = 'REACT COMPONENTS KIT • ZERO RUNTIME • PURE CSS •',
  size = 260,
  animate = true,
}: CurvedPathHeadingProps) {
  const pathId = `curve-path-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <>
      <div className={cx(['curved-heading', { 'is-animated': animate }])} style={st(`--curved-size: ${size}px;`)} data-rk-03862f="">
        <svg viewBox="0 0 300 300" width={size} height={size} data-rk-03862f="">
          <defs data-rk-03862f="">
            <path id={pathId} d="M 150, 150 m -110, 0 a 110,110 0 1,1 220,0 a 110,110 0 1,1 -220,0" data-rk-03862f="" />
          </defs>
          <text className="curved-heading__text" data-rk-03862f="">
            <textPath href={`#${pathId}`} startOffset="0%" data-rk-03862f="">
              {text}
            </textPath>
          </text>
        </svg>
        <div className="curved-heading__core" data-rk-03862f="">✦</div>
      </div>
    </>
  );
}

export default CurvedPathHeading;
