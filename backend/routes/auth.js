import express from 'express';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const router = express.Router();
const usersFile = path.resolve(process.cwd(), "../mock-data/users.json");

// POST /api/auth/register - register new users
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required '});
    }

    try {
        let users = [];
        
        try {
            // read existing users
            const data = await readFile(usersFile, "utf-8");
            users = data.trim() ? JSON.parse(data) : [];
        } catch (fileError) {
            // If file doesn't exist or is empty, start with empty array
            console.log('Users file not found or empty, creating new one');
            users = [];
        }

        // check if username already exists
        const existinguser = users.find(user => user.username === username);
        if (existinguser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // create new user
        const newUser = {
            username, 
            password, 
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        await writeFile(usersFile, JSON.stringify(users, null, 2));

        res.status(201).json({
            message: 'user registered successfully',
            username: newUser.username
        });
    } catch (err) {
        console.error('registration error: ', err);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

// POST /api/auth/login - login user
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        let users = [];
        
        try {
            // read users
            const data = await readFile(usersFile, "utf-8");
            users = data.trim() ? JSON.parse(data) : [];
        } catch (fileError) {
            return res.status(401).json({ error: 'No users found' });
        }

        // find user
        const user = users.find(u => u.username === username && u.password === password);

        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        
        res.json({
            message: 'login successful', 
            username: user.username
        });
    } catch (err) {
        console.error('login error', err);
        res.status(500).json({ error: 'Failed to login' });
    }
});

export default router;