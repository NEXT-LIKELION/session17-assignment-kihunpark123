import { getAllPosts, createPost } from "../../../lib/posts";

export default function handler(req, res) {
    if (req.method === "GET") {
        try {
            const posts = getAllPosts();
            res.status(200).json({
                success: true,
                data: posts,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "포스트를 가져올 수 없습니다.",
            });
        }
    } else if (req.method === "POST") {
        try {
            const { title, content, weather } = req.body;

            if (!title || !content) {
                return res.status(400).json({
                    success: false,
                    message: "제목과 내용은 필수입니다.",
                });
            }

            const newPost = createPost({
                title,
                content,
                weather: weather || null,
            });

            res.status(201).json({
                success: true,
                data: newPost,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "포스트를 생성할 수 없습니다.",
            });
        }
    } else {
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
