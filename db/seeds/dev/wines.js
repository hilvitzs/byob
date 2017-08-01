const wineData = require('../../wine.json')

const createWine = (knex, wine) => {
  return knex('wines').insert({
    name: wine.Name,
    max_price: wine.PriceMax,
    min_price: wine.PriceMin,
  }, 'id')
    .then(wineId => {
      let attributePromises = [];

      wine.ProductAttributes.forEach(attribute => {
        attributePromises.push(
          createAttribute(knex, {
            attribute: attribute.Name,
            Image_URL: attribute.ImageUrl,
            wines_id: wineId[0]
          })
        )
      });

      return Promise.all(attributePromises);
    })
};

const createAttribute = (knex, attribute) => {
  return knex('attributes').insert(attribute);
};

exports.seed = (knex, Promise) => {
  return knex('attributes').del()
    .then(() => knex('wines').del())
    .then(() => {
      let winePromises = [];

      wineData.forEach(wine => {
        winePromises.push(createWine(knex, wine))
      })

      return Promise.all(winePromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
