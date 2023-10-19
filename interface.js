const time = document.getElementById("time");
const info = document.getElementById("info");
const description = document.getElementById("description");
const day = document.getElementById("day");

export const setInterface = (weather) => {
  {
    const list = weather.list[0];
    description.innerHTML = `<div>
                        <h1>${list.weather[0].main}</h1>
                        <p>${weather.city.name}, United Kingdom</p>
                        <h2>${new Date(list.dt * 1000).toLocaleString("en-US", {
                          weekday: "long",
                        })}:</h2>
                      </div>`;
  }
  {
    const html = weather.list.map((item, i) => {
      if (i < 8) {
        return createWeatherItem(item);
      }
    });

    time.innerHTML = html.join("");
  }
  {
    const list = weather.list[0];
    info.innerHTML = `<div>
                        <p>Humidity:<strong>${list.main.humidity}%</strong></p>
                        <p>Wind:<strong>${list.wind.speed}MPH</strong></p>
                      </div>`;
  }
  {
    const html = weather.list.map((item, i) => {
      if (i % 8 === 0) {
        return createDayItem(item, i);
      }
    });

    day.innerHTML = html.join("");
  }
};

export const createWeatherItem = (item) => {
  return `<div>
    <h2> ${new Date(item.dt * 1000).toLocaleString("en-US", {
      hour: "numeric",
      hour12: true,
    })}
    </h2>
    <img src="http://openweathermap.org/img/wn/${
      item.weather[0].icon
    }.png" alt="${item.weather[0].description}">
    <h3>${Math.round(item.main.temp - 271.15)}&deg;</h3>
 </div>`;
};

export const createDayItem = (item) => {
  return `<div>
    <h2> ${new Date(item.dt * 1000).toLocaleString("en-US", {
      weekday: "short",
    })}
    </h2>
    <img src="http://openweathermap.org/img/wn/${
      item.weather[0].icon
    }.png" alt="${item.weather[0].description}">
    <p>${Math.round(item.main.temp_max - 271.15)}&deg; ${Math.round(
    item.main.temp_min - 271.15
  )}&deg;</p>
 </div>`;
};
