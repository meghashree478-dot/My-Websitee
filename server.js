// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Sample event data stored in memory
let events = [
    {
        id: 1,
        title: "Installation Ceremony",
        avenue: "club-service",
        date: "2026-07-15",
        description: "Official swearing-in of the new board members.",
        volunteers: ["Rohan", "Ananya", "Siddharth"]
    },
    {
        id: 2,
        title: "Blood Donation Drive",
        avenue: "community-service",
        date: "2026-08-10",
        description: "Organized a community blood donation drive collecting 100+ units.",
        volunteers: ["Priya", "Rahul", "Neha"]
    }
];

// GET: Fetch all events or filter by avenue
app.get('/api/events', (req, res) => {
    const { avenue } = req.query;
    if (avenue && avenue !== 'all') {
        const filtered = events.filter(e => e.avenue.toLowerCase() === avenue.toLowerCase());
        return res.json(filtered);
    }
    res.json(events);
});

// POST: Add a new completed event
app.post('/api/events', (req, res) => {
    const { title, avenue, date, description, volunteers } = req.body;
    const newEvent = {
        id: events.length + 1,
        title,
        avenue,
        date,
        description,
        volunteers: Array.isArray(volunteers) ? volunteers : volunteers.split(',').map(v => v.trim())
    };
    events.push(newEvent);
    res.status(201).json({ message: "Event added successfully!", event: newEvent });
});

app.listen(PORT, () => {
    console.log(`Rotaract SAFGC Server running on http://localhost:${PORT}`);
});