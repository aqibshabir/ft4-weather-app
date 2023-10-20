import { countries } from "./countries.js";
import { gameInterface } from "./gameInterface.js";

export const getRandomCountries = async () => {
  const rand1 = countries[Math.floor(Math.random() * countries.length)];
  const rand2 = countries[Math.floor(Math.random() * countries.length)];
  console.log(rand1, rand2);

  try {
    //get random countries with data
    const randWeather1 = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${rand1.latlng[0]}&lon=${rand1.latlng[1]}&appid=19a91654c2866453d454714d0821523a`
    );
    const randWeather2 = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${rand2.latlng[0]}&lon=${rand2.latlng[1]}&appid=19a91654c2866453d454714d0821523a`
    );
    // console.log(
    //   Math.round(randWeather1.data.list[0].main.temp - 273.15),
    //   Math.round(randWeather2.data.list[0].main.temp - 273.15)
    // );
    gameInterface(rand1, rand2, randWeather1, randWeather2);
  } catch (e) {
    console.log("error:", e);
  }
};
