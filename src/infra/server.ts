import express, { Express } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from '../adapters/api/routes.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function createServer(): Express {
    const app: Express = express();

    app.use(express.json());
    app.use(express.static(path.join(__dirname, '../adapters/web')));

    app.use('/', apiRoutes);

    return app;
}