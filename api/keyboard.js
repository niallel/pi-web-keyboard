const express = require('express');
const router = express.Router();
const sendKeys = require('../keyboard/sendKeys');

/* API page */
router.get('/*', function (req, res) {
  const parameters = req.params[0].split('/');
  console.log(`Keyboard Parameters ${parameters}`);

  const result = sendKeys(parameters);

  if (result.command) {
    res.json({
      status: true,
      command: result,
      message: 'Keys sent'
    });
  } else {
    res.json(result);
  }

 
});

module.exports = router;