import axios from 'axios';
import config from '../config';
export const query = async () => {
    // Query
    console.log('running a task every minute');
    const res = await axios.get(config.apiURL);
    // console.log(res.data);

    // Process data
    const tempByDay = res.data.list.reduce((result: { [x: string]: any; }, dataPoint: { dt_txt: string; main: { temp: any; }; }) => {
        const day = dataPoint.dt_txt.split(' ')[0];
        // console.log('dataPoint:', dataPoint);
        result[day] = [...result[day] || [], dataPoint.main.temp];
        return result;
    }, {});
    return tempByDay;
};