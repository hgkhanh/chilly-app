import express from 'express';
import request from 'supertest';
import weather, { filterByCity } from '../weather';
import fs from 'fs';

let mockData = fs.readFileSync('__mocks__/weather.json').toString();
const app = express();
app.use('/weather', weather);

describe('GET /weather - return forecast temperature', () => {
    it('Should return all temperature data', async () => {
        const res = await request(app).get("/weather");
        expect(res.body).toHaveProperty('data');
        expect(res.body.data.length).toBeGreaterThan(0);
    });
});

describe('testing routes/weather.filterByCity function', () => {
    it('Should return all city when no city param given', async () => {
        const result = filterByCity(mockData);
        expect(result).toEqual({
            "data": JSON.parse(mockData)
        });
    });

    it('Should return data of Berlin', async () => {
        const result = filterByCity(mockData, 'Berlin');
        expect(result).toEqual({
            "data": [
                {
                    "city": "Berlin",
                    "limit": 0,
                    "temperature": {
                        "2021-01-27": [0.84, -0.22, -0.78, 1.07, 2.97, 2.17, 0.24, 1.13],
                        "2021-01-28": [0.92, 3.11, 3.35, 2.82, 2.9, 1.91, 0.82, -0.6],
                        "2021-01-29": [-1.07, -1.29, -1.25, -0.46, 0.86, 0.65, -0.03, -0.38],
                        "2021-01-30": [-0.9, -1.27, -1.98, -1.3, 0.61, 0, -1.77, -2.13],
                        "2021-01-31": [-2.18, -2.91, -3.21, -2.61, -0.51, -0.3, -0.61, -1.88]
                    },
                    "coldWarning": {
                        "2021-01-27": true,
                        "2021-01-28": true,
                        "2021-01-29": true,
                        "2021-01-30": true,
                        "2021-01-31": true
                    }
                }
            ]
        });
    });

    it('Should return an empty array when city is not found', async () => {
        const result = filterByCity(mockData, 'Paris');
        expect(result).toEqual({
            "data": []
        });
    });
});