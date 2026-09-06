//renders the top navigation
export function renderTopbar(state){
  return `
    <div class="topbar">
      <nav class="tabs">
        <button class="${state.screen==='today'?'active':''}" data-action="go-tab" data-tab="today">Today</button>
        <button class="${state.screen==='plan'?'active':''}" data-action="go-tab" data-tab="plan">Plan</button>
      </nav>
    </div>
  `;
}