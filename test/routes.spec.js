process.env.NODE_ENV = 'test'

const knex = require('../db/knex');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const config = require('dotenv').config().parsed;

const token = process.env.TOKEN;


chai.use(chaiHttp);

describe('API Routes', () => {
  before(done => {
    knex.migrate.latest()
      .then(() => { return knex.seed.run() })
      .then(() => { done() })
  })


  beforeEach(done => {
    knex.seed.run()
      .then(() => { done() })
  })

  describe('GET /api/v1/wines', () => {
    it('should return a 404 for a route that does not exist', (done) => {
      chai.request(server)
      .get('/sad')
      .end((err, response) => {
        response.should.have.status(404);
        done();
      })
    });

    it('should return all wines', (done) => {
      chai.request(server)
      .get('/api/v1/wines')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(3);
        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(2)
        response.body[0].should.have.property('name');
        response.body[0].name.should.equal('Darkhorse 2009');
        response.body[0].should.have.property('max_price');
        response.body[0].max_price.should.equal('59.99');
        response.body[0].should.have.property('min_price');
        response.body[0].min_price.should.equal('29.99');
        done();
      })
    });

    it('should return all attributes', (done) => {
      chai.request(server)
      .get('/api/v1/attributes')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(3);
        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(1)
        response.body[0].should.have.property('attribute');
        response.body[0].attribute.should.equal('collectible wine')
        response.body[0].should.have.property('Image_URL');
        response.body[0].Image_URL.should.equal('http://www.google.com')
        response.body[0].should.have.property('wines_id');
        response.body[0].wines_id.should.equal(1);
        done();
      })
    });

    it('should get a specific wine from the wines database', (done) => {
      chai.request(server)
      .get('/api/v1/wines/3')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(1);
        response.body[0].should.have.property('name')
        response.body[0].name.should.equal('Silhouette');
        response.body[0].should.have.property('max_price');
        response.body[0].max_price.should.equal('14.99');
        response.body[0].should.have.property('min_price');
        response.body[0].min_price.should.equal('5.99');
        done();
      })
    });

    it('should get a specific attribute from the attributes database', (done) => {
      chai.request(server)
      .get('/api/v1/attributes/3')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(1);
        response.body[0].should.have.property('id')
        response.body[0].id.should.equal(3);
        response.body[0].should.have.property('attribute');
        response.body[0].attribute.should.equal('boutique wines');
        response.body[0].should.have.property('Image_URL');
        response.body[0].Image_URL.should.equal('http://wines.com');
        done();
      })
    });
  });

  describe('POST /api/v1/wines', () => {
    it('should be able to post to the wines database', (done) => {
      chai.request(server)
      .post('/api/v1/wines')
      .set('Authorization', token)
      .send({
        id: 4,
        name: 'Consciousness',
        max_price: 149.99,
        min_price: 129.99,
      })
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('id');
        response.body.id.should.equal(4);
        done();
      })
    });

    it('should not be able to post without all entries', (done) => {
      chai.request(server)
      .post('/api/v1/wines')
      .set('Authorization', token)
      .send({
        id: 4,
        max_price: 149.99,
        min_price: 129.99,
      })
      .end((err, response) => {
        response.should.have.status(422);
        response.body.should.be.a('object');
        response.body.should.have.property('error');
        response.body.error.should.equal('You are missing a property')
        done();
      })
    });

    it('should not be able to post without authorization', (done) => {
      chai.request(server)
      .post('/api/v1/wines')
      .send({
        id: 4,
        name: 'Consciousness',
        max_price: 149.99,
        min_price: 129.99,
      })
      .end((err, response) => {
        response.should.have.status(403);
        response.body.should.be.a('object');
        response.body.should.have.property('success');
        response.body.success.should.equal(false);
        response.body.should.have.property('message');
        response.body.message.should.equal('You must be authorized to hit this endpoint')
        done();
      })
    });

    it('should be able to post to the attributes database', (done) => {
      chai.request(server)
      .post('/api/v1/attributes')
      .set('Authorization', token)
      .send({
        id: 4,
        attribute: 'Consciousness',
        Image_URL: 'http://attributes.com',
        wines_id: 2,
      })
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('id');
        response.body.id.should.equal(4);
        done();
      })
    });

    it('should not be able to post without all entries', (done) => {
      chai.request(server)
      .post('/api/v1/attributes')
      .set('Authorization', token)
      .send({
        id: 4
      })
      .end((err, response) => {
        response.should.have.status(422);
        response.body.should.be.a('object');
        response.body.should.have.property('error');
        response.body.error.should.equal('You are missing a property')
        done();
      })
    })

    it('should not be able to post without authorization', (done) => {
      chai.request(server)
      .post('/api/v1/attributes')
      .send({
        id: 4,
        attribute: 'Consciousness',
        Image_URL: 'http://attributes.com',
        wines_id: 2,
      })
      .end((err, response) => {
        response.should.have.status(403);
        response.body.should.be.a('object');
        response.body.should.have.property('success');
        response.body.success.should.equal(false);
        response.body.should.have.property('message');
        response.body.message.should.equal('You must be authorized to hit this endpoint');
        done();
      })
    });
  });

  describe('PATCH /api/v1/wines/:id', () => {
    it('should change a key in the wine database', (done) => {
      chai.request(server)
      .patch('/api/v1/wines/3')
      .set('Authorization', token)
      .send({
        min_price: 7.99
      })
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('update');
        response.body.update.should.equal(1);
        done();
      })
    })

    it('should not be able to make a patch without authorization', (done) => {
      chai.request(server)
      .patch('/api/v1/wines/3')
      .send({
        min_price: 7.99
      })
      .end((err, response) => {
        response.should.have.status(403);
        response.body.should.be.a('object');
        response.body.should.have.property('success');
        response.body.success.should.equal(false);
        response.body.should.have.property('message');
        response.body.message.should.equal('You must be authorized to hit this endpoint');
        done();
      })
    })

    it('should change a key in the attribute database', (done) => {
      chai.request(server)
      .patch('/api/v1/attributes/2')
      .set('Authorization', token)
      .send({
        attribute: 'newer wines'
      })
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('update');
        response.body.update.should.equal(1);
        done();
      })
    })

    it('should not be able to make a patch without authorization', (done) => {
      chai.request(server)
      .patch('/api/v1/attributes/3')
      .send({
        attribute: 'new'
      })
      .end((err, response) => {
        response.should.have.status(403);
        response.body.should.be.a('object');
        response.body.should.have.property('success');
        response.body.success.should.equal(false);
        response.body.should.have.property('message');
        response.body.message.should.equal('You must be authorized to hit this endpoint');
        done();
      })
    })
  })

  describe('DELETE /api/v1/wines/:id', () => {

    //sad path for delete of main database
    it('should not be able to delete a wine linked to attributes', (done) => {
      chai.request(server)
      .delete('/api/v1/wines/1')
      .end((err, response) => {
        response.should.have.status(500);
        response.body.should.be.a('object');
        done();
      })
    })

    it('should delete a resource from the attributes folder', (done) => {
      chai.request(server)
      .delete('/api/v1/attributes/1')
      .end((err, response) => {
        response.should.have.status(204);
        response.body.should.be.a('object');
        done();
      })
    });
  });
});
