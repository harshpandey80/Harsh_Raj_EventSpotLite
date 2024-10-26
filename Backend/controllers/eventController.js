// controllers/eventController.js
const Event = require('../models/Event');

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching events' });
    }
};

exports.createEvent = async (req, res) => {
    try {
        const { name, date, location, description, imageUrl } = req.body;
        const event = new Event({ name, date, location, description, imageUrl, createdBy: req.userId });
        await event.save();
        res.status(201).json({ message: 'Event created successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Event creation failed' });
    }
};
