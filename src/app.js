const { createServer } = require('./infra/server');

const port = process.env.PORT || 3000;
const app = createServer();

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});