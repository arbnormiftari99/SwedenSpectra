import express from "express";

const router = express.Router();
import { getPosts, createPost, deletePost, updatePost, likePost } from "../controllers/posts.js";
import auth from '../middleware/auth.js';

router.get('/', getPosts);
router.post('/', auth, createPost);
router.delete('/:id', auth, deletePost);
router.patch('/:id', auth, updatePost);
router.patch('/:id/likePost', auth, likePost);
 
export default router;