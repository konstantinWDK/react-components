'use client';

import './StepperDataVertical.css';

/** StepperDataVertical */
export interface StepperDataVerticalProps {
}

export function StepperDataVertical({}: StepperDataVerticalProps) {
  return (
    <>
      <div className="v-steps" data-rk-054ed8="">
        <div className="v-step done" data-rk-054ed8=""><span data-rk-054ed8="">Check</span>Account Created</div>
        <div className="v-step current" data-rk-054ed8=""><span data-rk-054ed8="">2</span>Verify Email</div>
        <div className="v-step" data-rk-054ed8=""><span data-rk-054ed8="">3</span>Setup Profile</div>
      </div>
    </>
  );
}

export default StepperDataVertical;
