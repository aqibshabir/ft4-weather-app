import { setInterface } from "./interface.js";

const locationInputRef = document.getElementById("location");
const errorRef = document.getElementById("error");

let locationInput = "";

export const getUserWeather = async () => {
  locationInputRef.addEventListener("input", async (e) => {
    locationInput = e.target.value;

    const schema = joi.object({ location: joi.string().required().min(3) });

    try {
      await schema.validateAsync({ location: locationInput });
      errorRef.innerHTML = ``;
      const { data } = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${locationInput}, GB&limit=1&appid=19a91654c2866453d454714d0821523a`
      );

      if (data.length > 0) {
        const { lat, lon } = data[0];
        const weather = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=19a91654c2866453d454714d0821523a`
        );
        setInterface(weather.data);
        errorRef.innerHTML = `<p class="success">result found:</p>`;
      } else {
        errorRef.innerHTML = `<p>Location not found, please try again...</p>`;
      }
    } catch (error) {
      errorRef.innerHTML = `<p>Please insert 3 charecters or more...</p>`;
    }
  });
};
