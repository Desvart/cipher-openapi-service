// @ts-ignore
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

interface EncryptResponse {
    encryptedText: string;
}

interface EncryptError {
    error: string;
}

const handleEncrypt = async (url: string, data: Record<string, string | number>, method: 'get' | 'post'): Promise<void> => {
    try {
        const response = await axios[method]<EncryptResponse>(url, method === 'get' ? { params: data } : data);
        const resultElement = document.getElementById('result');
        if (resultElement) {
            resultElement.textContent = `Encrypted text: ${response.data.encryptedText}`;
        }
    } catch (error) {
        const resultElement = document.getElementById('result');
        if (resultElement && axios.isAxiosError(error) && (error as axios.AxiosError).response) {
            const errorData = (error as axios.AxiosError).response.data as EncryptError;
            resultElement.textContent = `Error: ${errorData.error}`;
        }
    }
};

document.getElementById('encryptFormGet')?.addEventListener('submit', async (e: Event) => {
    e.preventDefault();
    const text = (document.getElementById('textGet') as HTMLInputElement).value;
    const shift = (document.getElementById('shiftGet') as HTMLInputElement).value;
    await handleEncrypt('/encrypt', { text, shift }, 'get');
});

document.getElementById('encryptFormPost')?.addEventListener('submit', async (e: Event) => {
    e.preventDefault();
    const text = (document.getElementById('textPost') as HTMLTextAreaElement).value;
    const shift = parseInt((document.getElementById('shiftPost') as HTMLInputElement).value, 10);
    await handleEncrypt('/encrypt', { text, shift }, 'post');
});