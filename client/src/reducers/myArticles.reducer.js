export default function(articles = [], action) {
  var articlesCopy = [...articles];
  if (action.type === 'like') {
    if (!articlesCopy.includes(action.article)) {
      articlesCopy.push(action.article);
    }
    return articlesCopy
  } else if (action.type === 'dislike') {
    articlesCopy.splice(action.position, 1);
    return articlesCopy
  } else {
    return articles
  }
};
