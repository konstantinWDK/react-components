'use client';

import './TabUnderline.css';

/** TabUnderline */
export interface TabUnderlineProps {
}

export function TabUnderline({}: TabUnderlineProps) {
  return (
    <>
      <nav className="u-tabs" data-rk-f35f3a="">
        <a href="#" className="active" data-rk-f35f3a="">Profile</a>
        <a href="#" data-rk-f35f3a="">Password</a>
        <a href="#" data-rk-f35f3a="">Sessions</a>
        <div className="indicator" data-rk-f35f3a=""></div>
      </nav>
    </>
  );
}

export default TabUnderline;
