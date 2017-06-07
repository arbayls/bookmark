
exports.seed = function(knex, Promise) {

  return knex('users').del()
    .then(function () {
      return Promise.all([
        createUser(
          "bob@fake.net",
          "password"
        ),
        createUser(
          "test@test.com",
          "test"
        )
      ])
    })

  function createUser(email, password) {
    return knex('users')
      .insert({email, password})
      .returning('id')
      .then(ids => ids[0])
  }
};
