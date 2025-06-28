import express from 'express';

const router = express.Router();

// mock data for locations for MVP
let locations = [
    { id: 1, name: 'Home', lat: 37.7749, lon: -122.4194 }
];

// GET /api/locations - return all locations
router.get('/', (req, res) => {
    res.json(locations);
})

// POST /api/locations - add a new location
router.post('/', (req, res) => {
    const { name, lat, lon } = req.body;
    if (!name || !lat || !lon) {
        return res.status(400).json({ error: 'missing required fields' });
    }

    const newLocation = {
        id : locations.length + 1, 
        name, 
        lat, 
        lon
    };
    locations.push(newLocation);
    res.status(201).json(newLocation);
});


// DELETE /api/locations/:id - remove a locaiton by id
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = locations.findIndex(loc => loc.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Location not found' });
    }
    const removed = locations.splice(index, 1);
    res.json(removed[0]);
});

export default router;