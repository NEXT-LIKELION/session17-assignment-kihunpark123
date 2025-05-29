import axios from "axios";

const WEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function getCurrentWeather(lat, lon) {
    try {
        const response = await axios.get(`${WEATHER_BASE_URL}/weather`, {
            params: {
                lat,
                lon,
                appid: WEATHER_API_KEY,
                units: "metric",
                lang: "kr",
            },
        });

        return {
            temperature: Math.round(response.data.main.temp),
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
            humidity: response.data.main.humidity,
            windSpeed: response.data.wind.speed,
            city: response.data.name,
            country: response.data.sys.country,
        };
    } catch (error) {
        console.error("Weather API Error:", error);
        throw new Error("날씨 정보를 가져올 수 없습니다.");
    }
}

export async function getWeatherByCity(cityName) {
    try {
        const response = await axios.get(`${WEATHER_BASE_URL}/weather`, {
            params: {
                q: cityName,
                appid: WEATHER_API_KEY,
                units: "metric",
                lang: "kr",
            },
        });

        return {
            temperature: Math.round(response.data.main.temp),
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
            humidity: response.data.main.humidity,
            windSpeed: response.data.wind.speed,
            city: response.data.name,
            country: response.data.sys.country,
        };
    } catch (error) {
        console.error("Weather API Error:", error);
        throw new Error("날씨 정보를 가져올 수 없습니다.");
    }
}
