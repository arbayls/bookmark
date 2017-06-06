exports.seed = function(knex, Promise) {

  return knex('booksToRead').del()
    .then(function () {
      return Promise.all([
        createBooksRead(
          "Something",
          "Someone",
          "https://uk.animalblog.co/wp-content/uploads/2016/06/img-puppy-running.jpg",
          "Skateboard cold-pressed food truck roof party, bespoke pok pok bushwick. Fam flannel austin, pinterest dreamcatcher single-origin coffee distillery narwhal heirloom cronut subway tile hoodie poutine. Seitan gastropub 3 wolf moon, polaroid pickled vegan lyft pork belly hammock selfies skateboard shoreditch. Seitan lo-fi four loko, pitchfork subway tile yuccie tote bag cred wolf jean shorts. Air plant waistcoat humblebrag, coloring book fanny pack selfies woke beard hashtag butcher slow-carb. Banjo fashion axe migas succulents la croix gentrify semiotics adaptogen, meh meggings copper mug yuccie meditation. Banjo coloring book tote bag tacos.",
          1
        )
      ])
    })

  function createBooksRead(title, author, image_url, summary, user_id) {
    return knex('booksRead')
      .insert({title, author, image_url, summary, user_id})
      .returning('id')
      .then(ids => ids[0])
  }
};
