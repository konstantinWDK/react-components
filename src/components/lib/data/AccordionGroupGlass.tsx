'use client';

import './AccordionGroupGlass.css';

/** AccordionGroupGlass */
export interface AccordionGroupGlassProps {
}

export function AccordionGroupGlass({}: AccordionGroupGlassProps) {
  return (
    <>
      <div className="acc-wrap" data-rk-1f7d60="">
        <details open data-rk-1f7d60="">
          <summary data-rk-1f7d60="">How do I install the components?</summary>
          <div className="content" data-rk-1f7d60="">Simply copy the React and CSS code into your project.</div>
        </details>
        <details data-rk-1f7d60="">
          <summary data-rk-1f7d60="">Is this open source?</summary>
          <div className="content" data-rk-1f7d60="">Yes, React Components is free under the MIT license.</div>
        </details>
      </div>
    </>
  );
}

export default AccordionGroupGlass;
