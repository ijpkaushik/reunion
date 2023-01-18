import express from "express";
import {
    addPost,
    deletePost,
    getPost,
    getAllPosts,
    like,
    dislike
} from "../controllers/post.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, addPost);

router.delete("/:id", verifyToken, deletePost);

router.get("/post/:id", getPost);

router.get("/allposts", getAllPosts);

router.put("/like/:id", verifyToken, like);

router.put("/dislike/:id", verifyToken, dislike);

export default router;