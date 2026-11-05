'use client';

import type { CSSProperties } from 'react';
import AnimatedGalaxy from './AnimatedGalaxy';
import './LogoWithGalaxy.css';

/** "a: b; --c: d" → style object */
function st(css: string | undefined): CSSProperties {
  const o: Record<string, string> = {};
  for (const decl of String(css ?? '').split(';')) {
    const i = decl.indexOf(':');
    if (i < 0) continue;
    const k = decl.slice(0, i).trim();
    if (k) o[k.startsWith('--') ? k : k.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = decl.slice(i + 1).trim();
  }
  return o as CSSProperties;
}

/** LogoWithGalaxy */
export interface LogoWithGalaxyProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export function LogoWithGalaxy({ size = 'medium', className = '' }: LogoWithGalaxyProps) {
  const sizes = {
    small: { logoHeight: '36px', galaxyWidth: '160px', galaxyHeight: '96px', galaxyTop: '-5px', galaxyLeft: '-40px' },
    medium: { logoHeight: '48px', galaxyWidth: '220px', galaxyHeight: '132px', galaxyTop: '0px', galaxyLeft: '-55px' },
    large: { logoHeight: '70px', galaxyWidth: '320px', galaxyHeight: '192px', galaxyTop: '5px', galaxyLeft: '-70px' },
  };
  
  const s = sizes[size];
  return (
    <>
      <div className={`logo-container ${className}`.trim()} data-rk-7f5ef8="">
        {/* Galaxy behind, bottom-left */}
        <div className="galaxy-wrap" data-rk-7f5ef8="">
          <AnimatedGalaxy className="galaxy-svg" style={st(`width: ${s.galaxyWidth}; height: ${s.galaxyHeight};`)} />
        </div>
        {/* Logo text on top */}
        <div className="logo-text" data-rk-7f5ef8="">
          <img src="/logo.svg" alt="React Kit Components" data-rk-7f5ef8="" />
        </div>
      </div>
    </>
  );
}

export default LogoWithGalaxy;
