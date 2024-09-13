import { Express } from 'express';
import createServer from './infra/server.js';

const port: number = parseInt(process.env.PORT || '3000', 10);
const app: Express = createServer();

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});