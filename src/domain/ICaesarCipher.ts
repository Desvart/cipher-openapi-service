export interface ICaesarCipher {
    encrypt(text: string, shift: number): string;
}