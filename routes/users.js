import express from "express";
import {
  getUser,
  follow,
  unfollow,
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//get a user
router.get("/", verifyToken, getUser);

//follow a user
router.put("/follow/:id", verifyToken, follow);

//unfollow a user
router.put("/unfollow/:id", verifyToken, unfollow);

export default router;