'use client';

import './PopoverMenuGlass.css';

/** PopoverMenuGlass */
export interface PopoverMenuGlassProps {
}

export function PopoverMenuGlass({}: PopoverMenuGlassProps) {
  return (
    <>
      <div className="popover" data-rk-c14527="">
        <div className="pop-inner" data-rk-c14527="">
          <div className="pop-item" data-rk-c14527="">Edit Account</div>
          <div className="pop-item" data-rk-c14527="">Billing</div>
          <hr data-rk-c14527="" />
          <div className="pop-item logout" data-rk-c14527="">Logout</div>
        </div>
      </div>
    </>
  );
}

export default PopoverMenuGlass;
