'use client';

import './MinimalFooterGrid.css';

/**
 * MinimalFooterGrid — Multi-column grid footer for project links and brand info.
 */
export interface MinimalFooterGridProps {
  brandName?: string;
  className?: string;
}

export function MinimalFooterGrid({ brandName = 'AstroKit', className = '' }: MinimalFooterGridProps) {
  return (
    <>
      <footer className={`m-footer ${className}`} data-rk-f90449="">
        <div className="f-row" data-rk-f90449="">
          <div className="f-info" data-rk-f90449="">
            <span className="f-brand" data-rk-f90449="">{brandName}</span>
            <span className="f-copy" data-rk-f90449="">© {new Date().getFullYear()} All rights reserved.</span>
          </div>
          <div className="f-links" data-rk-f90449="">
            <div className="f-col" data-rk-f90449="">
              <span className="f-col-title" data-rk-f90449="">Product</span>
              <a href="#components" data-rk-f90449="">Components</a>
              <a href="#docs" data-rk-f90449="">Documentation</a>
              <a href="#pricing" data-rk-f90449="">Pricing</a>
            </div>
            <div className="f-col" data-rk-f90449="">
              <span className="f-col-title" data-rk-f90449="">Community</span>
              <a href="https://github.com" target="_blank" rel="noopener" data-rk-f90449="">GitHub</a>
              <a href="https://discord.com" target="_blank" rel="noopener" data-rk-f90449="">Discord</a>
              <a href="https://x.com" target="_blank" rel="noopener" data-rk-f90449="">Twitter</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default MinimalFooterGrid;
