import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import { createError } from "../error.js";

export const addPost = async (req, res, next) => {
    const newPost = new Post({ userId: req.user.id, ...req.body });
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        next(err);
    }
};

export const deletePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post)
            return next(createError(404, "Post not found!"));

        if (req.user.id === post.userId) {
            await Post.findByIdAndDelete(req.params.id);
            res.status(200).json("The post has been deleted.");
        } else {
            return next(createError(401, "You can delete only your post!"));
        }
    } catch (err) {
        next(err);
    }
};

export const getPost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        const comments = await Comment.find({ postId: req.params.id }).sort({ createdAt: -1 })

        res.status(200).json({ ...post._doc, comments: comments });
    } catch (err) {
        next(err);
    }
};

export const getAllPosts = async (req, res, next) => {

    try {
        const posts = await Post.find({}).sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (err) {
        next(err);
    }
};

export const like = async (req, res, next) => {
    const id = req.user.id;
    const postId = req.params.postId;
    try {
        await Post.updateOne(postId, {
            $addToSet: { likes: id },
            $pull: { dislikes: id }
        })
        res.status(200).json("The post has been liked.")
    } catch (err) {
        next(err);
    }
};

export const dislike = async (req, res, next) => {
    const id = req.user.id;
    const postId = req.params.postId;
    try {
        await Post.updateOne(postId, {
            $addToSet: { dislikes: id },
            $pull: { likes: id }
        })
        res.status(200).json("The post has been disliked.")
    } catch (err) {
        next(err);
    }
};