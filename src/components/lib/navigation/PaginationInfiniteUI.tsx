'use client';

import './PaginationInfiniteUI.css';

/** PaginationInfiniteUI — ported from astro-component-kit. */
export interface PaginationInfiniteUIProps {
}

export function PaginationInfiniteUI({}: PaginationInfiniteUIProps) {
  return (
    <>
      <div className="inf-load" data-rk-3ece11="">
        <div className="dot-spin" data-rk-3ece11=""></div>
        <span data-rk-3ece11="">Loading more items...</span>
      </div>
    </>
  );
}

export default PaginationInfiniteUI;
