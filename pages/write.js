import { useRouter } from "next/router";
import PostForm from "../components/PostForm";

export default function Write() {
    const router = useRouter();

    const handlePostCreate = (newPost) => {
        // 글 작성 후 메인 페이지로 이동
        router.push("/");
    };

    return (
        <div>
            <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
                새 글 쓰기
            </h1>
            <PostForm onSubmit={handlePostCreate} />
        </div>
    );
}
