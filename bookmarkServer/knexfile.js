module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: process.env.DATABASE_URL || 'bookmark',
    }
  },

  test: {
    client: 'pg',
    connection: {
      database: process.env.DATABASE_URL || 'bookmark-test',
    }
  }

};
