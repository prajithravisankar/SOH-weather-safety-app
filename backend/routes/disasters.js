import express from 'express';    
import path from 'path';
import { readFile } from 'fs/promises';

const router = express.Router();

// GET /api/disasters - fallback to mock data if real API fails
router.get('/', async (req, res) => {
    try {
        console.log('Fetching disaster data from NASA EONET API...');
        const response = await fetch('https://eonet.gsfc.nasa.gov/api/v3/events?limit=50&days=30');
        if (!response.ok) {
            throw new Error(`EONET API reponded with status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Successfully fetched data from EONET API');
        res.json(data);
    } catch (error) {
        try {
            const filePath = path.resolve(process.cwd(), '../mock-data/disasters.json');
            const data = await readFile(filePath, 'utf-8');
            const mockData = JSON.parse(data);
            console.log('Successfully loaded mock disaster data');
            res.json(mockData);
        } catch (err) {
            console.error('Failed to load mock data:', err.message);
            res.status(500).json({error: 'Failed to load disaster data'});
        }
    }
});

export default router;