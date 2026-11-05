'use client';

import './TagCloudData.css';

/** TagCloudData — ported from astro-component-kit. */
export interface TagCloudDataProps {
}

export function TagCloudData({}: TagCloudDataProps) {
  return (
    <>
      <div className="t-cloud" data-rk-eddf05="">
        <span className="t-pill" data-rk-eddf05="">React</span>
        <span className="t-pill t-active" data-rk-eddf05="">React</span>
        <span className="t-pill" data-rk-eddf05="">Next.js</span>
        <span className="t-pill" data-rk-eddf05="">Vue</span>
        <span className="t-pill" data-rk-eddf05="">Svelte</span>
      </div>
    </>
  );
}

export default TagCloudData;
