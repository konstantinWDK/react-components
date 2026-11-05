'use client';

import './FloatingTabBar.css';

/** FloatingTabBar */
export interface FloatingTabBarProps {
}

export function FloatingTabBar({}: FloatingTabBarProps) {
  return (
    <>
      <div className="float-tabs" data-rk-437683="">
        <button className="active" data-rk-437683="">Discover</button>
        <button data-rk-437683="">Trending</button>
        <button data-rk-437683="">Following</button>
      </div>
    </>
  );
}

export default FloatingTabBar;
