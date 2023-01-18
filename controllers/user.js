import User from "../models/User.js";
import { createError } from "../error.js";

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.body.userid);
        if (!user)
            return next(createError(404, "User not found!"));
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

export const follow = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.body.userid, {
            $addToSet: { following: req.params.id },
        });
        await User.findByIdAndUpdate(req.params.id, {
            $addToSet: { followers: req.body.userid },
        });
        res.status(200).json("Followed successfully.")
    } catch (err) {
        next(err);
    }
};

export const unfollow = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.body.userid, {
            $pull: { following: req.params.id },
        });
        await User.findByIdAndUpdate(req.params.id, {
            $pull: { following: req.body.id },
        });
        res.status(200).json("Unfollowed successfully.")
    } catch (err) {
        next(err);
    }
};