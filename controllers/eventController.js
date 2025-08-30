const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  try {
    // Basic validation
    if (!req.body.title || !req.body.eventDate || !req.body.eventLocation) {
      return res.status(400).json({ error: 'Title, date, and location are required' });
    }

    const event = await Event.create({ ...req.body, organizerId: req.user.id });
    res.json(event);
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    console.error('Get event by ID error:', error);
    res.status(400).json({ error: 'Invalid event ID' });
  }
};
