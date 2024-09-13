import express, { Router, Request, Response } from 'express';
import { encrypt } from '../../domain/caesar-cipher.js';

const router: Router = express.Router();

router.get('/encrypt', (req: Request, res: Response) => {
    const { text, shift } = req.query;

    try {
        if (typeof text !== 'string' || typeof shift !== 'string') {
            throw new Error('Invalid input types');
        }

        if (text.length > 50) {
            throw new Error('Text too long for GET request. Use POST for longer strings.');
        }

        const shiftNum = parseInt(shift, 10);
        const encryptedText = encrypt(text, shiftNum);
        res.json({ encryptedText });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

router.post('/encrypt', (req: Request, res: Response) => {
    const { text, shift } = req.body;

    try {
        if (typeof text !== 'string' || typeof shift !== 'number') {
            throw new Error('Invalid input types');
        }

        const encryptedText = encrypt(text, shift);
        res.json({ encryptedText });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

export default router;