const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
  day: { type: Number, required: true },
});

module.exports = mongoose.model('Day', daySchema);
