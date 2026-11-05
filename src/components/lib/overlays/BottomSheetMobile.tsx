'use client';

import './BottomSheetMobile.css';

/** BottomSheetMobile */
export interface BottomSheetMobileProps {
}

export function BottomSheetMobile({}: BottomSheetMobileProps) {
  return (
    <>
      <div className="sheet-overlay" data-rk-61863a="">
        <div className="sheet-content" data-rk-61863a="">
          <div className="drag-handle" data-rk-61863a=""></div>
          <h3 data-rk-61863a="">Select Option</h3>
          <div className="options" data-rk-61863a=""><div data-rk-61863a="">Archive</div><div data-rk-61863a="">Delete</div><div data-rk-61863a="">Share</div></div>
        </div>
      </div>
    </>
  );
}

export default BottomSheetMobile;
