// Loads DSA topic introductions + resources from data/topics.json.
let cache = null;

export async function loadTopics(){
  if (cache) return cache;
  const res = await fetch('data/topics.json');
  if (!res.ok){
    throw new Error('Could not load data/topics.json (' + res.status + ')');
  }
  cache = await res.json();
  return cache;
}

export function findTopic(topics, key){
  return topics.find(t => t.key === key);
}