'use client';

import './UserProfileNav.css';

/** UserProfileNav — ported from astro-component-kit. */
export interface UserProfileNavProps {
}

export function UserProfileNav({}: UserProfileNavProps) {
  return (
    <>
      <div className="u-nav" data-rk-50205e="">
        <div className="u-avatar" data-rk-50205e="">JS</div>
        <div className="u-menu" data-rk-50205e="">
          <a href="#" data-rk-50205e="">Your Profile</a>
          <a href="#" data-rk-50205e="">Settings</a>
          <hr data-rk-50205e="" />
          <a href="#" className="logout" data-rk-50205e="">Logout</a>
        </div>
      </div>
    </>
  );
}

export default UserProfileNav;
