import type { CSSProperties, HTMLAttributes } from 'react';
import './TypingIndicator.css';

/**
 * TypingIndicator — A classic three-dot animation indicating a message is being composed.
 *
 * @param dotColor - Optional. Default 'var(--c-primary, #6366f1)'.
 * @param label - Optional. Accessible label. Default 'Someone is typing...'.
 */
export interface TypingIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  dotColor?: string;
  label?: string;
}

export function TypingIndicator({ dotColor = 'var(--c-primary, #6366f1)', label = 'Someone is typing...', className, ...rest }: TypingIndicatorProps) {
  return (
    <div role="status" aria-label={label} {...rest} className={['typing-wrap', className].filter(Boolean).join(' ')}>
      <div className="typing-dots" style={{ '--dot-color': dotColor } as CSSProperties}>
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

export default TypingIndicator;
