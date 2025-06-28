import express from 'express';    
import { readFile } from 'fs/promises';

const router = express.Router();

const apiKey = process.env.AMBEE_API_KEY;
console.log('AMBEE API Key: ', apiKey);

// GET /api/disasters - fallback to mock data if real API fails
router.get('/', async (req, res) => {
    try {
        // TODO: fetch real API data
        // if successful, return real data
        throw new Error('Simulating API failure');
    } catch (error) {
        try {
            const data = await readFile('./mock-data/disasters.json', 'utf-8');
            res.json(JSON.parse(data));
        } catch (err) {
            res.status(500).json({error: 'Failed to load disaster data'});
        }
    }
});

export default router;