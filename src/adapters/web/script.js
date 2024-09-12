import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

document.getElementById('encryptForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = document.getElementById('text').value;
    const shift = parseInt(document.getElementById('shift').value);

    try {
        const response = await axios.post('/encrypt', { text, shift });
        document.getElementById('result').textContent = `Encrypted text: ${response.data.encryptedText}`;
    } catch (error) {
        document.getElementById('result').textContent = `Error: ${error.response.data.error}`;
    }
});