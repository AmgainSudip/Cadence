// Generates outbound links for a question: the canonical LeetCode
// problem page, and a NeetCode solution reference.

export function problemUrl(question){
  return 'https://leetcode.com/problems/' + question.slug + '/';
}

export function solutionLink(question){
  if (question.solution && question.solution.url){
    return { url: question.solution.url, isExact: true, label: (question.solution.provider || 'NeetCode') + ' solution' };
  }
  const query = encodeURIComponent('NeetCode ' + question.title + ' leetcode');
  return {
    url: 'https://www.youtube.com/results?search_query=' + query,
    isExact: false,
    label: 'NeetCode solution (search)'
  };
}