'use client';

import type { ReactNode } from 'react';
import './CyberFeatureCard.css';

/**
 * CyberFeatureCard — A feature card with sharp angles and neon stroke animations.
 * 
 * @param {string} title - The main headline of the feature card.
 * @param {string} subtitle - Optional description context.
 */
export interface CyberFeatureCardProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

export function CyberFeatureCard({ title, subtitle,
  children
}: CyberFeatureCardProps) {
  return (
    <>
      <div className="cyber-card" data-rk-3d31cd="">
        <div className="cyber-card__glitch-line" data-rk-3d31cd=""></div>
        <h3 className="cyber-card__title" data-rk-3d31cd="">{title}</h3>
        {subtitle && <p className="cyber-card__subtitle" data-rk-3d31cd="">{subtitle}</p>}
        {children}
      </div>
    </>
  );
}

export default CyberFeatureCard;
