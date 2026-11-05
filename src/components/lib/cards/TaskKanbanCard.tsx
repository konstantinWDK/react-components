'use client';

import './TaskKanbanCard.css';

/**
 * TaskKanbanCard — Agile task card with priority labels and due dates.
 * 
 * @param {string} task - The description of the task being managed.
 * @param {string} date - Visual date string indicator (e.g. "📅 Oct 24").
 * @param {string} assigneeInitials - Short initials for the user avatar (e.g "MJ").
 * @param {'low'|'med'|'high'} priority - Controls the appearance of the priority tag label. Default is 'low'.
 */
export interface TaskKanbanCardProps {
  task: string;
  date: string;
  assigneeInitials: string;
  priority?: 'low' | 'med' | 'high';
}

export function TaskKanbanCard({ task, date, assigneeInitials, priority = 'low' }: TaskKanbanCardProps) {
  const priorityLabels = { low: 'Low', med: 'Medium', high: 'High' };
  return (
    <>
      <div className="task-card" data-rk-11d45c="">
        <div className="task-card__tags" data-rk-11d45c="">
          <span className={`task-card__tag task-card__tag--${priority}`} data-rk-11d45c="">{priorityLabels[priority]}</span>
        </div>
        <p className="task-card__desc" data-rk-11d45c="">{task}</p>
        <div className="task-card__footer" data-rk-11d45c="">
          <span className="task-card__date" data-rk-11d45c="">{date}</span>
          <div className="task-card__assignee" data-rk-11d45c="">{assigneeInitials}</div>
        </div>
      </div>
    </>
  );
}

export default TaskKanbanCard;
