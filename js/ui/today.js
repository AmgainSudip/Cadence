// Renders the Today page: topic guide, banner, progress, task list.

import { renderTopicGuide } from './topicGuide.js';
import { renderTaskList, dayTopics } from './taskList.js';

export function renderToday(state, questionBank, topics){
  if (state.finished){
    return `
      <div class="empty-note">
        <h1 style="font-size:22px; font-weight:600; margin:0 0 10px;">Plan complete</h1>
        <p>You've reached the end of your ${state.plan.days.length}-day plan. Check the Plan tab for a full record, or start a new one.</p>
      </div>
      <div class="reset-line"><button data-action="reset-all">Start a new plan</button></div>
    `;
  }

  const day = state.plan.days[state.today];
  const total = state.plan.days.length;
  const doneCount = day.tasks.filter(t => t.done).length;
  const pct = day.tasks.length ? Math.round((doneCount / day.tasks.length) * 100) : 0;
  const allDone = day.tasks.length > 0 && doneCount === day.tasks.length;

  let banner = '';
  if (state.showBanner){
    if (state.showBanner.type === 'missed'){
      banner = `<div class="banner">You missed ${state.showBanner.count} task${state.showBanner.count===1?'':'s'} yesterday — added to today.</div>`;
    } else if (state.showBanner.type === 'compressed'){
      banner = `<div class="banner">${state.plan.warning}</div>`;
    } else if (state.showBanner.type === 'deadline'){
      banner = `
        <div class="banner">
          You've reached your deadline with ${state.showBanner.count} task${state.showBanner.count===1?'':'s'} left.
          <div style="margin-top:10px; display:flex; gap:10px;">
            <button class="btn secondary small" data-action="extend-plan" data-days="3">Add 3 more days</button>
            <button class="btn secondary small" data-action="extend-plan" data-days="7">Add 7 more days</button>
          </div>
        </div>
      `;
    }
  } else if (allDone){
    banner = `<div class="banner done">Today is done. You can look ahead by opening the Plan tab, or come back tomorrow.</div>`;
  }

  const topicsToday = dayTopics(day, questionBank);
  const guide = renderTopicGuide(topicsToday, topics, state.selectedTopic);

  return `
    <div class="day-hero">
      <div class="count mono">${day.dayNumber}</div>
      <div class="of">of ${total} · ${day.type === 'learning' ? 'learning day' : 'review day'}</div>
    </div>

    ${guide}

    ${banner}

    <div class="progress-label">${doneCount} of ${day.tasks.length} done</div>
    <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>

    ${renderTaskList(day.tasks, questionBank, state.today)}

    <div class="bottom-actions">
      <button class="btn" data-action="next-day">${allDone ? 'Finish today, go to next day' : 'Go to next day anyway'}</button>
      <span class="bottom-note">${allDone ? '' : 'Unfinished tasks will carry into tomorrow.'}</span>
    </div>
  `;
}
