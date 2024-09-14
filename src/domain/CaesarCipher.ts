import { ICaesarCipher } from './ICaesarCipher.js';

export class CaesarCipher implements ICaesarCipher {
    public encrypt(text: string, shift: number): string {
        if (!Number.isInteger(shift) || shift < 1 || shift > 25) {
            throw new Error('Invalid input');
        }

        return text
            .split('')
            .map(char => {
                if (char.match(/[a-z]/i)) {
                    const code = char.charCodeAt(0);
                    const isUpperCase = code >= 65 && code <= 90;
                    const base = isUpperCase ? 65 : 97;
                    return String.fromCharCode((code - base + shift) % 26 + base);
                }
                return char;
            })
            .join('');
    }
}