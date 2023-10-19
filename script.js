import { getWeather } from "./geoController.js";
import { getUserWeather } from "./userController.js";

const getLocationRef = document.getElementById("getLocation");

getLocationRef.addEventListener("click", () => {
  getWeather();
});

getUserWeather();
