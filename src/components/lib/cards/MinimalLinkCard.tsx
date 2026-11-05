'use client';

import './MinimalLinkCard.css';

/**
 * MinimalLinkCard — Elegant arrow-link card for site navigation sections.
 * 
 * @param {string} title - The text label of the link.
 * @param {string} href - The destination URL.
 */
export interface MinimalLinkCardProps {
  title: string;
  href: string;
}

export function MinimalLinkCard({ title, href }: MinimalLinkCardProps) {
  return (
    <>
      <a href={href} className="link-card" data-rk-a901cf="">
        <span className="link-card__title" data-rk-a901cf="">{title}</span>
        <svg className="link-card__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-rk-a901cf="">
          <path d="M5 12h14M12 5l7 7-7 7" data-rk-a901cf="" />
        </svg>
      </a>
    </>
  );
}

export default MinimalLinkCard;
