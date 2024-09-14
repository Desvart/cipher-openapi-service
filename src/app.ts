import { CaesarCipher } from './domain/CaesarCipher.js';
import { EncryptionService } from './domain/EncryptionService';
import { ApiServer } from './adapters/api/ApiServer.js';

const port: number = parseInt(process.env.PORT || '3000', 10);

const caesarCipher = new CaesarCipher();
const encryptionService = new EncryptionService(caesarCipher);
const apiServer = new ApiServer(encryptionService);

const app = apiServer.getApp();

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});