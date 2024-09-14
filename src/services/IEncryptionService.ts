export interface IEncryptionService {
    encryptShort(text: string, shift: number): string;
    encryptLong(text: string, shift: number): string;
}