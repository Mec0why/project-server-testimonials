const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('DELETE /api/concerts', () => {
  before(async () => {
    const testConOne = new Concert({
      _id: '5d9f1140f10a81216cfd4408',
      performer: 'John Doe',
      genre: 'Rock',
      price: 25,
      day: 1,
      image: '/img/uploads/1fsd324fsdg.jpg',
    });
    await testConOne.save();
  });
  it('/:id should remove chosen document and return success', async () => {
    const res = await request(server).delete(
      '/api/concerts/5d9f1140f10a81216cfd4408'
    );
    expect(res.status).to.be.equal(200);
    expect(res.body.performer).to.be.equal('John Doe');
  });
  after(async () => {
    await Concert.deleteMany();
  });
});
