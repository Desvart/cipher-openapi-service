import createServer from './infra/server.js';

const port = process.env.PORT || 3000;
const app = createServer();

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});