const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Import your Express app instance
const expect = chai.expect;

chai.use(chaiHttp);

describe('API Tests', () => {
  it('should return news articles based on query parameters', async () => {
    const response = await chai
      .request(app)
      .get('/news/search')
      .query({ q: 'Apple' });

    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
    expect(response.body.articles).to.be.an('array');
    // Add more specific assertions based on your API response
  });

  it('should return a 400 Bad Request error for missing query parameters', async () => {
    const response = await chai
      .request(app)
      .get('/news/search');

    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body.errors).to.be.an('array');
    // Add more specific assertions for the error response
  });

  it('should return cached response for the same query', async () => {
    const firstResponse = await chai
      .request(app)
      .get('/news/search')
      .query({ q: 'Apple' });

    const secondResponse = await chai
      .request(app)
      .get('/news/search')
      .query({ q: 'Apple' });

    expect(firstResponse).to.have.status(200);
    expect(secondResponse).to.have.status(200);
    // Ensure that the second response is the same as the first (cached) response
    expect(secondResponse.body).to.deep.equal(firstResponse.body);
  });

  it('should return a 500 Internal Server error for unknown endpoint', async () => {
    const response = await chai
      .request(app)
      .get('/news/unknownEndpoint')
      .query({ q: 'Apple' });

    expect(response).to.have.status(500);
    // Add more specific assertions for the error response
  });
});
