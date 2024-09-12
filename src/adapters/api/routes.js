const express = require('express');
const { encrypt } = require('../../domain/caesar-cipher');

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

module.exports = router;