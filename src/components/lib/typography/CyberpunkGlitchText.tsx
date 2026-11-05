'use client';

import './CyberpunkGlitchText.css';

/** CyberpunkGlitchText */
export interface CyberpunkGlitchTextProps {
  text: string;
}

export function CyberpunkGlitchText({ text }: CyberpunkGlitchTextProps) {
  return (
    <>
      <div className="glitch-text" data-text={text} data-rk-2349bb="">{text}</div>
    </>
  );
}

export default CyberpunkGlitchText;
