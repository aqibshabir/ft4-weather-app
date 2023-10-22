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
  const random = Math.floor(Math.random() * 4);
  switch (1) {
    case 0:
      answers.question =
        "Which country has the <span>higher temperature</span> right now?";
      answers.left = Math.floor(Math.round(infoOne.list[0].main.temp - 273.15));
      answers.right = Math.floor(
        Math.round(infoTwo.list[0].main.temp - 273.15)
      );
      break;
    case 1: // ******BUGGY CODE**********
      answers.question =
        "Which country has the <span>lowest temperature</span> right now?";
      answers.left = Math.floor(Math.round(infoTwo.list[0].main.temp - 273.15));
      answers.right = Math.floor(
        Math.round(infoOne.list[0].main.temp - 273.15)
      );
      console.log(answers);
      break;
    case 2:
      answers.question =
        "Which country has <span>higher humidity</span> right now?";
      answers.left = Math.floor(infoOne.list[0].main.humidity);
      answers.right = Math.floor(infoTwo.list[0].main.humidity);
      break;
    case 3:
      answers.question =
        "Which country has <span>higher wind speeds</span> right now?";
      answers.left = Math.floor(infoOne.list[0].wind.speed);
      answers.right = Math.floor(infoTwo.list[0].wind.speed);
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
        scoreCounter();
      } else if (answers.left > answers.right) {
        leftSideRef.classList.add("win");
        scoreCounter();
      } else {
        leftSideRef.classList.add("lose");
        localStorage.setItem("highscore", `${score}`);
        highScoreRef.innerHTML = ``;
        score = 0;
        scoreRef.innerHTML = `<p>Score: ${score}</p>`;
        setTimeout(() => {
          hideGame();
          startGameRef.classList.add("show");
        }, 1000);
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
        scoreCounter();
      } else if (answers.left < answers.right) {
        rightSideRef.classList.add("win");
        scoreCounter();
      } else {
        rightSideRef.classList.add("lose");
        localStorage.setItem("highscore", `${score}`);
        score = 0;
        scoreRef.innerHTML = `<p>Score: ${score}</p>`;
        setTimeout(() => {
          hideGame();
          startGameRef.classList.add("show");
        }, 1000);
      }
      setTimeout(() => {
        getRandomCountries();
        rightSideRef.classList.remove("win");
        rightSideRef.classList.remove("lose");
      }, 3000);
    }
  });

  console.log(answers.left, answers.right, infoOne, infoTwo);

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
