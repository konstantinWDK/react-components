'use client';

import './UserDirectoryItem.css';

/** UserDirectoryItem — ported from astro-component-kit. */
export interface UserDirectoryItemProps {
}

export function UserDirectoryItem({}: UserDirectoryItemProps) {
  return (
    <>
      <div className="u-item" data-rk-2f9e54="">
        <div className="u-pic" data-rk-2f9e54="">JS</div>
        <div className="u-info" data-rk-2f9e54=""><h5 data-rk-2f9e54="">John Doe</h5><p data-rk-2f9e54="">Software Engineer</p></div>
        <div className="u-stat" data-rk-2f9e54="">Online</div>
      </div>
    </>
  );
}

export default UserDirectoryItem;
