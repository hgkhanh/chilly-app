# Chilly App

An Node js app that monitors weather forcast and give cold warning for the next five days. It has a worker that scheduled to fetch weather forcast and an express api server to query for data.

# Getting started

Clone the repository
```
git clone https://github.com/hgkhanh/chilly-app
```
Install dependencies
```
npm install
```
This app use [PM2](https://github.com/Unitech/pm2), aproduction process manager make it easy to run and monitor the two services.
```
npm install pm2 -g
```
- In case of error `ts-node not available`, check if `/usr/lib/node_modules/pm2/node_modules/.bin`is having ts-node. Install it with this command
```
sudo pm2 install typescript
```
Configure permission for the data file
```
sudo chmod 755 data/weather.json
```
Build and run the project
```
npm run start
```

# Usage
- The `worker` service run on schedule, query forecast for a list of cities from [openweathermap](https://openweathermap.org)
- The city list and schedule can be configured in `config/`, there are separated file for dev and prod config (They are identical at the moment).
- By default, worker run at a 1-minute interval
- When running, `worker` will save data in `data/weather.json`
- User can access the api at `localhost:5000/weather`to see the stored results.

# Test
- Unit and Integration test using Jest and [suppertest](https://github.com/visionmedia/supertest)
- Run the test for both services
```
npm run test
```

