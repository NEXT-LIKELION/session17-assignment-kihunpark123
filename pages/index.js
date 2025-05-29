import { useState, useEffect } from "react";
import PostList from "../components/PostList";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch("/api/posts");
            const data = await response.json();

            if (data.success) {
                setPosts(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch posts:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div style={{ textAlign: "center", padding: "40px" }}>
                로딩 중...
            </div>
        );
    }

    return (
        <div>
            <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
                날씨와 함께하는 일상 기록
            </h1>
            <PostList posts={posts} />
        </div>
    );
}
