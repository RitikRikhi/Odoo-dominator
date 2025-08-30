const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  const event = await Event.create({ ...req.body, organizerId: req.user.id });
  res.json(event);
};

exports.getEvents = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};

exports.getEventById = async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.json(event);
};