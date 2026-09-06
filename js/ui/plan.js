import { renderTaskList } from './taskList.js';

export function renderPlan(state, questionBank){
  const plan = state.plan;
  const totalTasks = plan.days.reduce((s,d) => s + d.tasks.length, 0);
  const doneTasks = plan.days.reduce((s,d) => s + d.tasks.filter(t=>t.done).length, 0);

  const cells = plan.days.map((d, i) => {
    let cls = 'future';
    if (i < state.today || d.finalized){
      const doneCount = d.tasks.filter(t=>t.done).length;
      if (d.missedCount > 0 && doneCount < d.tasks.length) cls = 'missed';
      else if (doneCount === d.tasks.length && d.tasks.length > 0) cls = 'done';
      else cls = 'partial';
    }
    if (i === state.today && !state.finished) cls = 'today';
    if (i === state.selectedDay) cls += ' selected';
    return `<div class="cal-cell ${cls}" data-action="select-day" data-day="${i}">${d.dayNumber}</div>`;
  }).join('');

  let detail = '';
  if (state.selectedDay !== null){
    const d = plan.days[state.selectedDay];
    detail = `
      <div class="day-detail">
        <div class="day-detail-head">
          <h2>Day ${d.dayNumber} · ${d.type === 'learning' ? 'learning day' : 'review day'} · ${d.tasks.length} question${d.tasks.length===1?'':'s'}</h2>
          <button data-action="select-day" data-day="${state.selectedDay}">Close</button>
        </div>
        ${renderTaskList(d.tasks, questionBank, state.selectedDay)}
      </div>
    `;
  }

  return `
    <div class="plan-summary">
      <div class="plan-stat"><div class="num mono">${plan.days.length}</div><div class="lbl">total days</div></div>
      <div class="plan-stat"><div class="num mono">${plan.bankSize}</div><div class="lbl">questions in list</div></div>
      <div class="plan-stat"><div class="num mono">${plan.capacity}</div><div class="lbl">per day</div></div>
      <div class="plan-stat"><div class="num mono">${doneTasks}/${totalTasks}</div><div class="lbl">tasks done</div></div>
    </div>

    <div class="cal-grid">${cells}</div>

    <div class="legend">
      <span><span class="swatch today"></span>Today</span>
      <span><span class="swatch done"></span>Fully done</span>
      <span><span class="swatch partial"></span>Partly done</span>
      <span><span class="swatch missed"></span>Missed tasks</span>
    </div>

    ${detail}

    <div class="reset-line"><button data-action="reset-all">Start a new plan</button></div>
  `;
}
