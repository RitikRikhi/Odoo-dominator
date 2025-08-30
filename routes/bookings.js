const express = require('express');
const router = express.Router();
const { bookTicket, getMyBookings } = require('../controllers/bookingController');
const auth = require('../middleware/auth');

router.post('/:eventId', auth, bookTicket);
router.get('/my', auth, getMyBookings);

module.exports = router;