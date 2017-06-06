exports.seed = function(knex, Promise) {

  return knex('booksToRead').del()
    .then(function () {
      return Promise.all([
        createBookToRead(
          "The Book",
          "The Author",
          "https://s-media-cache-ak0.pinimg.com/736x/3b/ca/b6/3bcab6f591ac1d61b1e6abded3ea06a7.jpg",
          "Skateboard cold-pressed food truck roof party, bespoke pok pok bushwick. Fam flannel austin, pinterest dreamcatcher single-origin coffee distillery narwhal heirloom cronut subway tile hoodie poutine. Seitan gastropub 3 wolf moon, polaroid pickled vegan lyft pork belly hammock selfies skateboard shoreditch. Seitan lo-fi four loko, pitchfork subway tile yuccie tote bag cred wolf jean shorts. Air plant waistcoat humblebrag, coloring book fanny pack selfies woke beard hashtag butcher slow-carb. Banjo fashion axe migas succulents la croix gentrify semiotics adaptogen, meh meggings copper mug yuccie meditation. Banjo coloring book tote bag tacos.",
          1
        ),
        createBookToRead(
          "Another Novel",
          "Some Person",
          "http://a.abcnews.com/images/Business/GTY_rabbit_sr_140508_16x9_992.jpg",
          "Art party fashion axe occupy tousled fanny pack. Heirloom hammock skateboard post-ironic, meditation ennui tote bag. Enamel pin ennui man bun glossier paleo deep v, dreamcatcher heirloom. Fingerstache migas brooklyn godard distillery, semiotics cronut next level hella vaporware schlitz kogi stumptown small batch. +1 migas whatever mustache. Af farm-to-table chillwave meggings vegan, shabby chic copper mug tumeric narwhal mumblecore forage normcore disrupt. Man braid small batch live-edge asymmetrical, mumblecore coloring book fashion axe tousled ugh +1 bicycle rights.",
          2
        )
      ])
    })

  function createBookToRead(title, author, image_url, summary, user_id) {
    return knex('booksToRead')
      .insert({title, author, image_url, summary, user_id})
      .returning('id')
      .then(ids => ids[0])
  }
};

// table.string("title").notNullable()
// table.string("author").notNullable()
// table.string("image_url").notNullable()
// table.text("summary").notNullable()
// table.integer("user_id").index().references("id").inTable("users").onDelete("cascade").notNullable()
