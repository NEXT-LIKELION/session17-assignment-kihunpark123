export default function WeatherDisplay({ weather }) {
    if (!weather) return null;

    return (
        <div
            style={{
                background: "linear-gradient(135deg, #74b9ff, #0984e3)",
                color: "white",
                padding: "20px",
                borderRadius: "10px",
                margin: "10px 0",
                display: "flex",
                alignItems: "center",
                gap: "15px",
            }}
        >
            <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt={weather.description}
                style={{ width: "60px", height: "60px" }}
            />
            <div>
                <h3 style={{ margin: 0, fontSize: "18px" }}>
                    {weather.city}, {weather.country}
                </h3>
                <p
                    style={{
                        margin: "5px 0",
                        fontSize: "24px",
                        fontWeight: "bold",
                    }}
                >
                    {weather.temperature}°C
                </p>
                <p style={{ margin: 0, opacity: 0.9 }}>{weather.description}</p>
                <small style={{ opacity: 0.8 }}>
                    습도: {weather.humidity}% | 풍속: {weather.windSpeed}m/s
                </small>
            </div>
        </div>
    );
}
