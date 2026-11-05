'use client';

import './PaginationGlass.css';

/** PaginationGlass — ported from astro-component-kit. */
export interface PaginationGlassProps {
}

export function PaginationGlass({}: PaginationGlassProps) {
  return (
    <>
      <nav className="pagination" data-rk-96af1a="">
        <button className="prev" data-rk-96af1a="">←</button>
        <div className="pages" data-rk-96af1a="">
          <a href="#" className="active" data-rk-96af1a="">1</a>
          <a href="#" data-rk-96af1a="">2</a>
          <a href="#" data-rk-96af1a="">3</a>
          <span data-rk-96af1a="">...</span>
          <a href="#" data-rk-96af1a="">12</a>
        </div>
        <button className="next" data-rk-96af1a="">→</button>
      </nav>
    </>
  );
}

export default PaginationGlass;
