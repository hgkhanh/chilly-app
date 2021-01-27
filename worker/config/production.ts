module.exports = {
    apiURL: `https://api.openweathermap.org/data/2.5/forecast?units=metric&cnt=40&appid=${process.env.API_KEY}`,
    cities: [
        {
            name: 'Helsinki',
            limit: -5
        },
        {
            name: 'Tokyo',
            limit: 5
        },
        {
            name: 'Berlin',
            limit: 0
        },
    ],
    cronSchedule: '* * * * *' // Crontab syntax (default: every minute)
};