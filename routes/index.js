var express = require('express');
var router = express.Router();
var request = require('sync-request');

router.get('/sources-fr', async (req, res) => {
  var newsApiRequest = await request('GET', `https://newsapi.org/v2/sources?language=fr&country=fr&apiKey=${process.env.NEWSAPI_KEY}`);
  var ApiResponse = JSON.parse(newsApiRequest.body);
  res.json({sources: ApiResponse.sources})
});

router.get('/sources-en', async (req, res) => {
  var newsApiRequest = await request('GET', `https://newsapi.org/v2/sources?language=en&country=us&apiKey=${process.env.NEWSAPI_KEY}`);
  var ApiResponse = JSON.parse(newsApiRequest.body);
  res.json({sources: ApiResponse.sources})
});

router.get('/articles-by-sources/:sourceId', async (req, res) => {
  var newsApiRequest = await request('GET', `https://newsapi.org/v2/top-headlines?sources=${req.params.sourceId}&apiKey=${process.env.NEWSAPI_KEY}`);
  var ApiResponse = JSON.parse(newsApiRequest.body);
  res.json({articles: ApiResponse.articles})
});

module.exports = router;
