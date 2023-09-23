import express from "express";
import { addPost, updatePost } from "../controllers/post.js";

const router = express.Router();

router.post("/", addPost);
router.put("/:id", updatePost);

export default router;
