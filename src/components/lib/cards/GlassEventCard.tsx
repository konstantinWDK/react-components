'use client';

import './GlassEventCard.css';

/**
 * GlassEventCard — Vibrant card for events with date badge and glass effect.
 * 
 * @param {string|number} day - The event date numeric segment.
 * @param {string} month - The event month string indicator.
 * @param {string} title - The name of the event.
 * @param {string} details - Additional string metadata (e.g location and time).
 */
export interface GlassEventCardProps {
  day: string | number;
  month: string;
  title: string;
  details: string;
}

export function GlassEventCard({ day, month, title, details }: GlassEventCardProps) {
  return (
    <>
      <div className="event-card" data-rk-f41cb5="">
        <div className="event-card__badge" data-rk-f41cb5="">
          <span className="event-card__day" data-rk-f41cb5="">{day}</span>
          {month}
        </div>
        <div className="event-card__info" data-rk-f41cb5="">
          <h3 className="event-card__title" data-rk-f41cb5="">{title}</h3>
          <p className="event-card__details" data-rk-f41cb5="">{details}</p>
        </div>
        <button className="event-card__join" type="button" aria-label="Join event" data-rk-f41cb5="">+</button>
      </div>
    </>
  );
}

export default GlassEventCard;
