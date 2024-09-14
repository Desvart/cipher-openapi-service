import { ICaesarCipher } from './ICaesarCipher.js';

export class CaesarCipher implements ICaesarCipher {
    private validateInput(text: string, shift: number): void {
        if (!Number.isInteger(shift) || shift < 1 || shift > 25) {
            throw new Error('Invalid input');
        }
    }

    private shiftChar(char: string, shift: number, decrypt: boolean = false): string {
        if (char.match(/[a-z]/i)) {
            const code = char.charCodeAt(0);
            const isUpperCase = code >= 65 && code <= 90;
            const base = isUpperCase ? 65 : 97;
            const direction = decrypt ? -1 : 1;
            return String.fromCharCode(((code - base + shift * direction + 26) % 26) + base);
        }
        return char;
    }

    public encrypt(text: string, shift: number): string {
        this.validateInput(text, shift);
        return text.split('').map(char => this.shiftChar(char, shift)).join('');
    }

    public decrypt(text: string, shift: number): string {
        this.validateInput(text, shift);
        return text.split('').map(char => this.shiftChar(char, shift, true)).join('');
    }
}