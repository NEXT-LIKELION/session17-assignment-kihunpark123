import { useState, useEffect } from "react";
import WeatherDisplay from "./WeatherDisplay";

export default function PostForm({ onSubmit }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [weatherLoading, setWeatherLoading] = useState(false);

    const getCurrentWeather = async () => {
        setWeatherLoading(true);
        try {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        const response = await fetch(
                            `/api/weather/current?lat=${latitude}&lon=${longitude}`
                        );
                        const data = await response.json();

                        if (data.success) {
                            setWeather(data.data);
                        } else {
                            alert("날씨 정보를 가져올 수 없습니다.");
                        }
                        setWeatherLoading(false);
                    },
                    () => {
                        alert("위치 정보 접근이 거부되었습니다.");
                        setWeatherLoading(false);
                    }
                );
            } else {
                alert("이 브라우저는 위치 서비스를 지원하지 않습니다.");
                setWeatherLoading(false);
            }
        } catch (error) {
            console.error("Weather fetch error:", error);
            alert("날씨 정보를 가져올 수 없습니다.");
            setWeatherLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    content,
                    weather,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setTitle("");
                setContent("");
                setWeather(null);
                if (onSubmit) onSubmit(data.data);
                alert("글이 성공적으로 작성되었습니다!");
            } else {
                alert("글 작성에 실패했습니다.");
            }
        } catch (error) {
            console.error("Post creation error:", error);
            alert("글 작성 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{ maxWidth: "600px", margin: "0 auto" }}
        >
            <div style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="제목을 입력하세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={{
                        width: "100%",
                        padding: "12px",
                        fontSize: "18px",
                        border: "2px solid #ddd",
                        borderRadius: "5px",
                        outline: "none",
                    }}
                />
            </div>

            <div style={{ marginBottom: "20px" }}>
                <textarea
                    placeholder="내용을 입력하세요"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows={10}
                    style={{
                        width: "100%",
                        padding: "12px",
                        fontSize: "14px",
                        border: "2px solid #ddd",
                        borderRadius: "5px",
                        outline: "none",
                        resize: "vertical",
                    }}
                />
            </div>

            <div style={{ marginBottom: "20px" }}>
                <button
                    type="button"
                    onClick={getCurrentWeather}
                    disabled={weatherLoading}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#74b9ff",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginBottom: "10px",
                    }}
                >
                    {weatherLoading
                        ? "날씨 정보 가져오는 중..."
                        : "현재 날씨 추가"}
                </button>

                <WeatherDisplay weather={weather} />
            </div>

            <button
                type="submit"
                disabled={loading || !title || !content}
                style={{
                    width: "100%",
                    padding: "12px",
                    backgroundColor: loading ? "#ccc" : "#00b894",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    fontSize: "16px",
                    cursor: loading ? "not-allowed" : "pointer",
                }}
            >
                {loading ? "작성 중..." : "글 작성"}
            </button>
        </form>
    );
}
