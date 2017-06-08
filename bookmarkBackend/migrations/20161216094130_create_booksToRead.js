
exports.up = function(knex, Promise) {
  return knex.schema.createTable('bookstoread', table => {
    table.increments()
    table.text("title").notNullable()
    table.text("author").notNullable()
    table.text("image_url").notNullable()
    table.integer("user_id").index().references("id").inTable("users").onDelete("cascade").notNullable()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('bookstoread')
}
