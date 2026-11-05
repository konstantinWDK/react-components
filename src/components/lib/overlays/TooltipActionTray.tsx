'use client';

import './TooltipActionTray.css';

/** TooltipActionTray */
export interface TooltipActionTrayProps {
}

export function TooltipActionTray({}: TooltipActionTrayProps) {
  return (
    <>
      <div className="act-tip" data-rk-b6e742="">
        <div className="tip-body" data-rk-b6e742="">Action required</div>
        <div className="tip-btns" data-rk-b6e742=""><button className="fix" data-rk-b6e742="">Fix</button><button className="ign" data-rk-b6e742="">Ignore</button></div>
      </div>
    </>
  );
}

export default TooltipActionTray;
