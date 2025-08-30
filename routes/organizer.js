const express = require('express');
const router = express.Router();
const { getMyEvents, getEventBookings } = require('../controllers/organizerController');
const auth = require('../middleware/auth');

router.get('/events', auth, getMyEvents);
router.get('/bookings/:eventId', auth, getEventBookings);

module.exports = router;