exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('wines', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.string('max_price');
      table.string('min_price');
    }),

    knex.schema.createTable('attributes', (table) => {
      table.increments('id').primary();
      table.string('attribute');
      table.string('Image_URL');
      table.integer('wines_id').unsigned();
      table.foreign('wines_id')
        .references('wines.id');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('attributes'),
    knex.schema.dropTable('wines')
  ])
};
