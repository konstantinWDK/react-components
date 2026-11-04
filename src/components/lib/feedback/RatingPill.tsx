'use client';

import type { HTMLAttributes } from 'react';
import './RatingPill.css';

/**
 * RatingPill — A compact badge displaying a numeric score or rating stars.
 * Colour adapts to the score: ≥4 high, ≥3 mid, otherwise low.
 *
 * @param score - Required. Usually 0–5.
 * @param showStar - Optional. Default true.
 */
export interface RatingPillProps extends HTMLAttributes<HTMLDivElement> {
  score: number;
  showStar?: boolean;
}

export function RatingPill({ score, showStar = true, className, ...rest }: RatingPillProps) {
  const status = score >= 4 ? 'high' : score >= 3 ? 'mid' : 'low';
  return (
    <div aria-label={`Rating ${score.toFixed(1)}`} {...rest} className={['rate-pill', `rate-pill--${status}`, className].filter(Boolean).join(' ')}>
      <span className="rate-pill__val">{score.toFixed(1)}</span>
      {showStar && <span className="rate-pill__star" aria-hidden="true">★</span>}
    </div>
  );
}

export default RatingPill;
