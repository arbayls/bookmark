
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments()
    table.text("email")
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments')
}
