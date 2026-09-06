// Renders a list of tasks (used by both the Today page and the Plan
// page's day-detail panel) with checkboxes, problem links, and
// NeetCode solution links.

import { findQuestionById } from '../questions.js';
import { problemUrl, solutionLink } from '../links.js';

export function renderTaskList(tasks, questionBank, dayIndex){
  if (!tasks.length){
    return '<div class="empty-note">Nothing scheduled this day.</div>';
  }
  return '<div class="task-list">' + tasks.map((t, idx) => renderTaskRow(t, idx, dayIndex, questionBank)).join('') + '</div>';
}

function renderTaskRow(t, idx, dayIndex, questionBank){
  const q = findQuestionById(questionBank, t.qId);
  const solution = solutionLink(q);
  const searchNote = solution.isExact ? '' : '<span class="search-note">(search)</span>';
  return `
    <div class="task ${t.done?'done':''}">
      <button class="checkbox ${t.done?'checked':''}" aria-label="${t.done?'Mark not done':'Mark done'}"
        data-action="toggle-task" data-day="${dayIndex}" data-idx="${idx}"></button>
      <div class="task-body">
        <div class="task-kind ${t.kind} ${t.carried?'carried':''}">${t.kind === 'new' ? 'New' : 'Review'}</div>
        <div class="task-title ${t.done?'strike':''}">${q.title}</div>
        <div class="task-meta">
          <span>${q.topic} · ${q.difficulty}</span>
          <a href="${problemUrl(q)}" target="_blank" rel="noopener">Open Problem</a>
          <a href="${solution.url}" target="_blank" rel="noopener">${solution.label}</a>
          ${searchNote}
        </div>
      </div>
    </div>
  `;
}

export function dayTopics(day, questionBank){
  const seen = [];
  for (const t of day.tasks){
    const q = findQuestionById(questionBank, t.qId);
    if (q && !seen.includes(q.topic)) seen.push(q.topic);
  }
  return seen;
}
