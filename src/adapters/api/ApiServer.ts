import express, { Express, Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { IEncryptionService } from '../../domain/IEncryptionService';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class ApiServer {
    private readonly app: Express;
    private encryptionService: IEncryptionService;

    constructor(encryptionService: IEncryptionService) {
        this.app = express();
        this.encryptionService = encryptionService;
        this.configureMiddleware();
        this.configureRoutes();
    }

    private configureMiddleware(): void {
        this.app.use(express.json());
        this.app.use(express.static(path.join(__dirname, '../web')));
    }

    private configureRoutes(): void {
        this.app.get('/encrypt', this.handleGetEncrypt.bind(this));
        this.app.post('/encrypt', this.handlePostEncrypt.bind(this));

        this.app.get('/decrypt', this.handleGetDecrypt.bind(this));
        this.app.post('/decrypt', this.handlePostDecrypt.bind(this));
    }

    private handleGetEncrypt(req: Request, res: Response): void {
        const { text, shift } = req.query;

        try {
            if (typeof text !== 'string' || typeof shift !== 'string') {
                throw new Error('Invalid input types');
            }
            const shiftNum = parseInt(shift, 10);
            const encryptedText = this.encryptionService.encryptShort(text, shiftNum);
            res.json({ encryptedText });
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    private handlePostEncrypt(req: Request, res: Response): void {
        const { text, shift } = req.body;

        try {
            if (typeof text !== 'string' || typeof shift !== 'number') {
                throw new Error('Invalid input types');
            }
            const encryptedText = this.encryptionService.encryptLong(text, shift);
            res.json({ encryptedText });
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    private handleGetDecrypt(req: Request, res: Response): void {
        const { text, shift } = req.query;

        try {
            if (typeof text !== 'string' || typeof shift !== 'string') {
                throw new Error('Invalid input types');
            }
            const shiftNum = parseInt(shift, 10);
            const decryptedText = this.encryptionService.decryptShort(text, shiftNum);
            res.json({ decryptedText });
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    private handlePostDecrypt(req: Request, res: Response): void {
        const { text, shift } = req.body;

        try {
            if (typeof text !== 'string' || typeof shift !== 'number') {
                throw new Error('Invalid input types');
            }
            const decryptedText = this.encryptionService.decryptLong(text, shift);
            res.json({ decryptedText });
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    public getApp(): Express {
        return this.app;
    }
}