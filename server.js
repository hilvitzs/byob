const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const config = require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

if (!process.env.JWT_SECRET || !process.env.USERNAME || !process.env.PASSWORD) {
  throw 'Make sure you have a JWT_SECRET, USERNAME, and PASSWORD in your .env file'
}

app.set('secretKey', process.env.JWT_SECRET);
app.set('port', process.env.PORT || 3000);

app.post('/authenticate', (request, response) => {
  const user = request.body;

  if (user.username !== process.env.USERNAME || user.password !== process.env.PASSWORD) {
    response.status(403).send({
      success: false,
      message: 'Invalid Credentials'
    });
  } else {
    let token = jwt.sign(user, app.get('secretKey'), {
      expiresIn: 604800
    });

    response.json({
      success: true,
      username: user.username,
      token
    });
  }
});

app.get('/api/v1/wines', (request, response) => {
  database('wines').select()
    .then((wines) => {
      if (wines) {
        response.status(200).json(wines)
      }
      return response.status(404).json({
        error: 'No Wines Found!'
      })
    })
    .catch((error) => {
      response.status(500).json({ error })
    });
});

app.get('/api/v1/attributes', (request, response) => {
  database('attributes').select()
    .then((attributes) => {
      if (attributes) {
        response.status(200).json(attributes)
      }
      return response.status(404).json({
        error: 'No Attributes Found!'
      })
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.get('/api/v1/wines/:id', (request, response) => {
  const { id } = request.params;

  database('wines').where('id', id).select()
    .then(wine => {
      if (wine) {
        response.status(200).json(wine)
      }
      return response.status(404).json({
        error: 'There is no wine with that ID!'
      })
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.get('/api/v1/attributes/:id', (request, response) => {
  const { id } = request.params;

  database('attributes').where('id', id).select()
    .then(attribute => {
      if (attribute) {
        response.status(200).json(attribute)
      }
      return response.status(404).json({
        error: 'There is no wine with that ID!'
      })
    })
})

app.get('/api/v1/wines', (request, response) => {
  const query = request.query;
  const queryKeys = Object.keys(query);

  if (queryKeys.length) {
    database('wines').where(queryKeys[0], req.query[queryKeys[0]]).select()
      .then(resource => {
        response.status(200).json(resource)
      })
  } else {
    response.status(404).json({Error: 'The query that you are looking  for does not exist'})
  }
})

const checkAuth = (request, response, next) => {

  const token = request.body.token ||
  request.param('token') ||
  request.headers['authorization'];

  if (token) {
    jwt.verify(token, app.get('secretKey'), (error, decoded) => {

      if (error) {
        return response.status(403).send({
          success: false,
          message: 'Invalid authorization token.'
        });
      } else {
        request.decoded = decoded;
        next();
      }
    });
  } else {
    return response.status(403).send({
      success: false,
      message: 'You must be authorized to hit this endpoint'
    });
  }
};

app.post('/api/v1/wines', checkAuth, (request, response) => {
  let result = ['name', 'max_price', 'min_price'].every((prop) => {
    return request.body.hasOwnProperty(prop);
  });

  const wine = request.body

  database('wines').insert(wine, 'id')
    .then(wine => {
      if (result) {
        response.status(201).json({ id: wine[0] })
      } else {
        response.status(422).json({ error: 'You are missing a property' })
      }
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.post('/api/v1/attributes', checkAuth, (request, response) => {
  let result = ['attribute', 'Image_URL', 'wines_id'].every((prop) => {
    return request.body.hasOwnProperty(prop);
  });

  const attribute = request.body

  database('attributes').insert(attribute, 'id')
    .then(attribute => {
      if (result) {
        response.status(201).json({ id: attribute[0] })
      } else {
        response.status(422).json({ error: 'You are missing a property' })
      }
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.patch('/api/v1/wines/:id', checkAuth, (request, response) => {
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

app.patch('/api/v1/attributes/:id', checkAuth, (request, response) => {
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
      response.status(204).json({ qty })
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.delete('/api/v1/attributes/:id', (request, response) => {
  const { id } = request.params

  database('attributes').where('id', id).del()
    .then(qty => {
      response.status(204).json({ qty })
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.listen(app.get('port'), () => {
  console.log(`${app.res} is running on ${app.get('port')}.`)
})

module.exports = app;
