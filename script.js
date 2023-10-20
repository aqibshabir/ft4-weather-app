import { getWeather } from "./geoController.js";
import { getUserWeather } from "./userController.js";
import { getRandomCountries } from "./getCountries.js";

const getLocationRef = document.getElementById("getLocation");
const startGameRef = document.getElementById("startGame");

getLocationRef.addEventListener("click", () => {
  getWeather();
});

getUserWeather();

startGameRef.addEventListener("click", () => {
  getRandomCountries();
});
