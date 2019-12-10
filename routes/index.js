const express = require('express');
const router = express.Router();
const keyTable = require('../keyboard/keyTable');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pi Web Keyboard', keyTable: Object.keys(keyTable) });
});

module.exports = router;
