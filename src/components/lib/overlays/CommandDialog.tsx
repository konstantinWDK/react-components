'use client';

import './CommandDialog.css';

/** CommandDialog — ported from astro-component-kit. */
export interface CommandDialogProps {
}

export function CommandDialog({}: CommandDialogProps) {
  return (
    <>
      <div className="cmd-overlay" data-rk-1922ac="">
        <div className="cmd-box" data-rk-1922ac="">
          <div className="cmd-input" data-rk-1922ac=""><input type="text" placeholder="Search commands..." data-rk-1922ac="" /></div>
          <div className="cmd-results" data-rk-1922ac="">
              <div className="res" data-rk-1922ac=""><span data-rk-1922ac="">Recent: Dashboard</span><kbd data-rk-1922ac="">↵</kbd></div>
              <div className="res" data-rk-1922ac=""><span data-rk-1922ac="">Docs: Navigation</span><kbd data-rk-1922ac="">↵</kbd></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CommandDialog;
