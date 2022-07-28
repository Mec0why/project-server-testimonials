const mongoose = require('mongoose');

const concertSchema = new mongoose.Schema({
  performer: { type: String, required: true },
  genre: { type: String, required: true },
  price: { type: Number, required: true },
  day: { type: Number, required: true, ref: 'Day' },
  image: { type: String, required: true },
});

module.exports = mongoose.model('Concert', concertSchema);
