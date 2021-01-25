const knex = require('knex')({
    client: 'sqlite3',
  connection: {
    filename: "./db.sqlite"
  },
  useNullAsDefault: true
})

const initDB = async () => {
    const desenvolvedores = await knex.schema.hasTable('desenvolvedores')
    if (!desenvolvedores) {
      await knex.schema.createTable('desenvolvedores', table => {
        table.increments('id').primary()
        table.string('name')
        table.string('sexo')
        table.integer('idade')
        table.string('hobby')
       
      })
    }

}


initDB();
module.exports = knex;