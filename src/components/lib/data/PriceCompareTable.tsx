'use client';

import './PriceCompareTable.css';

/** PriceCompareTable — ported from astro-component-kit. */
export interface PriceCompareTableProps {
}

export function PriceCompareTable({}: PriceCompareTableProps) {
  return (
    <>
      <div className="c-wrap" data-rk-7759ac="">
        <table data-rk-7759ac="">
          <thead data-rk-7759ac="">
            <tr data-rk-7759ac=""><th data-rk-7759ac="">Features</th><th data-rk-7759ac="">Free</th><th data-rk-7759ac="">Pro</th></tr>
          </thead>
          <tbody data-rk-7759ac="">
            <tr data-rk-7759ac=""><td data-rk-7759ac="">Feature A</td><td data-rk-7759ac="">✅</td><td data-rk-7759ac="">✅</td></tr>
            <tr data-rk-7759ac=""><td data-rk-7759ac="">Feature B</td><td data-rk-7759ac="">❌</td><td data-rk-7759ac="">✅</td></tr>
            <tr data-rk-7759ac=""><td data-rk-7759ac="">Storage</td><td data-rk-7759ac="">10GB</td><td data-rk-7759ac="">100GB</td></tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PriceCompareTable;
