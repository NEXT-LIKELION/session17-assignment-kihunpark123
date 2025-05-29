import { getCurrentWeather, getWeatherByCity } from "../../../lib/weather";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { lat, lon, city } = req.query;

        let weatherData;

        if (lat && lon) {
            weatherData = await getCurrentWeather(
                parseFloat(lat),
                parseFloat(lon)
            );
        } else if (city) {
            weatherData = await getWeatherByCity(city);
        } else {
            return res.status(400).json({
                success: false,
                message: "위치 정보(lat, lon) 또는 도시명(city)이 필요합니다.",
            });
        }

        res.status(200).json({
            success: true,
            data: weatherData,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
