'use client';

import { useEffect, useRef } from 'react';
import './InteractiveTiltCard.css';

/**
 * InteractiveTiltCard — Card that tilts in 3D space based on mouse position.
 * 
 * @param {string} title - The card's heading text.
 * @param {string} description - The descriptive paragraph attached to the card.
 */
export interface InteractiveTiltCardProps {
  title: string;
  description: string;
}

export function InteractiveTiltCard({ title, description }: InteractiveTiltCardProps) {

  // Ported from the Astro <script>: runs once after mount (DOM logic kept as in the Astro kit).
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll('.tilt-card-inner').forEach(card => {
        card.addEventListener('mousemove', e => {
          const rect = card.getBoundingClientRect();
          const x = ((e as MouseEvent).clientX - rect.left - rect.width/2) / 10;
          const y = ((e as MouseEvent).clientY - rect.top - rect.height/2) / -10;
          (card as HTMLElement).style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
        });
        card.addEventListener('mouseleave', () => {
          (card as HTMLElement).style.transform = 'rotateY(0deg) rotateX(0deg)';
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="tilt-card-wrap" data-rk-c53bbe="">
        <div className="tilt-card-inner" data-rk-c53bbe="">
          <h3 className="tilt-card__title" data-rk-c53bbe="">{title}</h3>
          <p className="tilt-card__desc" data-rk-c53bbe="">{description}</p>
        </div>
      </div>
    </>
  );
}

export default InteractiveTiltCard;
