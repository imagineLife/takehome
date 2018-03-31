const chai = require('chai');
const chaiHttp = require('chai-http');
const {app} = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Initial Commit page', function() {
  // note there's no `done` parameter passed to `function()` below
  it('should retirn status 200', function() {
    // since we're returning `chai.request.get.then...`
    // we don't need a `done` call back
    return chai.request(app)
      .get('/')
      .then(function(res) {
        expect(res).to.have.status(200);
      })
  })
})