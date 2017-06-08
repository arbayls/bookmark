exports.seed = function(knex, Promise) {

  return knex('booksread').del()
    .then(function () {
      return Promise.all([
        createBooksRead(
          "Something",
          "Someone",
          "https://uk.animalblog.co/wp-content/uploads/2016/06/img-puppy-running.jpg",
          1
        )
      ])
    })

  function createBooksRead(title, author, image_url, user_id) {
    return knex('booksread')
      .insert({title, author, image_url, user_id})
      .returning('id')
      .then(ids => ids[0])
  }
};
