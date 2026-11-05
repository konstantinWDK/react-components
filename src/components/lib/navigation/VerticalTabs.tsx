'use client';

import './VerticalTabs.css';

/** VerticalTabs */
export interface VerticalTabsProps {
}

export function VerticalTabs({}: VerticalTabsProps) {
  return (
    <>
      <div className="v-tabs" data-rk-0ae995="">
        <button className="v-tab active" data-rk-0ae995="">General</button>
        <button className="v-tab" data-rk-0ae995="">Account</button>
        <button className="v-tab" data-rk-0ae995="">Security</button>
        <button className="v-tab" data-rk-0ae995="">Notifications</button>
      </div>
    </>
  );
}

export default VerticalTabs;
