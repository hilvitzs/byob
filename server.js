const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const bodyParser = require('body-parser');
const express = require('express');
const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000)

app.get('/api/v1/wines', (request, response) => {
  database('wines').select()
    .then((wines) => {
      response.status(200).json(wines)
    })
    .catch((error) => {
      response.status(500).json({ error })
    });
});

app.get('/api/v1/attributes', (request, response) => {
  database('attributes').select()
    .then((attributes) => {
      response.status(200).json(attributes)
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.get('/api/v1/wines/:id', (request, response) => {
  const { id } = request.params;

  database('wines').where('id', id).select()
    .then(wine => {
      response.status(200).json(wine)
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.get('/api/v1/attributes/:id', (request, response) => {
  const { id } = request.params;

  database('attributes').where('id', id).select()
    .then(attribute => {
      response.status(200).json(attribute)
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.post('/api/v1/wines', (request, response) => {
  const wine = request.body

  database('wines').insert(wine, 'id')
    .then(wine => {
      response.status(201).json({ id: wine[0] })
    })
})

app.post('/api/v1/attributes', (request, response) => {
  const attribute = request.body

  database('attributes').insert(attribute, 'id')
    .then(attribute => {
      response.status(201).json({ id: attribute[0] })
    })
})

app.patch('/api/v1/wines/:id', (request, response) => {
  const { id } = request.params
  const update = request.body

  database('wines').where('id', id).update(update)
    .then(update => {
      response.status(200).json({ update })
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.patch('/api/v1/attributes/:id', (request, response) => {
  const { id } = request.params
  const update = request.body

  database('attributes').where('id', id).update(update)
    .then(update => {
      response.status(200).json({ update })
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.delete('/api/v1/wines/:id', (request, response) => {
  const { id } = request.params

  database('wines').where('id', id).del()
    .then(qty => {
      response.status(200).json({ qty })
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.delete('/api/v1/attributes/:id', (request, response) => {
  const { id } = request.params

  database('attributes').where('id', id).del()
    .then(qty => {
      response.status(200).json({ qty })
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.listen(app.get('port'), () => {
  console.log(`${app.res} is running on ${app.get('port')}.`)
})
