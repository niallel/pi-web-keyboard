const express = require('express');
const router = express.Router();
const keyTable = require('../keyboard/keyTable');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pi Web Keyboard', keyTable: Object.keys(keyTable) });
});

/* GET home page. */
router.get('/firetv', function(req, res, next) {
  res.render('firetv', { title: 'Amazon Fire TV' });
});
module.exports = router;
