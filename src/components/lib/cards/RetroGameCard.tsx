'use client';

import './RetroGameCard.css';

/**
 * RetroGameCard — Bold gaming card with scanlines and pixel fonts.
 * 
 * @param {string} title - The retro game title.
 * @param {string} level - Current stage or level string.
 * @param {number|string} score - The player's score.
 */
export interface RetroGameCardProps {
  title: string;
  level: string;
  score: number | string;
}

export function RetroGameCard({ title, level, score }: RetroGameCardProps) {
  return (
    <>
      <div className="retro-game" data-rk-d37617="">
        <div className="retro-game__scanlines" data-rk-d37617=""></div>
        <div className="retro-game__screen" data-rk-d37617="">{level}</div>
        <h3 className="retro-game__title" data-rk-d37617="">{title}</h3>
        <div className="retro-game__score" data-rk-d37617="">SCORE: {score}</div>
      </div>
    </>
  );
}

export default RetroGameCard;
