'use client';

import './NotificationCard.css';

/**
 * NotificationCard — Toast-like card for app notifications and alerts.
 * 
 * @param {string} title - The notification headline.
 * @param {string} message - The notification detail text.
 * @param {'info'|'warning'|'success'|'error'} type - Optional. Changes the notification dot indicator color. Default is 'info'.
 */
export interface NotificationCardProps {
  title: string;
  message: string;
  type?: 'info' | 'warning' | 'success' | 'error';
}

export function NotificationCard({ title, message, type = 'info' }: NotificationCardProps) {
  return (
    <>
      <div className={`notify-card notify-card--${type}`} data-rk-7cf369="">
        <div className="notify-card__dot" aria-hidden="true" data-rk-7cf369=""></div>
        <div className="notify-card__content" data-rk-7cf369="">
          <strong className="notify-card__title" data-rk-7cf369="">{title}</strong>
          <p className="notify-card__message" data-rk-7cf369="">{message}</p>
        </div>
      </div>
    </>
  );
}

export default NotificationCard;
