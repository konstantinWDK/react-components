'use client';

import './TreeItemInteractive.css';

/** TreeItemInteractive — ported from astro-component-kit. */
export interface TreeItemInteractiveProps {
}

export function TreeItemInteractive({}: TreeItemInteractiveProps) {
  return (
    <>
      <div className="exp-row" data-rk-a57501="">
        <div className="main" data-rk-a57501=""><span data-rk-a57501="">▶</span> Users Database</div>
        <div className="child" data-rk-a57501="">
          <p data-rk-a57501="">Columns: id, name, email, avatar, status</p>
          <p data-rk-a57501="">Rows: 1,402 entries</p>
        </div>
      </div>
    </>
  );
}

export default TreeItemInteractive;
