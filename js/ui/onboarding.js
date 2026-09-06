// Renders the three-step onboarding flow: list choice, deadline, capacity.

export function renderOnboarding(state, questionBank, handlers){
  const cfg = state.config;
  let body = '';

  if (state.step === 1){
    const blind75Count = questionBank.filter(q => q.blind75).length;
    body = `
      <div class="step-label">Step 1 of 3</div>
      <h1>Choose your question list</h1>
      <p class="lead">Pick the set you want to work through before your deadline.</p>
      <div class="choice-row">
        <button class="choice ${cfg.listKey==='blind75'?'selected':''}" data-action="select-list" data-list="blind75">
          <div>
            <div class="name">Blind 75</div>
            <div class="meta">${blind75Count} core questions across every major pattern</div>
          </div>
          <span class="mark">Selected</span>
        </button>
        <button class="choice ${cfg.listKey==='neetcode150'?'selected':''}" data-action="select-list" data-list="neetcode150">
          <div>
            <div class="name">NeetCode 150</div>
            <div class="meta">${questionBank.length} questions, broad coverage of major DSA patterns</div>
          </div>
          <span class="mark">Selected</span>
        </button>
      </div>
      <div class="row-between">
        <span></span>
        <button class="btn" data-action="next-step" ${cfg.listKey ? '' : 'disabled'}>Continue</button>
      </div>
    `;
  } else if (state.step === 2){
    const target = new Date(Date.now() + cfg.totalDays * 86400000);
    const targetStr = target.toLocaleDateString(undefined, { month:'long', day:'numeric', year:'numeric' });
    body = `
      <div class="step-label">Step 2 of 3</div>
      <h1>Set your deadline</h1>
      <p class="lead">How many days until your interview, or your target finish date?</p>
      <div class="field-block">
        <label for="days-input">Days from today</label>
        <input id="days-input" class="num-input mono" type="number" min="7" max="180" value="${cfg.totalDays}" data-action="set-days" />
        <div class="hint">Target date: ${targetStr}</div>
      </div>
      <div class="row-between">
        <button class="btn secondary" data-action="prev-step">Back</button>
        <button class="btn" data-action="next-step">Continue</button>
      </div>
    `;
  } else if (state.step === 3){
    body = `
      <div class="step-label">Step 3 of 3</div>
      <h1>Set your daily capacity</h1>
      <p class="lead">How many problems can you commit to on a learning day?</p>
      <div class="field-block">
        <label>Problems per day</label>
        <div class="stepper">
          <button data-action="capacity" data-delta="-1" aria-label="Decrease">–</button>
          <div class="count mono">${cfg.capacity}</div>
          <button data-action="capacity" data-delta="1" aria-label="Increase">+</button>
        </div>
        <div class="hint">Review days later in the plan use the same daily count.</div>
      </div>
      <div class="row-between">
        <button class="btn secondary" data-action="prev-step">Back</button>
        <button class="btn" data-action="generate-plan">Generate plan</button>
      </div>
    `;
  }

  return `<div class="onboard">${body}</div>`;
}
