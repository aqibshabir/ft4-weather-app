import { getRandomCountries } from "./getCountries.js";

const leftSideRef = document.getElementById("left");
const rightSideRef = document.getElementById("right");
const gameRef = document.getElementById("game");

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
    case 0:
      answers.question = "Which country has the higher temperature right now?";
      answers.left = infoOne.list[0].main.temp + " &deg;C";
      answers.right = infoTwo.list[0].main.temp + " &deg;C";
      break;
    case 1:
      answers.question = "Which country has the lowest temperature right now?";
      answers.left = infoTwo.list[0].main.temp + " &deg;C";
      answers.right = infoOne.list[0].main.temp + " &deg;C";
      break;
    case 2:
      answers.question = "Which country has higher humidity right now?";
      answers.left = infoOne.list[0].main.humidity + " %";
      answers.right = infoTwo.list[0].main.humidity + " %";
      break;
    case 3:
      answers.question = "Which country has higher wind speeds right now?";
      answers.left = infoOne.list[0].wind.speed + " MPH";
      answers.right = infoTwo.list[0].wind.speed + " MPH";
      break;
    default:
      break;
  }

  console.log(infoOne, infoTwo);

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
      if (answers.left > answers.right) {
        console.log("You win");
      }
      setTimeout(() => {
        getRandomCountries();
      }, 3000);
    }
  });

  rightSideRef.addEventListener("click", () => {
    if (answered === false) {
      showTemp();
      if (answers.left < answers.right) {
        console.log("You win");
      }
      setTimeout(() => {
        getRandomCountries();
      }, 3000);
    }
  });

  const showTemp = () => {
    answered = true;
    const clickedLeft = document.createElement("div");
    clickedLeft.classList.add("temp");
    leftSideRef.appendChild(clickedLeft);

    clickedLeft.innerHTML = `<h2>${Math.round(
      infoOne.list[0].main.temp - 273.15
    )}&deg;C</h2>`;
    const clickedRight = document.createElement("div");
    clickedRight.classList.add("temp");
    rightSideRef.appendChild(clickedRight);

    clickedRight.innerHTML = `<h2>${Math.round(
      infoTwo.list[0].main.temp - 273.15
    )}&deg;C
      </h2>`;
  };
};
