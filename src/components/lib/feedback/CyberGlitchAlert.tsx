import type { CSSProperties, HTMLAttributes } from 'react';
import './CyberGlitchAlert.css';

/**
 * CyberGlitchAlert — A loud, high-contrast alert box with a CSS glitch animation effect.
 *
 * @param message - Optional. Default 'CRITICAL ERROR'.
 * @param accentColor - Optional. Default '#00e0ff'.
 */
export interface CyberGlitchAlertProps extends HTMLAttributes<HTMLDivElement> {
  message?: string;
  accentColor?: string;
}

export function CyberGlitchAlert({ message = 'CRITICAL ERROR', accentColor = '#00e0ff', className, style, ...rest }: CyberGlitchAlertProps) {
  return (
    <div
      role="alert"
      {...rest}
      className={['glitch-alert', className].filter(Boolean).join(' ')}
      style={{ '--glitch-accent': accentColor, ...style } as CSSProperties}
    >
      <span className="glitch-text" data-text={message}>{message}</span>
    </div>
  );
}

export default CyberGlitchAlert;
