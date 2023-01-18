import express from "express";
import { addComment } from "../controllers/comment.js";
import { verifyToken } from "../verifyToken.js"
const router = express.Router();

//add comment
router.post("/", verifyToken, addComment)


export default router;