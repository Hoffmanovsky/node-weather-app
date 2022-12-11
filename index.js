const fetch = require('node-fetch');
const { appendFile } = require('fs').promises;
const { normalize, resolve } = require('path');

const url = 'https://danepubliczne.imgw.pl/api/data/synop';
const cityName = process.argv[2];

function safeJoin(base, target) {
  const targetPath = `.${normalize(`/${target}`)}`;
  return resolve(base, targetPath);
}
const getDataFileName = (city) => safeJoin('./data', `${city}.txt`);

const processWeatherData = async (data) => {
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

  const dateTimeString = new Date().toLocaleString();

  await appendFile(getDataFileName(cityName), `${dateTimeString}\n${weatherInfo}\n`);
};

fetch(url)
  .then((r) => r.json())
  .then(processWeatherData);
