import cron from 'node-cron';
import fs from 'fs';
import * as weather from './tasks/weather';
import config from './config';

/**
 * Query weather from external API
 * Save data to file
 * Run on schedule defined in config
 */
const FILE_PATH = '../data/weather.json';
cron.schedule(config.cronSchedule, async () => {
    // Query and process data
    const weatherData = await weather.query();
    // Save data to file system
    fs.writeFile(FILE_PATH, JSON.stringify(weatherData), (err) => {
        if (err) {
            return console.log(err);
        }
        console.log(`Successfuly write to file ${FILE_PATH}`);
    })
});

