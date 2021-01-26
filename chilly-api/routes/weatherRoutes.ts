import * as express from 'express';
import fs from 'fs';

// Where to save weather data
const PATH_TO_DATA = '../data/weather.json';

export const register = (app: express.Application) => {
    /**
     * Route return cold warning for a given city.
     * @name get/weather
     * @function 
     * @param req {Object} The request.
     * @param res {Object} The response.
     * @param req.query.city {String} The city name.
     */
    app.get('/weather', (req, res) => {
        let message;
        try {
            let data = fs.readFileSync(PATH_TO_DATA);
            let resultArray = JSON.parse(data.toString());

            // Filter by city
            let city = req.query.city;
            if (city) {
                resultArray = resultArray.filter((item: { city: { name: string } }) => {
                    return item.city === city;
                });
            }

            message = {
                data: resultArray
            };
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
};

