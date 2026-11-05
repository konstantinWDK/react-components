'use client';

import './KeyValuePillGroup.css';

/** KeyValuePillGroup */
export interface KeyValuePillGroupProps {
}

export function KeyValuePillGroup({}: KeyValuePillGroupProps) {
  return (
    <>
      <div className="meta-row" data-rk-ffdece="">
        <div className="m-pill" data-rk-ffdece="">OS:<span data-rk-ffdece="">MacOS</span></div>
        <div className="m-pill" data-rk-ffdece="">Ver:<span data-rk-ffdece="">14.5</span></div>
        <div className="m-pill" data-rk-ffdece="">Arch:<span data-rk-ffdece="">ARM64</span></div>
      </div>
    </>
  );
}

export default KeyValuePillGroup;
