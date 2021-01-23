import axios from 'axios';
const API_URL = 'http://api.openweathermap.org/data/2.5/forecast?q=Helsinki&appid=cfc7fa07a0a04b2a02b27d1d8e84d7ef';

module.exports = cron => {
    // Schedule tasks to be run on the server.
    // Every hour
    cron.schedule('* * * * *', async () => {
        console.log('running a task every minute');
        const res = await axios.get(API_URL);
    });
}