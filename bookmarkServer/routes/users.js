var express = require('express');
var router = express.Router();
var knex = require('../db');

/* GET users listing. */
router.post('/login', function(req, res, next) {
  knex.raw(`SELECT * FROM users WHERE email = '${req.body.email}' AND password = '${req.body.password}'`)
  .then(function(results) {
    console.log(results);
    if (results.rows.length > 0) {
      res.json(results)
    } else {
      res.json({err: "no such user"})
    }
  })
});

module.exports = router;
