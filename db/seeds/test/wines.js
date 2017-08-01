exports.seed = function(knex, Promise) {
  return knex('attributes').del()
    .then(() => knex('wines').del())
    .then(() => {
      return Promise.all([
        knex('wines').insert({ id: 1, name: 'Darkhorse 2009', max_price: 59.99, min_price: 29.99 })
          .then(wine => {
            return Promise.all([
              knex('attributes').insert({
                id: 1,
                attribute: 'collectible wine',
                Image_URL: 'http://www.google.com',
                wines_id: 1
              })
            ])
          }),

        knex('wines').insert({ id: 2, name: 'Penguin', max_price: 34.99, min_price: 15.99})
          .then(wine => {
            return Promise.all([
              knex('attributes').insert({
                id: 2,
                attribute: 'older vintages',
                Image_URL: 'http://wines.com',
                wines_id: 2
              })
            ])
          }),

        knex('wines').insert({ id: 3, name: 'Silhouette', max_price: 14.99, min_price: 5.99})
          .then(wine => {
            return Promise.all([
              knex('attributes').insert({
                id: 3,
                attribute: 'boutique wines',
                Image_URL: 'http://wines.com',
                wines_id: 3
              })
            ])
          })
          .then(() => console.log('Seeding Complete'))
          .catch((error) => console.log(`Error seeding data: ${error}`))
      ])
    });
};
