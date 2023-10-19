import { setInterface } from "./interface.js";
import { getLocation } from "./location.js";

export const apiKey = "19a91654c2866453d454714d0821523a";

export const getWeather = async () => {
  try {
    const { latitude, longitude } = await getLocation();
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
    );

    setInterface(data);
  } catch (error) {
    console.log("error:", error);
  }
};
