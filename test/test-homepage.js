const chai = require('chai');
const chaiHttp = require('chai-http');
const {app} = require('../server');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Initial HTML page', function() {
  it('should return 200 status', function() {
    // since we're returning `chai.request.get.then...`
    // we don't need a `done` call back
    return chai.request(app)
      .get('/')
      .then(function(res) {
        expect(res).to.have.status(200);
      })
  })
})