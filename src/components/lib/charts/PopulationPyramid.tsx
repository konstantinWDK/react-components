'use client';

import type { CSSProperties } from 'react';
import ChartFrame from './ChartFrame';
import { formatValue, colorAt } from './chart-utils';
import './PopulationPyramid.css';

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
 * PopulationPyramid — Back-to-back horizontal bars comparing two groups across
 * ordered bands (age groups, tiers, price brackets).
 *
 * @param {string[]} bands - Row labels, top to bottom.
 * @param {number[]} left - Values for the left group.
 * @param {number[]} right - Values for the right group.
 * @param {string} leftLabel - Left group name.
 * @param {string} rightLabel - Right group name.
 * @param {string} suffix - Value suffix.
 * @param {string} variant - Card style (glass|solid|ghost).
 * @param {string} size - Density (sm|md|lg).
 */
export interface PopulationPyramidProps {
  title?: string;
  subtitle?: string;
  bands?: string[];
  left?: number[];
  right?: number[];
  leftLabel?: string;
  rightLabel?: string;
  prefix?: string;
  suffix?: string;
  colors?: string[];
  variant?: 'glass' | 'solid' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PopulationPyramid({
  title = 'Audience by age',
  subtitle = 'Share of users per age band',
  bands = ['65+', '55–64', '45–54', '35–44', '25–34', '18–24'],
  left = [2.1, 4.8, 8.2, 12.6, 15.4, 7.9],
  right = [1.7, 4.1, 7.4, 11.8, 16.2, 8.8],
  leftLabel = 'Women',
  rightLabel = 'Men',
  prefix = '',
  suffix = '%',
  colors,
  variant = 'glass',
  size = 'md',
  className = '',
}: PopulationPyramidProps) {
  const max = Math.max(...left, ...right) || 1;
  const cl = colorAt(0, colors);
  const cr = colorAt(1, colors);
  const fmt = (v: number) => formatValue(v, prefix, suffix);
  return (
    <>
      <ChartFrame title={title} subtitle={subtitle} variant={variant} size={size} className={className} legend={[{ label: leftLabel, color: cl }, { label: rightLabel, color: cr }]} table={{ headers: ['Band', leftLabel, rightLabel], rows: bands.map((b, i) => [b, fmt(left[i]), fmt(right[i])]) }}>
        <div className="pp" role="list" data-rk-b22a54="">
          {bands.map((b, i) => (
            <div key={i} className="pp__row" role="listitem" data-rk-b22a54="">
              <div className="pp__side pp__side--l" data-rk-b22a54="">
                <span className="pp__val" data-rk-b22a54="">{fmt(left[i])}</span>
                <span className="pp__bar cf-mark" tabIndex={0} style={st(`width:${(left[i] / max) * 100}%; background:${cl}`)} aria-label={`${b}, ${leftLabel}: ${fmt(left[i])}`} data-tip-title={`${b} · ${leftLabel}`} data-tip={`${cl}::${fmt(left[i])}`} data-rk-b22a54=""></span>
              </div>
              <span className="pp__band" data-rk-b22a54="">{b}</span>
              <div className="pp__side pp__side--r" data-rk-b22a54="">
                <span className="pp__bar cf-mark" tabIndex={0} style={st(`width:${(right[i] / max) * 100}%; background:${cr}`)} aria-label={`${b}, ${rightLabel}: ${fmt(right[i])}`} data-tip-title={`${b} · ${rightLabel}`} data-tip={`${cr}::${fmt(right[i])}`} data-rk-b22a54=""></span>
                <span className="pp__val" data-rk-b22a54="">{fmt(right[i])}</span>
              </div>
            </div>
          ))}
        </div>
      </ChartFrame>
    </>
  );
}

export default PopulationPyramid;
