import { IEncryptionService } from './IEncryptionService.js';
import { ICaesarCipher } from '../domain/ICaesarCipher.js';

export class EncryptionService implements IEncryptionService {
    private cipher: ICaesarCipher;

    constructor(cipher: ICaesarCipher) {
        this.cipher = cipher;
    }

    public encryptShort(text: string, shift: number): string {
        if (text.length > 50) {
            throw new Error('Text too long for short encryption. Use encryptLong for longer strings.');
        }
        return this.cipher.encrypt(text, shift);
    }

    public encryptLong(text: string, shift: number): string {
        return this.cipher.encrypt(text, shift);
    }

    public decryptShort(text: string, shift: number): string {
            if (text.length > 50) {
                throw new Error('Text too long for short decryption. Use decryptLong for longer strings.');
            }
            return this.cipher.decrypt(text, shift);
        }

    public decryptLong(text: string, shift: number): string {
            return this.cipher.decrypt(text, shift);
        }
    }