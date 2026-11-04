'use client';

import type { CSSProperties, HTMLAttributes } from 'react';
import './ConfettiFeedback.css';

/**
 * ConfettiFeedback — A celebration component that triggers a falling confetti animation.
 *
 * @param label - Optional. Default 'Success!'.
 * @param color - Optional. Confetti color. Default 'var(--c-primary, #6366f1)'.
 * @param active - Optional. Whether confetti is falling. Default true.
 * @param pieces - Optional. Number of confetti pieces. Default 12.
 */
export interface ConfettiFeedbackProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  color?: string;
  active?: boolean;
  pieces?: number;
}

// Deterministic pseudo-random (0–1) so server and client renders match.
const rand = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

export function ConfettiFeedback({
  label = 'Success!',
  color = 'var(--c-primary, #6366f1)',
  active = true,
  pieces = 12,
  className,
  ...rest
}: ConfettiFeedbackProps) {
  return (
    <div {...rest} className={['confetti-trigger', active && 'confetti-trigger--active', className].filter(Boolean).join(' ')}>
      <span className="confetti-label">{label}</span>
      <div className="confetti-container" aria-hidden="true" style={{ '--confetti-color': color } as CSSProperties}>
        {Array.from({ length: pieces }, (_, i) => (
          <div
            key={i}
            className="confetti-piece"
            style={
              {
                '--l': `${rand(i + 1) * 100}%`,
                '--d': `${rand(i + 101) * 2}s`,
                '--r': `${rand(i + 201) * 360}deg`,
                '--s': 0.5 + rand(i + 301),
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}

export default ConfettiFeedback;
