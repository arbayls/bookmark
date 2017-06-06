
exports.seed = function(knex, Promise) {

  return knex('users').del()
    .then(function () {
      return Promise.all([
        createUser(
          "bob@fake.net"
        ),
        createUser(
          "test@test.com"
        )
      ])
    })

  function createUser(email) {
    return knex('users')
      .insert({email})
      .returning('id')
      .then(ids => ids[0])
  }
};
