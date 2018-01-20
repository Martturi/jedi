/* eslint import/no-extraneous-dependencies: [0, {“devDependencies”: false}] */

// During the test the env variable is set to test
process.env.NODE_ENV = 'test'


// Require the dev-dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const db = require('../db')

chai.should()
chai.use(chaiHttp)

/* global before after */
// Our parent block
describe('Save and load tests', () => {
  before(() => { // Before each test we empty the database
    console.log('Clearing the database for you!')
    db.clear()
  })
  after(() => {
    console.log('Cleaning your messes up!')
    db.clear()
  })
  /*
  * Test the /GET route
  */
  describe('Get first CV', () => {
    const testText = 'Testing rest-api'
    it('it should answer with 200', () => {
      return chai.request(server)
        .get('/api/1')
        .then((res) => {
          res.should.have.status(200)
        })
    })

    it('it should save a sample CV', () => {
      return chai.request(server)
        .post('/api/test2')
        .send({ text: testText })
        .then((res) => {
          res.should.have.status(200) // Server currently always returns 200
          res.text.should.be.eql('Save succeeded.')
        })
    })

    it('it should load the recently saved CV', () => {
      return chai.request(server)
        .post('/api/test')
        .send({ text: testText })
        .then(() => {
          return chai.request(server)
            .get('/api/test')
            .then((res) => {
              res.should.have.status(200)
              res.text.should.be.eql(testText)
            })
        })
    })
  })
})