import { getRandomCountries } from "./getCountries.js";

const leftSideRef = document.getElementById("left");
const rightSideRef = document.getElementById("right");
const gameRef = document.getElementById("game");
const wholeGameRef = document.getElementById("wholeGame");

export const gameInterface = (
  countryOne,
  countryTwo,
  countryInfoOne,
  countryinfoTwo
) => {
  const link = "https://hatscripts.github.io/circle-flags/flags/";
  const flagOne = countryOne.country_code.toLowerCase();
  const flagTwo = countryTwo.country_code.toLowerCase();

  const infoOne = countryInfoOne.data;
  const infoTwo = countryinfoTwo.data;
  let answered = false;
  const answers = {};
  const random = Math.floor(Math.random() * 4);
  switch (random) {
    case 0: // ******BUGGY CODE**********
      answers.question =
        "Which country has the <span>higher temperature</span> right now?";
      answers.left = Math.round(infoOne.list[0].main.temp - 273.15) + " &deg;C";
      answers.right =
        Math.round(infoTwo.list[0].main.temp - 273.15) + " &deg;C";
      break;
    case 1: // ******BUGGY CODE**********
      answers.question =
        "Which country has the <span>lowest temperature</span> right now?";
      answers.left = Math.round(infoTwo.list[0].main.temp - 273.15) + " &deg;C";
      answers.right =
        Math.round(infoOne.list[0].main.temp - 273.15) + " &deg;C";
      break;
    case 2:
      answers.question =
        "Which country has <span>higher humidity</span> right now?";
      answers.left = infoOne.list[0].main.humidity + " %";
      answers.right = infoTwo.list[0].main.humidity + " %";
      break;
    case 3:
      answers.question =
        "Which country has <span>higher wind speeds</span> right now?";
      answers.left = infoOne.list[0].wind.speed + " MPH";
      answers.right = infoTwo.list[0].wind.speed + " MPH";
      break;
    default:
      break;
  }

  gameRef.innerHTML = `<div>
                            <h1>${answers.question}</h1>
                        </div>`;
  leftSideRef.innerHTML = `<div>
                            <img src="${link}${flagOne}.svg" width="200" alt"${countryOne.name}"/>
                            <h2>${countryOne.name}</h2>
                        </div>`;
  rightSideRef.innerHTML = `<div>
                            <img src="${link}${flagTwo}.svg" width="200" alt"${countryTwo.name}"/>
                            <h2>${countryTwo.name}</h2>
                        </div>`;

  leftSideRef.addEventListener("click", () => {
    if (answered === false) {
      showTemp();
      if (answers.left === answers.right) {
        leftSideRef.classList.add("win");
      } else if (answers.left > answers.right) {
        leftSideRef.classList.add("win");
        console.log("win");
      } else {
        leftSideRef.classList.add("lose");
        console.log("lose");
      }
      setTimeout(() => {
        getRandomCountries();
        leftSideRef.classList.remove("win");
        leftSideRef.classList.remove("lose");
      }, 3000);
    }
  });

  rightSideRef.addEventListener("click", () => {
    if (answered === false) {
      showTemp();
      if (answers.left === answers.right) {
        rightSideRef.classList.add("win");
      } else if (answers.left < answers.right) {
        rightSideRef.classList.add("win");
        console.log("win");
      } else {
        rightSideRef.classList.add("lose");
        console.log("lose");
      }
      setTimeout(() => {
        getRandomCountries();
        rightSideRef.classList.remove("win");
        rightSideRef.classList.remove("lose");
      }, 3000);
    }
  });

  console.log(infoOne, infoTwo, answers.left, answers.right);

  const showTemp = () => {
    answered = true;
    const clickedLeft = document.createElement("div");
    clickedLeft.classList.add("temp");
    leftSideRef.appendChild(clickedLeft);
    clickedLeft.innerHTML = `<h2>${answers.left}</h2>`;

    const clickedRight = document.createElement("div");
    clickedRight.classList.add("temp");
    rightSideRef.appendChild(clickedRight);
    clickedRight.innerHTML = `<h2>${answers.right}</h2>`;
  };
};
