// Loads the question bank from data/questions.json.
let cache = null;

export async function loadQuestions(){
  if (cache) return cache;
  const res = await fetch('data/questions.json');
  if (!res.ok){
    throw new Error('Could not load data/questions.json (' + res.status + ')');
  }
  cache = await res.json();
  return cache;
}

export function findQuestionById(bank, id){
  return bank.find(q => q.id === id);
}

export function filterByList(bank, listKey){
  return listKey === 'blind75' ? bank.filter(q => q.blind75) : bank.slice();
}
