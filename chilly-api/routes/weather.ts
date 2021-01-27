import * as express from 'express';
import fs from 'fs';

const weather = express.Router();
// Where to save weather data
const PATH_TO_DATA = '../data/weather.json';

/**
 * Route return cold warning for a given city.
 * @name get/weather
 * @function 
 * @param req {Object} The request.
 * @param res {Object} The response.
 * @param req.query.city {String} The city name.
 */
weather.get('/', (req, res) => {
    let message;
    try {
        let data = fs.readFileSync(PATH_TO_DATA).toString();
        let city = req.query.city ? `${req.query.city}` : '';

        message = filterByCity(data, city);
    }
    catch (error) {
        if (error instanceof SyntaxError) {
            return res.status(400).json({
                status: 'error',
                message: 'Failed getting data.'
            });
        }
        return res.status(error.getCode()).json({
            status: 'error',
            message: error.message
        });
    }
    return res.status(200).send(message);
});

/**
 * Filter weather data by city
 * @param data {string} Weather data JSON string.
 * @param city {string} The city name.
 * 
 * @return {Object} Object with 'data' property 
 *                  contain an array of all city data
 */
export const filterByCity = (data: string, city: string = '') => {
    let resultArray = JSON.parse(data);
    // Filter by city
    if (city.length > 0) {
        resultArray = resultArray.filter((item: { city: string }) => {
            return item.city.toLowerCase() === city.toLowerCase();
        });
    }

    return {
        data: resultArray
    };
}

export default weather;

