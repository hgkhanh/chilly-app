import cron from 'node-cron';
import fs from 'fs';
import * as weather from './tasks/weather';
import config from './config';

cron.schedule(config.cronSchedule, async () => {
    // Query and process data
    const weatherData = await weather.query();
    // output tempByDay
    // [
    //     {
    //         name: 'Helsinki',
    //         cold: {
    //             date1: true
    //             date2: false
    //         }
    //     },...
    // ]
    // Save data to file system
    fs.writeFile('../data/weather.json', JSON.stringify(weatherData), (err) => {
        if (err) {
            return console.log(err);
        }
        console.log('Successfuly write to file weather.json');
    })
});

