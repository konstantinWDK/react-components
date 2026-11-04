'use client';

import type { CSSProperties, HTMLAttributes } from 'react';
import './CircleProgress.css';

/**
 * CircleProgress — A circular chart indicating a percentage of completion.
 *
 * @param percent - Required. 0–100.
 * @param size - Optional. Diameter in px. Default 80.
 * @param color - Optional. Default 'var(--c-primary, #6366f1)'.
 * @param label - Optional. Accessible label. Default 'Progress'.
 */
export interface CircleProgressProps extends HTMLAttributes<HTMLDivElement> {
  percent: number;
  size?: number;
  color?: string;
  label?: string;
}

export function CircleProgress({
  percent,
  size = 80,
  color = 'var(--c-primary, #6366f1)',
  label = 'Progress',
  className,
  style,
  ...rest
}: CircleProgressProps) {
  const clamped = Math.min(100, Math.max(0, percent));
  const radius = size / 2 - 10;
  const circum = 2 * Math.PI * radius;
  const offset = circum - (clamped / 100) * circum;
  return (
    <div
      {...rest}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className={['circle-box', className].filter(Boolean).join(' ')}
      style={{ '--gauge-size': `${size}px`, '--gauge-color': color, ...style } as CSSProperties}
    >
      <svg width={size} height={size} aria-hidden="true">
        <circle className="circle-bg" cx={size / 2} cy={size / 2} r={radius} />
        <circle className="circle-val" cx={size / 2} cy={size / 2} r={radius} strokeDasharray={circum} strokeDashoffset={offset} stroke={color} />
      </svg>
      <div className="circle-label" aria-hidden="true">{percent}%</div>
    </div>
  );
}

export default CircleProgress;
