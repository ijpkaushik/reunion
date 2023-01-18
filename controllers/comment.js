import Comment from "../models/Comment.js";

export const addComment = async (req, res, next) => {
    const newComment = new Comment({ ...req.body, userId: req.user.id });
    try {
        const savedComment = await newComment.save();
        res.status(200).send(savedComment._id);
    } catch (err) {
        next(err);
    }
};
