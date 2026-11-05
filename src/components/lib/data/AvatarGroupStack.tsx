'use client';

import './AvatarGroupStack.css';

/** AvatarGroupStack */
export interface AvatarGroupStackProps {
}

export function AvatarGroupStack({}: AvatarGroupStackProps) {
  return (
    <>
      <div className="av-group" data-rk-99496b="">
        <div className="av" style={{ background: "#6366f1" }} data-rk-99496b="">AJ</div>
        <div className="av" style={{ background: "#8b5cf6" }} data-rk-99496b="">MK</div>
        <div className="av" style={{ background: "#ec4899" }} data-rk-99496b="">SL</div>
        <div className="av more" data-rk-99496b="">+4</div>
      </div>
    </>
  );
}

export default AvatarGroupStack;
