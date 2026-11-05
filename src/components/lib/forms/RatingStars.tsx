'use client';

import './RatingStars.css';

/**
 * RatingStars — A classic star-rating input for user reviews and feedback.
 * 
 * @param {string} name - HTML name for form submission. Default is "rating".
 * @param {number} maxRating - Maximum number of stars. Default is 5.
 * @param {string} idPrefix - Prefix used to generate unique IDs for radio buttons.
 * @param {number} initialValue - Currently selected rating.
 */
export interface RatingStarsProps {
  name?: string;
  maxRating?: number;
  idPrefix?: string;
  initialValue?: number;
}

export function RatingStars({ name = "rating", maxRating = 5, idPrefix = "star", initialValue = 0 }: RatingStarsProps) {
  return (
    <>
      <div className="rating-stars" data-rating-group data-rk-fddc65="">
        {Array.from({ length: maxRating }).map((_, i) => {
          const val = maxRating - i;
          return (
            <>
              <input type="radio" name={name} id={`${idPrefix}-${val}`} defaultValue={val} defaultChecked={initialValue === val} className="rating-stars__input" data-rk-fddc65="" />
              <label htmlFor={`${idPrefix}-${val}`} className="rating-stars__star" aria-label={`${val} stars`} data-rk-fddc65="">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-rk-fddc65="">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" data-rk-fddc65=""></polygon>
                </svg>
              </label>
            </>
          );
        })}
      </div>
    </>
  );
}

export default RatingStars;
