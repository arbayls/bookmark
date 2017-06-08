var express = require('express');
var router = express.Router();
var knex = require('../db');
var xml2js = require('xml2js');

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

router.post('/convert', function(req, res, next) {
  var parser = new xml2js.Parser();
  parser.parseString(req.body.data, function (err, result) {
    res.json(result);
  });
})

module.exports = router;
