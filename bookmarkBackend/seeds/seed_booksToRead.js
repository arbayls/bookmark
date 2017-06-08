exports.seed = function(knex, Promise) {

  return knex('bookstoread').del()
    .then(function () {
      return Promise.all([
        createBookToRead(
          "The Book",
          "The Author",
          "https://s-media-cache-ak0.pinimg.com/736x/3b/ca/b6/3bcab6f591ac1d61b1e6abded3ea06a7.jpg",
          1
        ),
        createBookToRead(
          "Another Novel",
          "Some Person",
          "http://a.abcnews.com/images/Business/GTY_rabbit_sr_140508_16x9_992.jpg",
          2
        )
      ])
    })

  function createBookToRead(title, author, image_url, user_id) {
    return knex('bookstoread')
      .insert({title, author, image_url, user_id})
      .returning('id')
      .then(ids => ids[0])
  }
};

// table.string("title").notNullable()
// table.string("author").notNullable()
// table.string("image_url").notNullable()
// table.text("summary").notNullable()
// table.integer("user_id").index().references("id").inTable("users").onDelete("cascade").notNullable()
