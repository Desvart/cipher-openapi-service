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
}