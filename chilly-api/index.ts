import express from 'express';
import * as weather from './routes/weatherRoutes';

const app = express();
const port = 5000;

/**
 * The app implement one route
 * GET /weather
 * Which return cold warning for a given city
 */
weather.register(app);

app.listen(port, () => console.log(`Running on port ${port}`))