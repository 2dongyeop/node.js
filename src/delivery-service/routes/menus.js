const express = require('express');
const router = express.Router();

/* GET menus listing. */
router.get('/', function(req, res, next) {
  res.send('menu page');
});

module.exports = router;
