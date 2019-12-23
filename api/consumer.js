const express = require('express');
const router = express.Router();

const sendConsumer = require('../consumer/sendConsumer');

/* API page */
router.get('/*', function (req, res) {
  const parameters = req.params[0].split('/');
  console.log(`Parameters ${parameters} Number ${parameters.length}`);

  const result = sendConsumer(parameters);

  if (result.command) {
    res.json({
      status: true,
      command: result,
      message: 'Buttons sent'
    });
  } else {
    res.json(result);
  }

 
});

module.exports = router;