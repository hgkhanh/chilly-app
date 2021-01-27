import express from 'express';
import weather from './routes/weather';

const app = express();
const port = 5000;

/**
 * The app implement one route
 * GET /weather
 * Which return cold warning for a given city
 */
app.use('/weather', weather);

app.listen(port, () => console.log(`Running on port ${port}`));
