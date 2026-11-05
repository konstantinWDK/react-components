'use client';

import './StepLayoutVertical.css';

/**
 * StepLayoutVertical — Vertical Progress Steps with space for detailed descriptions.
 */
export interface StepLayoutVerticalProps {
  className?: string;
}

export function StepLayoutVertical({ className = '' }: StepLayoutVerticalProps) {
  return (
    <>
      <div className={`step-lay ${className}`} data-rk-3280db="">
        <div className="step-line" data-rk-3280db="">
          <div className="step-point" data-rk-3280db="">1</div>
          <div className="step-point" data-rk-3280db="">2</div>
          <div className="step-point" data-rk-3280db="">3</div>
        </div>
        <div className="step-content" data-rk-3280db="">
          <div className="step-block" data-rk-3280db="">
            <h4 data-rk-3280db="">1. Installation</h4>
            <p data-rk-3280db="">Install react-component-kit-ui via npm in seconds.</p>
          </div>
          <div className="step-block" data-rk-3280db="">
            <h4 data-rk-3280db="">2. Configuration</h4>
            <p data-rk-3280db="">Import components and design tokens into your React project.</p>
          </div>
          <div className="step-block" data-rk-3280db="">
            <h4 data-rk-3280db="">3. Build & Ship</h4>
            <p data-rk-3280db="">Enjoy zero-runtime overhead and instant static builds.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default StepLayoutVertical;
