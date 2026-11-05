'use client';

import './BreadcrumbsMinimal.css';

/** BreadcrumbsMinimal */
export interface BreadcrumbsMinimalProps {
}

export function BreadcrumbsMinimal({}: BreadcrumbsMinimalProps) {
  return (
    <>
      <nav className="crumbs" data-rk-a2645c="">
        <a href="/" data-rk-a2645c="">Home</a>
        <span className="sep" data-rk-a2645c="">/</span>
        <a href="/docs" data-rk-a2645c="">Documentation</a>
        <span className="sep" data-rk-a2645c="">/</span>
        <span className="curr" data-rk-a2645c="">Navigation</span>
      </nav>
    </>
  );
}

export default BreadcrumbsMinimal;
