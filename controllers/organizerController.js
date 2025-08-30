const Event = require('../models/Event');
const Booking = require('../models/Booking');

// Get events created by the logged-in organizer
exports.getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ organizerId: req.user.id });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching events' });
  }
};

// Get bookings for a specific event by eventId
exports.getEventBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ eventId: req.params.eventId });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching bookings' });
  }
};
