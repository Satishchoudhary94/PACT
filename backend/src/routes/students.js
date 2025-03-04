const express = require('express');
const router = express.Router();

// Get all students
router.get('/', (req, res) => {
    res.json({ message: 'Get all students' });
});

// Get single student
router.get('/:id', (req, res) => {
    res.json({ message: `Get student ${req.params.id}` });
});

// Create student
router.post('/', (req, res) => {
    res.json({ message: 'Create student' });
});

// Update student
router.put('/:id', (req, res) => {
    res.json({ message: `Update student ${req.params.id}` });
});

// Delete student
router.delete('/:id', (req, res) => {
    res.json({ message: `Delete student ${req.params.id}` });
});

module.exports = router; 