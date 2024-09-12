import express from 'express';
import { encrypt } from '../../domain/caesar-cipher.js';

const router = express.Router();

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