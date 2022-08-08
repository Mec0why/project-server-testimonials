const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  event: { type: ObjectId, required: true, ref: 'Concert' },
  seat: { type: Number, required: true },
  client: { type: String, required: true },
  email: { type: String, required: true },
});

module.exports = mongoose.model('Seat', seatSchema);
