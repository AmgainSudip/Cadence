const KEY = 'cadence:state:v1';

export function saveState(state){
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (err){
    console.warn('Cadence: could not save state', err);
  }
}

export function loadState(){
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err){
    console.warn('Cadence: could not load saved state', err);
    return null;
  }
}

export function clearState(){
  try {
    localStorage.removeItem(KEY);
  } catch (err){
    console.warn('Cadence: could not clear saved state', err);
  }
}