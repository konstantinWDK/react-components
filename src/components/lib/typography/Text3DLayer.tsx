'use client';

import type { ReactNode } from 'react';
import './Text3DLayer.css';

/** Text3DLayer */
export interface Text3DLayerProps {
  children?: ReactNode;
}

export function Text3DLayer({ children }: Text3DLayerProps) {
  return (
    <>
      <div className="stack-3d" data-rk-68aabd="">{children}</div>
    </>
  );
}

export default Text3DLayer;
