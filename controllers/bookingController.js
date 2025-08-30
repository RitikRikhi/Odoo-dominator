const Booking = require('../models/Booking');

exports.bookTicket = async (req, res) => {
  const booking = await Booking.create({
    userId: req.user.id,
    eventId: req.params.eventId,
    ...req.body,
    bookingId: 'EVT' + Date.now()
  });
  res.json(booking);
};

exports.getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ userId: req.user.id });
  res.json(bookings);
};