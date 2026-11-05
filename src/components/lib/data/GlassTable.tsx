'use client';

import './GlassTable.css';

/** GlassTable */
export interface GlassTableProps {
}

export function GlassTable({}: GlassTableProps) {
  return (
    <>
      <div className="table-wrap" data-rk-8d3010="">
        <table data-rk-8d3010="">
          <thead data-rk-8d3010=""><tr data-rk-8d3010=""><th data-rk-8d3010="">User</th><th data-rk-8d3010="">Status</th><th data-rk-8d3010="">Role</th><th data-rk-8d3010="">Activity</th></tr></thead>
          <tbody data-rk-8d3010="">
            <tr data-rk-8d3010=""><td data-rk-8d3010="">Alex Smith</td><td data-rk-8d3010=""><span className="st st-active" data-rk-8d3010="">Active</span></td><td data-rk-8d3010="">Admin</td><td data-rk-8d3010="">2m ago</td></tr>
            <tr data-rk-8d3010=""><td data-rk-8d3010="">Maria Garcia</td><td data-rk-8d3010=""><span className="st st-away" data-rk-8d3010="">Away</span></td><td data-rk-8d3010="">Editor</td><td data-rk-8d3010="">1h ago</td></tr>
            <tr data-rk-8d3010=""><td data-rk-8d3010="">James Wilson</td><td data-rk-8d3010=""><span className="st st-offline" data-rk-8d3010="">Offline</span></td><td data-rk-8d3010="">Viewer</td><td data-rk-8d3010="">2d ago</td></tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default GlassTable;
