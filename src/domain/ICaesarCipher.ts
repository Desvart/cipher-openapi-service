export interface ICaesarCipher {
    encrypt(text: string, shift: number): string;
    decrypt(text: string, shift: number): string;
}