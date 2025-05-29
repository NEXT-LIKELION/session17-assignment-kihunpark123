import { getPostById, deletePost } from "../../../lib/posts";

export default function handler(req, res) {
    const { id } = req.query;

    if (req.method === "GET") {
        try {
            const post = getPostById(id);
            if (!post) {
                return res.status(404).json({
                    success: false,
                    message: "포스트를 찾을 수 없습니다.",
                });
            }

            res.status(200).json({
                success: true,
                data: post,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "포스트를 가져올 수 없습니다.",
            });
        }
    } else if (req.method === "DELETE") {
        try {
            const deleted = deletePost(id);
            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: "포스트를 찾을 수 없습니다.",
                });
            }

            res.status(200).json({
                success: true,
                message: "포스트가 삭제되었습니다.",
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "포스트를 삭제할 수 없습니다.",
            });
        }
    } else {
        res.setHeader("Allow", ["GET", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
