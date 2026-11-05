'use client';

import './FloatingTrayActions.css';

/** FloatingTrayActions */
export interface FloatingTrayActionsProps {
}

export function FloatingTrayActions({}: FloatingTrayActionsProps) {
  return (
    <>
      <div className="tray" data-rk-1cad28="">
        <button className="tray-btn" data-rk-1cad28="">✏️ Edit</button>
        <div className="sep" data-rk-1cad28=""></div>
        <button className="tray-btn" data-rk-1cad28="">↗️ Share</button>
      </div>
    </>
  );
}

export default FloatingTrayActions;
