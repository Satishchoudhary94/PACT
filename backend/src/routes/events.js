const express = require('express');
const router = express.Router();

// Get all events
router.get('/', (req, res) => {
    res.json({ message: 'Get all events' });
});

// Get single event
router.get('/:id', (req, res) => {
    res.json({ message: `Get event ${req.params.id}` });
});

// Create event
router.post('/', (req, res) => {
    res.json({ message: 'Create event' });
});

// Update event
router.put('/:id', (req, res) => {
    res.json({ message: `Update event ${req.params.id}` });
});

// Delete event
router.delete('/:id', (req, res) => {
    res.json({ message: `Delete event ${req.params.id}` });
});

module.exports = router; 