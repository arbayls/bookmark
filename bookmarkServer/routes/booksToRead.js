var express = require('express');
var router = express.Router();
var knex = require('../db');
/* GET home page. */
router.get('/:userId', function(req, res, next) {
  knex.raw(`SELECT * FROM bookstoread WHERE user_id=${req.params.userId}`).then(function(books) {
    res.json(books);
  })
});

module.exports = router;
