import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors()); // helps front end talk to backend if both are in different ports
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server running!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});