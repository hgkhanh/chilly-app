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
    for (let { name, limit } of config.cities) {
        let queryURL = `${config.apiURL}&q=${name}`;
        try {
            let response = await axios.get(queryURL);
            // Process City data
            let cityData = processCityData(response.data.list, name, limit);
            // Return result
            result.push(cityData);
        } catch (err) {
            console.log(err);
            return [];
        }
    };
    return result;
};

/**
 * Group temperature data by day
 * Check if lower temperature limit is exceeded in any day.
 * @param data {string} city temperature data by 3 hour interval.
 * @param city {string} The city name.
 * @param limit {number} The lower temp limit.
 * 
 * @return {Object} Object with temperature groupped by day
 *                  and cold-warning day.
 */
export const processCityData = (data: any[], cityName: string, limit: number) => {
    // API return temp in 3-hour-period, we group them by day
    let tempByDay = data.reduce((tempArray: { [x: string]: any; }, dataPoint: { dt_txt: string; main: { temp: any; }; }) => {
        const day = dataPoint.dt_txt.split(' ')[0];
        tempArray[day] = [...tempArray[day] || [], dataPoint.main.temp];
        return tempArray;
    }, {});

    // Loop through the tempByDay object, check if any day has temp lower than limit
    let coldWarningByDay: { [date: string]: boolean; } = {};
    Object.keys(tempByDay).forEach((date: string) => {
        const isCold = tempByDay[date].some((temp: number) => {
            return temp < limit
        });

        coldWarningByDay[date] = isCold;

    });
    return {
        city: cityName,
        limit: limit,
        temperature: tempByDay,
        coldWarning: coldWarningByDay
    }
}