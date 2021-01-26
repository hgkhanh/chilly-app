import axios from 'axios';
import config from '../config';

/**
 * @typedef {Object} City
 * @property {string} name - The city name
 * @property {number} limit - The temperature limit
 * @property {Object} temperature - Temperature in the next five days
 * @property {Object} coldWarning - Cold warning in the next five days
 *                                  true if temperature of that day lower 
 *                                  than limit, otherwise false.
 */

/**
 * Read a list of city names from config, query temperature for the next five days
 * Check if temperature limit (from config) exceeded in any city
 * @returns {City[]} 
 *          All cities temperature data with day warning if limit exceed
 */
export const query = async () => {
    // Get the list of city names
    let result = [];
    for await (let { name, limit } of config.cities) {
        let queryURL = `${config.apiURL}&q=${name}`;
        console.log(queryURL);
        try {
            let response = await axios.get(queryURL);
            // Process data
            // API return temp in 3-hour-period, we group them by day
            let tempByDay = response.data.list.reduce((tempArray: { [x: string]: any; }, dataPoint: { dt_txt: string; main: { temp: any; }; }) => {
                const day = dataPoint.dt_txt.split(' ')[0];
                tempArray[day] = [...tempArray[day] || [], dataPoint.main.temp];
                return tempArray;
            }, {});
            console.log(tempByDay);

            // Loop through the tempByDay object, check if any day has temp lower than limit
            let coldWarningByDay: { [date: string]: boolean; } = {};
            console.log('process coldWarningByDay');
            Object.keys(tempByDay).forEach((date: string) => {
                console.log(date);
                console.log(tempByDay[date]);
                const isCold = tempByDay[date].some((temp: number) => {
                    return temp < limit
                });

                console.log(isCold);

                coldWarningByDay[date] = isCold;

                console.log('current value');
                console.log(coldWarningByDay);
            });
            // Return result
            result.push({
                city: name,
                limit: limit,
                temperature: tempByDay,
                coldWarning: coldWarningByDay
            })
        } catch (err) {
            console.log(err)
        }
    };
    console.log(result);
    return result;
};
