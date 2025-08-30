const express = require('express');
const router = express.Router();
const { createEvent, getEvents, getEventById } = require('../controllers/eventController');
const auth = require('../middleware/auth');

router.post('/create', auth, createEvent);
router.get('/', getEvents);
router.get('/:id', getEventById);

module.exports = router;