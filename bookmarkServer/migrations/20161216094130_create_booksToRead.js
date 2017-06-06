
exports.up = function(knex, Promise) {
  return knex.schema.createTable('bookstoread', table => {
    table.increments()
    table.string("title").notNullable()
    table.string("author").notNullable()
    table.string("image_url").notNullable()
    table.text("summary").notNullable()
    table.integer("user_id").index().references("id").inTable("users").onDelete("cascade").notNullable()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('bookstoread')
}
