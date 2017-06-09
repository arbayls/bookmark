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

  knex.raw(`DELETE from bookstoread WHERE user_id=${req.params.userId} AND id=${req.params.bookId}`).then(function(book) {
    res.json(book);
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

router.post('/:user_id/add', function(req, res, next) {
  console.log(req.body);
  knex.raw(`Insert into bookstoread(title, author, image_url, user_id) values ('${req.body.title}', '${req.body.author}', '${req.body.image_url}', 2)`).then(function(result) {
    res.json(result);
  })
})

router.post('/:userId/:bookId/read', function (req, res, next) {
  var book = req.body
  knex.raw(`INSERT INTO booksread(title, author, image_url, user_id, rating) VALUES ('${book.title}', '${book.author}', '${book.image_url}', ${book.user_id}, 3)`).then(function(result) {
    knex.raw(`DELETE from bookstoread WHERE user_id=${req.params.userId} AND id=${req.params.bookId}`).then(function(book) {
      res.json(book);
    })
  })
});

module.exports = router;
