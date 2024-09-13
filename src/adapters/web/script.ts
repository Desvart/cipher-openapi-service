// @ts-ignore
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

interface EncryptResponse {
    encryptedText: string;
}

document.getElementById('encryptFormGet')?.addEventListener('submit', async (e: Event) => {
    e.preventDefault();
    const textElement = document.getElementById('textGet') as HTMLInputElement;
    const shiftElement = document.getElementById('shiftGet') as HTMLInputElement;
    const text = textElement.value;
    const shift = parseInt(shiftElement.value);

    try {
        const response = await axios.get<EncryptResponse>('/encrypt', { params: { text, shift } });
        const resultElement = document.getElementById('result');
        if (resultElement)  {
            resultElement.textContent = `Encrypted text: ${response.data.encryptedText}`;
        }
    } catch (error) {
        const resultElement = document.getElementById('result');
        if (resultElement && axios.isAxiosError(error) && (error as axios.AxiosError).response) {
            resultElement.textContent = `Error: ${(error as axios.AxiosError).response?.data.error}`;
        }
    }
});

document.getElementById('encryptFormPost')?.addEventListener('submit', async (e: Event) => {
    e.preventDefault();
    const textElement = document.getElementById('textPost') as HTMLTextAreaElement;
    const shiftElement = document.getElementById('shiftPost') as HTMLInputElement;
    const text = textElement.value;
    const shift = parseInt(shiftElement.value, 10);

    try {
        const response = await axios.post<EncryptResponse>('/encrypt', { text, shift });
        const resultElement = document.getElementById('result');
        if (resultElement) {
            resultElement.textContent = `Encrypted text: ${response.data.encryptedText}`;
        }
    } catch (error) {
        const resultElement = document.getElementById('result');
        if (resultElement && axios.isAxiosError(error) && (error as axios.AxiosError).response) {
            resultElement.textContent = `Error: ${(error as axios.AxiosError).response?.data.error}`;
        }
    }
});