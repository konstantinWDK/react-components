'use client';

import './KanbanItemCard.css';

/**
 * KanbanItemCard — Small card optimized for list-based project management.
 * 
 * @param {string} title - The description of the ticket/task.
 * @param {string} priority - Priority level label (e.g. "Prio").
 * @param {string} tag - Contextual label tag (e.g. "SEO", "Bug").
 */
export interface KanbanItemCardProps {
  title: string;
  priority?: string;
  tag?: string;
}

export function KanbanItemCard({ title, priority, tag }: KanbanItemCardProps) {
  return (
    <>
      <div className="k-item" data-rk-445dff="">
        <p className="k-item__title" data-rk-445dff="">{title}</p>
        <div className="k-item__badges" data-rk-445dff="">
          {priority && <span className="k-item__badge k-item__badge--prio" data-rk-445dff="">{priority}</span>}
          {tag && <span className="k-item__badge k-item__badge--opt" data-rk-445dff="">{tag}</span>}
        </div>
      </div>
    </>
  );
}

export default KanbanItemCard;
