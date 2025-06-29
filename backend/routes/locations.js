import { error } from 'console';
import express from 'express';
import { readFile, writeFile } from 'fs/promises';
import path from "path";

const router = express.Router();

// helper function to get user's location file path
const getUserLocationFile = (username) => {
    return path.resolve(process.cwd(), `../mock-data/${username}-locations.json`);
};

// helper function to read user's locations
const readUserLocations = async (username) => {
    try {
        const filePath = getUserLocationFile(username);
        const data = await readFile(filePath, "utf-8");
        return data.trim() ? JSON.parse(data) : [];
    } catch (error) {
        return [];
    }
};

// helper function to write user's locations
const writeUserLocations = async (username, locations) => {
    const filePath = getUserLocationFile(username);
    await writeFile(filePath, JSON.stringify(locations, null, 2));
};

// GET /api/locations - return user's locations
router.get('/', async (req, res) => {
    const { username } = req.query;

    if (!username) {
        return res.status(400).json({ error: "username is required" });
    }

    try {
        const locations = await readUserLocations(username);
        res.json(locations);
    } catch (err) {
        console.error('error reading locations: ', err);
        res.status(500).json({ error: 'Failed to read locations' });
    }
});

// POST /api/locations - add a new location for user
router.post('/', async (req, res) => {
    const { 
        name, 
        lat, 
        lon, 
        username, 
        memberName, 
        placeType, 
        address, 
        phone, 
        emoji 
    } = req.body;

    if (!name || !lat || !lon || !username || !memberName || !placeType) {
        return res.status(400).json({ 
            error: 'Name, lat, lon, username, member name, and place type are required' 
        });
    }

    try {
        const locations = await readUserLocations(username);

        const newLocation = {
            id: locations.length > 0 ? Math.max(...locations.map(l => l.id)) + 1 : 1, 
            name, 
            lat: parseFloat(lat), 
            lon: parseFloat(lon),
            memberName,
            placeType,
            address: address || '',
            phone: phone || '',
            emoji: emoji || '📍',
            createdAt: new Date().toISOString()
        };

        locations.push(newLocation);
        await writeUserLocations(username, locations);
        res.status(201).json(newLocation);

    } catch (err) {
        console.error('Error adding location: ', err);
        res.status(500).json({ error: "failed to add location" });
    }
});

// DELETE /api/locations/:id - remove a location by id for user
router.delete('/:id', async (req, res) => {
    const { username } = req.query;
    const id = parseInt(req.params.id, 10);

    if (!username) {
        return req.status(400).json({ error: "username is required" });
    }

    try {
        const locations = await readUserLocations(username);
        const index = location.findIndex(loc => loc.id === id);

        if (index === -1) {
            return res.status(404).json({ error: 'location not found' });
        }

        const removed = locations.splice(index, 1);
        await writeUserLocations(username, locations);
        res.json(removed[0]);

    } catch (err) {
        console.error('Error deleting location: ', err);
        res.status(500).json({ error: "failed to delete location" });
    }
});

export default router;