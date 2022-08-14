const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
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

    const testConTwo = new Concert({
      _id: '5d9f1159f81ce8d1ef2bee48',
      performer: 'Rebekah Parker',
      genre: 'R&B',
      price: 25,
      day: 2,
      image: '/img/uploads/2f342s4fsdg.jpg',
    });
    await testConTwo.save();
  });

  it('/ should return all concerts', async () => {
    const res = await request(server).get('/api/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });

  it('/:id should return one concert by :id ', async () => {
    const res = await request(server).get(
      '/api/concerts/5d9f1159f81ce8d1ef2bee48'
    );
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.to.be.null;
  });
  after(async () => {
    await Concert.deleteMany();
  });
});
