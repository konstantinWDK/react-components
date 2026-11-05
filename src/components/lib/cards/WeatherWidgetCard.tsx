'use client';

import './WeatherWidgetCard.css';

/**
 * WeatherWidgetCard — Glassmorphism card showing weather conditions.
 * 
 * @param {string} temp - The formatted temperature (e.g. "24°").
 * @param {string} city - The location name.
 * @param {string} condition - Short weather condition string (e.g. "Partly Cloudy").
 * @param {string} icon - Emoji or symbol representing the weather.
 */
export interface WeatherWidgetCardProps {
  temp: string;
  city: string;
  condition: string;
  icon: string;
}

export function WeatherWidgetCard({ temp, city, condition, icon }: WeatherWidgetCardProps) {
  return (
    <>
      <div className="weather-card" data-rk-877a33="">
        <div className="weather-card__temp" data-rk-877a33="">{temp}</div>
        <div className="weather-card__city" data-rk-877a33="">
          <h4 className="weather-card__name" data-rk-877a33="">{city}</h4>
          <p className="weather-card__cond" data-rk-877a33="">{condition}</p>
        </div>
        <div className="weather-card__icon" aria-hidden="true" data-rk-877a33="">{icon}</div>
      </div>
    </>
  );
}

export default WeatherWidgetCard;
