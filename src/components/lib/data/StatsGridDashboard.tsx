'use client';

import './StatsGridDashboard.css';

/** StatsGridDashboard — ported from astro-component-kit. */
export interface StatsGridDashboardProps {
}

export function StatsGridDashboard({}: StatsGridDashboardProps) {
  return (
    <>
      <div className="s-grid" data-rk-ea2277="">
        <div className="s-card" data-rk-ea2277=""><span data-rk-ea2277="">Users</span><h3 data-rk-ea2277="">12.4k</h3><small className="up" data-rk-ea2277="">+12%</small></div>
        <div className="s-card" data-rk-ea2277=""><span data-rk-ea2277="">Revenue</span><h3 data-rk-ea2277="">$48k</h3><small className="up" data-rk-ea2277="">+5%</small></div>
        <div className="s-card" data-rk-ea2277=""><span data-rk-ea2277="">Bounce</span><h3 data-rk-ea2277="">24%</h3><small className="down" data-rk-ea2277="">-2%</small></div>
      </div>
    </>
  );
}

export default StatsGridDashboard;
