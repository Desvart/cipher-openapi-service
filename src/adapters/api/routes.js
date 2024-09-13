import express from 'express';
import { encrypt } from '../../domain/caesar-cipher.js';

const router = express.Router();

router.get('/encrypt', (req, res) => {
    const { text, shift } = req.query;

    try {
        if (text.length > 50) {
            throw new Error('Text too long for GET request. Use POST for longer strings.');
        }
        const shiftNum = parseInt(shift, 10);
        const encryptedText = encrypt(text, shiftNum);
        res.json({ encryptedText });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/encrypt', (req, res) => {
    const { text, shift } = req.body;

    try {
        const encryptedText = encrypt(text, shift);
        res.json({ encryptedText });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;