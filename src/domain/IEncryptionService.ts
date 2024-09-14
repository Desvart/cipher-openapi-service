export interface IEncryptionService {
    encryptShort(text: string, shift: number): string;
    encryptLong(text: string, shift: number): string;
    decryptShort(text: string, shift: number): string;
    decryptLong(text: string, shift: number): string;
}