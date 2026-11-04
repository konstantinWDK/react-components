'use client';

import type { HTMLAttributes } from 'react';
import './SkeletonList.css';

/**
 * SkeletonList — Shimmering loading placeholder for lists or feed items.
 *
 * @param count - Optional. Number of rows. Default 3.
 */
export interface SkeletonListProps extends HTMLAttributes<HTMLDivElement> {
  count?: number;
}

export function SkeletonList({ count = 3, className, ...rest }: SkeletonListProps) {
  return (
    <div aria-hidden="true" {...rest} className={['skeleton-list', className].filter(Boolean).join(' ')}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="skeleton-item">
          <div className="skeleton-avatar" />
          <div className="skeleton-content">
            <div className="skeleton-line skeleton-line--title" />
            <div className="skeleton-line skeleton-line--body" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default SkeletonList;
