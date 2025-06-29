import express from 'express';
import { readFile, writeFile } from "fs/promises";
import path from "path";

const membersFile = path.resolve(process.cwd(), "../mock-data/members.json");

const router = express.Router();

// GET /api/locations - return all locations
router.get('/', async (req, res) => {
    try {
        const data = await readFile(membersFile, "utf-8");
        const locations = JSON.parse(data);
        res.json(locations);
    } catch (err) {
        res.status(500).json({ error: "Failed to read locations" });
    }
});

// POST /api/locations - add a new location
router.post('/', async (req, res) => {
    const { name, lat, lon } = req.body;
    if (!name || !lat || !lon) {
        return res.status(400).json({ error: 'missing required fields' });
    }
    try {
        const data = await readFile(membersFile, "utf-8");
        const locations = JSON.parse(data);
        const newLocation = {
            id: locations.length > 0 ? locations[locations.length - 1].id + 1 : 1,
            name,
            lat,
            lon
        };
        locations.push(newLocation);
        await writeFile(membersFile, JSON.stringify(locations, null, 2));
        res.status(201).json(newLocation);
    } catch (err) {
        res.status(500).json({ error: "Failed to add location" });
    }
});


// DELETE /api/locations/:id - remove a locaiton by id
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const data = await readFile(membersFile, "utf-8");
        let locations = JSON.parse(data);
        const index = locations.findIndex(loc => loc.id === id);
        if (index === -1) {
            return res.status(404).json({ error: 'Location not found' });
        }
        const removed = locations.splice(index, 1);
        await writeFile(membersFile, JSON.stringify(locations, null, 2));
        res.json(removed[0]);
    } catch (err) {
        res.status(500).json({ error: "Failed to delete location" });
    }
});

export default router;