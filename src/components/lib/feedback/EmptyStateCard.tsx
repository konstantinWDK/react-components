'use client';

import type { HTMLAttributes, MouseEventHandler, ReactNode } from 'react';
import './EmptyStateCard.css';

/**
 * EmptyStateCard — A placeholder component for empty views or failed searches.
 *
 * @param icon - Optional. Icon node. Default '📁'.
 * @param title - Optional. Default 'No results found'.
 * @param message - Optional.
 * @param ctaLabel - Optional. Renders a call-to-action button when set.
 * @param onCtaClick - Optional. Click handler for the CTA.
 */
export interface EmptyStateCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  icon?: ReactNode;
  title?: ReactNode;
  message?: ReactNode;
  ctaLabel?: string;
  onCtaClick?: MouseEventHandler<HTMLButtonElement>;
}

export function EmptyStateCard({
  icon = '📁',
  title = 'No results found',
  message = 'Try adjusting your filters or adding a new item.',
  ctaLabel,
  onCtaClick,
  className,
  ...rest
}: EmptyStateCardProps) {
  return (
    <div {...rest} className={['empty-state', className].filter(Boolean).join(' ')}>
      <div className="empty-state__icon" aria-hidden="true">{icon}</div>
      <h4 className="empty-state__title">{title}</h4>
      <p className="empty-state__message">{message}</p>
      {ctaLabel && (
        <button className="empty-state__btn" type="button" onClick={onCtaClick}>
          {ctaLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyStateCard;
