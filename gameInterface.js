import { getRandomCountries } from "./getCountries.js";
import { startGameRef } from "./script.js";

const leftSideRef = document.getElementById("left");
const rightSideRef = document.getElementById("right");
const titleRef = document.getElementById("title");
const wholeGameRef = document.getElementById("wholeGame");
const scoreRef = document.getElementById("score");
const highScoreRef = document.getElementById("highScore");
const containerRef = document.getElementById("container");

let score = 0;

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
  let isHigher = true;
  const random = Math.floor(Math.random() * 4);
  let highScore = getHighScore();

  switch (random) {
    case 0:
      answers.question =
        "Which country has the <span>higher temperature</span> right now?";
      answers.left = Math.floor(Math.round(infoOne.list[0].main.temp - 273.15));
      answers.right = Math.floor(
        Math.round(infoTwo.list[0].main.temp - 273.15)
      );
      answers.unit = " &deg;C";
      break;
    case 1:
      answers.question =
        "Which country has the <span>lowest temperature</span> right now?";
      answers.left = Math.floor(Math.round(infoTwo.list[0].main.temp - 273.15));
      answers.right = Math.floor(
        Math.round(infoOne.list[0].main.temp - 273.15)
      );
      isHigher = false;
      answers.unit = " &deg;C";
      break;
    case 2:
      answers.question =
        "Which country has <span>higher humidity</span> right now?";
      answers.left = infoOne.list[0].main.humidity;
      answers.right = infoTwo.list[0].main.humidity;
      answers.unit = " %";
      break;
    case 3:
      answers.question =
        "Which country has <span>higher wind speeds</span> right now?";
      answers.left = infoOne.list[0].wind.speed;
      answers.right = infoTwo.list[0].wind.speed;
      answers.unit = " MPH";
      break;
    default:
      break;
  }

  titleRef.innerHTML = `<div>
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
        rightSideRef.classList.add("win");
        scoreCounter();
        setTimeout(() => {
          getRandomCountries();
          leftSideRef.classList.remove("win", "lose");
          rightSideRef.classList.remove("win", "lose");
        }, 2000);
      } else if (answers.left > answers.right) {
        leftSideRef.classList.add("win");
        rightSideRef.classList.add("lose");
        scoreCounter();
        setTimeout(() => {
          getRandomCountries();
          leftSideRef.classList.remove("win", "lose");
          rightSideRef.classList.remove("win", "lose");
        }, 2000);
      } else {
        leftSideRef.classList.add("lose");
        rightSideRef.classList.add("win");
        if (score > highScore) {
          highScore = score;
          localStorage.setItem("highscore", highScore);
          highScoreRef.innerHTML = `<p>High Score: ${highScore}</p>`;
        }
        score = 0;
        scoreRef.innerHTML = `<p>Score: ${score}</p>`;
        setTimeout(() => {
          leftSideRef.classList.remove("win", "lose");
          rightSideRef.classList.remove("win", "lose");
          hideGame();
          startGameRef.classList.add("show");
        }, 2000);
      }
    }
  });

  rightSideRef.addEventListener("click", () => {
    if (answered === false) {
      showTemp();
      if (answers.left === answers.right) {
        rightSideRef.classList.add("win");
        leftSideRef.classList.add("win");
        scoreCounter();
        setTimeout(() => {
          getRandomCountries();
          leftSideRef.classList.remove("win", "lose");
          rightSideRef.classList.remove("win", "lose");
        }, 2000);
      } else if (answers.left < answers.right) {
        rightSideRef.classList.add("win");
        leftSideRef.classList.add("lose");
        scoreCounter();
        setTimeout(() => {
          getRandomCountries();
          leftSideRef.classList.remove("win", "lose");
          rightSideRef.classList.remove("win", "lose");
        }, 2000);
      } else {
        rightSideRef.classList.add("lose");
        leftSideRef.classList.add("win");
        if (score > highScore) {
          highScore = score;
          localStorage.setItem("highscore", highScore);
          highScoreRef.innerHTML = `<p>High Score: ${highScore}</p>`;
        }
        score = 0;
        scoreRef.innerHTML = `<p>Score: ${score}</p>`;
        setTimeout(() => {
          leftSideRef.classList.remove("win", "lose");
          rightSideRef.classList.remove("win", "lose");
          hideGame();
          startGameRef.classList.add("show");
        }, 1999);
      }
    }
  });

  const showTemp = () => {
    answered = true;

    const clickedLeft = document.createElement("div");
    clickedLeft.classList.add("temp");
    leftSideRef.appendChild(clickedLeft);
    clickedLeft.innerHTML = `<h2>${
      isHigher ? answers.left + answers.unit : answers.right + answers.unit
    }</h2>`;

    const clickedRight = document.createElement("div");
    clickedRight.classList.add("temp");
    rightSideRef.appendChild(clickedRight);
    clickedRight.innerHTML = `<h2>${
      isHigher ? answers.right + answers.unit : answers.left + answers.unit
    }</h2>`;
  };

  const scoreCounter = () => {
    score++;
    scoreRef.innerHTML = `<p>Score: ${score}</p>`;
  };
};

export const hideGame = () => {
  wholeGameRef.classList.add("hidden");
  wholeGameRef.classList.remove("show");
  containerRef.classList.add("hidden");
  containerRef.classList.remove("show");
};

export const showGame = () => {
  wholeGameRef.classList.add("show");
  wholeGameRef.classList.remove("hidden");
  containerRef.classList.add("show");
  containerRef.classList.remove("hidden");
};

export function getHighScore() {
  let highScore = localStorage.getItem("highscore");
  if (highScore === null) {
    highScore = 0;
  } else {
    highScore = parseInt(highScore, 10);
  }
  return highScore;
}
