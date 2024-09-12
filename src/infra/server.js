import express from 'express';
import path from 'path';
import apiRoutes from '../adapters/api/routes.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function createServer() {
    const app = express();

    app.use(express.json());
    app.use(express.static(path.join(__dirname, '../adapters/web')));

    app.use('/', apiRoutes);

    return app;
}