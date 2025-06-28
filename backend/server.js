import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import locationsRoutes from './routes/locations.js';
import disasterRoutes from './routes/disasters.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors()); // helps front end talk to backend if both are in different ports
app.use(express.json());

// register auth routes
app.use('/api/auth', authRoutes);

// register locations routes
app.use('/api/locations', locationsRoutes);

// register disaster routes
app.use('/api/disasters', disasterRoutes);

app.get('/', (req, res) => {
    res.send('Server running!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});