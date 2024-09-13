import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

document.getElementById('encryptFormGet').addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = document.getElementById('textGet').value;
    const shift = document.getElementById('shiftGet').value;

    try {
        const response = await axios.get('/encrypt', { params: { text, shift } });
        document.getElementById('result').textContent = `Encrypted text: ${response.data.encryptedText}`;
    } catch (error) {
        document.getElementById('result').textContent = `Error: ${error.response.data.error}`;
    }
});

document.getElementById('encryptFormPost').addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = document.getElementById('textPost').value;
    const shift = parseInt(document.getElementById('shiftPost').value);

    try {
        const response = await axios.post('/encrypt', { text, shift });
        document.getElementById('result').textContent = `Encrypted text: ${response.data.encryptedText}`;
    } catch (error) {
        document.getElementById('result').textContent = `Error: ${error.response.data.error}`;
    }
});