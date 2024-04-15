import express from "express";

import { getPostsSearch, getPosts, getPost, createPost, deletePost, updatePost, likePost, commentPost } from "../controllers/posts.js";
const router = express.Router();

import auth from '../middleware/auth.js';

router.get('/search', getPostsSearch);
router.get('/', getPosts);
router.get('/:id', getPost); 
router.post('/', auth, createPost);
router.delete('/:id', auth, deletePost);
router.patch('/:id', auth, updatePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', auth, commentPost);
 
export default router;