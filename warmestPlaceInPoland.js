const fetch = require('node-fetch');

const url = 'https://danepubliczne.imgw.pl/api/data/synop';

const processWeatherData = async (data) => {
  const sortedWarmData = [...data].sort((a, b) => Number(b.temperatura) - Number(a.temperatura));
  const sortedColdData = [...data].sort((a, b) => Number(a.temperatura) - Number(b.temperatura));

  const {
    stacja: warmStation,
    temperatura: warmTemperature,
  } = sortedWarmData[0];

  const {
    stacja: coldStation,
    temperatura: coldTemperature,
  } = sortedColdData[0];

  console.log(`Highest temperature ${warmTemperature}°C is currently captured at station: ${warmStation}`);
  console.log(`Lowest temperature ${coldTemperature}°C is currently captured at station: ${coldStation}`);

  console.log('\nSorted city from warmest to coldest:');
  sortedColdData.forEach((e) => {
    console.log(e.stacja);
  });
};

const findWarmestPlaceInPoland = async () => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    await processWeatherData(data);
  } catch (e) {
    console.log('An error has occurred', e);
  }
};

findWarmestPlaceInPoland();
