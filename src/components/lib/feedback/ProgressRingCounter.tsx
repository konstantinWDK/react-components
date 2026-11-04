import type { CSSProperties, HTMLAttributes } from 'react';
import './ProgressRingCounter.css';

/**
 * ProgressRingCounter — Circular SVG progress ring with centered countdown or metric value.
 *
 * @param value - Optional. Default 75.
 * @param max - Optional. Default 100.
 * @param size - Optional. px. Default 96.
 * @param strokeWidth - Optional. Default 6.
 * @param color - Optional. Default '#d4a017'.
 * @param label - Optional. Caption under the value. Default 'COMPLETED'.
 */
export interface ProgressRingCounterProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
}

export function ProgressRingCounter({
  value = 75,
  max = 100,
  size = 96,
  strokeWidth = 6,
  color = '#d4a017',
  label = 'COMPLETED',
  className,
  style,
  ...rest
}: ProgressRingCounterProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  const offset = circumference - (percent / 100) * circumference;
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label || undefined}
      {...rest}
      className={['ring-counter', className].filter(Boolean).join(' ')}
      style={{ '--ring-size': `${size}px`, '--ring-color': color, ...style } as CSSProperties}
    >
      <svg width={size} height={size} className="ring-counter__svg" aria-hidden="true">
        <circle className="ring-counter__bg" cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} />
        <circle
          className="ring-counter__meter"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="ring-counter__center">
        <span className="val">{Math.round(percent)}%</span>
        {label && <span className="lbl">{label}</span>}
      </div>
    </div>
  );
}

export default ProgressRingCounter;
