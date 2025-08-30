const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  time: String,
  location: String,
  category: String,
  organizerId: mongoose.Schema.Types.ObjectId,
  tickets: [{
    type: String,
    price: Number,
    quantity: Number,
    saleStart: Date,
    saleEnd: Date
  }]
});
module.exports = mongoose.model('Event', eventSchema);