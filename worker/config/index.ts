interface CityConfig {
    name: string,
    limit: number
}
interface Config {
    apiURL: string,
    cities: Array<CityConfig>,
    cronSchedule: string
}

let config: Config = require('./development');

if (process.env.NODE_ENV === 'production') {
    config = require('./production');
}

export default config;