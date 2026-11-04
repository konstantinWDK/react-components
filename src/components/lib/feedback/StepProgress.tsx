import type { CSSProperties, HTMLAttributes } from 'react';
import './StepProgress.css';

/**
 * StepProgress — A multi-stage stepper indicating flow through several discrete points.
 *
 * @param steps - Optional. Default Details / Payment / Finish.
 * @param activeIndex - Optional. Zero-based current step. Default 0.
 */
export interface StepProgressProps extends HTMLAttributes<HTMLDivElement> {
  steps?: Array<{ label: string }>;
  activeIndex?: number;
}

const defaultSteps = [{ label: 'Details' }, { label: 'Payment' }, { label: 'Finish' }];

export function StepProgress({ steps = defaultSteps, activeIndex = 0, className, ...rest }: StepProgressProps) {
  const progress = steps.length > 1 ? (activeIndex / (steps.length - 1)) * 100 : 0;
  return (
    <div {...rest} className={['steps-container', className].filter(Boolean).join(' ')}>
      <div className="steps-line" aria-hidden="true" style={{ '--progress': `${progress}%` } as CSSProperties} />
      <ol className="steps-list">
        {steps.map((step, i) => (
          <li
            key={step.label + i}
            className={['step-item', i === activeIndex && 'step-item--active', i < activeIndex && 'step-item--complete'].filter(Boolean).join(' ')}
            aria-current={i === activeIndex ? 'step' : undefined}
          >
            <div className="step-circle">{i + 1}</div>
            <span className="step-label">{step.label}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default StepProgress;
