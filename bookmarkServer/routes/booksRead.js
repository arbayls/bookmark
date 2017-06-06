var express = require('express');
var router = express.Router();
var knex = require('../db');

/* GET all Read Books. */
router.get('/:userId', function(req, res, next) {
  knex.raw(`SELECT * FROM booksread WHERE user_id=${req.params.userId}`).then(function(books) {
    res.json(books);
  });
});

// Delete book from user's list
router.delete('/:userId/:bookId/delete', function (req, res, next) {
  var id = req.params.id;
  knex.raw(`DELETE from booksread WHERE id=${req.params.id}`).then(function(book) {
    res.redirect('/:userId');
  });
});

//GET one book
router.get('/:userId/edit/:bookId', function (req, res, next) {
  var id = req.params.id;
  knex.raw(`SELECT * from booksread WHERE id=${req.params.id}`).then(function(book) {
    res.json(book.rows);
  });
});

//Edit book
router.post('/:userId/edit/:bookId', function(req, res, next) {
  knex.raw(`SELECT * FROM booksread WHERE book_id=${req.params.bookId}`).then(function(book) {
    res.redirect('/:userId')
  });
});

//Increment votes
router.post('/:userId/votes', (req, res, next) => {
  knex('books')
    .update('vote_count', knex.raw('vote_count + 1'))
    .where({id: req.params.id})
    .then( () => knex('posts').where({id: req.params.bookId}).first() )
    .then( post => res.json({vote_count: book.vote_count}))
    .catch(err => next(err))
})

//Decrement votes
router.delete('/:userId/votes', (req, res, next) => {
  knex('books')
    .update('vote_count', knex.raw('vote_count - 1'))
    .where({id: req.params.bookId})
    .then( () => knex('posts').where({id: req.params.bookId}).first() )
    .then( post => res.json({vote_count: book.vote_count}))
    .catch(err => next(err))
})


module.exports = router;
