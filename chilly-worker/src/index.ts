import express from 'express'
const cron = require('node-cron');
const app = express();
const port = 3000;

require('./tasks/weather')(cron);

app.listen(port, () => console.log(`Running on port ${port}`));

