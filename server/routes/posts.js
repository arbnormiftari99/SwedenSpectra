import express from "express";

const router = express.Router();
import { getPosts, createPost, deletePost, updatePost, likePost } from "../controllers/posts.js";

router.get('/', getPosts);
router.post('/', createPost);
router.delete('/:id', deletePost);
router.patch('/:id', updatePost);
router.patch('/:id/likePost', likePost);
 
export default router;