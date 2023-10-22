import { getWeather } from "./geoController.js";
import { getUserWeather } from "./userController.js";
import { getRandomCountries } from "./getCountries.js";
import { hideGame, showGame } from "./gameInterface.js";

const getLocationRef = document.getElementById("getLocation");
export const startGameRef = document.getElementById("startGame");
const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menuItem");
const hamburger = document.querySelector(".hamburger");
const closeIcon = document.querySelector(".closeIcon");
const menuIcon = document.querySelector(".menuIcon");

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

function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
  } else {
    menu.classList.add("showMenu");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
  }
}

hamburger.addEventListener("click", toggleMenu);
