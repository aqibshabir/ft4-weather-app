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

  console.log(infoOne, infoTwo);

  gameRef.innerHTML = `<div>
                            <h1>Which country has the higher tempreture right now?</h1>
                        </div>`;
  leftSideRef.innerHTML = `<div>
                            <img src="${link}${flagOne}.svg" width="200" alt"${countryOne.name}"/>
                            <h2>${countryOne.name}</h2>
                        </div>`;
  rightSideRef.innerHTML = `<div>
                            <img src="${link}${flagTwo}.svg" width="200" alt"${countryTwo.name}"/>
                            <h2>${countryTwo.name}</h2>
                        </div>`;

  // when the divs are clicked - it will show the current temp of that place - eventlisteners!

  leftSideRef.addEventListener(
    "click",
    () => {
      const clickedLeft = document.createElement("div");
      clickedLeft.classList.add("temp");
      leftSideRef.appendChild(clickedLeft);

      clickedLeft.innerHTML = `<h2>${Math.round(
        infoOne.list[0].main.temp - 273.15
      )}&deg;C</h2>`;
    },
    { once: true }
  );

  rightSideRef.addEventListener(
    "click",
    () => {
      const clickedRight = document.createElement("div");
      clickedRight.classList.add("temp");
      rightSideRef.appendChild(clickedRight);

      clickedRight.innerHTML = `<h2>${Math.round(
        infoTwo.list[0].main.temp - 273.15
      )}&deg;C
      </h2>`;
    },
    { once: true }
  );
};
