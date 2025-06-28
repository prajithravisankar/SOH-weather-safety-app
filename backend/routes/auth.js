import express from 'express';

const router = express.Router();

// POST /api/auth/login
router.post('/login', (req, res) => {
    res.json({ userId: 1, message: 'login successful (mock)'});
})

export default router;