
exports.up = function(knex, Promise) {
  return knex.schema.createTable('booksread', table => {
    table.increments()
    table.string("title").notNullable()
    table.string("author").notNullable()
    table.string("image_url").notNullable()
    table.integer("user_id").index().references("id").inTable("users").onDelete("cascade").notNullable()
    table.integer("rating").notNullable()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('booksread')
}
