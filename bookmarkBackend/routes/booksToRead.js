var express = require('express');
var router = express.Router();
var knex = require('../db');

/* GET all To-Read Books. */
router.get('/:userId', function(req, res, next) {
  knex.raw(`SELECT * FROM bookstoread WHERE user_id=${req.params.userId}`).then(function(books) {
    res.json(books);
  })
});

// Delete book from user's list
router.delete('/:userId/:bookId/delete', function (req, res, next) {
  var id = req.params.id;
  knex.raw(`DELETE from bookstoread WHERE id=${req.params.id}`).then(function(book) {
    res.redirect('/:userId');
  });
});

//GET one book
router.get('/:userId/edit/:bookId', function (req, res, next) {
  var id = req.params.id;
  knex.raw(`SELECT * from bookstoread WHERE id=${req.params.id}`).then(function(book) {
    res.json(book.rows);
  });
});

//Edit book
router.post('/:userId/edit/:bookId', function(req, res, next) {
  knex.raw(`SELECT * FROM bookstoread WHERE book_id=${req.params.bookId}`).then(function(book) {
    res.redirect('/:userId')
  });
});


module.exports = router;
