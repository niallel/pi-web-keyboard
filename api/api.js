const express = require('express');
const router = express.Router();
const sendKeys = require('../keyboard/sendKeys');

/* API page */
router.get('/*', function (req, res) {
  const parameters = req.params[0].split('/');
  console.log(`Parameters ${parameters} Number ${parameters.length}`);

  const result = sendKeys(parameters);

  if (result) {
    res.json({
      status: true,
      command: result,
      message: 'Keys sent'
    });
  } else {
    res.json({
      status: false,
      message: 'No Matching Keys sent'
    });
  }

 
});

module.exports = router;