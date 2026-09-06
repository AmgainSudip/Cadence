// Main controller: wires together state, data loaders, the planner,
// storage, and the UI render functions.

import { createInitialState } from './state.js';
import { loadQuestions } from './questions.js';
import { loadTopics, findTopic } from './topics.js';
import { generatePlan, finalizeDayAndCarryOver, extendPlan as extendPlanDays } from './planner.js';
import { saveState, loadState, clearState } from './storage.js';
import { renderTopbar } from './ui/topbar.js';
import { renderOnboarding } from './ui/onboarding.js';
import { renderToday } from './ui/today.js';
import { renderPlan } from './ui/plan.js';
import { dayTopics } from './ui/taskList.js';

let state = createInitialState();
let questionBank = [];
let topics = [];

const app = document.getElementById('app');

async function boot(){
  [questionBank, topics] = await Promise.all([loadQuestions(), loadTopics()]);

  const saved = loadState();
  if (saved) state = saved;

  render();
}

function render(){
  saveState(state);

  if (state.screen === 'onboarding'){
    app.innerHTML = renderOnboarding(state, questionBank, {});
    return;
  }

  const body = state.screen === 'today'
    ? renderToday(state, questionBank, topics)
    : renderPlan(state, questionBank);

  app.innerHTML = renderTopbar(state) + body;
}

// ---------------------------------------------------------------
// Actions
// ---------------------------------------------------------------

function selectList(key){ state.config.listKey = key; render(); }
function nextStep(){ state.step++; render(); }
function prevStep(){ state.step--; render(); }
function setDays(v){ state.config.totalDays = Math.min(180, Math.max(7, v || 0)); }
function adjustCapacity(delta){ state.config.capacity = Math.min(10, Math.max(1, state.config.capacity + delta)); render(); }

function startPlan(){
  state.plan = generatePlan(state.config, questionBank);
  state.today = 0;
  state.screen = 'today';
  state.showBanner = state.plan.warning ? { type: 'compressed' } : null;
  state.selectedTopic = null;
  render();
}

function toggleTask(dayIndex, idx){
  state.plan.days[dayIndex].tasks[idx].done = !state.plan.days[dayIndex].tasks[idx].done;
  render();
}

function goToNextDay(){
  const dayIndex = state.today;
  const isLastDay = dayIndex === state.plan.days.length - 1;
  const missed = finalizeDayAndCarryOver(state.plan, dayIndex);

  if (isLastDay){
    if (missed){
      state.showBanner = { type: 'deadline', count: missed };
    } else {
      state.finished = true;
      state.showBanner = null;
    }
    render();
    return;
  }

  state.showBanner = missed ? { type: 'missed', count: missed } : null;
  state.today++;
  state.selectedTopic = null;
  render();
}

function handleExtendPlan(extraDays){
  const leftover = extendPlanDays(state.plan, extraDays);
  state.today++;
  state.showBanner = leftover ? { type: 'missed', count: leftover } : null;
  render();
}

function goTab(tab){ state.screen = tab; state.selectedDay = null; render(); }
function selectDay(i){ state.selectedDay = (state.selectedDay === i) ? null : i; render(); }
function selectTopic(key){ state.selectedTopic = key; render(); }

function resetAll(){
  clearState();
  state = createInitialState();
  render();
}

// ---------------------------------------------------------------
// Event delegation — one listener handles every data-action click.
// ---------------------------------------------------------------

app.addEventListener('click', (e) => {
  const el = e.target.closest('[data-action]');
  if (!el) return;
  const action = el.dataset.action;

  if (action === 'select-list') selectList(el.dataset.list);
  else if (action === 'next-step') nextStep();
  else if (action === 'prev-step') prevStep();
  else if (action === 'capacity') adjustCapacity(parseInt(el.dataset.delta, 10));
  else if (action === 'generate-plan') startPlan();
  else if (action === 'toggle-task') toggleTask(parseInt(el.dataset.day, 10), parseInt(el.dataset.idx, 10));
  else if (action === 'next-day') goToNextDay();
  else if (action === 'extend-plan') handleExtendPlan(parseInt(el.dataset.days, 10));
  else if (action === 'go-tab') goTab(el.dataset.tab);
  else if (action === 'select-day') selectDay(parseInt(el.dataset.day, 10));
  else if (action === 'select-topic') selectTopic(el.dataset.topic);
  else if (action === 'reset-all') resetAll();
});

app.addEventListener('input', (e) => {
  if (e.target.dataset.action === 'set-days') setDays(parseInt(e.target.value, 10));
});

boot();
