
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('attributes').del()
   .then(() => knex('table_name').del())
    .then(() => {
      return Promise.all([
        knex('wines').insert({ id: 1, name: "Darkhorse 2009", "max price": 59.99, "min price": 29.99 })
        .then(wine => {
          return Promise.all([
            knex('attributes').insert({
              id: 1,
              attribute: 'collectible wine',
              'Image URL': 'http://www.google.com',
              wines_id: 1
            })
          ])
        }),

        knex('wines').insert({ id: 2, name: 'Penguin', 'max price': 34.99, 'min price': 15.99})
        .then(wine => {
          return Promise.all([
            knex('attributes').insert({
              id: 2,
              attribute: 'older vintages',
              'Image URL': 'http://wines.com',
              wines_id: 2
            })
          ])
        }),

        knex('wines').insert({ id: 3, name: 'Silhouette', 'max price': 14.99, 'min price': 5.99})
        .then(wine => {
          return Promise.all([
            knex('attributes').insert({
              id: 2,
              attribute: 'boutique wines',
              'Image URL': 'http://wines.com',
              wines_id: 3
            })
          ])
        })

        .then(() => console.log('Seeding Complete'))
        .catch((error) => console.log(`Error seeding data: ${error}`))
      ])
    });
};
