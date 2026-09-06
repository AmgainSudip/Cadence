export function createInitialState(){
  return {
    screen: 'onboarding',      // 'onboarding'  'today'  'plan'
    step: 1,                   // onboarding step, 1-3
    config: { listKey: null, totalDays: 45, capacity: 3 },
    plan: null,                
    today: 0,                  // index into plan.days
    showBanner: null,
    finished: false,
    selectedDay: null,         // day index expanded in the Plan view
    selectedTopic: null        // topic chosen when a day spans multiple topics
  };
}