'use client';

import LogoWithGalaxy from '../LogoWithGalaxy';
import './MinimalSidebar.css';

/** MinimalSidebar */
export interface MinimalSidebarProps {
}

export function MinimalSidebar({}: MinimalSidebarProps) {
  return (
    <>
      <aside className="sidebar" data-rk-9276eb="">
        <div className="sidebar-logo" data-rk-9276eb="">
          <LogoWithGalaxy size="small" />
        </div>
        <nav className="sidebar-nav" data-rk-9276eb="">
          <a href="#" className="active" data-rk-9276eb="">Overview</a>
          <a href="#" data-rk-9276eb="">Projects</a>
          <a href="#" data-rk-9276eb="">Team</a>
          <a href="#" data-rk-9276eb="">Settings</a>
        </nav>
      </aside>
    </>
  );
}

export default MinimalSidebar;
