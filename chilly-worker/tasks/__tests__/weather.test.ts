import { processCityData } from '../weather';
import fs from 'fs';

let mockApiResp = fs.readFileSync('__mocks__/response.json').toString();
let mockData = JSON.parse(mockApiResp);

describe('testing weather task - processCityData function', () => {
    it('Should group temp by day and give cold warning', async () => {
        const result = processCityData(mockData, 'Helsinki', -5);
        expect(result).toEqual({
            "city": "Helsinki",
            "limit": -5,
            "temperature": {
                "2021-01-27": [0.85, 0.72, 0.52, 0.53, 0.65, 0.36, 0.15, -0.85],
                "2021-01-28": [-1.9, -2.93, -4.18, -3.99, -3.03, -3.53, -3.64, -3.81],
                "2021-01-29": [-3.85, -4.15, -4.31, -3.34, -1.87, -1.76, -2.48, -4.06],
                "2021-01-30": [-4.72, -5.19, -5.27, -5.46, -5.39, -5.67, -6.26, -6.93],
                "2021-01-31": [-7.22, -7.34, -7.41, -7.19, -6.69, -7.19, -7.78, -8.3]
            },
            "coldWarning": {
                "2021-01-27": false,
                "2021-01-28": false,
                "2021-01-29": false,
                "2021-01-30": true,
                "2021-01-31": true
            }
        });
    });
});