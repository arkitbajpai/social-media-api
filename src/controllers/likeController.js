import Like from "../models/Like.js";
import Post from "../models/Post.js";

export const toggleLike = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        const existingLike = await Like.findOne({
            user: req.user._id,
            post: postId
        });

        if (existingLike) {
            await existingLike.deleteOne();

            const likeCount = await Like.countDocuments({
                post: postId
            });

            return res.status(200).json({
                success: true,
                message: "Post unliked successfully",
                likeCount
            });
        }

        await Like.create({
            user: req.user._id,
            post: postId
        });

        const likeCount = await Like.countDocuments({
            post: postId
        });

        return res.status(200).json({
            success: true,
            message: "Post liked successfully",
            likeCount
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getLikesByPost = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        const likes = await Like.find({ post: postId })
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: likes.length,
            likes
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};