# Chilly App
An Node js app that monitors weather forcast and give cold warning for the next five days. It has a worker that scheduled to fetch weather forcast and an express api server to query for data.

# Getting started
- Clone the repository
`git clone https://github.com/hgkhanh/chilly-app`
- Install dependencies
`npm install`
- This app use [PM2]: https://github.com/Unitech/pm2, aproduction process manager make it easy to run and monitor the two services.
`npm install pm2 -g`
- Configure the data file
```
# create the directory and file
sudo mkdir data/
touch data/weather.json
# give the db correct permissions
sudo chmod 755 data/
```

