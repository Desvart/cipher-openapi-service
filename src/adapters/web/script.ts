// @ts-ignore
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

interface EncryptResponse {
    encryptedText: string;
}

interface DecryptResponse {
    decryptedText: string;
}

interface EncryptError {
    error: string;
}

interface DecryptError {
    error: string;
}

const handleEncrypt = async (url: string, data: Record<string, string | number>, method: 'get' | 'post'): Promise<void> => {
    try {
        const response = await axios[method]<EncryptResponse>(url, method === 'get' ? { params: data } : data);
        const resultElement = document.getElementById('encryptionResult');
        if (resultElement) {
            resultElement.textContent = `Encrypted text: ${response.data.encryptedText}`;
        }
    } catch (error) {
        const resultElement = document.getElementById('encryptionResult');
        if (resultElement && axios.isAxiosError(error) && (error as axios.AxiosError).response) {
            const errorData = (error as axios.AxiosError).response.data as EncryptError;
            resultElement.textContent = `Error: ${errorData.error}`;
        }
    }
};

document.getElementById('encryptFormGet')?.addEventListener('submit', async (e: Event) => {
    e.preventDefault();
    const text = (document.getElementById('encryptTextGet') as HTMLInputElement).value;
    const shift = (document.getElementById('encryptShiftGet') as HTMLInputElement).value;
    await handleEncrypt('/encrypt', { text, shift }, 'get');
});

document.getElementById('encryptFormPost')?.addEventListener('submit', async (e: Event) => {
    e.preventDefault();
    const text = (document.getElementById('encryptTextPost') as HTMLTextAreaElement).value;
    const shift = parseInt((document.getElementById('encryptShiftPost') as HTMLInputElement).value, 10);
    await handleEncrypt('/encrypt', { text, shift }, 'post');
});


const handleDecrypt = async (url: string, data: Record<string, string | number>, method: 'get' | 'post'): Promise<void> => {
    try {
        const response = await axios[method]<DecryptResponse>(url, method === 'get' ? { params: data } : data);
        const resultElement = document.getElementById('decryptionResult');
        if (resultElement) {
            resultElement.textContent = `Decrypted text: ${response.data.decryptedText}`;
        }
    } catch (error) {
        const resultElement = document.getElementById('decryptionResult');
        if (resultElement && axios.isAxiosError(error) && (error as axios.AxiosError).response) {
            const errorData = (error as axios.AxiosError).response.data as DecryptError;
            resultElement.textContent = `Error: ${errorData.error}`;
        }
    }
};

document.getElementById('decryptFormGet')?.addEventListener('submit', async (e: Event) => {
    e.preventDefault();
    const text = (document.getElementById('decryptTextGet') as HTMLInputElement).value;
    const shift = (document.getElementById('decryptShiftGet') as HTMLInputElement).value;
    await handleDecrypt('/decrypt', { text, shift }, 'get');
});

document.getElementById('decryptFormPost')?.addEventListener('submit', async (e: Event) => {
    e.preventDefault();
    const text = (document.getElementById('decryptTextPost') as HTMLTextAreaElement).value;
    const shift = parseInt((document.getElementById('decryptShiftPost') as HTMLInputElement).value, 10);
    await handleDecrypt('/decrypt', { text, shift }, 'post');
});