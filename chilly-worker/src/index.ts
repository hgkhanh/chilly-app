import axios from 'axios';
import cron from 'node-cron';
import fs from 'fs';
const API_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=Helsinki&cnt=40&appid=cfc7fa07a0a04b2a02b27d1d8e84d7ef';

cron.schedule('* * * * *', async () => {
    // Query
    console.log('running a task every minute');
    const res = await axios.get(API_URL);
    // console.log(res.data);

    // Process data
    const tempByDay = res.data.list.reduce((result: { [x: string]: any; }, dataPoint: { dt_txt: string; main: { temp: any; }; }) => {
        const day = dataPoint.dt_txt.split(' ')[0];
        // console.log('dataPoint:', dataPoint);
        result[day] = [...result[day] || [], dataPoint.main.temp];
        return result;
    }, {});
    console.log('tempByDay');
    console.log(tempByDay);

    // Save data to file system
    fs.writeFile('../data/weather.json', JSON.stringify(tempByDay), (err) => {
        if (err) {
            return console.log(err);
        }
        console.log('Successfuly write to file data.json');
    })
});
