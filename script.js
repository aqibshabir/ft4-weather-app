import { getWeather } from "./geoController.js";
import { getUserWeather } from "./userController.js";
import { getRandomCountries } from "./getCountries.js";
import { hideGame, showGame } from "./gameInterface.js";

const getLocationRef = document.getElementById("getLocation");
export const startGameRef = document.getElementById("startGame");

getLocationRef.addEventListener("click", () => {
  getWeather();
});

getUserWeather();
hideGame();

startGameRef.addEventListener("click", () => {
  showGame();
  getRandomCountries();
  startGameRef.classList.add("hidden");
});
