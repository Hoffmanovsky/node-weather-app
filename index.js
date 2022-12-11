const fetch = require('node-fetch');
const { writeFile } = require('fs');
const { normalize } = require('path');

const url = 'https://danepubliczne.imgw.pl/api/data/synop';
const cityName = process.argv[2];

const getDataFileName = (city) => `./data/${city}.txt`;

const processWeatherData = (data) => {
  const foundData = data.find((stationData) => stationData.stacja === cityName);

  if (!foundData) {
    console.log('Takiego miasta nasze API nie przewidziało :(');
    // eslint-disable-next-line no-useless-return
    return;
  }

  const {
    cisnienie: pressure,
    wilgotnosc_wzgledna: humidity,
    temperatura: temperature,
  } = foundData;

  const weatherInfo = `In ${cityName}, there is ${temperature}°C, ${humidity}% of humidity and pressure of ${pressure}hPa.`;
  console.log(weatherInfo);
};

fetch(url)
  .then((r) => r.json())
  .then(processWeatherData);
