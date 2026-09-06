import { findTopic } from '../topics.js';

export function renderTopicGuide(dayTopics, topics, selectedTopicKey){
  if (!dayTopics.length) return '';

  const activeKey = dayTopics.includes(selectedTopicKey) ? selectedTopicKey : dayTopics[0];
  const topic = findTopic(topics, activeKey);
  if (!topic) return '';

  let tabs = '';
  if (dayTopics.length > 1){
    tabs = `
      <div class="topic-tabs">
        ${dayTopics.map(key => {
          const t = findTopic(topics, key);
          const label = t ? t.title : key;
          return `<button class="${key === activeKey ? 'active' : ''}" data-action="select-topic" data-topic="${key}">${label}</button>`;
        }).join('')}
      </div>
    `;
  }

  const resources = topic.resources.map(r => `
    <div class="resource-row">
      <a href="${r.url}" target="_blank" rel="noopener">${r.title}</a>
      <span class="resource-type">${r.type}</span>
    </div>
  `).join('');

  return `
    <div class="topic-guide">
      ${tabs}
      <h2>${topic.title}</h2>
      <p class="desc">${topic.description}</p>
      <div class="resource-list">${resources}</div>
    </div>
  `;
}