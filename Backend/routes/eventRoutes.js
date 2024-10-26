// routes/eventRoutes.js
const express = require('express');
const { getAllEvents, createEvent } = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getAllEvents);
router.post('/', protect, createEvent);

module.exports = router;
