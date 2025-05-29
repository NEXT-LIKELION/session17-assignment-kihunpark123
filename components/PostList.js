import Link from "next/link";
import WeatherDisplay from "./WeatherDisplay";

export default function PostList({ posts }) {
    if (!posts || posts.length === 0) {
        return (
            <div style={{ textAlign: "center", padding: "40px" }}>
                <h3>작성된 글이 없습니다.</h3>
                <p>첫 번째 글을 작성해보세요!</p>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            {posts.map((post) => (
                <article
                    key={post.id}
                    style={{
                        border: "1px solid #ddd",
                        borderRadius: "10px",
                        padding: "20px",
                        marginBottom: "20px",
                        backgroundColor: "white",
                    }}
                >
                    <Link
                        href={`/posts/${post.id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <h2
                            style={{
                                marginTop: 0,
                                marginBottom: "10px",
                                cursor: "pointer",
                                color: "#2d3436",
                            }}
                        >
                            {post.title}
                        </h2>
                    </Link>

                    <p
                        style={{
                            color: "#636e72",
                            lineHeight: "1.6",
                            marginBottom: "15px",
                        }}
                    >
                        {post.content.length > 150
                            ? post.content.substring(0, 150) + "..."
                            : post.content}
                    </p>

                    {post.weather && <WeatherDisplay weather={post.weather} />}

                    <small style={{ color: "#636e72" }}>
                        작성일:{" "}
                        {new Date(post.createdAt).toLocaleString("ko-KR")}
                    </small>
                </article>
            ))}
        </div>
    );
}
