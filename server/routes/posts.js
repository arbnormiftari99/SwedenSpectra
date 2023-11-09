import express from "express";

const router = express.Router();
import { getPosts, createPost, deletePost, updatePost } from "../controllers/posts.js";

router.get('/', getPosts);
router.post('/', createPost);
router.delete('/:id', deletePost);
router.patch('/:id', updatePost);
 
export default router;