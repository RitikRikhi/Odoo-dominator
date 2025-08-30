const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  eventId: mongoose.Schema.Types.ObjectId,
  ticketType: String,
  quantity: Number,
  paymentStatus: String,
  bookingId: String,
  qrCode: String
});
module.exports = mongoose.model('Booking', bookingSchema);