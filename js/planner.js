
import { filterByList } from './questions.js';

export function generatePlan(cfg, questionBank){
  const bank = filterByList(questionBank, cfg.listKey);
  const capacity = Math.max(1, cfg.capacity);
  const totalDays = Math.max(5, cfg.totalDays);

  const learningDaysNeeded = Math.ceil(bank.length / capacity);
  let warning = null;
  let learningDays, reviewDays;

  if (learningDaysNeeded >= totalDays){
    learningDays = totalDays;
    reviewDays = 0;
    warning = 'Your daily capacity needs ' + learningDaysNeeded + ' days just to reach every question once. ' +
      'There is no room left for review before your deadline. Consider raising your daily capacity or moving the deadline out.';
  } else {
    learningDays = learningDaysNeeded;
    reviewDays = totalDays - learningDaysNeeded;
  }

  const days = [];
  let qi = 0;
  for (let d = 0; d < learningDays; d++){
    const tasks = [];
    for (let c = 0; c < capacity && qi < bank.length; c++){
      tasks.push({ qId: bank[qi].id, kind: 'new', done: false, carried: false });
      qi++;
    }
    days.push({ dayNumber: d + 1, type: 'learning', tasks, finalized: false, missedCount: 0 });
  }

  const learnedCount = qi;
  for (let r = 0; r < reviewDays; r++){
    const tasks = [];
    const n = Math.min(capacity, learnedCount);
    for (let c = 0; c < n; c++){
      const idx = (r * capacity + c * 7 + 3) % learnedCount;
      tasks.push({ qId: bank[idx].id, kind: 'review', done: false, carried: false });
    }
    days.push({ dayNumber: learningDays + r + 1, type: 'review', tasks, finalized: false, missedCount: 0 });
  }

  return { listKey: cfg.listKey, capacity, days, warning, bankSize: bank.length };
}

export function finalizeDayAndCarryOver(plan, dayIndex){
  const day = plan.days[dayIndex];
  const incomplete = day.tasks.filter(t => !t.done);
  day.finalized = true;
  day.missedCount = incomplete.length;

  if (!incomplete.length) return 0;
  if (dayIndex === plan.days.length - 1) return incomplete.length; // deadline day — caller handles extension

  const nextDay = plan.days[dayIndex + 1];
  const carriedTasks = incomplete.map(t => ({ ...t, carried: true }));
  nextDay.tasks = carriedTasks.concat(nextDay.tasks);
  return incomplete.length;
}

export function extendPlan(plan, extraDays){
  const lastDay = plan.days[plan.days.length - 1];
  const incomplete = lastDay.tasks.filter(t => !t.done);
  const capacity = plan.capacity;
  let pool = incomplete.map(t => ({ ...t, carried: true }));
  const addedDays = [];
  const startNum = lastDay.dayNumber + 1;
  for (let i = 0; i < extraDays; i++){
    const tasks = pool.splice(0, capacity);
    addedDays.push({ dayNumber: startNum + i, type: 'review', tasks, finalized: false, missedCount: 0 });
  }
  plan.days = plan.days.concat(addedDays);
  return pool.length; // any tasks that still didn't fit
}