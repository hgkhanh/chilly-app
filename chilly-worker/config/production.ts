module.exports = {
    apiURL: 'https://api.openweathermap.org/data/2.5/forecast?units=metric&cnt=40&appid=cfc7fa07a0a04b2a02b27d1d8e84d7ef',
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