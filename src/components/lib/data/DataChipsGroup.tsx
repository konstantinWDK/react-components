'use client';

import './DataChipsGroup.css';

/** DataChipsGroup */
export interface DataChipsGroupProps {
}

export function DataChipsGroup({}: DataChipsGroupProps) {
  return (
    <>
      <div className="chips-row" data-rk-9c64b0="">
        <span className="chip-active" data-rk-9c64b0="">All Assets</span>
        <span data-rk-9c64b0="">Images</span>
        <span data-rk-9c64b0="">Videos</span>
        <span data-rk-9c64b0="">Docs</span>
        <span data-rk-9c64b0="">Music</span>
      </div>
    </>
  );
}

export default DataChipsGroup;
